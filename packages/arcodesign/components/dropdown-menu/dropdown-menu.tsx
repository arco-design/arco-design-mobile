import React, {
    useRef,
    useState,
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
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
import { DropdownProps, DropdownRef, OptionsItem, OptionValueType } from '../dropdown';
import IconTriDown from '../icon/IconTriDown';

export function componentGenerator<
    P extends DropdownProps = DropdownProps,
    R extends DropdownRef = DropdownRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: DropdownMenuProps, ref: Ref<DropdownMenuRef>) => {
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
            onValuesChange,
            onSelectChange,
            onDropdownChange,
            getFormattedOptions = defaultFormatFunc,
            getContainer,
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
         * 更新选项数组和选择情况
         * @en Update options list and selection
         */
        const { formattedOptions } = useMemo(() => {
            return getFormattedOptions(options, currentValues as any);
        }, [options, currentValues]);

        const selectedOptions = useMemo(
            () =>
                formattedOptions.map((ops, index) => {
                    if (props.multiple) {
                        const value = (currentValues[index] as OptionValueType[]) || [];
                        const opItems = ops.reduce(
                            (acc, op) => [...acc, ...(value.includes(op.value) ? [op] : [])],
                            [],
                        );
                        return opItems.length ? opItems : [defaultOpItem];
                    }
                    const value = currentValues[index];
                    return ops.find(op => op.value === value) || ops[0];
                }),
            [formattedOptions, currentValues, props.multiple],
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

        const handleValuesChange = (val: OptionValueType | OptionValueType[]) => {
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
            const defaultContainer = selectWrapper.current;
            const container = getContainer ? getContainer() || defaultContainer : defaultContainer;
            setDefaultTop(container?.getBoundingClientRect().bottom || 0);
        }, [getContainer, dropdownShown]);

        const onCancel = props.onCancel || (() => handleShowDropdownChange(false));
        const dropdownCommonProps = {
            showDropdown: dropdownShown,
            top: extraForDropdown?.top || defaultTop,
            onCancel,
            ...(extraForDropdown || {}),
            isStopTouchEl: isCurrentSelectEl,
        };

        const renderSelectedLabel = (op: OptionsItem | OptionsItem[], index: number) => {
            if (props.multiple === true) {
                const multipleOp = (op as OptionsItem[]) || [];
                return props.renderSelectLabel ? (
                    props.renderSelectLabel(multipleOp, index)
                ) : (
                    <div className={cls(`${prefixCls}-select-item-label-text`)}>
                        {multipleOp.map(item => item.label).join(',')}
                    </div>
                );
            }
            const singleOp = (op as OptionsItem) || [];
            return props.renderSelectLabel ? (
                props.renderSelectLabel(singleOp, index)
            ) : (
                <div className={cls(`${prefixCls}-select-item-label-text`)}>{singleOp.label}</div>
            );
        };

        return (
            <div
                ref={domRef}
                className={cls(`${prefixCls}-dropdown-menu all-border-box`, className, {
                    show: dropdownShown,
                })}
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
                                    <span className={cls(`${prefixCls}-select-item-tip`)}>
                                        {tip}
                                    </span>
                                )}
                                <div className={cls(`${prefixCls}-select-item-label`)}>
                                    {renderSelectedLabel(op, index)}
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
                        <Comp
                            {...({
                                multiple: true,
                                options: formattedOptions[selectedIndex] || [],
                                selectedValue:
                                    (currentValues[selectedIndex] as OptionValueType[]) || [],
                                onOptionClick: (selected, val, op) => {
                                    props.onOptionClick?.(selected, val, op, selectedIndex);
                                },
                                onOptionChange: (val, op) => {
                                    props.onOptionChange?.(val, op, selectedIndex);
                                    handleValuesChange(val);
                                },
                                ...dropdownCommonProps,
                                children,
                            } as P)}
                        />
                    ) : (
                        <Comp
                            {...({
                                multiple: props.multiple,
                                options: formattedOptions[selectedIndex] || [],
                                selectedValue:
                                    (currentValues[selectedIndex] as OptionValueType) || 0,
                                onOptionClick: (val, op) => {
                                    props.onOptionClick?.(val, op, selectedIndex);
                                    if (chooseAndClose) {
                                        handleShowDropdownChange(false, selectedIndex);
                                    }
                                },
                                onOptionChange: (val, op) => {
                                    props.onOptionChange?.(val, op, selectedIndex);
                                    handleValuesChange(val);
                                },
                                ...dropdownCommonProps,
                                children,
                            } as P)}
                        />
                    )}
                </div>
            </div>
        );
    });
}
