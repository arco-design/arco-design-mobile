import React, {
    useRef,
    useState,
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
    useCallback,
    useEffect,
    useContext,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { DropdownMenuProps, DropdownMenuRef } from './type';
import {
    getFormattedOptions as defaultFormatFunc,
    isCascadeArray,
    isClassNameDom,
    isRefDom,
} from './helper';
import Dropdown, { OptionsItem } from '../dropdown';
import IconTriDown from '../icon/IconTriDown';

export * from './type';

/**
 * 下拉选择组件，点击选择器(select)展开下拉框(dropdown)，展示选择项(options)，兼容多个选择器的情况。
 * @en Dropdown component, click the selector (select) to expand the dropdown box (dropdown), display the options (options), compatible with multiple selectors.
 * @type 导航
 * @type_en Navigation
 * @name 下拉选择菜单
 * @name_en DropdownMenu
 */
const DropdownMenu = forwardRef((props: DropdownMenuProps, ref: Ref<DropdownMenuRef>) => {
    const {
        className = '',
        style = {},
        options = [],
        disabled = [],
        selectTips = [],
        values,
        defaultValues = [],
        icon,
        chooseAndClose = true,
        selectIndex,
        defaultSelectIndex = 0,
        showDropdown,
        defaultShowDropdown = false,
        renderSelectLabel,
        onValuesChange,
        onSelectChange,
        onDropdownChange,
        getFormattedOptions = defaultFormatFunc,
        children,
        extraForDropdown,
    } = props;
    const { prefixCls, locale } = useContext(GlobalContext);
    const [innerValues, setInnerValues] = useState(defaultValues);
    const [defaultTop, setDefaultTop] = useState(0);
    const currentValues = values !== void 0 ? values : innerValues;

    const [innerShowDropdown, setInnerShowDropdown] = useState(defaultShowDropdown);
    const dropdownShown = showDropdown !== void 0 ? showDropdown : innerShowDropdown;

    const [innerSelectedIndex, setInnerSelectedIndex] = useState(defaultSelectIndex);
    const selectedIndex = selectIndex !== void 0 ? selectIndex : innerSelectedIndex;

    const selectWrapper = useRef<HTMLDivElement>(null);
    const domRef = useRef<HTMLDivElement | null>(null);
    const defaultOpItem: OptionsItem = {
        label: locale?.DropdownMenu.select,
        value: -1,
    };

    /**
     * 下拉框的容器
     * @en Dropdown container
     */
    const getContainer = useCallback(() => {
        if (props.getContainer) {
            return props.getContainer() || selectWrapper.current;
        }
        return selectWrapper.current;
    }, [selectWrapper.current]);

    /**
     * 更新选项数组和选择情况
     * @en Update options list and selection
     */
    const { formattedOptions } = useMemo(() => {
        return getFormattedOptions(options, currentValues as any);
    }, [options, currentValues]);

    const selectedOptions = useMemo(
        () =>
            formattedOptions.map(
                (ops, index) =>
                    ops.find(op => {
                        const value = currentValues[index];
                        return Array.isArray(value) ? value.includes(op.value) : op.value === value;
                    }) || (props.multiple ? defaultOpItem : ops[0]),
            ),
        [formattedOptions, currentValues],
    );

    /**
     * 当下拉框的状态变化
     * @en When the state of the dropdown box changes
     */
    const handleShowDropdownChange = (show: boolean, index?: number) => {
        onDropdownChange && onDropdownChange(show, index);
        setInnerShowDropdown(show);
    };

    const handleSelectedIndexChange = (idx: number) => {
        setInnerSelectedIndex(idx);
        onSelectChange?.(idx);
    };

    const handleValuesChange = (val: number | number[]) => {
        let newValue = [...currentValues] as any;
        // 级联情况下 selectedIndex 之后的选项值重置
        // @en Option values are reset after selectedIndex in case of cascade
        if (isCascadeArray(options)) {
            newValue = newValue.slice(0, selectedIndex);
        }
        newValue[selectedIndex] = val;
        newValue = getFormattedOptions(options, newValue).formattedValue;
        setInnerValues(newValue);
        onValuesChange?.(newValue);
    };

    /**
     * 处理选择框的点击事件
     * @en Handle click event of dropdown box
     */
    const handleSelectClick = idx => {
        if (disabled[idx]) return;
        if (Number(idx) === selectedIndex) {
            handleShowDropdownChange(!dropdownShown, idx);
        } else {
            handleSelectedIndexChange(idx);
            if (!dropdownShown) handleShowDropdownChange(true, idx);
        }
    };

    /**
     * 判断是否为当前实例下的选择框
     * @en Determine whether it is the dropdown box under the current instance
     */
    const isCurrentSelectEl = (target: HTMLElement) => {
        const { isStopTouchEl } = extraForDropdown || {};
        return (
            (isRefDom(target, selectWrapper) && isClassNameDom(target, 'select-item')) ||
            isStopTouchEl?.(target) ||
            false
        );
    };

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    useEffect(() => {
        setDefaultTop(getContainer()?.getBoundingClientRect().bottom || 0);
    }, [getContainer, dropdownShown]);

    const onCancel = props.onCancel || (() => handleShowDropdownChange(false));
    const dropdownCommonProps = {
        showDropdown: dropdownShown,
        top: extraForDropdown?.top || defaultTop,
        onCancel,
        ...(extraForDropdown || {}),
        isStopTouchEl: isCurrentSelectEl,
    };

    return (
        <div
            ref={domRef}
            className={cls(
                `${prefixCls}-dropdown-menu all-border-box ${dropdownShown ? 'show' : ''}`,
                className,
            )}
            style={style}
        >
            <div className={cls(`${prefixCls}-select`)} ref={selectWrapper}>
                {selectedOptions.map((op, index) => {
                    const tip = selectTips[index] || '';
                    return (
                        <div
                            className={cls(`${prefixCls}-select-item`, {
                                'is-disabled': disabled[index],
                                'is-selected': dropdownShown && selectedIndex === index,
                            })}
                            key={index}
                            data-idx={index}
                            onClick={() => handleSelectClick(index)}
                        >
                            {tip.length > 0 && (
                                <span className={cls(`${prefixCls}-select-item-tip`)}>{tip}</span>
                            )}
                            <div className={cls(`${prefixCls}-select-item-label`)}>
                                {renderSelectLabel ? (
                                    renderSelectLabel(op, index)
                                ) : (
                                    <div className={cls(`${prefixCls}-select-item-label-text`)}>
                                        {op.label}
                                    </div>
                                )}
                                {icon === void 0 ? (
                                    <IconTriDown
                                        className={cls(`${prefixCls}-select-item-icon`, {
                                            'is-show': dropdownShown && selectedIndex === index,
                                        })}
                                    />
                                ) : (
                                    icon
                                )}
                            </div>
                        </div>
                    );
                })}
                {props.multiple === true ? (
                    <Dropdown
                        multiple
                        options={formattedOptions[selectedIndex] || []}
                        selectedValue={(currentValues[selectedIndex] as number[]) || []}
                        onOptionClick={(selected, val, op) => {
                            props.onOptionClick?.(selected, val, op, selectedIndex);
                        }}
                        onOptionChange={(val, op) => {
                            props.onOptionChange?.(val, op, selectedIndex);
                            handleValuesChange(val);
                        }}
                        {...dropdownCommonProps}
                    >
                        {children}
                    </Dropdown>
                ) : (
                    <Dropdown
                        multiple={props.multiple}
                        options={formattedOptions[selectedIndex] || []}
                        selectedValue={(currentValues[selectedIndex] as number) || 0}
                        onOptionClick={(val, op) => {
                            props.onOptionClick?.(val, op, selectedIndex);
                            if (chooseAndClose) {
                                handleShowDropdownChange(false, selectedIndex);
                            }
                        }}
                        onOptionChange={(val, op) => {
                            props.onOptionChange?.(val, op, selectedIndex);
                            handleValuesChange(val);
                        }}
                        {...dropdownCommonProps}
                    >
                        {children}
                    </Dropdown>
                )}
            </div>
        </div>
    );
});

export default DropdownMenu;
