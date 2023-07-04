import React, { useEffect, useState } from 'react';
import { StepperProps } from '../type';

function correctCalculation(leftNumber: number, rightNumber: number, operator: '-' | '+') {
    const magnification = 1e17;
    const left = leftNumber * magnification;
    const right = rightNumber * magnification;
    return operator === '-' ? (left - right) / magnification : (left + right) / magnification;
}

export default function useButtonClick(
    params: Required<
        Pick<
            StepperProps,
            'min' | 'max' | 'step' | 'disabled' | 'digits' | 'digits' | 'equalLimitDisabled'
        >
    > &
        Pick<StepperProps, 'onAddButtonClick' | 'onMinusButtonClick'> & {
            actualInputValue: number;
            updateValue: (updater: number | ((oldValue: number) => number)) => void;
        },
) {
    const {
        actualInputValue,
        min,
        max,
        step,
        disabled,
        equalLimitDisabled,
        updateValue,
        onAddButtonClick,
        onMinusButtonClick,
    } = params;
    const minusDisable = actualInputValue <= min || disabled;
    const [minusButtonDisable, setMinusButtonDisable] = useState(minusDisable);
    const addDisable = actualInputValue >= max || disabled;
    const [addButtonDisable, setAddButtonDisable] = useState(addDisable);

    const handleMinusButtonClick = (e: React.MouseEvent) => {
        if (minusButtonDisable) {
            return;
        }
        updateValue(oldValue => {
            const result = correctCalculation(oldValue, step, '-');
            return result < min ? (equalLimitDisabled ? oldValue : min) : result;
        });
        onMinusButtonClick && onMinusButtonClick(e);
    };

    const handleAddButtonClick = (e: React.MouseEvent) => {
        if (addButtonDisable) {
            return;
        }
        updateValue(oldValue => {
            const result = correctCalculation(Number(oldValue), step, '+');
            return result > max ? (equalLimitDisabled ? oldValue : max) : result;
        });
        onAddButtonClick && onAddButtonClick(e);
    };

    // 当前值改变时，更新按钮状态
    // Changes button status when value changed
    useEffect(() => {
        setMinusButtonDisable(minusDisable);
        setAddButtonDisable(addDisable);
    }, [minusDisable, addDisable]);

    return {
        minusButtonDisable,
        addButtonDisable,
        handleMinusButtonClick,
        handleAddButtonClick,
    };
}
