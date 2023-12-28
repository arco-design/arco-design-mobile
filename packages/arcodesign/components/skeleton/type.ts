import { BaseProps, SimpleBaseProps } from '../_helpers';

export interface SkeletonProps extends SimpleBaseProps {
    /**
     * 是否显示标题占位图
     * @en Show title placeholder
     * @default true
     */
    title?: boolean | SkeletonTitleProps;
    /**
     * 是否显示段落占位图
     * @en Show paragraph placeholder
     * @default true
     */
    paragraph?: boolean | SkeletonParagraphProps;
    /**
     * 是否显示头像占位图
     * @en Show Avatar placeholder
     * @default false
     */
    avatar?: boolean | SkeletonAvatarProps;
    /**
     * 是否显示金刚位占位图（如该参数非空时，默认展示四列金刚位，且不展示标题/段落/头像占位符）
     * @en Show Grid placeholder. When it's value is present, the paragraph, avatar or title placeholder will not be displayed, and four columns will be displayed by default
     * @default false
     */
    grid?: boolean | SkeletonGridProps;
    /**
     * 是否展示动画效果
     * @en Show loading effect
     * @default true
     */
    showAnimation?: boolean;
    /**
     * 加载动画效果，可选“扫光”、“呼吸”两种效果
     * @en Animation of loading effect, 'gradient' and 'breath' effects are optional
     * @default "gradient"
     */
    animation?: 'gradient' | 'breath';
    /**
     * 扫光动效高光颜色
     * @en Highlight color of gradient animation
     * @default "rgba(0, 0, 0, 0.04)"
     */
    animationGradientColor?: string;
    /**
     * 占位块背景色
     * @en Background color of skeleton item
     * @default "#F7F8FA"
     */
    backgroundColor?: string;
    /**
     * 子元素
     * @en Children element
     * @default null
     */
    children?: React.ReactNode;
}

export interface SkeletonTitleProps extends SimpleBaseProps {
    /**
     * 标题占位图宽度
     * @en The width of title
     * @default "40%"
     */
    width?: number | string;
}

export interface SkeletonParagraphProps extends SimpleBaseProps {
    /**
     * 段落占位图的行数
     * @en Number of lines for paragraph
     * @default 3
     */
    rows?: number;
    /**
     * 段落占位图宽度，若为数组格式对应每行宽度，否则表示最后一行的宽度
     * @en The width of paragraph. If width is an Array, it corresponds to the width of each line, otherwise it indicates the width of the last line
     * @default "60%"
     */
    width?: number | string | Array<number | string>;
}

export type SkeletonAvatarProps = SimpleBaseProps;

export interface SkeletonGridProps extends SimpleBaseProps {
    /**
     * 金刚位列数
     * @en columns of grid
     * @default 4
     */
    columns?: number;
}

export type SkeletonNodeProps = BaseProps;

export interface SkeletonRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}

export interface SkeletonContextParams {
    backgroundColor?: string;
    showAnimation: boolean;
    animation: SkeletonProps['animation'];
}
