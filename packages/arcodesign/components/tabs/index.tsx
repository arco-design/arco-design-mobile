import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    ReactNodeArray,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';
import { cls, nextTick } from '@arco-design/mobile-utils';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { ContextLayout } from '../context-provider';
import TabCell, { TabCellRef, TabCellProps } from './tab-cell';
import TabPane, { TabPaneRef } from './tab-pane';
import { useRefState, useListenResize, useUpdateEffect, useSwiperInnerScroll } from '../_helpers';

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
     * TabBar内容数组，除必填项外也可附加其他数据
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

/**
 * 用于让用户在不同的视图中进行切换。为优化移动端渲染性能，如有替换DOM、发请求更新数据等操作，请在`onAfterChange`而非`onChange`回调中进行。
 * @en Used to let the user switch between different views. In order to optimize the rendering performance of the mobile terminal, if you need to replace the DOM, send a request to update data, etc., please do it in the `onAfterChange` instead of the `onChange` callback.
 * @type 导航
 * @type_en Navigation
 * @name 选项卡
 * @name_en Tabs
 */
const Tabs = forwardRef((props: TabsProps, ref: Ref<TabsRef>) => {
    const {
        className,
        style,
        tabs = [],
        tabBarPosition = 'top',
        activeTab,
        defaultActiveTab = 0,
        children,
        onChange,
        onAfterChange,
        onTabClick,
        onTabBarOverflowChange,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onTabBarScroll,
        onDistanceChange,
        onScroll,
        type = 'line',
        swipeable = true,
        disabled,
        tabBarArrange = 'center',
        tabBarScroll = true,
        tabBarFixed,
        tabBarExtra,
        tabBarScrollBezier,
        tabBarScrollDuration,
        tabBarScrollChance = 'jump',
        tabBarHasDivider,
        tabBarResetWhenScroll = 'touchmove',
        stopPropagation = true,
        getInnerScrollContainer,
        mode = 'swipe',
        getScrollContainer,
        scrollThrottle = 300,
        scrollOffset = 0,
        scrollWhenMounted,
        goLastWhenScrollBottom = true,
        scrollVertical = true,
        renderUnderline,
        renderTabBar,
        renderTabBarItem,
        renderTabBarInner,
        duration = 240,
        transitionDuration = 300,
        useCaterpillar = false,
        distanceToChangeTab = 10,
        percentToChangeTab = 0.3,
        speedToChangeTab = 200,
        disableClickTransition = true,
        lazyloadCount,
        hideContentStyle = null,
        renderHideContent,
        hideTabBarBeforeMounted,
        overflowThreshold = 5,
        tabBarGutter,
        tabBarPadding,
        underlineSize,
        underlineThick,
        underlineInnerStyle,
        caterpillarMaxScale,
        caterpillarProperty = 'scale',
        showUnderline = true,
        stopTouchThreshold = 0,
        touchSideDisableThreshold = 0,
        onTouchStopped,
        tabBarStyle,
        tabPaneStyle,
        tabBarClass,
        tabPaneClass,
        tabPaneExtra,
        translateZ = true,
        fullScreen,
        autoHeight,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const cellRef = useRef<TabCellRef | null>(null);
    const paneRef = useRef<TabPaneRef | null>(null);
    const [innerIndex, setInnerIndex] = useState(defaultActiveTab);
    const [jumpingDis, setJumpingDis] = useState(0);
    const [wrapWidth, setWrapWidth] = useState(0);
    const [wrapHeight, setWrapHeight] = useState(0);
    const [cellTrans, setCellTrans] = useState(false);
    const [paneTrans, setPaneTrans] = useState(false);
    const [activeIndex, activeIndexRef, setActiveIndex] = useRefState(
        activeTab === void 0 ? innerIndex : activeTab,
    );
    const [distance, distanceRef, setDistance] = useRefState(0);
    const posAdjustingRef = useRef(false);
    const touchStartedRef = useRef(false);
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const touchStartTimeRef = useRef(0);
    const scrollingRef = useRef<boolean | null>(null);
    const touchStoppedRef = useRef(false);
    const changeFromRef = useRef('');
    const touchMoveBarScrollRef = useRef(false);
    const allPanes = getAllPanes();
    const tabDirection =
        ['top', 'bottom'].indexOf(tabBarPosition) !== -1 ? 'vertical' : 'horizontal';
    const canSwipe =
        mode === 'swipe' &&
        !disabled &&
        swipeable &&
        tabDirection === 'vertical' &&
        tabs.length > 1;

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        bar: cellRef.current,
        pane: paneRef.current,
        barOverflow: cellRef.current ? cellRef.current.hasOverflow : false,
        updateLayout,
        changeIndex: (newIndex: number, rightNow?: boolean) =>
            changeIndex(newIndex, 'manual', rightNow),
        scrollToIndex: paneRef.current ? paneRef.current.scrollToIndex : () => {},
    }));

    useListenResize(updateLayout);

    useSwiperInnerScroll(getInnerScrollContainer);

    useEffect(() => {
        if (distanceToChangeTab > 0 && distanceToChangeTab < 1) {
            console.warn(
                `[Tabs Props Warning] The value of the prop \`distanceToChangeTab\` is too small(${distanceToChangeTab}). Do you meant to use the prop \`percentToChangeTab\`?`,
            );
        }
    }, [distanceToChangeTab]);

    useEffect(() => {
        updateLayout();
        if (mode === 'scroll') {
            // 判断初始是否滚动时，如果指定了scrollWhenMounted则看它的值，否则看是否默认选中第一个
            // @en When judging whether to scroll initially, if scrollWhenMounted is specified, see its value, otherwise, see if the first one is selected by default
            const needScroll = scrollWhenMounted === void 0 ? activeIndex !== 0 : scrollWhenMounted;
            if (needScroll) {
                paneRef.current?.scrollToIndex(activeIndex, true);
            }
        }
    }, []);

    useEffect(() => {
        paneRef.current && paneRef.current.setCurrentHeight();
    }, [children, activeIndex, autoHeight]);

    useEffect(() => {
        // 受控时用受控值，否则用内部值
        // @en When controlled, use the controlled value, otherwise use the internal value
        setActiveIndex(activeTab === void 0 ? innerIndex : activeTab);
    }, [activeTab, innerIndex]);

    useUpdateEffect(() => {
        // 利用受控手动更改index时，给cell line加上动画
        // @en Animate the cell line when changeing the index
        setCellTrans(true);
    }, [activeTab]);

    useUpdateEffect(() => {
        onDistanceChange && onDistanceChange(distance, wrapWidth, activeIndex);
    }, [distance, wrapWidth, activeIndex]);

    useUpdateEffect(() => {
        if (changeFromRef.current !== 'scroll' && mode === 'scroll') {
            paneRef.current?.scrollToIndex(activeIndex);
        }
        if (changeFromRef.current === 'click' && useCaterpillar) {
            cellRef.current?.setCaterpillarAnimate();
        }
        const changeFrom = changeFromRef.current;
        changeFromRef.current = '';
        nextTick(() => {
            setTimeout(
                () => {
                    onAfterChange && onAfterChange(tabs[activeIndex], activeIndex, changeFrom);
                },
                paneRef.current ? paneRef.current.getTransition() : 0,
            );
        });
    }, [activeIndex]);

    const handlePaneTouchStart = useCallback(
        (e: TouchEvent) => {
            batchedUpdates(() => {
                if (onTouchStart && onTouchStart(e, activeIndexRef.current)) {
                    return;
                }
                if (posAdjustingRef.current) {
                    return;
                }
                touchStartedRef.current = true;
                setCellTrans(false);
                setPaneTrans(false);
                const evt = e.touches[0];
                touchStartXRef.current = evt.clientX || 0;
                touchStartYRef.current = evt.clientY || 0;
                scrollingRef.current = null;
                posAdjustingRef.current = false;
                touchStartTimeRef.current = new Date().getTime();
                touchStoppedRef.current = false;
            });
        },
        [onTouchStart],
    );

    const handlePaneTouchMove = useCallback(
        (e: TouchEvent) => {
            if (onTouchMove && onTouchMove(e, activeIndexRef.current)) {
                return;
            }
            // 从屏幕边缘开始滑动时，屏蔽tabs滑动事件
            if (touchStartXRef.current < touchSideDisableThreshold) {
                return;
            }
            stopPropagation && e.stopPropagation();
            if (!touchStartedRef.current || posAdjustingRef.current) {
                e.cancelable && e.preventDefault();
                return;
            }
            const evt = e.changedTouches[0];
            const touchMoveX = evt.clientX || 0;
            const touchMoveY = evt.clientY || 0;
            // bugfix: 兼容safari在右滑返回上一页时clientX为负值的情况
            // @en bugfix: bugfix: Compatible with the case in safari where clientX is negative when swiping right back to the previous page
            const posDisX = touchMoveX < 0 ? 0 : touchMoveX - touchStartXRef.current;
            const posDisY = touchMoveY - touchStartYRef.current;
            const absDisX = Math.abs(posDisX);
            const absDisY = Math.abs(posDisY);
            if (scrollingRef.current === null) {
                scrollingRef.current = absDisX < absDisY;
            }
            // 如果是在上下滚动页面则禁用滑动手势
            // @en Disable swipe gestures if scrolling up and down
            if (scrollingRef.current) {
                if (tabBarResetWhenScroll === 'touchmove' && !touchMoveBarScrollRef.current) {
                    cellRef.current && cellRef.current.scrollToCenter();
                    touchMoveBarScrollRef.current = true;
                }
                setDistance(0);
                return;
            }
            if (
                (activeIndexRef.current === 0 && posDisX > 0) ||
                (activeIndexRef.current === tabs.length - 1 && posDisX < 0)
            ) {
                if (!touchStoppedRef.current && absDisX > stopTouchThreshold) {
                    touchStoppedRef.current = true;
                    onTouchStopped && onTouchStopped(posDisX >= 0 ? -1 : 1);
                }
                setDistance(0);
                return;
            }
            e.cancelable && e.preventDefault();
            setDistance(posDisX);
        },
        [
            onTouchMove,
            onTouchStopped,
            stopTouchThreshold,
            tabs.length,
            touchSideDisableThreshold,
            tabBarResetWhenScroll,
            stopPropagation,
        ],
    );

    useEffect(() => {
        if (paneRef.current && paneRef.current.dom && canSwipe) {
            paneRef.current.dom.addEventListener('touchstart', handlePaneTouchStart);
            paneRef.current.dom.addEventListener('touchmove', handlePaneTouchMove);
        }
        return () => {
            if (paneRef.current && paneRef.current.dom && canSwipe) {
                paneRef.current.dom.removeEventListener('touchstart', handlePaneTouchStart);
                paneRef.current.dom.removeEventListener('touchmove', handlePaneTouchMove);
            }
        };
    }, [handlePaneTouchStart, handlePaneTouchMove, canSwipe]);

    function handlePaneTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        if (onTouchEnd && onTouchEnd(e.nativeEvent, activeIndexRef.current)) {
            return;
        }
        stopPropagation && e.stopPropagation();
        touchMoveBarScrollRef.current = false;
        if (scrollingRef.current && tabBarResetWhenScroll === 'touchend') {
            cellRef.current && cellRef.current.scrollToCenter();
        }
        if (!touchStartedRef.current || posAdjustingRef.current || scrollingRef.current) {
            return;
        }
        touchStartedRef.current = false;
        setCellTrans(true);
        setPaneTrans(true);
        const touchEndTime = new Date().getTime();
        const dis = distanceRef.current;
        const speed = (dis / (touchEndTime - touchStartTimeRef.current)) * 1000;
        const maxSlice = wrapWidth * percentToChangeTab;
        const index = activeIndexRef.current;
        const needJump =
            (Math.abs(dis) > maxSlice && Math.abs(dis) > distanceToChangeTab) ||
            Math.abs(speed) > speedToChangeTab;
        let newIndex = index;
        if (dis > 0 && needJump) {
            newIndex = index - 1;
        } else if (dis < 0 && needJump) {
            newIndex = index + 1;
        }
        nextTick(() => {
            jumpTo(newIndex);
        });
    }

    function jumpTo(newIndex: number) {
        posAdjustingRef.current = true;
        if (newIndex !== activeIndexRef.current) {
            setJumpingDis(distanceRef.current);
        }
        changeIndex(newIndex, 'swipe');
        touchStartTimeRef.current = 0;
        setTimeout(() => {
            posAdjustingRef.current = false;
            setJumpingDis(0);
        }, transitionDuration);
    }

    function updateLayout() {
        cellRef.current && cellRef.current.resetUnderlineStyle();
        setWrapWidth(domRef.current ? domRef.current.offsetWidth : 0);
        setWrapHeight(domRef.current ? domRef.current.offsetHeight : 0);
        paneRef.current && paneRef.current.setCurrentHeight();
    }

    function getAllPanes(): ReactNodeArray {
        let panes: ReactNodeArray = children ? [children] : [];
        if (children && Object.prototype.toString.call(children) === '[object Array]') {
            panes = children as ReactNodeArray;
        }
        // panes不可超过tabs.length
        return panes.slice(0, tabs.length);
    }

    function changeIndex(newIndex: number, changeFrom?: string, rightNow?: boolean) {
        if (rightNow || (changeFrom === 'click' && disableClickTransition)) {
            setPaneTrans(false);
        } else {
            setPaneTrans(true);
        }
        changeFromRef.current = changeFrom || '';
        setCellTrans(true);
        setInnerIndex(newIndex);
        setDistance(0);
        if (newIndex !== activeIndexRef.current) {
            onChange && onChange(tabs[newIndex], newIndex, changeFrom);
        }
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => {
                const prefix = `${prefixCls}-tabs`;
                const commonProps = {
                    prefixCls,
                    activeIndex,
                    activeIndexRef,
                    tabDirection: tabDirection as 'horizontal' | 'vertical',
                    changeIndex,
                    duration,
                    transitionDuration,
                    wrapWidth,
                    wrapHeight,
                    distance,
                    mode,
                    translateZ,
                    fullScreen,
                };
                const cellProps = {
                    ref: cellRef,
                    tabs,
                    onTabClick,
                    type,
                    tabBarPosition,
                    tabBarArrange,
                    tabBarScroll,
                    renderUnderline,
                    useCaterpillar,
                    cellTrans,
                    jumpingDis,
                    tabBarExtra,
                    onTabBarOverflowChange,
                    tabBarGutter,
                    tabBarPadding,
                    tabBarFixed,
                    tabBarScrollBezier,
                    tabBarScrollDuration,
                    tabBarScrollChance,
                    tabBarHasDivider,
                    underlineSize,
                    underlineThick,
                    underlineInnerStyle,
                    caterpillarMaxScale,
                    caterpillarProperty,
                    onTabBarScroll,
                    hideTabBarBeforeMounted,
                    overflowThreshold,
                    showUnderline,
                    disabled,
                    renderTabBarItem,
                    renderTabBarInner,
                    tabBarStyle,
                    tabBarClass,
                    ...commonProps,
                };
                const CellComp = <TabCell {...cellProps} />;
                return (
                    <div
                        className={cls(
                            `${prefix} ${prefix}-${tabBarPosition} ${prefix}-${tabDirection} all-border-box`,
                            { 'full-screen': fullScreen },
                            className || '',
                        )}
                        style={style}
                        ref={domRef}
                    >
                        {renderTabBar ? renderTabBar(CellComp, cellProps) : CellComp}
                        <TabPane
                            ref={paneRef}
                            panes={allPanes}
                            handlePaneTouchEnd={handlePaneTouchEnd}
                            paneTrans={paneTrans}
                            swipeable={canSwipe}
                            lazyloadCount={lazyloadCount}
                            hideContentStyle={hideContentStyle}
                            renderHideContent={renderHideContent}
                            tabPaneStyle={tabPaneStyle}
                            getScrollContainer={getScrollContainer}
                            scrollThrottle={scrollThrottle}
                            scrollOffset={scrollOffset}
                            goLastWhenScrollBottom={goLastWhenScrollBottom}
                            scrollVertical={scrollVertical}
                            tabPaneClass={tabPaneClass}
                            tabPaneExtra={tabPaneExtra}
                            autoHeight={autoHeight}
                            onScroll={onScroll}
                            {...commonProps}
                        />
                    </div>
                );
            }}
        </ContextLayout>
    );
});

export default Tabs;
