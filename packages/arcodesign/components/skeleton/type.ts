import { BaseProps, SimpleBaseProps } from '../_helpers';
import { AvatarProps } from '../avatar';

export interface SkeletonProps extends SimpleBaseProps {
    /**
     * 加载动画效果，可选“扫光”、“呼吸”两种效果，不传入表示不展示动画效果
     * @en Animation of loading effect, 'gradient' and 'breath' effects are optional, default is no animation effect if not passed
     */
    animation?: 'gradient' | 'breath';
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
     * 是否显示金刚位占位图（该参数非空时，不展示标题/段落/头像占位符）
     * @en Show Grid placeholder. When it's value is present, the paragraph, avatar or title placeholder will not be displayed
     * @default false
     */
    grid?: boolean | SkeletonGridProps;
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
     * @default '38%'
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
     * @default '58%'
     */
    width?: number | string | Array<number | string>;
}

export interface SkeletonAvatarProps extends SimpleBaseProps {
    /**
     * 头像形状
     * @en Shape of avatar
     * @default 'circle'
     */
    shape?: AvatarProps['shape'];
    /**
     * 头像尺寸
     * @en Size of avatar
     * @default 'smaller'
     */
    size?: AvatarProps['size'];
}

export interface SkeletonGridProps extends SimpleBaseProps {
    /**
     * 金刚位列数
     * @en columns of grid
     * @default 4
     */
    columns?: number;
}

export interface SkeletonNodeProps extends BaseProps {}

export interface SkeletonRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}

export interface SkeletonContextParams {
    /**
     * 是否开启动效
     */
    animation?: SkeletonProps['animation'];
}
