import React, { ReactNode } from 'react';

export interface EllipsisBaseProps {
    /**
     * 需要缩略的文本内容
     * @en Text content to be omitted
     */
    text: string;
    /**
     * 是否开启缩略
     * @en Whether to enable ellipsis
     * @default true
     */
    ellipsis?: boolean;
    /**
     * 最大显示行数
     * @en Maximum number of displayed lines
     * @default 1
     */
    maxLine?: number;
    /**
     * 是否使用 innerHTML 插入文本（警告：务必确保 text 安全可靠，否则易导致 XSS 漏洞）
     * @en Whether to use innerHTML to insert text (warning: make sure the text is safe and reliable, otherwise it will easily lead to XSS vulnerabilities)
     * @default false
     */
    dangerouslyUseInnerHTML?: boolean;
    /**
     * 自定义缩略符节点，文本缩略时插入文本尾部
     * @en Customize the ellipsis node, insert at the end of the text when the text is omitted
     * @default "..."
     */
    ellipsisNode?: ReactNode;
    /**
     * 自定义收起符节点，不为空且文本展开时插入文本尾部
     * @en Customize the collapse node, when the value is not empty and the text is expanded, the node is  inserted at the end of the text
     */
    collapseNode?: ReactNode;
    /**
     * 缩略节点点击事件
     * @en Ellipsis node click event
     */
    onEllipsisNodeClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    /**
     * 收起节点点击事件
     * @en Collapse node click event
     */
    onCollapseNodeClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export interface EllipsisRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 控制容器重新编排
     * @en Control container to reflow
     */
    reflow: (() => void) | undefined;
}

export interface EllipsisProps extends EllipsisBaseProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 最大显示高度，单位 px，优先级高于 maxLine
     * @en Maximum display height(unit: px), priority higher than maxLine
     */
    maxHeight?: number;
    /**
     * 文本结尾处（缩略符之前）需要过滤掉的字符
     * @en Characters to filter out at the end of the text (before the ellipsis)
     * @default []
     */
    endExcludes?: string[];
    /**
     * 容器大小变化时是否自适应，使用原生缩略时默认为 true
     * @en  Whether to adapt when the container size changes, the default is true when using native ellipsis
     * @default false
     */
    reflowOnResize?: boolean;
    /**
     * 文本缩略时，缩略符节点是否浮在文本右下角（默认加渐变色背景）
     * @en Whether the abbreviation node is floating in the lower right corner of the text (with a gradient background by default)
     * @default false
     */
    floatEllipsisNode?: boolean;
    /**
     * 文本缩略处理的完成回调
     * @en Callback when text omission processing is complete
     */
    onReflow?: (ellipsis: boolean, text: string) => void;
}

export type EllipsisCommonProps = EllipsisBaseProps & {
    /**
     * className 前缀
     * @en Prefix classname
     */
    prefixCls: string;
};

export type NativeEllipsisProps = EllipsisCommonProps;

export interface JsEllipsisRef {
    dom: HTMLDivElement | null;
    reflow: () => void;
}
export type JsEllipsisProps = EllipsisCommonProps &
    Pick<EllipsisProps, 'maxHeight' | 'endExcludes' | 'reflowOnResize' | 'onReflow'>;
