import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    ReactNode,
    useEffect,
    useCallback,
    useState,
} from 'react';
import lodashThrottle from 'lodash.throttle';
import {
    getScrollContainerAttribute,
    getValidScrollContainer,
    defaultLocale,
    ILocale,
} from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { useUpdateEffect } from '../_helpers';

export type LoadMoreStatus = 'before-ready' | 'prepare' | 'loading' | 'nomore' | 'retry';

export interface LoadMoreProps {
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 组件加载但尚未启用状态下的内容
     * @en Content when the component is loaded but not yet enabled
     * @default null
     */
    beforeReadyArea?: ReactNode;
    /**
     * 加载中状态下的内容
     * @en Content in loading state
     * @default "正在努力加载中..."
     * @default_en "Trying to load..."
     */
    loadingArea?: ReactNode;
    /**
     * 无更多数据状态下的内容
     * @en Content with no more data
     * @default "没有更多数据了"
     * @default_en "No more data"
     */
    noMoreArea?: ReactNode;
    /**
     * 准备加载状态下的内容
     * @en Content in ready-to-load state
     * @default "上拉/点击加载更多"
     * @default_en "Pull up to load more" or "Click to load more"
     */
    prepareArea?: ReactNode;
    /**
     * 加载重试状态下的内容
     * @en Load content in retry state
     * @default "加载失败，点击重试"
     * @default_en "failed to load, click to retry"
     */
    retryArea?: ReactNode;
    /**
     * 组件加载初始状态，传入 "before-ready" 则先加载组件但不请求数据
     * @en The component is loaded in the initial state. Inputing in "before-ready" will load the component first without requesting data
     * @default "prepare"
     */
    defaultStatus?: 'before-ready' | 'prepare';
    /**
     * 当前状态，传入则受控
     * @en Current state, the component is controlledc  when it is input
     */
    status?: LoadMoreStatus;
    /**
     * 待计算滚动容器
     * @en Scrolling container to be calculated
     * @default () => window
     */
    getScrollContainer?: () => HTMLElement | Window | null;
    /**
     * 触发loading的时机，当为click时，点击后将触发getData
     * @en The timing of triggering loading, when it is click, getData will be triggered after clicking
     * @default "scroll"
     */
    trigger?: 'scroll' | 'click';
    /**
     * 滚动到离列表底部多远的位置触发getData，触发状态时机为'scroll'时有效
     * @en Scroll to how far from the bottom of the list to trigger getData, valid when the trigger state timing is 'scroll'
     * @default 200
     */
    threshold?: number;
    /**
     * 请求数据方法，可在异步任务结束后根据任务结果调用callback修改loadmore内部状态
     * @en The request data method, after the asynchronous task ends, the callback can be called according to the task result to modify the internal state of loadmore
     */
    getData?: (callback: (status: LoadMoreStatus) => void) => void;
    /**
     * 节流粒度
     * @en Throttle granularity
     * @default 0
     */
    throttle?: number;
    /**
     * 是否在loading状态下不触发getData
     * @en Whether to not trigger getData in the loading state
     * @default true
     */
    blockWhenLoading?: boolean;
    /**
     * 刚加载好组件时是否自动先请求一次，trigger=scroll时有效
     * @en Whether to automatically request once when the component is just loaded, valid when trigger=scroll
     * @default true
     */
    getDataAtFirst?: boolean;
    /**
     * 状态改变时回调
     * @en Callback when state changes
     */
    onStatusChange?: (status: LoadMoreStatus, scene?: string) => void;
    /**
     * 组件被点击时回调
     * @en Callback when the component is clicked
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /**
     * 滚动到(底部 - threshold)距离时触发
     * @en Callback when scrolling to (bottom - threshold) distance
     */
    onEndReached?: () => void;
}

export interface LoadMoreRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 手动更改组件状态
     * @en Change component state manually
     */
    changeStatus: (status: LoadMoreStatus, scene?: string) => void;
}

/**
 * 上拉加载组件，支持`scroll`和`click`两种触发加载方式，支持滚动监听。支持受控与不受控两种形式。<br>如果引入组件后发现仅触发了初始的`getData`，请确认是否在`getData`方法内没有调用`callback`移除 loading 状态，且未设置`blockWhenLoading`属性为 false。
 * @en Pull-up loading component, supports `scroll` and `click` two trigger loading methods, supports scroll monitoring. Both controlled and uncontrolled forms are supported. <br>If only the initial `getData` is triggered after the component is introduced, please make sure that the `callback` is not called in the `getData` method to remove the loading state, and the `blockWhenLoading` property is not set to false.
 * @type 反馈
 * @type_en Feedback
 * @name 加载更多
 * @name_en LoadMore
 */
const LoadMore = forwardRef((props: LoadMoreProps, ref: Ref<LoadMoreRef>) => {
    const {
        className = '',
        style,
        beforeReadyArea,
        loadingArea,
        noMoreArea,
        prepareArea,
        retryArea,
        defaultStatus = 'prepare',
        status,
        getScrollContainer,
        trigger = 'scroll',
        threshold = 200,
        throttle = 0,
        getDataAtFirst = true,
        getData,
        blockWhenLoading = true,
        onStatusChange,
        onClick,
        onEndReached,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const requestAtFirst = trigger === 'scroll' ? getDataAtFirst : false;
    const [innerStatus, setInnerStatus] = useState<LoadMoreStatus>(defaultStatus);
    const lastScrollEndRef = useRef(false);
    const nowStatus = status || innerStatus;
    const statusRef = useRef<LoadMoreStatus>(nowStatus);

    const changeStatus = useCallback(
        (st: LoadMoreStatus, scene?: string) => {
            setInnerStatus(st);
            onStatusChange && onStatusChange(st, scene);
        },
        [onStatusChange],
    );

    const triggerGetData = useCallback(
        (scene: string) => {
            if (blockWhenLoading && statusRef.current === 'loading') {
                return;
            }
            changeStatus('loading', scene);
            getData?.(st => {
                changeStatus(st, 'manual');
            });
        },
        [blockWhenLoading, changeStatus, getData],
    );

    useEffect(() => {
        if (!blockWhenLoading || nowStatus !== 'loading') {
            lastScrollEndRef.current = false;
        }
        statusRef.current = nowStatus;
    }, [nowStatus]);

    useUpdateEffect(() => {
        // 当状态被设置为 prepare ，且页面总长度不足一屏时，再触发一次 getData
        // @en When the state is set to prepare and the total page length is less than one screen, trigger getData again
        if (trigger === 'scroll' && nowStatus === 'prepare' && checkNeedTrigger(0, threshold)) {
            triggerGetData('pageEnd');
        }
    }, [nowStatus]);

    useEffect(() => {
        if (requestAtFirst) {
            if (statusRef.current === 'prepare') {
                triggerGetData('requestAtFirst');
            }
        }
    }, [trigger]);

    const handleContainerScroll = useCallback(() => {
        const scrollTop = getScrollContainerAttribute('scrollTop', getScrollContainer);
        if (checkNeedTrigger(scrollTop, threshold + 1)) {
            if (!lastScrollEndRef.current) {
                lastScrollEndRef.current = true;
                onEndReached && onEndReached();
                if (!['nomore', 'retry', 'before-ready'].includes(statusRef.current)) {
                    triggerGetData('scrollEnd');
                }
            }
        } else {
            lastScrollEndRef.current = false;
        }
    }, [getScrollContainer, threshold, triggerGetData, onEndReached]);

    useEffect(() => {
        let binded: HTMLElement | Window | null = null;
        const scrollFunc = throttle
            ? lodashThrottle(handleContainerScroll, throttle)
            : handleContainerScroll;
        if (trigger === 'scroll') {
            const container = getValidScrollContainer(getScrollContainer);
            if (container) {
                container.addEventListener('scroll', scrollFunc);
                binded = container;
            }
        }
        return () => {
            if (binded) {
                binded.removeEventListener('scroll', scrollFunc);
            }
        };
    }, [trigger, getScrollContainer, handleContainerScroll, throttle]);

    useImperativeHandle(
        ref,
        () => ({
            dom: domRef.current,
            changeStatus,
        }),
        [changeStatus],
    );

    function checkNeedTrigger(top: number, ths: number) {
        const scrollHeight = getScrollContainerAttribute('scrollHeight', getScrollContainer);
        const clientHeight = getScrollContainerAttribute('clientHeight', getScrollContainer);
        return scrollHeight - top - clientHeight <= ths;
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (
            (trigger === 'click' && statusRef.current === 'prepare') ||
            statusRef.current === 'retry'
        ) {
            triggerGetData('click');
        }
        onClick && onClick(e);
    }

    function renderArea(locale: ILocale) {
        switch (nowStatus) {
            case 'before-ready':
                return beforeReadyArea;
            case 'prepare':
                return prepareArea === void 0 ? (
                    <div className="load-more-text prepare">
                        {trigger === 'scroll'
                            ? locale.LoadMore.prepareScrollText
                            : locale.LoadMore.prepareClickText}
                        {locale.LoadMore.loadMoreText}
                    </div>
                ) : (
                    prepareArea
                );
            case 'loading':
                return loadingArea === void 0 ? (
                    <div className="load-more-text loading">{locale.LoadMore.loadingText}</div>
                ) : (
                    loadingArea
                );
            case 'nomore':
                return noMoreArea === void 0 ? (
                    <div className="load-more-text nomore">{locale.LoadMore.noDataText}</div>
                ) : (
                    noMoreArea
                );
            case 'retry':
                return retryArea === void 0 ? (
                    <div className="load-more-text retry">{locale.LoadMore.failLoadText}</div>
                ) : (
                    retryArea
                );
            default:
                return null;
        }
    }

    return (
        <ContextLayout>
            {({ prefixCls, locale = defaultLocale }) => (
                <div
                    className={`${prefixCls}-load-more status-${nowStatus} ${className}`}
                    ref={domRef}
                    style={style}
                    onClick={handleClick}
                >
                    {renderArea(locale)}
                </div>
            )}
        </ContextLayout>
    );
});

export default LoadMore;
