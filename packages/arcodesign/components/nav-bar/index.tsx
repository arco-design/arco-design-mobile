import React, {
    useEffect,
    useState,
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    CSSProperties,
    ReactNode,
} from 'react';
import {
    cls,
    getScrollContainerAttribute,
    getValidScrollContainer,
} from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import BackArrow from './back-icon';
import { useSystem } from '../_helpers';

export interface NavBarRef {
    /** @deprecated */
    navBar: HTMLDivElement | null;
    /**
     * 最外层元素DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

export interface NavBarProps {
    /**
     * 导航栏中间文字，带居中和溢出省略效果
     * @en Navigation bar middle text, with centering and overflow omitting effects
     */
    title?: React.ReactNode;
    /**
     * 自定义导航栏主内容，当导航栏内容为Tabs等非居中文字样式时可用
     * @en Customize the main content of the navigation bar, available when the content of the navigation bar is a non-centered text style such as Tabs
     */
    children?: React.ReactNode;
    /**
     * 导航栏左侧内容
     * @en Navigation bar left content
     * @default 返回按钮
     * @default_en Back button
     */
    leftContent?: React.ReactNode;
    /**
     * 导航栏右侧内容
     * @en Content on the right side of the navigation bar
     */
    rightContent?: React.ReactNode;
    /**
     * 自定义样式，背景和文字颜色可在此定义
     * @en Custom stylesheet, background and text colors can be defined here
     */
    style?: React.CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 最外层元素自定义类名
     * @en Outermost element custom classname
     */
    wrapClass?: string;
    /**
     * 是否吸顶
     * @en Whether to fix
     */
    fixed?: boolean;
    /**
     * 沉浸式状态栏高度
     * @en Immersive status bar height
     * @default 0
     */
    statusBarHeight?: number;
    /**
     * 是否有底边框
     * @en Whether there is a bottom border
     * @default true
     */
    hasBottomLine?: boolean;
    /**
     * 点击左侧内容回调
     * @en Callback when clicking the content on the left
     */
    onClickLeft?: (e: React.MouseEvent) => void;
    /**
     * 点击右侧内容回调
     * @en Callback when clicking the content on the right
     */
    onClickRight?: (e: React.MouseEvent) => void;
    /**
     * 展示nav-bar的offset值，当scrollTop值小于该值时，将隐藏主内容和右侧内容，左侧内容保留
     * @en Display the offset value of nav-bar. When the scrollTop value is less than this value, the main content and the right content will be hidden, and the left content will remain
     * @default 0
     */
    showOffset?: number;
    /**
     * 设置showOffset后，当内容显示状态发生变化后触发
     * @en After setting showOffset, triggered when the content display state changes
     */
    onShowChange?: (show: boolean) => void;
    /**
     * 设置fixed=true时，导航栏原本的位置是否要占住
     * @en When fixed=true is set, whether the original position of the navigation bar should be occupied
     * @default true
     */
    placeholder?: boolean;
    /**
     * 额外渲染元素，与inner平级
     * @en Additional render elements, level with inner
     */
    extra?: ReactNode;
    /**
     * 自定义滚动元素，不传默认是window
     * @en Custom scrolling element, default is window if not input
     */
    getScrollContainer?: () => HTMLElement | Window | null;
    /**
     * 根据滚动offset值设置自定义style，设置该属性后将监听滚动容器的滚动事件
     * @en Set a custom style according to the scroll offset value. After setting this property, the scroll event of the scroll container will be monitored.
     */
    getComputedStyleByScroll?: (offset: number) => CSSProperties;
    /**
     * 滚动时回调，设置该属性后将监听滚动容器的滚动事件
     * @en Callback when scrolling. After setting this property, the scroll event of the scroll container will be monitored.
     */
    onScrollChange?: (offset: number) => void;
    /**
     * 无障碍aria-label属性
     * @en Accessibility attribute aria-label
     * @default ""
     */
    ariaLabel?: string;
    /**
     * 无障碍role属性
     * @en Accessibility attribute role
     * @default "banner"
     */
    ariaRole?: string;
}

/**
 * 导航栏组件，支持吸顶和沉浸式，支持在指定滚动位置展示，支持根据滚动位置实时更新style。
 * @en Navigation bar, supports ceiling and immersion, supports display at specified scroll position, and supports real-time update of style according to scroll position.
 * @type 导航
 * @type_en Navigation
 * @name 导航栏
 * @name_en NavBar
 */
const NavBar = forwardRef((props: NavBarProps, ref: Ref<NavBarRef>) => {
    const {
        children,
        title = '',
        onClickLeft,
        leftContent = <BackArrow />,
        onClickRight,
        rightContent,
        onShowChange,
        style,
        className = '',
        wrapClass,
        placeholder = true,
        fixed = true,
        hasBottomLine = true,
        statusBarHeight = 0,
        extra,
        getScrollContainer,
        showOffset = 0,
        onScrollChange,
        getComputedStyleByScroll,
        ariaLabel = '',
        ariaRole = 'banner',
    } = props;
    const navBarRef = useRef<HTMLDivElement | null>(null);

    const [scrollToggleHide, setScrollToggleHide] = useState(showOffset > 0);
    const relBackground = scrollToggleHide ? 'transparent' : '';
    const [customStyle, setCustomStyle] = useState<CSSProperties>({});
    const system = useSystem();

    const onElementScroll = (curOffset: number) => {
        setScrollToggleHide(curOffset < showOffset);
        onScrollChange?.(curOffset);

        if (getComputedStyleByScroll) {
            const cstyle = getComputedStyleByScroll(curOffset);

            setCustomStyle(cstyle);
        }
    };

    useImperativeHandle(ref, () => ({
        navBar: navBarRef.current,
        dom: navBarRef.current,
    }));

    useEffect(() => {
        onShowChange?.(!scrollToggleHide);
    }, [scrollToggleHide]);

    const handleEleScroll = () => {
        const top = getScrollContainerAttribute('scrollTop', getScrollContainer) || 0;
        onElementScroll(top);
    };

    useEffect(() => {
        const needBind = showOffset || getComputedStyleByScroll || onScrollChange;
        const container = getValidScrollContainer(getScrollContainer);
        handleEleScroll();
        if (needBind && container) {
            container.addEventListener('scroll', handleEleScroll, false);
        }
        return () => {
            if (needBind && container) {
                container.removeEventListener('scroll', handleEleScroll, false);
            }
        };
    }, [showOffset, getComputedStyleByScroll, onScrollChange, getScrollContainer]);

    function handleClickLeft(e: React.MouseEvent) {
        if (onClickLeft) {
            onClickLeft(e);
        }
    }

    function handleClickRight(e: React.MouseEvent) {
        if (onClickRight) {
            onClickRight(e);
        }
    }

    // 最外层div是为了fixed时占位
    // @en The outermost div is a placeholder for fixed
    // 第二层div是为了沉浸式paddingTop
    // @en The second layer of div is for immersive paddingTop
    // 第三层是为了保证内容高度始终是44px
    // @en The third layer is to ensure that the content height is always 44px
    // 背景色放到wrapper层是为了兼容iOS下拉回弹的背景色
    // @en The background color is placed on the wrapper layer to be compatible with the background color of the pull-down rebound in iOS
    // fixed时用height+padding撑开nav-bar最外层高度；不fixed时内部wrapper元素撑开最外层高度
    // @en When fixed, use height+padding to stretch the outermost height of nav-bar; when not fixed, the inner wrapper element stretches the outermost height
    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    ref={navBarRef}
                    className={cls(wrapClass, `${prefixCls}-nav-bar`, {
                        [`${prefixCls}-nav-bar-fixed`]: fixed,
                        [`${prefixCls}-nav-bar-float`]: !placeholder,
                        [`${prefixCls}-nav-bar-hide`]: scrollToggleHide,
                    })}
                    style={{
                        paddingTop: fixed && statusBarHeight ? `${statusBarHeight}px` : '0px',
                        ...(style || {}),
                        ...(relBackground ? { background: relBackground } : {}),
                    }}
                    aria-label={ariaLabel}
                    role={ariaRole}
                >
                    <div
                        className={cls(className, system, `${prefixCls}-nav-bar-wrapper`, {
                            [`${prefixCls}-nav-bar-wrapper-fixed`]: fixed,
                            [`${prefixCls}-nav-bar-wrapper-border`]: hasBottomLine,
                        })}
                        style={{
                            paddingTop: statusBarHeight ? `${statusBarHeight}px` : '0px',
                            ...customStyle,
                        }}
                    >
                        <div className={`${prefixCls}-nav-bar-inner all-border-box`}>
                            {leftContent ? (
                                <div
                                    className={`${prefixCls}-nav-bar-left`}
                                    onClick={handleClickLeft}
                                >
                                    {leftContent}
                                </div>
                            ) : null}
                            {children || (
                                <div className={`${prefixCls}-nav-bar-title`}>
                                    <div className={`${prefixCls}-nav-bar-title-text`}>{title}</div>
                                </div>
                            )}
                            {rightContent ? (
                                <div
                                    className={`${prefixCls}-nav-bar-right`}
                                    onClick={handleClickRight}
                                >
                                    {rightContent}
                                </div>
                            ) : null}
                        </div>
                        {extra}
                    </div>
                </div>
            )}
        </ContextLayout>
    );
});

export default NavBar;
