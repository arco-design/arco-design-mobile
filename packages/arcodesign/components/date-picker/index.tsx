import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    forwardRef,
    Ref,
    useImperativeHandle,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import Picker, { PickerRef } from '../picker';
import { PickerData, ValueType } from '../picker-view';
import { ContextLayout } from '../context-provider';
import { convertTsToDateObj, oneOf, judgeObj, convertObjToTs } from './helper';
import { ItemType, IDateObj, DatePickerProps } from './type';

export * from './type';

const allTypes = ['year', 'month', 'date', 'hour', 'minute', 'second'] as ItemType[];

const defaultFormatter = (value: number) => (value < 10 ? `0${value}` : String(value));

export const YEAR = 12 * 30 * 24 * 60 * 60 * 1000;

const initMinDate = Date.now() - 10 * YEAR;
const initMaxDate = Date.now() + 10 * YEAR;
const initDate = Date.now();

export interface DatePickerRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

const DatePicker = forwardRef((props: DatePickerProps, ref: Ref<DatePickerRef>) => {
    const {
        currentTs: userSetCurrentTs = initDate,
        className = '',
        visible = false,
        onOk,
        onChange,
        onValueChange,
        mode = 'datetime',
        typeArr = [],
        minTs = initMinDate,
        maxTs = initMaxDate,
        formatter = defaultFormatter,
        valueFilter = () => true,
        columnsProcessor,
        touchToStop,
        useUTC = false,
        ...otherProps
    } = props;
    const currentTs = Math.min(maxTs, Math.max(minTs, userSetCurrentTs));
    const [data, setData] = useState<PickerData[][]>([[]]);
    const [value, setValue] = useState<ValueType[]>([]);
    const currentDateObjRef = useRef(_convertTsToDateObj(currentTs));
    const minDateObjRef = useRef(_convertTsToDateObj(minTs));
    const maxDateObjRef = useRef(_convertTsToDateObj(maxTs));
    const keyOptions = useMemo(() => _getKeyOptions(), [mode, typeArr]);
    const pickerRef = useRef<PickerRef | null>(null);

    useImperativeHandle(ref, () => ({
        dom: pickerRef.current ? pickerRef.current.dom : null,
    }));

    function _getColumns() {
        const dateObj = {} as Record<ItemType, PickerData[]>;

        allTypes.forEach(type => {
            dateObj[type] = _getActualArray(type, currentDateObjRef.current);
        });
        let columns = keyOptions.map(opt => dateObj[opt]);
        if (columnsProcessor) {
            columns = columnsProcessor(columns, currentDateObjRef.current);
        }

        return {
            columns,
            dateObj,
        };
    }

    function _getSelectValue(columns: PickerData[][]) {
        const val = keyOptions.map((opt, index) => {
            const curCol = columns[index] || [];
            const selectIndex = curCol.findIndex(
                col => col.value === currentDateObjRef.current[opt],
            );

            return curCol[Math.max(selectIndex, 0)]?.value;
        });

        return val;
    }

    function _initData() {
        const { columns } = _getColumns();
        const val = _getSelectValue(columns);

        setData(() => columns);
        setValue(() => val);
    }

    // 根据当前选中的日期动态改变其他列的options
    // @en Dynamically change the options of other columns based on the currently selected date
    function _getActualArray(type: ItemType, nowDateObj: IDateObj) {
        const normalRange = _getNormalRange(type, nowDateObj);

        let range = [] as number[];

        switch (type) {
            case 'year':
                range = [minDateObjRef.current.year, maxDateObjRef.current.year];
                break;
            default: {
                const checkKeys = allTypes.slice(0, allTypes.indexOf(type));

                range = normalRange;

                if (judgeObj(nowDateObj, minDateObjRef.current, checkKeys)) {
                    range[0] = minDateObjRef.current[type];
                }

                if (judgeObj(nowDateObj, maxDateObjRef.current, checkKeys)) {
                    range[range.length - 1] = maxDateObjRef.current[type];
                }
            }
        }
        return _convertRangeToArr(type, range);
    }

    function _convertRangeToArr(type, range) {
        const [start = 0, end = 0] = range;
        const arr = [] as PickerData[];

        for (let i = start; i <= end; i += 1) {
            if (valueFilter(type, i)) {
                const text = formatter(i, type);

                arr.push({
                    label: text === void 0 ? defaultFormatter(i) : text,
                    value: i,
                });
            }
        }
        return arr;
    }

    function _getNormalRange(type: ItemType, nowDateObj: IDateObj) {
        switch (type) {
            case 'month':
                return [1, 12];
            case 'date':
                if (nowDateObj.month === 2) {
                    // 闰年2月29天
                    // @en February 29th in leap year
                    return nowDateObj.year % 4 === 0 ? [1, 29] : [1, 28];
                }
                return oneOf(nowDateObj.month, [1, 3, 5, 7, 8, 10, 12]) ? [1, 31] : [1, 30];
            case 'hour':
                return [0, 23];
            case 'minute':
            case 'second':
                return [0, 59];
            default:
                return [];
        }
    }

    function _convertObjToTs(obj: IDateObj, defaultTs: number) {
        return convertObjToTs(obj, defaultTs, useUTC);
    }

    function _convertTsToDateObj(ts: number) {
        return convertTsToDateObj(ts, useUTC);
    }

    function _handlePickerChange(values: ValueType[], index: number) {
        const type = keyOptions[index];
        const nowDateObj = {} as IDateObj;
        values.forEach((i, keyIndex) => {
            nowDateObj[keyOptions[keyIndex]] = i as number;
        });

        if (~keyOptions.slice(0, keyOptions.length - 1).indexOf(type)) {
            currentDateObjRef.current = nowDateObj;
            const { columns, dateObj } = _getColumns();

            // 校准选中日期，比如先选中2020-02-29 年份改为2019，则2月没有29日；需要校准
            // @en Calibration selected date, For example, if you first select 2020-02-29 and change the year to 2019, there will be no 29th in February; calibration is required
            keyOptions.forEach(key => {
                if (dateObj[key].findIndex(item => item.value === nowDateObj[key]) < 0) {
                    nowDateObj[key] = dateObj[key][dateObj[key].length - 1].value as number;
                }
            });
            const val = _getSelectValue(columns);

            setData(columns);
            setValue(val);
        }

        if (onValueChange) {
            onValueChange(_convertObjToTs(nowDateObj, currentTs), nowDateObj, index);
        }
    }

    function _handlePickerConfirm(values: ValueType[]) {
        const nowDateObj = {} as IDateObj;

        values.forEach((index, keyIndex) => {
            nowDateObj[keyOptions[keyIndex]] = index as number;
        });
        const newTs = _convertObjToTs(nowDateObj, currentTs);

        if (onOk) {
            onOk(newTs, nowDateObj);
        }

        if (onChange) {
            onChange(newTs, nowDateObj);
        }
    }

    function _getKeyOptions() {
        if (typeArr && typeArr.length) {
            return typeArr;
        }
        let options = [] as ItemType[];

        switch (mode) {
            case 'date':
                options = allTypes.slice(0, 3);
                break;
            case 'time':
                options = allTypes.slice(3);
                break;
            default:
                options = allTypes;
        }
        return options;
    }

    useEffect(() => {
        minDateObjRef.current = _convertTsToDateObj(minTs);
        currentDateObjRef.current = _convertTsToDateObj(currentTs);
        maxDateObjRef.current = _convertTsToDateObj(maxTs);

        _initData();
    }, [currentTs, minTs, maxTs, useUTC]);

    useEffect(() => {
        if (visible) {
            currentDateObjRef.current = _convertTsToDateObj(currentTs);
            _initData();
        }
    }, [visible]);

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <Picker
                    {...otherProps}
                    ref={pickerRef}
                    visible={visible}
                    className={cls(className, `${prefixCls}-date-picker`)}
                    cascade={false}
                    data={data}
                    value={value}
                    onPickerChange={_handlePickerChange}
                    onOk={_handlePickerConfirm}
                    touchToStop={touchToStop}
                />
            )}
        </ContextLayout>
    );
});
/**
 * 日期时间选择器，基于`Picker`组件扩展，支持指定范围，单位可精确到秒。
 * @en Date picker, based on the `Picker` component, supports the specified range, the unit can be accurate to seconds.
 * @type 数据录入
 * @type_en Data Entry
 * @name 日期时间选择器
 * @name_en DatePicker
 * @displayName DatePicker
 */
export default componentWrapper(DatePicker, 'DatePicker');
