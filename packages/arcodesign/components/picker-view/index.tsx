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
import { useMountedState } from '../_helpers';

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
    /**
     * 获取选中的 picker-cell data
     * @en Get the selected picker-cell data
     */
    getSelectedPickerCellData: () => ISelectedPickerCellData;
}

export interface ISelectedPickerCellData {
    value: ValueType[];
    index: number;
    data: PickerData[];
}

const isArray = (
    dt: PickerData[] | PickerData[][] | ValueType[][],
): dt is ValueType[][] | PickerData[][] => (dt ? Array.isArray(dt[0]) : false);

const isStrOrNum = (dt: ValueType[][] | PickerData[][]): dt is ValueType[][] =>
    typeof dt[0][0] === 'string' || typeof dt[0][0] === 'number';

const getInitValue = (
    data: PickerData[] | PickerData[][] | ValueType[][],
    value: ValueType[] | undefined,
): ValueType[] => {
    if (value === undefined) {
        let newValue: ValueType[];
        if (isArray(data)) {
            if (isStrOrNum(data)) {
                newValue = data.map((item: ValueType[]) => {
                    return item[0];
                });
            } else {
                newValue = data.map((item: PickerData[]) => {
                    return item[0].value;
                });
            }
        } else {
            newValue = data.map((item: PickerData) => {
                return item.value;
            });
        }
        return newValue;
    }
    return value;
};

const getInitData = (
    data: PickerData[] | PickerData[][] | ValueType[][],
    value: ValueType[] | undefined,
): PickerData[] => {
    const initValue = getInitValue(data, value);
    let newData: PickerData[];
    if (isArray(data)) {
        if (isStrOrNum(data)) {
            newData = initValue.map((item: ValueType) => {
                return {
                    label: item,
                    value: item,
                };
            });
        } else {
            newData = initValue.map((item: ValueType, index: number) => {
                let newItem = data[index][0];
                data[index].forEach((dataItem: PickerData) => {
                    if (dataItem.value === item) {
                        newItem = dataItem;
                    }
                });
                return newItem;
            });
        }
    } else {
        newData = initValue.map((item: ValueType) => {
            let newItem = data[0];
            data.forEach((dataItem: PickerData) => {
                if (dataItem.value === item) {
                    newItem = dataItem;
                }
            });
            return newItem;
        });
    }
    return newData;
};

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
    const pickerCellsRef = useRef<PickerCellRef[]>([]);
    const cascaderRef = useRef<CascaderRef>(null);

    // itemStyle height 同时对 selection-bar 生效，这里不单独抛出 selection-bar 的高度设置属性
    // @en The height of itemStyle applies to the selection-bar as well, without separately exposing the height setting property for the selection-bar.
    const selectionBarHeight = useMemo(
        () =>
            itemStyle?.height
                ? {
                      height: itemStyle.height,
                  }
                : {},
        [itemStyle],
    );

    const innerData = useMemo(() => {
        let newData: PickerData[][];
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

    const selectedPickerCellDataRef = useRef<ISelectedPickerCellData>({
        value: getInitValue(data, value),
        index: 0,
        data: getInitData(data, value),
    });

    const getAllColumnValues = () => {
        const curValues = cascade
            ? cascaderRef.current?.getAllCellsValue() || []
            : pickerCellsRef.current.map(cell => cell.getCurrentCellValue());
        // 移除级联带来的空列值，理论上非首尾列不会有空值
        // @en Remove empty values from cascader
        return curValues.filter(v => v !== undefined);
    };

    function getColumnValue(index = 0) {
        return getAllColumnValues()[index];
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
        getSelectedPickerCellData: () => selectedPickerCellDataRef.current,
    }));

    function _onValueChange(val: ValueType[], index: number, newData: PickerData[]) {
        setScrollValue(val);
        selectedPickerCellDataRef.current = {
            value: val,
            index,
            data: newData,
        };

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
                        <div
                            ref={barRef}
                            className={`${prefixCls}-picker-selection-bar`}
                            style={selectionBarHeight}
                        />
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
