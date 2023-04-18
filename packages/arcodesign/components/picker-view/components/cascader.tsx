import React, { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react';
import { arrayTreeFilter } from '@arco-design/mobile-utils';
import { PickerData, ValueType, PickerCellMovingStatus } from '../type';
import MultiPicker from './multi-picker';
import PickerCell, { PickerCellRef } from './picker-cell';

export interface CascaderProps {
    prefixCls: string;
    cols: number;
    itemStyle?: React.CSSProperties;
    data: PickerData[];
    clickable: boolean;
    disabled: boolean;
    itemHeight: number;
    wrapperHeight: number;
    selectedValue?: ValueType[];
    rows?: number;
    hideEmptyCols?: boolean;
    onValueChange?: (value: ValueType[], index: number, data: PickerData[]) => void;
    touchToStop?: boolean | number;
}
export interface CascaderRef {
    getCellMovingStatus: () => PickerCellMovingStatus[];
    scrollToCurrentIndex: () => void;
}

const Cascader = forwardRef((props: CascaderProps, ref: Ref<CascaderRef>) => {
    const {
        prefixCls,
        itemStyle,
        cols,
        data,
        disabled,
        clickable,
        itemHeight,
        wrapperHeight,
        rows,
        hideEmptyCols,
        onValueChange,
        selectedValue = [],
        touchToStop,
    } = props;
    const pickerCellsRef = useRef<PickerCellRef[]>([]);

    useImperativeHandle(ref, () => ({
        getCellMovingStatus,
        scrollToCurrentIndex,
    }));

    function getCellMovingStatus() {
        return pickerCellsRef.current.map(cell => cell.movingStatus);
    }

    function scrollToCurrentIndex() {
        pickerCellsRef.current.forEach(cell => cell.scrollToCurrentIndex());
    }

    function _onValueChange(value: ValueType[], index: number, newData: PickerData[]) {
        const children: PickerData[] = arrayTreeFilter(
            data,
            (item: PickerData, level: number) => level <= index && item.value === value[level],
        );
        let child = children[index];
        let i;

        for (i = index + 1; i < cols && child && child.children; i++) {
            child = child.children[0];
            value[i] = child.value;
            newData[i] = child;
        }
        value.length = i;
        newData.length = i;
        onValueChange?.(value, index, newData);
    }

    function _formatData() {
        const childrenTree = arrayTreeFilter(
            data,
            (item: PickerData, level: number) => item.value === selectedValue?.[level],
            { fallbackChildIndex: 0 },
        ).map(item => item.children);

        const needPad = cols - childrenTree.length;
        if (needPad > 0) {
            for (let i = 0; i < needPad; i++) {
                childrenTree.push([]);
            }
        }
        childrenTree.length = cols - 1;
        childrenTree.unshift(data);

        return childrenTree as PickerData[][];
    }

    const formatData = useMemo<PickerData[][]>(() => _formatData(), [data, selectedValue]);

    return (
        <MultiPicker
            prefixCls={`${prefixCls}-picker`}
            data={formatData}
            selectedValue={selectedValue}
            itemHeight={itemHeight}
            onValueChange={_onValueChange}
        >
            {formatData.map((item, index) => (
                <PickerCell
                    key={`${index}_picker_cell_cascader`}
                    data={item || []}
                    style={itemStyle}
                    prefixCls={`${prefixCls}-picker`}
                    clickable={clickable}
                    itemHeight={itemHeight}
                    wrapperHeight={wrapperHeight}
                    disabled={disabled}
                    rows={rows}
                    hideEmptyCols={hideEmptyCols}
                    ref={cellRef => cellRef && (pickerCellsRef.current[index] = cellRef)}
                    touchToStop={touchToStop}
                />
            ))}
        </MultiPicker>
    );
});

export default Cascader;
