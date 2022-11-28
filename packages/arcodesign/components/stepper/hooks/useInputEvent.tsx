import React from 'react';
import { StepperProps } from '../type';
import { useUpdateEffect } from '../../_helpers';

export default function useInputEvent(
    params: Required<Pick<StepperProps, 'defaultValue' | 'min' | 'max' | 'digits' | 'allowEmpty'>> &
        Pick<StepperProps, 'onBlur' | 'onChange' | 'onInput'> & {
            actualInputValue: number;
            updateValue: (updater: number | ((oldValue: number) => number)) => void;
        },
) {
    const {
        defaultValue,
        min,
        max,
        digits,
        actualInputValue,
        allowEmpty,
        updateValue,
        onBlur,
        onChange,
        onInput,
    } = params;

    const handleInput = (e: React.FocusEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        const numberValue = Number(targetValue);
        const pointIndex = targetValue.indexOf('.');

        if (digits > 0 && pointIndex !== -1) {
            const decimalLength = targetValue.slice(pointIndex + 1).length;
            updateValue(decimalLength > digits ? actualInputValue : numberValue);
        } else if (allowEmpty && targetValue === '') {
            updateValue(Number.MIN_VALUE);
        } else {
            updateValue(numberValue);
        }
        onInput && onInput(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;
        const numberValue = Number(targetValue);

        if (allowEmpty && targetValue === '') {
            updateValue(Number.MIN_VALUE);
        } else if (!allowEmpty && targetValue === '') {
            updateValue(defaultValue);
        } else {
            updateValue(Math.max(min, Math.min(max, numberValue)));
        }
        onBlur && onBlur(e);
    };

    useUpdateEffect(() => {
        onChange && onChange(actualInputValue);
    }, [actualInputValue]);

    return {
        handleInput,
        handleBlur,
    };
}
