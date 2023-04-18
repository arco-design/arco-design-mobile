import React from 'react';
import { PickerData, ValueType } from '../picker-view/type';
import { PopupProps } from '../popup';

export type DataType = PickerData[] | PickerData[][] | ValueType[][];

export interface PickerProps
    extends Omit<
        PopupProps,
        | 'visible'
        | 'close'
        | 'children'
        | 'getScrollContainer'
        | 'orientationDirection'
        | 'direction'
        | 'maskClosable'
    > {
    /**
     * 数据源，非级联时data数组的长度决定picker列数，级联时以cols决定 pick列数
     * @en Data source, the length of the data list determines the number of picker columns when not cascading, and is determined by cols when cascading
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
     * @en Whether t be disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * 值, 格式是[value1, value2, value3], 对应数据源的相应级层value，如果不传默认选每一列的第一个值
     * @en Value, the format is [value1, value2, value3], corresponding to the corresponding level value of the data source, if not passed, the first value of each column is selected by default
     */
    value?: ValueType[];
    /**
     * 点击遮罩层或取消、确定按钮的隐藏回调
     * @en Callback for clicking on mask layer or cancel button, OK button
     */
    onHide?: (scene?: string) => void;
    /**
     * 选中后的回调
     * @en Callback after selection
     */
    onChange?: (selectedValue: ValueType[]) => void;
    /**
     * 每列数据选择变化后的回调函数
     * @en The callback after each column data selection changes
     */
    onPickerChange?: (value: ValueType[], index: number, data: PickerData[]) => void;
    /**
     * 每列样式
     * @en Stylesheet per column
     */
    itemStyle?: React.CSSProperties;
    /**
     * 是否展示选择器
     * @en whether to show the picker
     * @default false
     */
    visible?: boolean;
    /**
     * 弹窗确认已选值的文案
     * @en Text of confirmed selected value of the popup
     * @default "确定"
     * @default_en "OK"
     */
    okText?: string;
    /**
     * 弹窗取消的文案
     * @en Popup canceled text
     * @default "取消"
     * @default_en "Cancel"
     */
    dismissText?: string;
    /**
     * 点击选中时执行的回调
     * @en Callback when clicking on Ok
     */
    onOk?: (value: ValueType[]) => void;
    /**
     * 点击取消时执行的回调
     * @en Callback when clicking to cancel
     */
    onDismiss?: () => void;
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
     * 选择器标题
     * @en Picker title
     * @default ""
     */
    title?: string;
    /**
     * 点击蒙层是否关闭菜单
     * @en Whether to click the mask to close the menu
     * @default false
     */
    maskClosable?: boolean;
    /**
     * 是否通过长按停止滑动，传入数字 x 表示触摸超过 x 毫秒算长按，传 true 表示 x=100，长按事件与 click 事件互斥
     * @en Whether to stop sliding by long-pressing, inputing in the number x means that the touch exceeds x milliseconds to count as long-pressing, inputing true means that x=100, the long-press event and the click event are mutually exclusive
     * @default false
     */
    touchToStop?: boolean | number;
    /**
     * 是否禁用滚动容器手势判断，禁用后交给业务方自己判断
     * @en Whether to disable the scrolling container gesture judgment, leave it to users to judge
     * @default true
     */
    gestureOutOfControl?: boolean;
}
