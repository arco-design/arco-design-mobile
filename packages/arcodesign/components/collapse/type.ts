import { ReactNode, CSSProperties } from 'react';

export interface CollapseCommonProps {
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
     * 可选受控，展开折叠面板时触发
     * @en Optional controlled, triggered when the collapse panel is expanded
     * */
    onCollapse?: (value: string) => void;
    /**
     * 动画时间
     * @en Animation duration
     * */
    animationTimeout?: number;
    /**
     * 动画函数
     * @en Animation function
     */
    animationFunction?: string;
}
export interface CollapseProps extends CollapseCommonProps {
    /**
     * 标题
     * @en Title
     * */
    header?: ReactNode;
    /**
     * 折叠面板的唯一标识
     * @en Unique ID of the accordion panel
     * */
    value: string;
    /**
     * 折叠面板的展开图标
     * @en Expand icon for collapse panels
     * */
    icon?: ReactNode;
    /**
     * 是否隐藏图标
     * @en whether to hide the icon
     * @default false
     */
    hideIcon?: boolean;
    /**
     * 是否不可展开
     * @en Whether it is not expandable
     * @default false
     */
    disabled?: boolean;
    /**
     * 面板内容
     * @en Panel content
     * */
    content: ReactNode;
    /**
     * 是否展开
     * @en whether to expand
     * */
    active?: boolean;
    /**
     * 默认展开情况
     * @en Default expanded status
     * @default false
     */
    defaultActive?: boolean;
}

export interface CollapseRef {
    /**
     * 组件外层dom元素
     * @en The outer DOM of the component
     */
    dom: HTMLDivElement | null;
    /**
     * 折叠面板头部元素
     * @en Collapse panel header DOM
     */
    head: HTMLDivElement | null;
    /**
     * 手动更新组件布局(高度计算)
     * @en Manually update component layout (height calculation)
     * */
    updateLayout: () => void;
}

export interface GroupContextParams {
    isGroup: boolean;
    value?: string[];
    disabled?: boolean;
    onCollapse: (value: string) => void;
}

export type CollapseItemContent = Omit<CollapseProps, 'active' | 'defaultActive'>;

export type CollapseGroupProps<P extends CollapseItemContent = CollapseItemContent> =
    CollapseCommonProps & {
        /**
         * 是否使用手风琴模式
         * @en Whether to use accordion mode
         * @default false
         */
        useAccordion?: boolean;
        /**
         * 可选受控，可传展开的item数组，或者每个item对应的状态
         * @en Optional controlled, expandable item array, or the state corresponding to each item
         * */
        activeItems?: string[];
        /**
         * 默认状态
         * @en Default state
         * */
        defaultActiveItems?: string[];
        /**
         * 一键禁用
         * @en Disable all
         * @default false
         */
        disabled?: boolean;
        /**
         * 折叠面板数组
         * @en array of collapse panels
         * */
        items?: P[];
        /**
         * 子元素，优先级高于items
         * @en Children elements, which have higher priority than items
         * */
        children?: ReactNode;
        /**
         * 区分不同 group，有group 嵌套时建议传入
         * @en Distinguish different groups, it is recommended to pass in when groups are nested
         * */
        groupKey?: string;
    };
export interface CollapseGroupRef {
    dom: HTMLDivElement | null;
}
