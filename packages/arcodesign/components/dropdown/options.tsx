import React, {
    forwardRef,
    Ref,
    useContext,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import IconCheck from '../icon/IconCheck';
import { OptionsItem, DropdownOptionsProps, DropdownOptionsRef, ValueType } from './type';

const Options = forwardRef((props: DropdownOptionsProps, ref: Ref<DropdownOptionsRef | null>) => {
    const { options, useColumn, icon, selectedValue, defaultSelectedValue, multiple } = props;
    const { prefixCls } = useContext(GlobalContext);
    const [innerValue, setInnerValue] = useState<ValueType>(() => {
        const defaultValue = multiple ? [] : 0;
        return defaultSelectedValue !== void 0 ? defaultSelectedValue : defaultValue;
    });
    const value = useMemo<ValueType>(
        () => (selectedValue === void 0 ? innerValue : selectedValue),
        [selectedValue, innerValue],
    );
    const colCount = useColumn === true ? 4 : Number(useColumn) || 0;
    const fakeOpts = new Array(
        colCount && options.length % colCount ? colCount - (options.length % colCount) : 0,
    ).fill('');
    const minWidthStyle = useColumn ? { minWidth: `${(1 / (colCount + 1)) * 100}%` } : {};
    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    /**
     * 当选项改变时触发的回调函数
     * @en callback when options change
     * */
    function handleOptionChange(e, op: OptionsItem) {
        if (op.disabled) return;
        if (props.multiple === true) {
            if (!Array.isArray(value)) {
                return;
            }
            const index = value.indexOf(op.value);
            const checked = index >= 0;
            props.onOptionClick?.(checked, op.value, op);
            const newValue = [...value];
            checked ? newValue.splice(index, 1) : newValue.push(op.value);
            setInnerValue(newValue);
            props.onOptionChange?.(newValue, op);
        } else {
            const newValue = op.value;
            props.onOptionClick?.(newValue, op);
            setInnerValue(newValue);
            newValue !== value && props.onOptionChange?.(newValue, op);
        }
        e.stopPropagation();
    }

    function checkSelected(op: OptionsItem) {
        return multiple && Array.isArray(value) ? value.includes(op.value) : op.value === value;
    }

    return (
        <div
            ref={domRef}
            className={cls(`${prefixCls}-dropdown-options-wrap`, {
                'use-column': useColumn,
            })}
        >
            {options.map(op => (
                <div
                    className={cls(`${prefixCls}-dropdown-options-item${useColumn ? '-col' : ''}`, {
                        disabled: op.disabled,
                        selected: checkSelected(op),
                    })}
                    key={op.value}
                    onClick={e => handleOptionChange(e, op)}
                    style={minWidthStyle}
                >
                    {op.label}
                    {icon !== void 0 ? (
                        icon
                    ) : (
                        <IconCheck className={`${prefixCls}-dropdown-options-item-icon`} />
                    )}
                </div>
            ))}
            {fakeOpts.map((_, i) => (
                <div
                    className={cls(`${prefixCls}-dropdown-options-item-fake-col`)}
                    key={i}
                    style={minWidthStyle}
                />
            ))}
        </div>
    );
});

export default Options;
