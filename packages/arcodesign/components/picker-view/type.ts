import React from 'react';

export type PickerCellMovingStatus = 'normal' | 'moving' | 'scrolling';
export type ValueType = string | number;
export interface PickerData {
    /**
     * 每一列展示的每项文案对应的值
     * @en The value for each item displayed in each column
     */
    value: ValueType;
    /**
     * 每一列展示的文案
     * @en Text displayed in each column
     */
    label: React.ReactNode;
    /**
     * 级联状态下，该列对应的下一列数据
     * @en In the cascade state, the next column of data corresponding to this column
     */
    children?: PickerData[];
}

export interface PickerViewProps {
    /**
     * 数据源，非级联时data数组的长度决定picker列数，级联时以cols决定 pick列数
     * @en Data source, the length of the data list determines the number of picker columns when not cascading, and the number of picker columns is determined by cols when cascading
     */
    data: PickerData[] | PickerData[][] | ValueType[][];
    /**
     * 是否联动
     * @en Whether to cascade
     * @default true
     */
    cascade?: boolean;
    /**
     * 列数(最大为5；cascade=true时才使用)
     * @en Number of columns (maximum 5; only used when cascade=true)
     * @default 3
     */
    cols?: number;
    /**
     * 行数(一列可选项的行数)，必须是奇数，最小为3个
     * @en The number of rows (the number of rows in a column of optional items), must be an odd number, the minimum is 3
     * @default 5
     */
    rows?: number;
    /**
     * 是否不可用
     * @en Disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * 值, 格式是[value1, value2, value3], 对应数据源的相应级层value
     * @en Value, the format is [value1, value2, value3], corresponding to the corresponding level value of the data source
     */
    value?: ValueType[];
    /**
     * 每列数据选择变化后的回调函数
     * @en The callback function after each column data selection changes
     */
    onPickerChange?: (value: ValueType[], index: number, data: PickerData[]) => void;
    /**
     * 每列样式
     * @en Stylesheet per column
     */
    itemStyle?: React.CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 是否可通过点击操作选择内容
     * @en Whether content can be selected by clicking
     * @default true
     */
    clickable?: boolean;
    /**
     * 是否隐藏无数据的空列，常用于级联选择
     * @en Whether to hide empty columns without data, often used for cascading selection
     * @default false
     */
    hideEmptyCols?: boolean;
    /**
     * 是否通过长按停止滑动，传入数字 x 表示触摸超过 x 毫秒算长按，传 true 表示 x=100，长按事件与 click 事件互斥
     * @en Whether to stop sliding by long-pressing, inputing the number x means that the touch exceeds x milliseconds to count as long-pressing, inputing true means that x=100, the long-press event and the click event are mutually exclusive
     * @default false
     */
    touchToStop?: boolean | number;
}
