import { CSSProperties, ReactNode } from 'react';
import { PopupProps, PopupRef } from '../popup';

export interface KeyboardProps extends PopupProps {
    numberKeyClass?: string;
    numberKeyStyle?: CSSProperties;
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
     * @default 'number'
     */
    type?: 'number' | 'confirm' | 'tool';
    /**
     * @default false
     */
    randomOrder: boolean;
    /**
     *
     */
    title?: ReactNode;
    columns?: ReactNode;
    confirmClosable?: boolean;
    confirmButton?: ReactNode;
    deleteButton?: ReactNode;
    close: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {};
    onConfirm?: () => {};
    onDelete?: () => {};
    onChange?: (data: string) => {};
}

export interface KeyboardRef extends PopupRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    keyboard: HTMLDivElement | null;
}
