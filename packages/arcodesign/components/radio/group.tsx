import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { RadioGroupProps, RadioGroupRef, RadioProps, RadioRef, ValueType } from './type';
import { GroupContextParams } from '../checkbox';

export const RadioGroupContext = React.createContext<GroupContextParams<ValueType>>({
    isGroup: false,
    shape: 'circle',
    layout: 'inline',
    disabled: false,
    value: [],
    onChange: () => {},
});

export function componentGenerator<
    T extends ValueType = ValueType,
    P extends RadioProps<T> = RadioProps<T>,
    R extends RadioRef = RadioRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: RadioGroupProps<T, P>, ref: Ref<RadioGroupRef | null>) => {
        const {
            style = {},
            className = '',
            defaultValue,
            disabled = false,
            shape = 'circle',
            options,
            icons,
            onChange = () => {},
            value,
            children = null,
            layout = 'inline',
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
         * 切换Radio状态回调
         * @en Callback when toggling radio state
         */
        const handleChange = (checked: boolean, newValue: T) => {
            if (!checked) return;
            onChange(newValue);
            if (value === void 0) {
                setGroupValue(newValue);
            }
        };

        return (
            <ContextLayout>
                {({ prefixCls }) => (
                    <div
                        ref={domRef}
                        style={style}
                        className={cls(className, `${prefixCls}-radio-group`)}
                    >
                        <RadioGroupContext.Provider
                            value={{
                                isGroup: true,
                                shape,
                                layout,
                                disabled,
                                icons,
                                value: groupValue === void 0 ? [] : [groupValue],
                                onChange: handleChange,
                            }}
                        >
                            {children}
                            {!children &&
                                options &&
                                options.map(option => (
                                    <Comp key={option.value} {...option} isRadio />
                                ))}
                        </RadioGroupContext.Provider>
                    </div>
                )}
            </ContextLayout>
        );
    });
}
