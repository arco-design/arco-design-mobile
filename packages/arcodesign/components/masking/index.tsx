import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    ReactNode,
    CSSProperties,
    useEffect,
    useState,
} from 'react';
import { cls, nextTick, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import Portal from '../portal';
import Transition, { TransitionProps } from '../transition';
import { usePopupScroll, usePreventBodyScroll } from '../_helpers';
import { open, OpenBaseProps } from './methods';

export * from './methods';

export interface MaskingCommonProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义蒙层类名
     * @en Custom mask classname
     */
    maskClass?: string;
    /**
     * 自定义蒙层样式
     * @en Custom mask stylesheet
     */
    maskStyle?: CSSProperties;
    /**
     * 自定义内容类名
     * @en Custom content classname
     */
    contentClass?: string;
    /**
     * 自定义内容样式
     * @en Custom content stylesheet
     */
    contentStyle?: CSSProperties;
    /**
     * 是否展示菜单（受控）
     * @en Whether to display the menu (controlled)
     */
    visible: boolean;
    /**
     * 关闭菜单方法
     * @en Close menu method
     */
    close: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 蒙层过渡动画类名
     * @en Mask transition animation classname
     * @default "fade"
     */
    maskTransitionType?: string;
    /**
     * 内容过渡动画类名
     * @en Content transition animation classname
     * @default "fade"
     */
    contentTransitionType?: string;
    /**
     * 菜单内部内容
     * @en Contents of menu
     */
    children?: ReactNode;
    /**
     * 蒙层动画时长
     * @en Mask animation duration
     * @default 300
     */
    maskTransitionTimeout?: TransitionProps['timeout'];
    /**
     * 内容动画时长
     * @en Content animation duration
     * @default 300
     */
    contentTransitionTimeout?: TransitionProps['timeout'];
    /**
     * 点击蒙层是否关闭菜单
     * @en Whether to click the mask to close the menu
     * @default true
     */
    maskClosable?: boolean;
    /**
     * 执行进场动画时点击蒙层是否可关闭菜单
     * @en Whether the menu can be closed by clicking on the mask when performing the entry animation
     * @default false
     */
    animatingClosable?: boolean;
    /**
     * 是否在打开菜单时再加载内容
     * @en Whether to reload content when the menu is opened
     * @default true
     */
    mountOnEnter?: boolean;
    /**
     * 是否在退出时卸载内容
     * @en Whether to unmount content on exit
     * @default true
     */
    unmountOnExit?: boolean;
    /**
     * transform方向，用于通过transform模拟横屏的情况
     * @en The transform direction, used to simulate the situation of horizontal screen through transform
     * @default "top"
     */
    orientationDirection?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * 弹窗打开时是否禁止body的滚动
     * @en Whether to prohibit the scrolling of the body when the popup is opened
     * @default true
     */
    preventBodyScroll?: boolean;
    /**
     * 页面初始 overflow 状态，即关闭弹窗时 overflow 应该还原的状态
     * @en The initial overflow state of the page, that is, the state in which overflow should be restored when the popup is closed
     * @default 第一个全屏组件（弹窗、toast等）打开时页面overflow值
     * @default_en The page overflow value when the first fullscreen component (popup, toast, etc.) is opened
     */
    initialBodyOverflow?: string;
    /**
     * 是否禁用滚动容器手势判断，禁用后交给业务方自己判断
     * @en Whether to disable the scrolling container gesture judgment, leave it to users to judge
     * @default false
     */
    gestureOutOfControl?: boolean;
    /**
     * 关闭后回调（动画执行完毕）
     * @en Callback after closing (animation is completed)
     */
    onClose?: (scene?: string) => void;
    /**
     * 打开后回调（动画执行完毕）
     * @en Callback after opening (animation is completed)
     */
    onOpen?: () => void;
    /**
     * 点击蒙层回调，maskClosable=false时也会触发
     * @en Callback when clicking the mask , also triggered when maskClosable=false
     */
    onMaskClick?: () => void;
    /**
     * 弹窗的touchmove回调
     * @en Touch event callbacks for masking
     */
    onTouchMove?: (e: TouchEvent, prevented: boolean, direction: 'x' | 'y') => void;
    /**
     * 非滚动区域或滚动到顶部及底部时的触摸事件回调
     * @en Touch event callbacks for non-scrolling areas or when scrolling to the top and bottom
     */
    onPreventTouchMove?: (e: TouchEvent, direction: 'x' | 'y') => void;
    /**
     * 获取挂载容器
     * @en Get mounted container
     */
    getContainer?: () => HTMLElement;
    /**
     * 内容内部滚动区域容器，在该容器中未滚动到顶部或底部时会释放滚动
     * @en Container of inner scroll area in content, scroll is released when not scrolled to the top or bottom in this container
     */
    getScrollContainer?: () => HTMLElement[] | HTMLElement | null;
}

export interface MaskingProps extends MaskingCommonProps {
    /**
     * 弹窗内容是否居中
     * @en Whether the content of the popup window is centered
     * @default false
     */
    contentAtCenter?: boolean;
}

export interface MaskingRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 蒙层 DOM
     * @en Mask DOM
     */
    mask: HTMLDivElement | null;
    /**
     * 内容 DOM
     * @en Content DOM
     */
    content: HTMLDivElement | null;
    /**
     * 在关闭弹窗前修改 onClose 的 scene 参数值
     * @en Modify the scene of onClose before closing the popup
     */
    setCloseScene: (scene: string) => void;
}

const Masking = forwardRef((props: MaskingProps, ref: Ref<MaskingRef>) => {
    const {
        className,
        visible = false,
        maskClass,
        maskStyle,
        contentClass,
        contentStyle,
        close,
        onClose,
        onOpen,
        onMaskClick,
        children,
        maskTransitionType = 'fade',
        contentTransitionType = 'fade',
        maskTransitionTimeout = 300,
        contentTransitionTimeout = 300,
        maskClosable = true,
        animatingClosable,
        mountOnEnter = true,
        unmountOnExit = true,
        orientationDirection = 'top',
        preventBodyScroll = true,
        initialBodyOverflow,
        contentAtCenter = false,
        gestureOutOfControl = false,
        getContainer,
        getScrollContainer,
        onPreventTouchMove,
        onTouchMove,
    } = props;
    const domRef = useRef<HTMLDivElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef(-1);
    const isInitialMount = useRef(false);
    const isAnimating = useRef(false);
    const closeScene = useRef('');
    const [innerVisible, setInnerVisible] = useState(visible);
    const [outerVisible, setOuterVisible] = useState(visible);
    const [extraClass, setExtraClass] = useState('');

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        mask: maskRef.current,
        content: contentRef.current,
        setCloseScene,
    }));

    usePopupScroll(
        innerVisible,
        domRef.current,
        getScrollContainer,
        orientationDirection,
        onPreventTouchMove,
        onTouchMove,
        gestureOutOfControl,
    );

    usePreventBodyScroll(visible, preventBodyScroll, initialBodyOverflow);

    useEffect(() => {
        if (timerRef.current >= 0) {
            clearTimeout(timerRef.current);
        }
        const mounted = isInitialMount.current;
        if (mounted) {
            isAnimating.current = true;
        }
        if (!mounted && !visible && !mountOnEnter) {
            setExtraClass('pre-mount');
        }
        if (visible) {
            setOuterVisible(true);
            nextTick(() => {
                setInnerVisible(true);
                execAfterOpen(() => {
                    isAnimating.current = false;
                    setExtraClass('');
                    mounted && onOpen?.();
                });
            });
        } else {
            setInnerVisible(false);
            timerRef.current = execAfterClose(() => {
                isAnimating.current = false;
                setOuterVisible(false);
                mounted && onClose?.(closeScene.current || void 0);
                closeScene.current = '';
            });
        }
        isInitialMount.current = true;
    }, [visible]);

    function setCloseScene(scene: string) {
        closeScene.current = scene;
    }

    function execAfterClose(callback: () => void) {
        return window.setTimeout(
            callback,
            Math.max(
                getMaxTimeout(maskTransitionTimeout, 'exit'),
                getMaxTimeout(contentTransitionTimeout, 'exit'),
            ),
        );
    }

    function execAfterOpen(callback: () => void) {
        return window.setTimeout(
            callback,
            Math.max(
                getMaxTimeout(maskTransitionTimeout, 'enter'),
                getMaxTimeout(contentTransitionTimeout, 'enter'),
            ),
        );
    }

    function getMaxTimeout(timeout: TransitionProps['timeout'], type: 'appear' | 'enter' | 'exit') {
        return typeof timeout === 'number' ? timeout : timeout[type] || 0;
    }

    function handleMaskAction(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation();
        onMaskClick?.();
        if (!maskClosable || (!animatingClosable && isAnimating.current)) {
            return;
        }
        closeScene.current = 'mask';
        close?.(e);
    }

    function renderMasking({ prefixCls }) {
        return !mountOnEnter || outerVisible || !unmountOnExit ? (
            <Portal getContainer={getContainer}>
                <div
                    className={cls(`${prefixCls}-masking`, 'all-border-box', className)}
                    ref={domRef}
                >
                    <Transition
                        in={innerVisible}
                        timeout={maskTransitionTimeout}
                        type={maskTransitionType}
                        mountOnEnter={mountOnEnter}
                        unmountOnExit={unmountOnExit}
                        nodeRef={maskRef}
                    >
                        <div
                            ref={maskRef}
                            className={cls(`${prefixCls}-masking-mask`, extraClass, maskClass)}
                            onClick={handleMaskAction}
                            style={maskStyle}
                        />
                    </Transition>
                    <Transition
                        in={innerVisible}
                        timeout={contentTransitionTimeout}
                        type={contentTransitionType}
                        mountOnEnter={mountOnEnter}
                        unmountOnExit={unmountOnExit}
                        nodeRef={contentRef}
                    >
                        <div
                            ref={contentRef}
                            className={cls(
                                `${prefixCls}-masking-content`,
                                { 'at-center': contentAtCenter },
                                extraClass,
                                contentClass,
                            )}
                            style={contentStyle}
                        >
                            {children}
                        </div>
                    </Transition>
                </div>
            </Portal>
        ) : null;
    }

    return <ContextLayout>{renderMasking}</ContextLayout>;
});

export function methodsGenerator<P extends OpenBaseProps>(Comp: React.FunctionComponent<P>) {
    return {
        /**
         * 打开模态弹窗
         * @desc {en} Open a Masking
         * @param {MaskingProps} config Configuration
         * @returns {{ close: () => void; update: (newConfig: MaskingProps) => void; }}
         */
        open: open(Comp),
    };
}

const MaskingWithGlobalContext = CompWithGlobalContext(Masking);

/**
 * 通用模态弹窗，内部内容自定义。默认做了防滚动穿透处理，如果弹层内容中需要滚动，则需将滚动容器传入`getScrollContainer`属性以在未滚动到顶部或底部时释放滚动。
 * @en Generic modal popup with custom internal content. By default, anti-scroll penetration processing is performed. If scrolling is required in the content of the bullet layer, need to pass the scroll container to the `getScrollContainer` to release scrolling when it is not scrolled to the top or bottom.
 * @type 反馈
 * @type_en Feedback
 * @name 模态弹窗
 * @name_en Masking
 */
export default componentWrapper(Masking, methodsGenerator(MaskingWithGlobalContext));
