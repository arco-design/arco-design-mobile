import React, { useEffect, forwardRef, Ref, useRef, useImperativeHandle, ReactNode } from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import Transition from '../transition';
import IconErrorCircle from '../icon/IconErrorCircle';
import IconWarnCircle from '../icon/IconWarnCircle';
import IconSuccessCircle from '../icon/IconSuccessCircle';
import Portal from '../portal';
import { ToastBaseProps, toast } from './methods';
import Loading from '../loading';
import { usePreventBodyScroll } from '../_helpers';

export * from './methods';

export type ToastType = 'success' | 'error' | 'warn';

export interface ToastProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 提示内容
     * @en Tip content
     */
    content?: React.ReactNode;
    /**
     * 自动关闭的延时（单位: ms），设置为0则不会自动关闭
     * @en Duration of automatic shutdown (unit: ms), if set to 0, it will not automatically shutdown
     * @default 3000
     */
    duration?: number;
    /**
     * 自定义图标
     * @en Custom icon
     */
    icon?: React.ReactNode;
    /**
     * 内容排列布局
     * @en Content layout
     * @default "vertical"
     */
    layout?: 'vertical' | 'horizontal';
    /**
     * 打开关闭动画执行时长（单位: ms）
     * @en Open and close animation duration (unit: ms)
     * @default 300
     */
    transitionDuration?: number;
    /**
     * 关闭函数
     * @en Close function
     */
    close?: () => void;
    /**
     * 关闭后的回调函数
     * @en Callback after closing
     */
    onClose?: () => void;
    /**
     * 是否为加载态
     * @en Whether it is in the loading state
     */
    loading?: boolean;
    /**
     * 加载图标，传入Icon组件type属性或node
     * @en Loading icon, input the type or node of icon component
     */
    loadingIcon?: React.ReactNode;
    /**
     * 加载图标内部元素，仅在 loading 为 true 时生效
     * @en Inner element of loading icon, only takes effect when loading is true
     */
    loadingInner?: string;
    /**
     * 是否禁止toast以外区域的交互
     * @en Whether to prohibit interaction in areas other than toast
     * @default false
     */
    disableBodyTouch?: boolean;
    /**
     * 是否显示toast
     * @en Whether to show toast
     * @default false
     */
    visible?: boolean;
    /**
     * 获取挂载容器
     * @en Get mounted container
     */
    getContainer?: () => HTMLElement;
    /**
     * toast展示信息类型，不同类型对应不同图标，info表示纯文字信息无图标
     * @en toast displays information types, different types correspond to different icons, info means plain text information without icons
     * @default "info"
     */
    type?: ToastType | 'info';
    /**
     * toast出现位置
     * @en The direction where the toast appears
     * @default "center"
     */
    direction?: 'center' | 'top' | 'bottom';
    /**
     * 自定义不同类型对应的不同图标
     * @en Customize different icons corresponding to different types
     */
    typeIconMap?: Partial<Record<ToastType, ReactNode>>;
    /**
     * 页面初始 overflow 状态，即关闭toast时 overflow 应该还原的状态
     * @en The initial overflow state of the page, that is, the state of overflow should be restored when toast is closed
     * @default 第一个全屏组件（弹窗、toast等）打开时页面overflow值
     * @default_en The page overflow value when the first fullscreen component (popup, toast, etc.) is opened
     */
    initialBodyOverflow?: string;
}

export interface ToastRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

const Toast = forwardRef((props: ToastProps, ref: Ref<ToastRef>) => {
    const {
        className,
        getContainer,
        visible = false,
        onClose,
        close,
        type = 'info',
        icon,
        layout = 'vertical',
        duration = 3000,
        transitionDuration = 300,
        content,
        loading = false,
        loadingIcon,
        disableBodyTouch = false,
        loadingInner,
        direction = 'center',
        typeIconMap,
        initialBodyOverflow,
    } = props;
    const closeTimerRef = useRef<number>();
    const domRef = useRef<HTMLDivElement | null>(null);
    const wrapDomRef = useRef<HTMLDivElement | null>(null);
    const isInitialMount = useRef(false);
    const hasType = type && type !== 'info';

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    usePreventBodyScroll(visible, disableBodyTouch, initialBodyOverflow);

    function handleClose() {
        if (close) {
            close();
        }
    }

    function startCloseTimer() {
        if (duration) {
            clearTimeout(closeTimerRef.current);

            closeTimerRef.current = window.setTimeout(() => {
                handleClose();
            }, duration);
        }
    }

    function handleClickMask(e: React.MouseEvent) {
        if (disableBodyTouch) {
            e.preventDefault();
        }
    }

    function getTypeIcons() {
        const map = typeIconMap || {};
        const defaultMap = {
            success: <IconSuccessCircle />,
            error: <IconErrorCircle />,
            warn: <IconWarnCircle />,
        };
        return map[type] || defaultMap[type] || null;
    }

    useEffect(() => {
        const mounted = isInitialMount.current;
        if (visible) {
            startCloseTimer();
        } else {
            clearTimeout(closeTimerRef.current);
            if (mounted) {
                setTimeout(() => {
                    onClose && onClose();
                }, transitionDuration);
            }
        }
        isInitialMount.current = true;
    }, [visible]);

    useEffect(() => {
        startCloseTimer();
    }, [duration]);

    function renderComponent(prefixClass: string) {
        return (
            <div
                className={cls(`${prefixClass}-wrapper`, `from-${direction}`, {
                    'no-event': !disableBodyTouch,
                })}
                onClick={handleClickMask}
                ref={wrapDomRef}
            >
                <div
                    className={cls(`${prefixClass}-inner`, layout, {
                        [`${prefixClass}-inner-mixin`]:
                            (loading || hasType || icon) && layout === 'vertical',
                    })}
                >
                    {loading && (
                        <div className={`${prefixClass}-loading-wrapper`}>
                            {loadingIcon !== void 0 ? (
                                loadingIcon
                            ) : (
                                <Loading
                                    className="loading-icon"
                                    type="arc"
                                    stroke={2}
                                    radius={loadingInner ? 19 : 11}
                                />
                            )}
                            {loadingInner ? (
                                <span className={`${prefixClass}-loading-inner`}>
                                    {loadingInner}
                                </span>
                            ) : null}
                        </div>
                    )}
                    {/* success、error、warn */}
                    {!loading && hasType ? getTypeIcons() : null}
                    {/* Custom icon */}
                    {!loading && !hasType && icon ? icon : null}
                    {content ? <div className={`${prefixClass}-content`}>{content}</div> : null}
                </div>
            </div>
        );
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <Portal getContainer={getContainer}>
                    <div
                        className={cls(`${prefixCls}-toast`, 'all-border-box', className)}
                        ref={domRef}
                    >
                        <Transition
                            in={visible}
                            timeout={transitionDuration}
                            type="fade"
                            nodeRef={wrapDomRef}
                        >
                            {renderComponent(`${prefixCls}-toast`)}
                        </Transition>
                    </div>
                </Portal>
            )}
        </ContextLayout>
    );
});

export function methodsGenerator<P extends ToastBaseProps>(Comp: React.FunctionComponent<P>) {
    return {
        /**
         * 展示常规提示框
         * @desc {en} Show regular toast
         * @param {string | ToastProps} config Configuration
         * @returns {{ update: (config: ToastProps) => void; close: () => void }}
         */
        toast: toast(Comp),
        /**
         * 展示常规提示框，同 Toast.toast
         * @desc {en} Show regular toast, the same as Toast.toast
         * @param {string | ToastProps} config Configuration
         * @returns {{ update: (config: ToastProps) => void; close: () => void }}
         */
        info: toast(Comp, 'info'),
        /**
         * 展示成功提示框(含成功icon)
         * @desc {en} Show success prompt toast (including success icon)
         * @param {string | ToastProps} config Configuration
         * @returns {{ update: (config: ToastProps) => void; close: () => void }}
         */
        success: toast(Comp, 'success'),
        /**
         * 展示错误提示框(含错误icon)
         * @desc {en} Display error prompt toast (including error icon)
         * @param {string | ToastProps} config Configuration
         * @returns {{ update: (config: ToastProps) => void; close: () => void }}
         */
        error: toast(Comp, 'error'),
        /**
         * 展示加载中提示框(含加载中icon)
         * @desc {en} Display loading prompt toast (including loading icon)
         * @param {string | ToastProps} config Configuration
         * @returns {{ update: (config: ToastProps) => void; close: () => void }}
         */
        loading: toast(Comp, 'loading'),
        /**
         * 展示警告提示框(含警告icon)
         * @desc {en} Display warning prompt toast (including warning icon)
         * @param {string | ToastProps} config Configuration
         * @returns {{ update: (config: ToastProps) => void; close: () => void }}
         */
        warn: toast(Comp, 'warn'),
    };
}

const ToastWithGlobalContext = CompWithGlobalContext(Toast);

/**
 * 轻提示组件，支持各个场景下调用方法。
 * @en The toast component, supports calling methods in various scenarios.
 * @type 反馈
 * @type_en Feedback
 * @name 轻提示
 * @name_en Toast
 */
export default componentWrapper(Toast, methodsGenerator(ToastWithGlobalContext));
