import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import {
    GroupContextParams,
    CheckboxGroupProps,
    CheckboxGroupRef,
    ValueType,
    CheckboxProps,
    CheckboxRef,
} from './type';

export const CheckboxGroupContext = React.createContext<GroupContextParams<ValueType>>({
    isGroup: false,
    shape: 'circle',
    layout: 'inline',
    disabled: false,
    value: [],
    onChange: () => {},
});

export function componentGenerator<
    T extends ValueType = ValueType,
    P extends CheckboxProps<T> = CheckboxProps<T>,
    R extends CheckboxRef = CheckboxRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: CheckboxGroupProps<T, P>, ref: Ref<CheckboxGroupRef | null>) => {
        const {
            style = {},
            className = '',
            defaultValue = [],
            disabled = false,
            shape = 'circle',
            options,
            icons,
            onChange,
            value,
            children = null,
            layout = 'inline',
            min = 0,
            max = 0,
        } = props;

        const [groupValue, setGroupValue] = useState(value || defaultValue);
        const domRef = useRef<HTMLDivElement | null>(null);
        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        useEffect(() => {
            value !== void 0 && setGroupValue(value);
        }, [value]);

        /**
         * 切换checkbox状态回调
         * @en callback when toggling checkbox state
         */
        const handleChange = (checked: boolean, val: T) => {
            if (
                (!checked && groupValue.length <= min) ||
                (max && checked && groupValue.length >= max)
            )
                return;
            const newGroupValue = checked
                ? [...groupValue, val]
                : groupValue.filter(item => item !== val);

            onChange && onChange(newGroupValue);
            if (value === void 0) {
                setGroupValue(newGroupValue);
            }
        };

        return (
            <ContextLayout>
                {({ prefixCls }) => (
                    <div
                        ref={domRef}
                        style={style}
                        className={cls(className, `${prefixCls}-checkbox-group`)}
                    >
                        <CheckboxGroupContext.Provider
                            value={{
                                isGroup: true,
                                shape,
                                layout,
                                disabled,
                                icons,
                                value: groupValue,
                                onChange: handleChange,
                            }}
                        >
                            {children}
                            {!children &&
                                options &&
                                options.map(option => <Comp key={option.value} {...option} />)}
                        </CheckboxGroupContext.Provider>
                    </div>
                )}
            </ContextLayout>
        );
    });
}
