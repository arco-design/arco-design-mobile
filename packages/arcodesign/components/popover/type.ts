import { ReactNode } from 'react';
import { TransitionProps } from '../transition';
import { BaseRef, SimpleBaseProps } from '../_helpers';

export interface PopoverRef extends BaseRef {
    /**
     * 气泡包裹子元素dom
     * @en Popover child element DOM
     */
    child: HTMLDivElement | null;
    /**
     * 气泡组件 ref
     * @en Ref of Popover
     */
    innerPopover: PopoverInnerRef | null;
    /**
     * 气泡元素dom
     * @en Popover element DOM
     */
    innerPopoverDom: HTMLDivElement | null;
    /**
     * 手动更新气泡的位置
     * @en Manually update the position of the bubble
     */
    updatePosition: () => void;
}

export interface EdgeOffset {
    /**
     * 上
     * @en Top
     */
    top?: number;
    /**
     * 右
     * @en Right
     */
    right?: number;
    /**
     * 下
     * @en Bottom
     */
    bottom?: number;
    /**
     * 左
     * @en Left
     */
    left?: number;
}

export type Direction =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';

export type PopoverProps = Partial<DefaultPopoverProps>;

export interface DefaultPopoverProps extends SimpleBaseProps {
    /**
     * 气泡载体，组件会监听其变化以重新计算布局，建议用 useMemo 包裹
     * @en Bubble carrier, the component will listen to its changes to recalculate the layout, it is recommended to wrap it with useMemo
     */
    children?: ReactNode;
    /**
     * 自定义气泡类名
     * @en Custom popover classname
     * @default ''
     */
    innerPopoverClassName?: string;
    /**
     * 是否显示气泡，受控模式
     * @en Whether to show bubbles, controlled mode
     */
    visible?: boolean;
    /**
     * 气泡内容，组件会监听其变化以重新计算布局，建议用 useMemo 包裹
     * @en Popover content, the component will listen to its changes to recalculate the layout, it is recommended to wrap it with useMemo
     * @default null
     */
    content: ReactNode;
    /**
     * 气泡展示的位置
     * @en Where the popover is displayed
     * @default 'topRight'
     */
    direction: Direction;
    /**
     * 自动关闭场景下的停留时长，单位毫秒，为0则表示不自动关闭
     * @en The length of stay in the auto-off scenario, in milliseconds, 0 means no auto-off
     * @default 0
     */
    duration: number;
    /**
     * 动画时长，单位毫秒
     * @en Animation duration, in milliseconds
     * @default 300
     */
    transitionTimeout: number | { appear?: number; enter?: number; exit?: number };
    /**
     * 气泡最小宽度
     * @en Minimum bubble width
     * @default '10px'
     */
    minWidth: string;
    /**
     * 气泡最大宽度
     * @en The maximum width of the popover
     * @default '90vw'
     */
    maxWidth: string;
    /**
     * 气泡过渡动画类名，修改类名需自行实现动画
     * @en Popover transition animation classname, modify the class name to realize the animation by yourself
     * @default 'fade'
     */
    transitionName: string;
    /**
     * 气泡垂直方向上相对于子元素的偏移量，单位为px
     * @en The vertical offset of the popover relative to the child element, in px
     * @default 10
     */
    verticalOffset: number;
    /**
     * 气泡水平方向上相对于子元素的偏移量，单位为px
     * @en The offset of the popover in the horizontal direction relative to the child element, in px
     * @default 8
     */
    horizontalOffset: number;
    /**
     * 气泡边界自适应，开启时会在气泡左右边界留出安全距离，气泡与视窗上下边界小于安全距离时改变气泡的垂直方向，使其在视窗中漏出
     * @en The bubble boundary is self-adaptive. When turned on, it will leave a safe distance between the left and right boundaries of the bubble. When the upper and lower boundaries of the bubble and the window are smaller than the safe distance, the vertical direction of the bubble will be changed to make it leak out of the window.
     * @default true
     */
    useAutoDirection: boolean | { horizontal: boolean; vertical: boolean };
    /**
     * 气泡距离边界的安全距离，单位为px
     * @en The safe distance of the bubble from the border, in px
     * @default 14
     */
    edgeOffset: number | EdgeOffset;
    /**
     * 滚动容器的滚动事件节流粒度，单位ms
     * @en The scroll event throttle granularity of the scroll container, in ms
     * @default 100
     */
    verticalScrollThrottle: number;

    /**
     * 气泡尖角大小，单位为px
     * @en The size of the popover tip, in px
     * @default 9
     */
    arrowWidth: number;
    /**
     * 气泡出现后，是否屏蔽非内部元素的点击事件，点击非内部元素后只做隐藏气泡操作
     * @en After the popover appears, whether to block the click event of the non-internal element, and only do the hidden popover operation after clicking the non-internal element
     * @default false
     */
    preventBodyClick: boolean;
    /**
     * 点击非子元素和气泡元素是否关闭气泡
     * @en Whether to close the popover on click of non-child elements and popover elements
     * @default true
     */
    clickOtherToClose: boolean;
    /**
     * 点击气泡和子元素是否关闭气泡
     * @en Whether to close the popover on click on the popover and child elements
     * @default true
     */
    clickSelfToClose: boolean;
    /**
     * 触碰非子元素和气泡元素是否关闭气泡
     * @en Whether to close the popover by touching non-child elements and popover elements
     * @default false
     */
    touchOtherToClose: boolean;
    /**
     * 触碰气泡和子元素是否关闭气泡
     * @en Whether to close the popover by touching non-child elements and popover elements
     * @default false
     */
    touchSelfToClose: boolean;
    /**
     * 触碰页面是否关闭气泡，是touchOtherToClose和touchSelfToClose的默认值
     * @en Whether to close the bubble by touching the page, it is the default value of touchOtherToClose and touchSelfToClose
     * @default false
     */
    touchToClose: boolean;
    /**
     * 气泡的主题，black主题是黑底白字，white主题是白底黑字
     * @en Popover theme, black theme is white text on black background, white theme is black text on white background
     * @default 'black'
     */
    theme: 'black' | 'white';
    /**
     * 气泡内容是否需要阴影
     * @en Whether the popover content need a shadow
     * @default false
     */
    needShadow: boolean;
    /**
     * 气泡是否有border
     * @en Whether the bubble has a border
     * @default 白色主题默认有边框，黑色主题没有
     * @default_en White theme have borders by default, the black theme do not
     */
    bordered: boolean;
    /**
     * 气泡是否可见的默认值，非受控模式
     * @en The default value of whether the popover is visible, uncontrolled mode
     * @default false
     */
    defaultVisible: boolean;
    /**
     * 是否展示关闭按钮
     * @en Whether to show the close button
     * @default false
     */
    showCloseIcon: boolean;
    /**
     * 文字气泡后置元素，如操作按钮等
     * @en Post elements of text bubbles, such as action buttons, etc.
     * @default null
     */
    textSuffix: ReactNode;
    /**
     * 气泡挂载位置，follow模式挂载在当前子元素下，global模式挂载在body上
     * @en Popover mount location, follow mode is mounted under the current child element, global mode is mounted on the body
     * @default 'follow'
     */
    mode: 'follow' | 'global';
    /**
     * 是否展示蒙层
     * @en Whether to show the mask
     * @default false
     */
    showMask: boolean;
    /**
     * 蒙层动画时长
     * @en Mask animation duration
     * @default { enter: 450, exit: 240 }
     */
    maskTransitionTimeout: TransitionProps['timeout'];

    /**
     * 自定义箭头渲染
     * @en Customize arrow rendering
     */
    renderArrow: (options: {
        arrowWidth?: number;
        arrowLeft: number;
        direction: Direction;
    }) => ReactNode;

    /**
     * 状态发生改变的回调事件
     * @en Callback event for state change
     * @default () => void
     */
    onChange: (visible: boolean) => void;
    /**
     * 点击关闭icon的回调
     * @en Callback when clicking to close the icon
     * @default () => void
     */
    onClickCloseIcon?: () => void;
    /**
     * 点击文字气泡后置元素回调
     * @en Callback after clicking the suffix element of text popover
     * @default () => void
     */
    onClickTextSuffix?: () => void;
    /**
     * 点击蒙层回调
     * @en Callback when clicking the mask
     * @default () => void
     */
    onClickMask?: () => void;
    /**
     * 获取页面垂直方向的滚动容器
     * @en Get the scroll container in the vertical direction of the page
     * @default () => document
     */
    getVerticalScrollContainer?: () => HTMLElement;
}

export interface PopoverPosition {
    left: number | null;
    top: number | null;
    bottom: number | null;
    width: number | null;
    height: number | null;
    arrowLeft: number;
}

export interface PopoverTransformOrigin {
    x: string;
    y: string;
}

export interface PopoverInnerRef {
    /**
     * 组件容器dom
     * @en Component container dom
     */
    dom: HTMLDivElement | null;
    content: HTMLDivElement | null;
}

export interface PopoverInnerProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 气泡展示的位置
     * @en The displayed direction of the popover
     */
    direction: Direction;
    /**
     * 位置
     * @en Position
     */
    position: PopoverPosition;
    /**
     * 缩放动画中心，尖角顶部
     * @en Scale animation origin, sharp corner top
     */
    transformOrigin: PopoverTransformOrigin;
    /**
     * 浮窗内容
     * @en Popover content
     */
    content: ReactNode;
    /**
     * 箭头大小
     * @en Arrow size
     */
    arrowWidth?: number;
    /**
     * 气泡挂载位置，follow模式挂载在当前子元素下，global模式挂载在全局
     * @en
     */
    mode?: 'follow' | 'global';
    /**
     * 是否展示关闭按钮
     * @en Whether to show the close button
     */
    showCloseIcon?: boolean;
    /**
     * 文字气泡后置元素，如操作按钮等
     * @en Post element of text popover, such as action buttons, etc.
     */
    textSuffix?: ReactNode;
    /**
     * 最小宽度
     * @en Minimum width
     */
    minWidth: string;
    /**
     * 最大宽度
     * @en Maximum width
     */
    maxWidth: string;
    /**
     * 是否需要阴影
     * @en Whether to need shadows
     */
    needShadow?: boolean;
    renderArrow?: PopoverProps['renderArrow'];
    /**
     * 点击关闭icon的回调
     * @en Callback when clicking close icon
     */
    onClickCloseIcon?: () => void;
    /**
     * 点击文字气泡后置元素回调
     * @en Callback when clicking the post element of text popover
     */
    onClickTextSuffix?: () => void;
}

export interface PopoverMenuItem {
    /**
     * 菜单项文本
     * @en Menu item text
     */
    text: ReactNode;
    /**
     * 菜单项值
     * @en Menu item value
     * @default text
     */
    value?: string;
    /**
     * 菜单项的icon组件
     * @en The icon component of the menu item
     * @default null
     */
    icon?: ReactNode;
    /**
     * 是否禁用菜单项
     * @en Whether to disable the menu item
     * @default false
     */
    disabled?: boolean;
    [key: string]: any;
}

export interface PopoverMenuProps extends PopoverProps {
    /**
     * 菜单项列表
     * @en List of menu items
     */
    menu: Array<PopoverMenuItem | string>;
    /**
     * 菜单排列顺序，默认为竖向菜单，支持横向菜单和竖向菜单，横向菜单一行最多可放4个菜单
     * @en Menu arrangement order, the default is vertical menu, supports horizontal menu and vertical menu, horizontal menu can put up to 4 menus in a row
     * @default 'vertical'
     */
    menuLayout?: 'vertical' | 'horizontal';
    /**
     * 菜单项是否有点击态
     * @en Whether the menu item is clickable
     * @default false
     */
    useClickStatus?: boolean;
    /**
     * 菜单项点击态持续时长，单位毫秒
     * @en The duration of the menu item click state, in milliseconds
     * @default 300
     */
    clickStatusDuration?: number;
    /**
     * 选择可用菜单项的回调
     * @en Callback for selecting available menu items
     * @default () => {}
     */
    onSelect?: (value: string, item: PopoverMenuItem | string) => void;
    /**
     * 点击所有菜单项回调
     * @en Callback when clicking all menu items
     * @default () => {}
     */
    onClickMenuItem: (value: string, item: PopoverMenuItem | string) => void;
}

/**
 * 用于计算气泡位置的参数信息
 * @en Parameter information for calculating popover position
 */
export interface ComputedConfig {
    popoverWidth: number;
    popoverHeight: number;
    childRect: DOMRect;
}
