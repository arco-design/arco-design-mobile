import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from 'react';
import { componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import MultiPicker from '../picker-view/components/multi-picker';
import PickerCell, { PickerCellRef } from '../picker-view/components/picker-cell';
import Cascader, { CascaderRef } from '../picker-view/components/cascader';
import { PickerViewProps, ValueType, PickerData, PickerCellMovingStatus } from './type';
import { useLatestRef, useMountedState } from '../_helpers';

export * from './type';
export { MultiPicker, PickerCell, Cascader };

export interface PickerViewRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 每一列的滑动状态
     * @en Sliding state of each column
     */
    getCellMovingStatus: () => PickerCellMovingStatus[];
    /**
     * 获取所有列的值
     * @en Get all column values
     */
    getAllColumnValues: () => ValueType[];
    /**
     * 获取第 n 列的值
     * @en Get the value of the nth column
     */
    getColumnValue: (index: number) => ValueType | undefined;
    /**
     * 手动更新元素布局
     * @en Manually update the element layout
     */
    updateLayout: () => void;
    /**
     * 重置选择器的值为传入的`value`值
     * @en Reset the selector's value to the input value `value`
     */
    resetValue: () => void;
    /**
     * 直接跳到当前最近一行（调用时将中断滚动）
     * @en Jump directly to the current most recent line (will break scrolling when called)
     */
    scrollToCurrentIndex: () => void;
}

const PickerView = forwardRef((props: PickerViewProps, ref: Ref<PickerViewRef>) => {
    const {
        className = '',
        itemStyle,
        cascade = true,
        cols = 3,
        rows = 5,
        data,
        disabled = false,
        clickable = true,
        value,
        hideEmptyCols = false,
        onPickerChange,
        touchToStop = false,
    } = props;

    const [itemHeight, setItemHeight] = useState(0);
    const [wrapperHeight, setWrapperHeight] = useState(0);
    const [scrollValue, setScrollValue] = useMountedState(value);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const domRef = useRef<HTMLDivElement | null>(null);
    const barRef = useRef<HTMLDivElement | null>(null);
    const scrollValueRef = useLatestRef(scrollValue);
    const pickerCellsRef = useRef<PickerCellRef[]>([]);
    const cascaderRef = useRef<CascaderRef>(null);

    const innerData = useMemo(() => {
        let newData: PickerData[][];
        const isArray = (
            dt: PickerData[] | PickerData[][] | ValueType[][],
        ): dt is ValueType[][] | PickerData[][] => (dt ? Array.isArray(dt[0]) : false);
        const isStrOrNum = (dt: ValueType[][] | PickerData[][]): dt is ValueType[][] =>
            typeof dt[0][0] === 'string' || typeof dt[0][0] === 'number';

        if (isArray(data)) {
            if (isStrOrNum(data)) {
                newData = data.map(item =>
                    item.map(cell => ({
                        label: cell,
                        value: cell,
                    })),
                );
            } else {
                newData = data;
            }
        } else {
            newData = [data];
        }

        return newData;
    }, [data]);

    const getAllColumnValues = () => scrollValueRef.current || [];

    function getColumnValue(index = 0) {
        return scrollValueRef.current?.[index];
    }

    function getCellMovingStatus() {
        return cascade
            ? cascaderRef.current?.getCellMovingStatus() || []
            : pickerCellsRef.current.map(cell => cell.movingStatus);
    }

    function scrollToCurrentIndex() {
        if (cascade) {
            cascaderRef.current?.scrollToCurrentIndex();
            return;
        }
        pickerCellsRef.current.forEach(cell => cell.scrollToCurrentIndex());
    }

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        getCellMovingStatus,
        getAllColumnValues,
        getColumnValue,
        updateLayout,
        resetValue,
        scrollToCurrentIndex,
    }));

    function _onValueChange(val: ValueType[], index: number, newData: PickerData[]) {
        setScrollValue(val);

        if (onPickerChange) {
            onPickerChange(val, index, newData);
        }
    }

    useEffect(() => {
        setScrollValue(value);
    }, [value]);

    const updateWrapperHeight = useCallback(() => {
        if (wrapperRef && wrapperRef.current) {
            setWrapperHeight(wrapperRef.current.offsetHeight);
        }
    }, [wrapperRef, setWrapperHeight]);

    const updateItemHeight = () => {
        if (barRef.current) {
            setItemHeight(barRef.current.getBoundingClientRect().height);
        }
    };

    useEffect(() => {
        updateLayout();
    }, []);

    function updateLayout() {
        updateWrapperHeight();
        updateItemHeight();
    }

    function resetValue() {
        setScrollValue(value);
    }

    const newItemStyle = {
        height: `${itemHeight}px`,
        ...itemStyle,
    };

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={`${prefixCls}-picker-view all-border-box ${className}`}
                    style={{ height: `${itemHeight * rows}px` }}
                    ref={wrapperRef}
                >
                    {cascade ? (
                        <Cascader
                            prefixCls={prefixCls || ''}
                            cols={cols}
                            itemStyle={newItemStyle}
                            data={data as PickerData[]}
                            selectedValue={scrollValue}
                            onValueChange={_onValueChange}
                            clickable={clickable}
                            itemHeight={itemHeight}
                            wrapperHeight={wrapperHeight}
                            disabled={disabled}
                            rows={rows}
                            hideEmptyCols={hideEmptyCols}
                            ref={cascaderRef}
                            touchToStop={touchToStop}
                        />
                    ) : (
                        <MultiPicker
                            prefixCls={`${prefixCls}-picker`}
                            data={innerData}
                            itemHeight={itemHeight}
                            selectedValue={scrollValue}
                            onValueChange={_onValueChange}
                        >
                            {innerData.map((item, index) => (
                                <PickerCell
                                    key={`${index}_picker_cell_normal`}
                                    data={item}
                                    style={newItemStyle}
                                    prefixCls={`${prefixCls}-picker`}
                                    clickable={clickable}
                                    itemHeight={itemHeight}
                                    wrapperHeight={wrapperHeight}
                                    disabled={disabled}
                                    rows={rows}
                                    hideEmptyCols={hideEmptyCols}
                                    ref={cellRef =>
                                        cellRef && (pickerCellsRef.current[index] = cellRef)
                                    }
                                    touchToStop={touchToStop}
                                />
                            ))}
                        </MultiPicker>
                    )}
                    <div className={`${prefixCls}-picker-selection`}>
                        <div
                            className={`${prefixCls}-picker-selection-mask ${prefixCls}-picker-selection-mask-top`}
                        />
                        <div ref={barRef} className={`${prefixCls}-picker-selection-bar`} />
                        <div
                            className={`${prefixCls}-picker-selection-mask ${prefixCls}-picker-selection-mask-bottom`}
                        />
                    </div>
                </div>
            )}
        </ContextLayout>
    );
});
/**
 * 选择器视图组件，不含弹窗，方便使用方灵活定制选择器。
 * @en The picker view component, not has contain popup, which is convenient for the user to flexibly customize the picker.
 * @type 数据录入
 * @type_en Data Entry
 * @name 选择器视图
 * @name_en PickerView
 * @displayName PickerView
 */
export default componentWrapper(PickerView, 'PickerView');
