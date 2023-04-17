import { useState } from 'react';
import { StepperProps } from '..';

export default function useValue(
    params: Required<Pick<StepperProps, 'defaultValue' | 'min' | 'max' | 'digits'>> &
        Pick<StepperProps, 'formatter' | 'value'>,
) {
    const { defaultValue, formatter, max, min, value, digits } = params;
    const [innerValue, setInnerValue] = useState<number>(defaultValue);

    const updateValue = (updater: number | ((oldValue: number) => number)) => {
        const tempValue = typeof updater === 'function' ? updater(innerValue) : updater;
        if (formatter) {
            new Promise(resolve => {
                resolve(formatter(Number(tempValue)));
            }).then((result: number) => {
                const res = Math.max(min, Math.min(max, result));
                setInnerValue(res);
            });
        } else {
            setInnerValue(tempValue);
        }
    };

    const actualInputValue = value !== undefined ? value : innerValue;

    // 将actualInputValue等于Number.MIN_VALUE的情况视为空值
    // @en If actualInputValue equal Number.MIN_VALUE, actualInputValue equal ''
    const showValue =
        actualInputValue === Number.MIN_VALUE
            ? ''
            : digits > 0
            ? parseFloat(String(actualInputValue)).toFixed(digits)
            : actualInputValue;

    return {
        updateValue,
        actualInputValue,
        showValue,
    };
}
