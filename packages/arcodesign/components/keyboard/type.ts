import { CSSProperties, ReactNode } from 'react';
import { PopupProps, PopupRef } from '../popup';

export type ColumnData = string | number | ColumnObjData;

export type ColumnObjData =
    | { type: 'keyboard' | 'delete' }
    | { type: 'content'; content: ReactNode; value: string | number };

export interface KeyboardProps extends PopupProps {
    /**
     * 常规键位自定义类名
     * @en Custom classname for normal keys
     */
    normalKeyClass?: string;
    /**
     * 常规键位自定义样式
     * @en Custom style for normal keys
     */
    normalKeyStyle?: CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 键盘展示类型，不同类型有不同布局。number - 纯数字常规键盘，confirm - 带确认按钮的键盘，tool - 带运算符的键盘
     * @en Keyboard display type, different types have different layouts. number - a regular keyboard with pure numbers, confirm - a keyboard with a confirm button, tool - a keyboard with operators
     * @default "number"
     */
    type?: 'number' | 'confirm' | 'tool';
    /**
     * 是否打乱键盘中的数字展示位置
     * @en Whether to scramble number placements in the keyboard
     * @default false
     */
    randomOrder: boolean;
    /**
     * 键盘顶部展示标题内容，样式纯自定义
     * @en The title content displayed on the top of the keyboard, the style is purely customized
     */
    title?: ReactNode;
    /**
     * 自定义渲染数字右侧（第四列）的内容
     * @en Custom rendering of the content to the right of the number (fourth column)
     */
    rightColumns?: ReactNode;
    /**
     * 点击确认后是否自动关闭键盘
     * @en Whether to automatically close the keyboard after clicking confirm button
     * @default false
     */
    confirmClosable?: boolean;
    /**
     * 自定义渲染确认按钮内部内容
     * @en Customize the internal content of the confirm button
     */
    confirmButton?: ReactNode;
    /**
     * 自定义渲染删除按钮内部内容
     * @en Customize the internal content of the delete button
     */
    deleteButton?: ReactNode;
    /**
     * 自定义渲染收起键盘按钮内部内容
     * @en Customize the internal content of the keyboard button
     */
    keyboardButton?: ReactNode;
    /**
     * 收起键盘回调
     * @en Callback for closing the keyboard
     */
    close: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {};
    /**
     * 点击确认按钮回调
     * @en Callback for clicking the confirm button
     */
    onConfirm?: () => {};
    /**
     * 点击删除按钮回调
     * @en Callback for clicking the delete button
     */
    onDelete?: () => {};
    /**
     * 点击常规按钮回调
     * @en Callback for clicking the normal button
     */
    onChange?: (data: string | number) => {};
}

export interface KeyboardRef extends PopupRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    keyboard: HTMLDivElement | null;
}
