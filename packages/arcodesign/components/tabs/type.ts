import { ReactNode, ReactNodeArray } from 'react';

export type TabData =
    | string
    | {
          title: ReactNode;
          // 可附带其他数据
          // @en Additional data can be attached
          [x: string]: any;
      };

export interface UnderlineStyle {
    /**
     * 下划线外层样式，控制线的相对位置
     * @en Underline outer style, controls the relative position of the line
     */
    outer?: React.CSSProperties;
    /**
     * 下划线内层样式，控制线本身的宽高及缩放效果
     * @en Underline inner layer style, control the width and height of the line itself and the zoom effect
     */
    inner?: React.CSSProperties;
}

export interface TabsProps {
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
     * TabBar内容数组，除必填项外也可附加其他数据，建议用 useMemo 包裹
     * @en Array of TabBar content, additional data can be appended in addition to the required fields
     */
    tabs: TabData[];
    /**
     * TabPane内容
     * @en TabPane content
     */
    children?: ReactNode;
    /**
     * 当前活动tab index，传入则为受控
     * @en Currently active tab index, controlled if inputting value
     */
    activeTab?: number;
    /**
     * 初始tab index值
     * @en initial tab index value
     * @default 0
     */
    defaultActiveTab?: number;
    /**
     * 是否禁用切换，包括点击TabBar切换和滑动切换
     * @en Whether to disable switching, including clicking TabBar switching and sliding switching
     */
    disabled?: boolean;
    /**
     * TabBar位置
     * @en Tabbar position
     * @default "top"
     */
    tabBarPosition?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * TabBar排列方式，tabBar在top或bottom位置时有效，start为靠左，center为居中，end为靠右
     * @en Tabbar arrangement, tabBar is valid when it is in the top or bottom position, start is left, center is centered, and end is right
     * @default "center"
     */
    tabBarArrange?: 'start' | 'center' | 'end';
    /**
     * 是否TabBar超出屏幕时靠左滚动排列
     * @en Whether to scroll to the left when the TabBar exceeds the screen
     * @default true
     */
    tabBarScroll?: boolean;
    /**
     * TabBar是否顶部固定
     * @en Whether the TabBar is fixed on the top
     */
    tabBarFixed?: boolean;
    /**
     * tabBar额外渲染内容
     * @en TabBar extra render content
     */
    tabBarExtra?: ReactNode;
    /**
     * tabBar滚动时变化的bezier曲线值
     * @en The bezier curve value that changes when the tabBar is scrolled
     * @default [0.34, 0.69, 0.1, 1]
     */
    tabBarScrollBezier?: [number, number, number, number];
    /**
     * tabBar滚动过渡时长，单位ms
     * @en TabBar scrolling transition duration, in ms
     * @default 300
     */
    tabBarScrollDuration?: number;
    /**
     * tabBar滚动时机，`jump`表示在跳转tab时，`after-jump`表示跳转动画执行后，`none`表示切换tab后不自动滚动
     * @en TabBar scrolling timing, `jump` means when the tab is jumped, `after-jump` means after the jump animation is executed, `none` means do not scroll automatically after switching tabs
     * @default "jump"
     */
    tabBarScrollChance?: 'jump' | 'after-jump' | 'none';
    /**
     * tabBar是否有分割线
     * @en Whether the tabBar has a dividing line
     */
    tabBarHasDivider?: boolean;
    /**
     * 在竖向滚动tabPane时，自动重设tabBar滚动位置的时机
     * @en When scrolling the tabPane vertically, the timing of automatically resetting the scroll position of the tabBar
     * @default "touchmove"
     */
    tabBarResetWhenScroll?: 'none' | 'touchmove' | 'touchend';
    /**
     * 页签的样式，line为顺次排布，line-divide为等分间距排布，card为分段器式排布
     * @en The style of the tabs, line is arranged in sequence, line-divide is arranged at equal intervals, and card is arranged by segmenter
     * @default line
     */
    type?: 'line' | 'line-divide' | 'card' | 'tag' | 'tag-divide';
    /**
     * 是否允许滑动
     * @en Whether to allow sliding
     * @default true
     */
    swipeable?: boolean;
    /**
     * TabBar下划线滑动动画切换时间，单位ms
     * @en The time of the TabBar underline sliding animation switching, in ms
     * @default 240
     */
    duration?: number;
    /**
     * 是否为全屏(100%)布局
     * @en Whether the layout is full screen (100%)
     * @default false
     */
    fullScreen?: boolean;
    /**
     * 容器高度自适应，仅在mode=swipe且是垂直布局时生效
     * @en Whether the container height is adaptive, it only takes effect when mode=swipe and vertical layout
     * @default false
     */
    autoHeight?: boolean;
    /**
     * swipe模式下表示手指抬起后到动画结束时间，scroll模式下表示点击tab后滚动过渡时间，单位ms
     * @en In swipe mode, it means the time from when the finger is lifted to the end of the animation. In scroll mode, it means the scroll transition time after clicking the tab, in ms
     * @default 300
     */
    transitionDuration?: number;
    /**
     * 是否使用毛毛虫效果
     * @en Whether to use the caterpillar effect
     * @default false
     */
    useCaterpillar?: boolean;
    /**
     * 使用毛毛虫效果时，执行动画更改的属性，`scale`表示更改 transform: scale 值，`size`表示更改宽高值。一般在避免border-radius被scale拉伸的情况会使用`size`，但需注意其性能不如`scale`
     * @en When using the caterpillar effect, the properties that perform animation changes, `scale` means changing the transform: scale value, `size` means changing the width and height values. Generally, `size` is used to avoid border-radius being stretched by scale, but it should be noted that its performance is not as good as `scale`
     * @default "scale"
     */
    caterpillarProperty?: 'scale' | 'size';
    /**
     * 毛毛虫效果开启时，TabBar下划线最长延展倍数（相对于自身长度）
     * @en When the caterpillar effect is enabled, the longest extension multiple of the TabBar underline (relative to its own length)
     * @default 2
     */
    caterpillarMaxScale?: number;
    /**
     * 滑动切换距离阈值(宽度比例)，范围为[0, 1]，如果该属性和`distanceToChangeTab`属性均设置，则实际计算结果更大的生效
     * @en Sliding switching distance threshold (width ratio), the range is [0, 1]. If this property and the `distanceToChangeTab` property are both set, the larger actual calculation result will take effect
     * @default 0.3
     */
    percentToChangeTab?: number;
    /**
     * 滑动切换距离阈值(固定px宽度)，如果该属性和`percentToChangeTab`属性均设置，则实际计算结果更大的生效
     * @en The sliding switching distance threshold (fixed px width), if both this property and the `percentToChangeTab` property are set, the actual calculation result will take effect with a larger one
     * @default 10
     */
    distanceToChangeTab?: number;
    /**
     * 滑动切换速度阈值(手指从按下到抬起之间的滑动速度，单位为px/s)，与滑动切换距离阈值同时设置时，满足其中一个即生效
     * @en The sliding switching speed threshold (the sliding speed of the finger from pressing to lifting, in px/s), when it is set at the same time as the sliding switching distance threshold, it will take effect if one of them is satisfied.
     * @default 200
     */
    speedToChangeTab?: number;
    /**
     * 点击tab切换时禁用动画
     * @en Disable animation when tab switch is clicked
     * @default true
     */
    disableClickTransition?: boolean;
    /**
     * 只加载当前页相邻的n个内容，为0时会隐藏/销毁所有相邻内容，不传则加载所有内容，在mode=swipe时生效
     * @en Only load the n content adjacent to the current page. When it is 0, all adjacent content will be hidden/destroyed. If not input, all content will be loaded. It will take effect when mode=swipe
     */
    lazyloadCount?: number;
    /**
     * 当开启懒加载时，针对不在懒加载范围内的内容设置样式，传入null则销毁内容
     * @en When lazy loading is enabled, set the style for the content that is not within the scope of lazy loading, and pass in null to destroy the content
     * @default null
     */
    hideContentStyle?: React.CSSProperties | null;
    /**
     * 自行渲染不在懒加载范围内的pane，其中参数pane代表第index个tab原本要渲染的内容
     * @en Render the pane that is not within the scope of lazy loading by itself, where the parameter pane represents the content to be rendered by the index-th tab
     */
    renderHideContent?: (index: number, pane: ReactNode) => ReactNode;
    /**
     * 在组件加载完成前是否隐藏TabBar，防止溢出时多余的滚动效果
     * @en Whether to hide the TabBar before the component is loaded to prevent redundant scrolling effects when overflowing
     */
    hideTabBarBeforeMounted?: boolean;
    /**
     * TabBar个数大于等于多少时认为会溢出，用于dom加载完成之前的ssr首屏渲染优化
     * @en When the number of TabBars is greater than or equal to the number of TabBars, it is considered to overflow, which is used for ssr first screen rendering optimization before dom loading is completed
     * @default 5
     */
    overflowThreshold?: number;
    /**
     * 是否展示下划线
     * @en Whether to display underline
     * @default true
     */
    showUnderline?: boolean;
    /**
     * 下划线是否根据 tab cell 长度自适应
     * @en Whether the underline is adaptive according to the length of the tab cell
     * @default false
     */
    underlineAdaptive?: boolean;
    /**
     * 触发onTouchStopped的最小阈值
     * @en Minimum threshold to trigger onTouchStopped
     * @default 0
     */
    stopTouchThreshold?: number;
    /**
     * 距离屏幕边缘多远开始向右滑动时禁用tabs滑动事件
     * @en The distance from the edge of the screen to disable the tabs swipe event when you start swiping right
     * @default 0
     */
    touchSideDisableThreshold?: number;
    /**
     * swipe 模式下，触摸事件是否需要 stopPropagation
     * @en In swipe mode, whether the touch event need stopPropagation
     * @default true
     */
    stopPropagation?: boolean;
    /**
     * swipe 模式下，组件内部的滚动容器，用于豁免滑动事件响应
     * @en In swipe mode, the scroll container inside the component is used to exempt the swipe event response
     */
    getInnerScrollContainer?: () => (HTMLElement | null)[] | HTMLElement | null;
    /**
     * tabs切换模式，swipe为滑动模式，scroll为滚动监听模式
     * @en Tabs switching mode, swipe is sliding mode, scroll is scroll listening mode
     * @default "swipe"
     */
    mode?: 'swipe' | 'scroll';
    /**
     * 滚动模式下的滚动容器，用于监听滚动事件，mode=scroll 时有效
     * @en The scroll container in scroll mode, used to listen to scroll events, valid when mode=scroll
     */
    getScrollContainer?: () => HTMLElement | Window | null;
    /**
     * 滚动模式下的节流粒度，mode=scroll 时有效
     * @en Throttling granularity in scroll mode, valid when mode=scroll
     * @default 300
     */
    scrollThrottle?: number;
    /**
     * 滚动模式下判断tab切换的偏移量，正数为向下偏移，负数为向上偏移，mode=scroll 时有效
     * @en Determine the offset of tab switching in scroll mode, a positive number is a downward offset, a negative number is an upward offset, valid when mode=scroll
     * @default 0
     */
    scrollOffset?: number;
    /**
     * 滚动模式下，在组件初始加载时是否需要自动滚动到当前所选位置，mode=scroll 时有效
     * @en In scroll mode, whether to automatically scroll to the currently selected position when the component is initially loaded, valid when mode=scroll
     * @default 当初始index不为0时会自动滚动，为0时则不会自动滚动
     * @default_en When the initial index is not 0, it will scroll automatically, when it is 0, it will not scroll automatically
     */
    scrollWhenMounted?: boolean;
    /**
     * 当滚动到最底部时，如果最后一个pane尚未到达底部，是否强行选中，mode=scroll 时有效
     * @en When scrolling to the bottom, if the last pane has not reached the bottom, whether to force the selection, valid when mode=scroll
     * @default true
     */
    goLastWhenScrollBottom?: boolean;
    /**
     * 是否监听垂直方向的滚动，否则监听水平方向滚动
     * @en Whether to monitor vertical scrolling, otherwise monitor horizontal scrolling
     * @default true
     */
    scrollVertical?: boolean;
    /**
     * TabBar外层容器自定义类名
     * @en Custom classname of TabBar outer container
     */
    tabBarClass?: string;
    /**
     * TabPane外层容器自定义类名
     * @en Custom classname of TabPane outer container
     */
    tabPaneClass?: string;
    /**
     * TabBar外层容器自定义样式
     * @en Custom style of TabBar outer container
     */
    tabBarStyle?: React.CSSProperties;
    /**
     * TabPane外层容器自定义样式
     * @en Custom style of TabPane outer container
     */
    tabPaneStyle?: React.CSSProperties;
    /**
     * TabPane额外渲染元素，需绝对定位
     * @en Extra rendering elements of TabPane, which shoule be absolute positioning
     */
    tabPaneExtra?: ReactNode;
    /**
     * TabPane和TabBar开启translateZ
     * @en Whether TabPane and TabBar open translateZ
     * @default true
     */
    translateZ?: boolean;
    /**
     * 是否启用滑动节能模式，开启后TabPane外层容器不会随panes数量撑开并提升为合成层，仅滑动当前选中的pane，其他pane在选中前将被隐藏
     * @en Whether to enable the energy-saving sliding mode. After opening, the outer container of the TabPane will not expand with the number of panes and be promoted to a composite layer. Only the currently selected pane will be slid, and other panes will be hidden before being selected.
     * @default false
     */
    swipeEnergySaving?: boolean;
    /**
     * 当滑到第一页或最后一页，还想再滑动时触发
     * @en Triggered when swiping to the first or last page and want to swipe again
     */
    onTouchStopped?: (direction: -1 | 1) => void;
    /**
     * tab变化回调
     * @en Callback when tab changes
     */
    onChange?: (tab: TabData, index: number, from?: string) => void;
    /**
     * tab变化且动画执行完毕后回调
     * @en Callback when the tab changes and the animation is completed
     */
    onAfterChange?: (tab: TabData, index: number, from?: string) => void;
    /**
     * TabBar点击的事件
     * @en Callback when TabBar is clicked
     */
    onTabClick?: (
        tab: TabData,
        index: number,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void;
    /**
     * TabBar超出屏幕状态切换回调
     * @en Calllback when TabBar is out of screen
     */
    onTabBarOverflowChange?: (overflow: boolean) => void;
    /**
     * TabPane touchstart事件
     * @en Touchstart event of TabPane
     */
    onTouchStart?: (e: TouchEvent, index: number) => void | boolean;
    /**
     * TabPane touchmove事件
     * @en Touchmove event of TabPane
     */
    onTouchMove?: (e: TouchEvent, index: number) => void | boolean;
    /**
     * TabPane touchend / touchcancel事件
     * @en Touchend / touchcancel event of TabPane
     */
    onTouchEnd?: (e: TouchEvent, index: number) => void | boolean;
    /**
     * TabBar在溢出滚动时回调
     * @en Callback when TabBar is on overflow scrolling
     */
    onTabBarScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
    /**
     * tabs 左右滑动时回调，用于监听滑动距离以做滑动同步交互
     * @en Callback when tabs slides left and right, used to monitor the sliding distance for sliding synchronization interaction
     */
    onDistanceChange?: (distance: number, wrapWidth: number, activeIndex: number) => void;
    /**
     * mode=scroll 时，触发滚动容器滚动回调
     * @en When mode=scroll, trigger the scroll container scroll callback
     */
    onScroll?: () => void;
    /**
     * 自行渲染TabBar的下划线
     * @en Render the underline of the TabBar
     */
    renderUnderline?: (
        underlineStyle: UnderlineStyle,
        showLine: boolean,
        lineRef: React.MutableRefObject<HTMLElement | null>,
    ) => ReactNode;
    /**
     * 自行渲染TabBar，常用于与Sticky配合使用
     * @en Render the TabBar custom, often used in conjunction with Sticky
     */
    renderTabBar?: (TabBar: ReactNode, TabBarProps: TabCellProps) => ReactNode;
    /**
     * 自行渲染TabBar的每一个item
     * @en Render each item of the TabBar custom
     */
    renderTabBarItem?: (tab: TabData, index: number, extra: { active: boolean }) => ReactNode;
    /**
     * 自行渲染TabBar内部内容，当需要给 .@{prefix}-tab-cell 外层再嵌套一层dom时使用
     * @en Render the inner content of the TabBar custom, used when need to nest another layer of DOM outside the .@{prefix}-tab-cell
     */
    renderTabBarInner?: (Inner: ReactNode) => ReactNode;
    /**
     * tabBar间隙，type=line时有效
     * @en TabBar gutter, valid when type=line
     */
    tabBarGutter?: number | string;
    /**
     * TabBar两侧留白宽度，type=line时有效
     * @en The width of the blank space on both sides of the TabBar, valid when type=line
     */
    tabBarPadding?: number | string | { left?: number | string; right?: number | string };
    /**
     * TabBar下划线长度
     * @en TabBar underline length
     */
    underlineSize?: number | string;
    /**
     * TabBar下划线厚度
     * @en TabBar underline thickness
     */
    underlineThick?: number | string;
    /**
     * TabBar下划线内部样式，作用于 tab-cell-underline-inner
     * @en Tabbar underline inner style, applied to tab-cell-underline-inner
     */
    underlineInnerStyle?: React.CSSProperties;
    /**
     * 当前 TabBar 的触摸事件是否需要 stopPropagation
     * @en Does the touch event of the current TabBar require stopPropagation
     * @default true
     */
    tabBarStopPropagation?: boolean;
}

export interface TabsRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * TabBar 内部子组件 Ref
     * @en Ref of TabBar inner component
     */
    bar: TabCellRef | null;
    /**
     * Tab Pane 内部子组件 Ref
     * @en Ref of TabPane inner component
     */
    pane: TabPaneRef | null;
    /**
     * 当前 TabBar 宽度是否已溢出
     * @en Whether the current TabBar width has overflowed
     */
    barOverflow: boolean;
    /**
     * 手动更新 Tabs 布局
     * @en Manually update the Tabs layout
     */
    updateLayout: () => void;
    /**
     * 非受控模式下手动切换 tab
     * @en Manually switch tabs in uncontrolled mode
     */
    changeIndex: (index: number, rightNow?: boolean) => void;
    /**
     * 滚动到指定 Tab，仅滚动监听模式下可用
     * @en Scroll to the specified Tab, only available in scroll monitor mode
     */
    scrollToIndex: (index: number, rightNow?: boolean) => void;
}

export interface TabCellProps
    extends Pick<
        TabsProps,
        | 'tabs'
        | 'type'
        | 'onTabClick'
        | 'tabBarPosition'
        | 'tabBarArrange'
        | 'tabBarScroll'
        | 'tabBarFixed'
        | 'renderUnderline'
        | 'duration'
        | 'transitionDuration'
        | 'useCaterpillar'
        | 'tabBarExtra'
        | 'onTabBarOverflowChange'
        | 'tabBarGutter'
        | 'tabBarPadding'
        | 'underlineSize'
        | 'underlineThick'
        | 'underlineInnerStyle'
        | 'caterpillarMaxScale'
        | 'caterpillarProperty'
        | 'onTabBarScroll'
        | 'hideTabBarBeforeMounted'
        | 'tabBarScrollBezier'
        | 'tabBarScrollDuration'
        | 'tabBarScrollChance'
        | 'tabBarHasDivider'
        | 'tabBarStyle'
        | 'tabBarClass'
        | 'mode'
        | 'overflowThreshold'
        | 'showUnderline'
        | 'underlineAdaptive'
        | 'disabled'
        | 'renderTabBarItem'
        | 'renderTabBarInner'
        | 'translateZ'
    > {
    /**
     * 类前缀
     * @en prefix classname
     */
    prefixCls?: string;
    /**
     * 当前选中 Tab
     * @en Currently selected Tab
     */
    activeIndex: number;
    /**
     * 当前选中 Tab ref
     * @en Currently selected Tab ref
     */
    activeIndexRef: React.MutableRefObject<number>;
    /**
     * Tab 布局方向，横向 or 竖向
     * @en Tab layout direction, horizontal or vertical
     */
    tabDirection: 'horizontal' | 'vertical';
    /**
     * 修改选中 Tab
     * @en Modify selected Tab
     */
    changeIndex: (newIndex: number, from?: string) => void;
    /**
     * 外层容器宽度
     * @en Wrapper container width
     */
    wrapWidth: number;
    /**
     * 外层容器高度
     * @en Wrapper container height
     */
    wrapHeight: number;
    /**
     * TabBar是否启用过渡效果
     * @en Whether the TabBar enables transition effects
     */
    cellTrans: boolean;
    /**
     * 手指滑动距离
     * @en Finger sliding distance
     */
    distance: number;
    /**
     * 下划线已滑动的距离
     * @en The distance the underline has been swiped
     */
    jumpingDis: number;
    /**
     * 当前 TabBar 的触摸事件是否需要 stopPropagation
     * @en Does the touch event of the current TabBar require stopPropagation
     */
    tabBarStopPropagation: boolean;
}

export interface TabCellRef {
    /**
     * 外层元素 DOM
     * @en Outer element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 当前 TabBar 宽度是否已溢出
     * @en Whether the current TabBar width has overflowed
     */
    hasOverflow: boolean;
    /**
     * 滚动 bar 到指定位置，tabs 上下布局时是以 x 轴滚动，左右布局时以 y 轴滚动
     * @en Scroll the bar to the specified position, the tabs are scrolled on the x-axis when the tabs are laid out up and down, and the y-axis is scrolled when the tabs are laid out left and right
     */
    scrollTo: (position: number, rightNow?: boolean) => void;
    /**
     * 滚动 bar 使当前选中item到屏幕中间
     * @en Scroll the bar to bring the currently selected item to the middle of the screen
     */
    scrollToCenter: (rightNow?: boolean) => void;
    /**
     * 触发毛毛虫动画
     * @en Trigger caterpillar animation
     */
    setCaterpillarAnimate: (ratio?: number) => void;
    /**
     * 重新计算下划线样式
     * @en Recalculate underline style
     */
    resetUnderlineStyle: () => void;
}

export interface TabPaneProps
    extends Pick<
        TabsProps,
        | 'duration'
        | 'transitionDuration'
        | 'lazyloadCount'
        | 'hideContentStyle'
        | 'renderHideContent'
        | 'mode'
        | 'tabPaneClass'
        | 'tabPaneStyle'
        | 'tabPaneExtra'
        | 'getScrollContainer'
        | 'scrollThrottle'
        | 'scrollOffset'
        | 'goLastWhenScrollBottom'
        | 'scrollVertical'
        | 'translateZ'
        | 'fullScreen'
        | 'autoHeight'
        | 'onScroll'
        | 'swipeEnergySaving'
    > {
    prefixCls?: string;
    panes: ReactNodeArray;
    activeIndex: number;
    activeIndexRef: React.MutableRefObject<number>;
    tabDirection: 'horizontal' | 'vertical';
    distance: number;
    wrapWidth: number;
    wrapHeight: number;
    handlePaneTouchEnd: (e) => void;
    paneTrans: boolean;
    swipeable: boolean;
    changeIndex: (newIndex: number, from?: string) => void;
}

export interface TabPaneRef {
    /**
     * 外层元素 DOM
     * @en Outer element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 获取当前 transitionDuration
     * @en Get the current transitionDuration
     */
    getTransition: () => number;
    /**
     * 滚动到指定 Tab，仅滚动监听模式下可用
     * @en Scroll to the specified Tab, only available in scroll monitor mode
     */
    scrollToIndex: (index: number, rightNow?: boolean) => void;
    /**
     * autoHeight=true时，更新当前tabpane高度
     * @en Update the current tabpane height, which takes effect when autoHeight=true
     */
    setCurrentHeight: () => void;
}

export interface OffsetRect {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface TabCellUnderlineProps
    extends Pick<
        TabCellProps,
        | 'useCaterpillar'
        | 'distance'
        | 'tabDirection'
        | 'underlineInnerStyle'
        | 'cellTrans'
        | 'duration'
        | 'activeIndex'
        | 'wrapWidth'
        | 'wrapHeight'
        | 'jumpingDis'
        | 'caterpillarMaxScale'
        | 'caterpillarProperty'
        | 'translateZ'
        | 'underlineSize'
        | 'underlineThick'
        | 'renderUnderline'
        | 'underlineAdaptive'
    > {
    prefix: string;
    showLine: boolean;
    getTabRect: (index: number) => {
        left: number;
        width: number;
    };
    getTabCenterLeft: (index: number) => number;
}

export interface TabCellUnderlineRef {
    setCaterpillarAnimate: (ratio?: number) => void;
    resetUnderlineStyle: () => void;
}
