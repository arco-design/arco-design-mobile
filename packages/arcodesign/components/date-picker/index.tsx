import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    forwardRef,
    Ref,
    useImperativeHandle,
} from 'react';
import { cls, componentWrapper, formatDateNumber } from '@arco-design/mobile-utils';
import Picker, { PickerRef } from '../picker';
import { PickerData, ValueType } from '../picker-view';
import { ContextLayout } from '../context-provider';
import { convertTsToDateObj, oneOf, judgeObj, convertObjToTs } from './helper';
import { ItemType, IDateObj, DatePickerProps } from './type';

export * from './type';

const allTypes = ['year', 'month', 'date', 'hour', 'minute', 'second'] as ItemType[];

const defaultFormatter = formatDateNumber;

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
        minTs: userSetMinTs = initMinDate,
        maxTs: userSetMaxTs = initMaxDate,
        showFormatter,
        formatter = defaultFormatter,
        valueFilter = () => true,
        columnsProcessor,
        touchToStop,
        useUTC = false,
        renderSeparate,
        renderLinkedContainer,
        ...otherProps
    } = props;

    const isRange = typeof userSetCurrentTs !== 'number';

    const [minTs, setMinTs] = useState(
        typeof userSetMinTs === 'number' ? userSetMinTs : userSetMinTs.startTs,
    );
    const [maxTs, setMaxTs] = useState(
        typeof userSetMaxTs === 'number' ? userSetMaxTs : userSetMaxTs.startTs,
    );

    const [currentTs, setCurrentTs] = useState(
        isRange
            ? Math.min(maxTs, Math.max(minTs, userSetCurrentTs[0]))
            : Math.min(maxTs, Math.max(minTs, userSetCurrentTs as number)),
    );
    const [data, setData] = useState<PickerData[][]>([[]]);
    const [value, setValue] = useState<ValueType[]>([]);
    const [isLeftActive, setIsLeftActive] = useState<Boolean>(true);
    const [isRightActive, setIsRightActive] = useState<Boolean>(false);
    const currentDateObjRef = useRef(_convertTsToDateObj(currentTs));
    const minDateObjRef = useRef(_convertTsToDateObj(minTs));
    const maxDateObjRef = useRef(_convertTsToDateObj(maxTs));
    const keyOptions = useMemo(() => _getKeyOptions(), [mode, typeArr]);
    const leftTimeValue = useMemo(() => _getShowTimeValue(0), [userSetCurrentTs[0]]);
    const rightTimeValue = useMemo(() => _getShowTimeValue(1), [userSetCurrentTs[1]]);

    const pickerRef = useRef<PickerRef | null>(null);

    useEffect(() => {
        if (typeof userSetCurrentTs !== 'number') {
            if (isLeftActive) {
                userSetCurrentTs[0] = currentTs;
                userSetCurrentTs[1] = Math.max(userSetCurrentTs[0], userSetCurrentTs[1]);
            }
            if (isRightActive) {
                userSetCurrentTs[1] = currentTs;
                userSetCurrentTs[0] = Math.min(userSetCurrentTs[0], userSetCurrentTs[1]);
            }
        }
    }, [currentTs]);

    useImperativeHandle(ref, () => ({
        dom: pickerRef.current ? pickerRef.current.dom : null,
    }));

    function _getColumns() {
        const dateObj = _getActualArray();
        let columns = keyOptions.map(opt => dateObj[opt]);
        if (columnsProcessor) {
            columns = columnsProcessor(columns, currentDateObjRef.current);
        }

        return {
            columns,
            dateObj,
        };
    }

    function _getShowTimeValue(index: number) {
        const timeValue = _convertTsToDateObj(userSetCurrentTs[index]);
        const year = timeValue.year;
        const month = timeValue.month;
        const date = timeValue.date;
        const hour = timeValue.hour;
        const minute = timeValue.minute;
        const second = timeValue.second;

        if (showFormatter) {
            return showFormatter
                .replace('YYYY', `${year}`)
                .replace('MM', `${month}`)
                .replace('DD', `${date}`)
                .replace('HH', `${hour < 10 ? `0${hour}` : hour}`)
                .replace('mm', `${minute < 10 ? `0${minute}` : minute}`)
                .replace('ss', `${second < 10 ? `0${second}` : second}`);
        }

        let datePart = '';
        let timePart = '';

        keyOptions.forEach((option: string) => {
            switch (option) {
                case 'year':
                    datePart += `${year}/`;
                    break;
                case 'month':
                    datePart += `${month}/`;
                    break;
                case 'date':
                    datePart += `${date}/`;
                    break;
                case 'hour':
                    timePart += `${hour < 10 ? `0${hour}` : hour}:`;
                    break;
                case 'minute':
                    timePart += `${minute < 10 ? `0${minute}` : minute}:`;
                    break;
                case 'second':
                    timePart += `${second < 10 ? `0${second}` : second}:`;
                    break;
                default:
            }
        });
        return `${datePart ? `${datePart.slice(0, -1)} ` : ''} ${
            timePart ? `${timePart.slice(0, -1)} ` : ''
        }`;
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
    function _getActualArray() {
        const dateObj = {} as Record<ItemType, PickerData[]>;
        // 当前时间对象
        // @en current Date object
        let currentDateObj = { ...currentDateObjRef.current };
        allTypes.forEach(type => {
            // 根据日期类型，计算出默认的日期范围
            // @en According to the date type, calculate the default date range.
            const normalRange = _getNormalRange(type, currentDateObj);
            let range = [] as number[];
            switch (type) {
                case 'year':
                    // 默认使用minTs和maxTs年份区间
                    // @en Default use minTs and maxTs years.
                    range = [minDateObjRef.current.year, maxDateObjRef.current.year];
                    break;
                default: {
                    // 除了年份外，其他日期类型都需要判断上一级日期是否相同
                    // @en In addition to the year, other date types need to check if the upper-level date is the same.
                    const checkKeys = allTypes.slice(0, allTypes.indexOf(type));
                    range = normalRange;
                    if (judgeObj(currentDateObj, minDateObjRef.current, checkKeys)) {
                        range[0] = minDateObjRef.current[type];
                        currentDateObj = {
                            ...currentDateObj,
                            // 取当前日期时间和minTs的最大值
                            // @en Take the maximum value between the current date and time and minTs.
                            [type]: Math.max(minDateObjRef.current[type], currentDateObj[type]),
                        };
                    }

                    if (judgeObj(currentDateObj, maxDateObjRef.current, checkKeys)) {
                        range[range.length - 1] = maxDateObjRef.current[type];
                        currentDateObj = {
                            ...currentDateObj,
                            // 取当前日期时间和maxTs的最小值
                            // @en Take the minimum value between the current date and time and maxTs.
                            [type]: Math.min(maxDateObjRef.current[type], currentDateObj[type]),
                        };
                    }
                }
            }
            dateObj[type] = _convertRangeToArr(type, range);
        });
        return dateObj;
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

        setCurrentTs(_convertObjToTs(nowDateObj, currentTs));

        if (onValueChange) {
            onValueChange(_convertObjToTs(nowDateObj, currentTs), nowDateObj, index);
        }
    }

    function _handlePickerConfirm(values: ValueType[]) {
        let nowDateObj;
        let newTs;
        if (isRange) {
            const leftTimeObj = _convertTsToDateObj(userSetCurrentTs[0]);
            const rightTimeObj = _convertTsToDateObj(userSetCurrentTs[1]);
            nowDateObj = keyOptions.reduce(
                (arr, key) => {
                    arr[0] = leftTimeObj[keyOptions[key]];
                    arr[1] = rightTimeObj[keyOptions[key]];
                    return arr;
                },
                [{} as IDateObj, {} as IDateObj],
            );
            newTs = [
                _convertObjToTs(nowDateObj[0], currentTs),
                _convertObjToTs(nowDateObj[1], currentTs),
            ];
        } else {
            nowDateObj = {} as IDateObj;

            values.forEach((index, keyIndex) => {
                nowDateObj[keyOptions[keyIndex]] = index as number;
            });
            newTs = _convertObjToTs(nowDateObj, currentTs);
        }

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

    function _chooseTimeActive(index: number) {
        setIsLeftActive(index === 0);
        setIsRightActive(index === 1);
        if (index === 0) {
            setMaxTs(typeof userSetMaxTs === 'number' ? userSetMaxTs : userSetMaxTs.startTs);
            setMinTs(
                Math.min(
                    maxTs,
                    typeof userSetMinTs === 'number' ? userSetMinTs : userSetMinTs.startTs,
                ),
            );
            setCurrentTs(Math.min(maxTs, Math.max(minTs, userSetCurrentTs[0])));
        }
        if (index === 1) {
            setMinTs(
                Math.max(
                    userSetCurrentTs[0],
                    typeof userSetMinTs === 'number' ? userSetMinTs : userSetMinTs.endTs,
                ),
            );
            setMaxTs(
                Math.max(
                    minTs,
                    typeof userSetMaxTs === 'number' ? userSetMaxTs : userSetMaxTs.endTs,
                ),
            );
            setCurrentTs(Math.min(maxTs, Math.max(minTs, userSetCurrentTs[1])));
        }
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
            if (isRange) {
                setIsLeftActive(true);
                setIsRightActive(false);
                const nowMinTs =
                    typeof userSetMinTs === 'number' ? userSetMinTs : userSetMinTs.startTs;
                const nowMaxTs =
                    typeof userSetMaxTs === 'number' ? userSetMaxTs : userSetMaxTs.startTs;
                setMinTs(nowMinTs);
                setMaxTs(nowMaxTs);
                setCurrentTs(Math.min(nowMaxTs, Math.max(nowMinTs, userSetCurrentTs[0])));
            }
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
                    renderPickerDataShow={
                        isRange
                            ? () => (
                                  <div className={`${prefixCls}-date-picker-show`}>
                                      <span
                                          className={`${
                                              isLeftActive
                                                  ? `${prefixCls}-date-picker-show-choice`
                                                  : ''
                                          } ${prefixCls}-date-picker-show-part`}
                                          onClick={() => _chooseTimeActive(0)}
                                      >
                                          {leftTimeValue}
                                      </span>
                                      {renderSeparate ? (
                                          renderSeparate()
                                      ) : (
                                          <span
                                              className={`${prefixCls}-date-picker-show-separate`}
                                          >
                                              ~
                                          </span>
                                      )}

                                      <span
                                          className={`${
                                              isRightActive
                                                  ? `${prefixCls}-date-picker-show-choice`
                                                  : ''
                                          } ${prefixCls}-date-picker-show-part`}
                                          onClick={() => _chooseTimeActive(1)}
                                      >
                                          {rightTimeValue}
                                      </span>
                                  </div>
                              )
                            : undefined
                    }
                    renderLinkedContainer={
                        renderLinkedContainer
                            ? () => renderLinkedContainer(currentTs, keyOptions)
                            : undefined
                    }
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
