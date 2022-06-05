import React, { ReactNode } from 'react';

export interface CellProps {
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 单元格左侧图标
     * @en Cell left icon
     * */
    icon?: ReactNode;
    /**
     * 标签名
     * @en Label name
     *  */
    label?: ReactNode;
    /**
     * 描述
     * @en Description
     * */
    desc?: ReactNode;
    /**
     * 主体文字，如果有标签名则靠右，否则靠左
     * @en The primary text, if there is a label name, it is to the right, otherwise it is to the left
     *  */
    text?: string;
    /**
     * 主体内容，如果有标签名则靠右，否则靠左
     * @en The primary content, if there is a label name, it is to the right, otherwise it is to the left
     *  */
    children?: ReactNode;
    /**
     * 是否展示右侧箭头
     * @en Whether to show the right arrow
     *  */
    showArrow?: boolean;
    /**
     * 右侧箭头内容
     * @en Right arrow content
     * */
    arrow?: ReactNode;
    /**
     * 单元格前缀内容，在单元格上方
     * @en Cell prefix content, above the cell
     * */
    prepend?: ReactNode;
    /** 单元格后缀内容，在单元格下方
     * @en Cell suffix content, below the cell
     */
    append?: ReactNode;
    /**
     * 是否有外边框
     * @en Whether there is a border
     * @default true
     */
    bordered?: boolean;
    /**
     * 点击单元格事件回调
     * @en Callback for cell click event
     * */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface CellRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

export interface CellGroupProps<T extends CellProps = CellProps> {
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义头部内容
     * @en custom header content
     * */
    header?: ReactNode;
    /**
     * 自定义尾部内容
     * @en custom footer content
     *  */
    footer?: ReactNode;
    /**
     * 是否有外边框
     * @en Whether there is a border
     * @default true
     */
    bordered?: boolean;
    /**
     * 单元格配置，优先级高于children
     * @en Cell setting
     *  */
    options?: T[];
    /**
     * 内部单元格
     * @en inner cell
     *  */
    children?: ReactNode;
    /**
     * 点击单元格组回调
     * @en Callback of clicking the cell group
     *  */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface CellGroupRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}
