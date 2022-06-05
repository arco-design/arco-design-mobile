import React from 'react';
import { PickerData, ValueType } from '../type';

export interface MultiPickerProps {
    prefixCls: string;
    data: PickerData[][];
    selectedValue: ValueType[];
    children: any;
    itemHeight: number;
    onValueChange: (value: ValueType[], index: number) => void;
    onPickerChange?: (value: ValueType[], index: number) => void;
}

export default function MultiPicker(props: MultiPickerProps) {
    const { prefixCls, onValueChange, onPickerChange, children, itemHeight, selectedValue, data } =
        props;

    function getValue() {
        if (selectedValue && selectedValue.length) {
            return selectedValue;
        }
        if (data) {
            return data.map((item: PickerData[]) => item && item[0] && item[0].value);
        }
        if (!children) {
            return [];
        }
        return React.Children.map(children, (child: any) => {
            const childrenArray: any = React.Children.toArray(
                child.children || child.props.children,
            );
            return childrenArray && childrenArray[0] && childrenArray[0].props.value;
        });
    }

    function onChange(
        index: number,
        value: ValueType,
        callback?: (value: ValueType[], index: number) => void,
    ) {
        const newValue = getValue().concat() as ValueType[];
        newValue[index] = value;
        if (callback) {
            callback(newValue, index);
        }
    }

    function _onValueChange(value: ValueType, index: number) {
        onChange(index, value, onValueChange);
    }

    function _onScrollChange(value: ValueType, index: number) {
        onChange(index, value, onPickerChange);
    }

    function renderChild() {
        const value = getValue();

        return React.Children.map(children, (col: any, index) =>
            React.cloneElement(col, {
                onScrollChange: (val: ValueType) => _onScrollChange(val, index),
                onValueChange: (val: ValueType) => _onValueChange(val, index),
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
