import { CSSProperties, ReactNode } from 'react';

export interface SwipeActionProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom style
     */
    style?: React.CSSProperties;
    /**
     * 子元素
     * @en Inner Content
     */
    children: ReactNode;
    /**
     * 右侧菜单
     * @en right Menu
     */
    rightActions?: Action[];
    /**
     * 左侧菜单
     * @en left Menu
     */
    leftActions?: Action[];
    /**
     * 点击外部是否自动归位
     * @en Click outside for auto return
     * @default false
     */
    closeOnTouchOutside?: boolean;
    /**
     * 菜单滑出多少距离后自动滑出/关闭的系数 范围 0-1
     * @en How far the menu slides off/off automatically ranges from 0 to 1
     * @default 0.15
     */
    threshold?: number;
    /**
     * 是否禁用
     * @en Whether to disable
     * @default false
     */
    disabled?: boolean;
    /**
     * 动画的执行时间 (单位ms)
     * @en Animation execution time in ms
     * @default 300
     */
    transitionDuration?: number;
    /**
     * 阻尼系数
     * @en Damping coefficient
     * @default 15
     */
    dampRate?: number;
    /**
     * 菜单滑入时的样式类型，layer - 分层堆叠进入，push - 直接依次推入
     * @en The style type when the menu slides in. layer - the menu is stacked in layers; push - the menu is pushed directly in sequence
     * @default "layer"
     */
    openStyleType?: 'layer' | 'push';
    /**
     * 滑出动画结束后触发
     * @en Triggered when the slide out animation ends
     */
    onOpen?: (direction: 'left' | 'right') => void;
    /**
     * 滑入动画结束后触发
     * @en Triggered when the slide in animation ends
     */
    onClose?: (direction: 'left' | 'right') => void;
}

export interface SwipeActionRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 使滑动条归位
     * @en Bring the slider back into position
     */
    close: () => void;
    /**
     * 打开滑动条，默认打开右边
     * @en Open the slider, the right by default
     */
    open: (direction: 'left' | 'right') => void;
}

export interface Action {
    /**
     * 自定义内容
     * @en Custom Content
     */
    text?: ReactNode;
    /**
     * 自定义图标
     * @en Custom Icon
     */
    icon?: ReactNode;
    /**
     * 自定义样式
     * @en Custom Style
     */
    style?: CSSProperties;
    /**
     * 自定义类名
     * @en Custom Style
     */
    className?: string;
    /**
     * 点击事件 返回true可以阻止菜单的关闭
     * @en Clicking the event to return true prevents the menu from closing
     */
    onClick?: () => (void | boolean) | Promise<void | boolean>;
    /**
     * 子元素没有text或者icon的传递children
     * @en Child elements do not pass children with text or icon
     */
    children?: ReactNode;
}
