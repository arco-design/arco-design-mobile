import React, { CSSProperties, ReactNode } from 'react';

export interface TagProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: CSSProperties;
    /**
     * 样式类型。primary表示基本类型，hollow表示空心类型，solid表示实心类型
     * @en Style type. primary represents the basic type, hollow represents the hollow type, and solid represents the solid type
     * @default "primary"
     */
    type?: 'primary' | 'hollow' | 'solid';
    /**
     * 图标内容
     * @en Icon
     */
    icon?: ReactNode;
    /**
     * 标签内部内容
     * @en Children element of tag
     */
    children?: ReactNode;
    /**
     * 标签尺寸
     * @en Tag size
     * @default "medium"
     */
    size?: 'medium' | 'large' | 'small';
    /**
     * 文字颜色
     * @en Text color
     */
    color?: string;
    /**
     * 背景颜色
     * @en Background color
     */
    bgColor?: string;
    /**
     * 边框颜色
     * @en Border color
     */
    borderColor?: string;
    /**
     * 边框样式
     * @en Border style
     * @default "solid"
     */
    borderStyle?: 'none' | 'dotted' | 'solid' | 'dashed';
    /**
     * 是否是0.5px边框
     * @en Whether it is a 0.5px border
     * @default true
     */
    halfBorder?: boolean;
    /**
     * 是否有关闭按钮
     * @en whether there is a close button
     */
    closeable?: boolean;
    /**
     * 关闭按钮内容
     * @en Close button content
     */
    closeIcon?: ReactNode;
    /**
     * 关闭按钮颜色
     * @en Close button color
     */
    closeColor?: string;
    /**
     * 是否圆角
     * @en Whether it has rounded corners
     */
    filleted?: boolean;
    /**
     * 点击关闭按钮回调
     * @en Callback when clicking the close button
     */
    onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /**
     * 点击标签回调
     * @en Callback when clicking the tag
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface TagRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

export interface TagListProps<T extends TagProps = TagProps> {
    /**
     * 标签列表
     * @en Tag List
     */
    list: T[];
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: CSSProperties;
    /**
     * 样式类型。primary表示基本类型，hollow表示空心类型，solid表示实心类型
     * @en Style type, primary represents the basic type, hollow represents the hollow type, and solid represents the solid type
     */
    type?: 'primary' | 'hollow' | 'solid';
    /**
     * 是否展示添加标签按钮
     * @en Whether to display the add tag button
     * @default true
     */
    showAddButton?: boolean;
    /**
     * 自定义添加标签按钮
     * @en Customize the add tag button
     */
    addArea?: ReactNode;
    /**
     * 标签横向间距
     * @en Horizontal spacing of tags
     */
    horizontalPadding?: string | number;
    /**
     * 标签纵向间距
     * @en Vertical spacing of tags
     */
    verticalPadding?: string | number;
    /**
     * 点击添加标签按钮回调
     * @en Callback when clicking the add tag button
     */
    onAdd?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /**
     * 点击标签关闭按钮回调
     * @en Callback when clicking the close tag button
     */
    onClose?: (index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface TagListRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}
