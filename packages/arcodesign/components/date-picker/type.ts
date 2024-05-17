import { ReactNode } from 'react';
import { PickerProps } from '../picker';
import { PickerData } from '../picker-view';

export type ItemType = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second';

export interface IDateObj {
    /**
     * 年
     * @en year
     * */
    year: number;
    /**
     * 月
     * @en month
     * */
    month: number;
    /**
     * 日
     * @en date
     * */
    date: number;
    /**
     * 时
     * @en hour
     *  */
    hour: number;
    /**
     * 分
     * @en minute
     */
    minute: number;
    /**
     * 秒
     * @en second
     * */
    second: number;
}
// Record<ItemType, ValueType>
export type mode = 'date' | 'time' | 'datetime';

export interface DatePickerProps
    extends Omit<
        PickerProps,
        | 'data'
        | 'cascade'
        | 'cols'
        | 'value'
        | 'onChange'
        | 'onPickerChange'
        | 'onOk'
        | 'renderLinkedContainer'
    > {
    /**
     * 点击选中时执行的回调
     * @en Callback when clicking OK
     */
    onOk?: (timestamp: number | [number, number], obj: IDateObj | [IDateObj, IDateObj]) => void;
    /**
     * 当前选中的时间，timestamp
     * @en The currently selected time, timestamp
     * @default Date.now()
     */
    currentTs?: number | [number, number];
    /**
     * 选中后的回调
     * @en Callback when value is changed
     */
    onChange?: (timestamp: number | [number, number], obj: IDateObj | [IDateObj, IDateObj]) => void;
    /**
     * 每列数据选择变化后的回调函数
     * @en The callback function after each column data selection changes
     */
    onValueChange?: (timestamp: number, obj: IDateObj, index: number) => void;
    /**
     * 可选列类型，date - 年月日，time - 时分秒，datetime - 年月日时分秒
     * @en Optional column type, date means year, month and day, time means hour, minute and second, datetime means year, month, day, hour, minute and second
     * @default "datetime"
     */
    mode?: mode;
    /**
     * 可选列数组
     * @en optional column list
     * @default []
     */
    typeArr?: ItemType[];
    /**
     * 最小可选日期，timestamp
     * @en Minimum selectable date, timestamp
     * @default 当前时间的前十年
     * @default_en 10 years ago from the current time
     */
    minTs?: number | { startTs: number; endTs: number };
    /**
     * 最大可选日期，timestamp
     * @en Maximum selectable date, timestamp
     * @default 当前时间的后十年
     * @default_en Next decade from current time
     */
    maxTs?: number | { startTs: number; endTs: number };
    /**
     * 是否使用 UTC 时间
     * @en Whether to use UTC
     * @default false
     */
    useUTC?: boolean;
    /**
     * 日期时间范围选择展示格式
     * @en Time range picker display format
     */
    showFormatter?: string;
    /**
     * 各可选项展示的格式化方法，参数type为ItemTypes，参数value为当前行的值，返回展示的文字
     * @en The formatting method of each optional item, the parameter type is ItemTypes, the parameter value is the value of the current row, and the displayed text is returned.
     * @default (value: number) => (value < 10 ? \`0${value}\` : String(value))
     */
    formatter?: (value: number, type: ItemType) => string;
    /**
     * 可选择行过滤方法，参数type为ItemType，参数value为当前行的值，返回true表示该行可选择
     * @en Row filtering method, the parameter type is ItemType, the parameter value is the value of the current row, and returns true to indicate that the row can be selected
     * @default () => true
     */
    valueFilter?: (type: ItemType, value: number) => boolean;
    /**
     * 选择器列表项干预，可插入自定义选项
     * @en Selector list item intervention to insert custom options.
     */
    columnsProcessor?: (columns: PickerData[][], currentDateObj: IDateObj) => PickerData[][];
    /**
     * 自定义分隔符
     * @en Defined separator area
     */
    renderSeparator?: () => React.ReactNode;
    /**
     * 将选择器的展现隐藏状态及选中值的展示与某个容器关联，传入后将同时渲染该容器和选择器组件，此时选择器组件的 visible 和 onHide 属性可不传，点击该容器会唤起选择器
     * @en Associate the hidden state of the picker and the display of the selected value with a container. After passing it in, the container and the picker component will be rendered at the same time. At this time, the visible and onHide attributes of the picker component are optional values. Clicking the container will evoke the picker
     */
    renderLinkedContainer?: (
        currentTs: number | [number, number],
        itemTypes: ItemType[],
    ) => ReactNode;
}
