import React, { ReactNode } from 'react';
import { PickerData, ValueType } from '../type';

export interface MultiPickerProps {
    prefixCls: string;
    data: PickerData[][];
    selectedValue: ValueType[];
    children: any;
    itemHeight: number;
    onValueChange: (value: ValueType[], index: number, label: ReactNode[]) => void;
    onPickerChange?: (value: ValueType[], index: number, label: ReactNode[]) => void;
}

export default function MultiPicker(props: MultiPickerProps) {
    const { prefixCls, onValueChange, onPickerChange, children, itemHeight, selectedValue, data } =
        props;

    function getValueOrLabel(key: string = 'value') {
        if (selectedValue && selectedValue.length && key === 'value') {
            return selectedValue;
        }
        if (data) {
            return data.map((item: PickerData[]) => item && item[0] && item[0][key]);
        }
        if (!children) {
            return [];
        }
        return React.Children.map(children, (child: any) => {
            const childrenArray: any = React.Children.toArray(
                child.children || child.props.children,
            );
            return childrenArray && childrenArray[0] && childrenArray[0].props[key];
        });
    }

    function onChange({
        index,
        value,
        label,
        callback,
    }: {
        index: number;
        value: ValueType;
        label: ReactNode;
        callback?: (value: ValueType[], index: number, label: ReactNode) => void;
    }) {
        const newValue = getValueOrLabel().concat() as ValueType[];
        const newLabel = getValueOrLabel('label').concat() as ReactNode[];
        newValue[index] = value;
        newLabel[index] = label;
        if (callback) {
            callback(newValue, index, newLabel);
        }
    }

    function _onValueChange(value: ValueType, index: number, label: ReactNode) {
        onChange({ index, value, callback: onValueChange, label });
    }

    function _onScrollChange(value: ValueType, index: number, label: ReactNode) {
        onChange({ index, value, callback: onPickerChange, label });
    }

    function renderChild() {
        const value = getValueOrLabel();
        return React.Children.map(children, (col: any, index) =>
            React.cloneElement(col, {
                onScrollChange: (val: ValueType, label: ReactNode) =>
                    _onScrollChange(val, index, label),
                onValueChange: (val: ValueType, label: ReactNode) =>
                    _onValueChange(val, index, label),
                selectedValue: value[index],
            }),
        );
    }

    return (
        <div className={`${prefixCls}-multi`} style={{ lineHeight: `${itemHeight}px` }}>
            {renderChild()}
        </div>
    );
}
