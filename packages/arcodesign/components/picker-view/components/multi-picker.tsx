import React from 'react';
import { PickerData, ValueType } from '../type';

export interface MultiPickerProps {
    prefixCls: string;
    data: PickerData[][];
    selectedValue?: ValueType[];
    children: any;
    itemHeight: number;
    onValueChange: (value: ValueType[], index: number, data: PickerData[]) => void;
}

export default function MultiPicker(props: MultiPickerProps) {
    const { prefixCls, onValueChange, children, itemHeight, selectedValue, data } = props;

    function getCurrentData() {
        return (data || []).map((item, itemIndex) => {
            const curSelected = selectedValue?.[itemIndex];
            const cur = curSelected ? (item || []).find(i => i.value === curSelected) : undefined;
            return cur || item?.[0];
        });
    }

    function onChange({
        index,
        value,
        changedData,
        callback,
    }: {
        index: number;
        value: ValueType;
        changedData: PickerData;
        callback?: (value: ValueType[], index: number, data: PickerData[]) => void;
    }) {
        const newData = getCurrentData().concat();
        newData[index] = changedData;
        const newValue = newData.map(d => d?.value);
        newValue[index] = value;
        if (callback) {
            callback(newValue, index, newData);
        }
    }

    function _onValueChange(value: ValueType, index: number, changedData: PickerData) {
        onChange({ index, value, callback: onValueChange, changedData });
    }

    function renderChild() {
        const curData = getCurrentData();
        const value = curData.map(d => d?.value);

        return React.Children.map(children, (col: any, index) =>
            React.cloneElement(col, {
                onValueChange: (val: ValueType, changedData: PickerData) =>
                    _onValueChange(val, index, changedData),
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
