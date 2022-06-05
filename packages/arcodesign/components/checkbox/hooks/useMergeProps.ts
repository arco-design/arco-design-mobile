import React, { useContext } from 'react';
import { CheckboxProps, GroupContextParams, ValueType } from '../type';

export const useMergeProps = <
    T extends ValueType = ValueType,
    P extends CheckboxProps<T> = CheckboxProps<T>,
>(
    props: P,
    groupContext: React.Context<GroupContextParams<ValueType>>,
) => {
    const { disabled, shape, layout, icons, value, onChange, isGroup } = useContext(groupContext);

    if (!isGroup) return props;

    return {
        disabled,
        shape,
        layout,
        icons,
        ...props,
        // 在Group内checkbox的选中状态由GroupValue决定
        // The checked state of the checkbox in the Group is determined by the GroupValue
        checked: value.indexOf(props.value) > -1,
        onChange: (checked: boolean, val: T, e: React.MouseEvent) => {
            onChange(checked, val, e);
            props.onChange && props.onChange(checked, val, e);
        },
    } as P;
};
