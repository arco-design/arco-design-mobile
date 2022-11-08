import React, {
    useState,
    useRef,
    forwardRef,
    Ref,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useImperativeHandle,
} from 'react';
import type { CSSProperties } from 'react';
import { cls, defaultLocale } from '@arco-design/mobile-utils';
import Loading from '../loading';
import { GlobalContext } from '../context-provider';
import { PullRefreshRef, PullRefreshStatus, PullRefreshBasicProps } from './model';
import { useCommonState, useAddScrollEvents, useCheckAsStart } from './hooks';
import { useListenResize } from '../_helpers';

export const PullRefresh = forwardRef((props: PullRefreshBasicProps, ref: Ref<PullRefreshRef>) => {
    const { prefixCls, locale = defaultLocale } = useContext(GlobalContext);
    const animationRef = useRef<number>(0);

    const {
        className,
        style,
        children,
        loadingText = (
            <div className={cls(`${prefixCls}-pull-refresh-label-text`)}>
                <Loading type="circle" radius={4} />
                <span>{locale.PullRefresh.loadingText}</span>
            </div>
        ),
        pullingText = (
            <div className={cls(`${prefixCls}-pull-refresh-label-text`)}>
                <span>{locale.PullRefresh.pullingText}</span>
            </div>
        ),
        finishText = (
            <div className={cls(`${prefixCls}-pull-refresh-label-text`)}>
                <span>{locale.PullRefresh.finishText}</span>
            </div>
        ),
        initialText,
        finishDelay = 300,
        disabled = false,
        loosingMinHeight,
        useHideAsNestedScroll = true,
        allowPullWhenNotTop = false,
        onRefresh,
    } = props;

    const lastScrollTop = useRef(0);
    const statusRef = useRef(PullRefreshStatus.Static);
    const [labelStyle, setLabelStyle] = useState<CSSProperties>({});
    const [contentHeight, setContentHeight] = useState(0);

    const {
        loadingRef,
        status,
        setStatus,
        labelRef,
        domRef,
        touching,
        setTouching,
        loosingHeight,
        tipsHeight,
        handleRefresh,
    } = useCommonState({ loosingMinHeight, onRefresh });
    const { ifShouldHandle } = useCheckAsStart({ domRef, allowPullWhenNotTop });

    const currentLabelStyle = useMemo(() => {
        return (useHideAsNestedScroll &&
            !touching &&
            status === PullRefreshStatus.Pulling &&
            (domRef?.current?.scrollTop ?? 0) > 0) ||
            disabled
            ? { ...labelStyle, opacity: 0 }
            : labelStyle;
    }, [labelStyle, useHideAsNestedScroll, touching, disabled]);

    const pullTextConfig = {
        [PullRefreshStatus.Static]: initialText === void 0 ? pullingText : initialText,
        [PullRefreshStatus.Pulling]: pullingText,
        [PullRefreshStatus.Loading]: loadingText,
        [PullRefreshStatus.Finish]: finishText,
    };

    const reset = useCallback(
        (animationKey: number, callback = () => {}) => {
            if (animationRef.current === animationKey) {
                setLabelStyle({
                    position: 'relative',
                    height: '0px',
                    top: 0,
                    transition: 'height .45s',
                });
            }
            setTimeout(() => {
                if (animationRef.current === animationKey) {
                    if (domRef.current) domRef.current.style.overflow = 'auto';
                    setStatus(PullRefreshStatus.Pulling);
                    setLabelStyle({
                        position: 'absolute',
                        top: `-${tipsHeight}px`,
                        height: `${tipsHeight}px`,
                        transition: 'height 0s',
                    });
                    statusRef.current = PullRefreshStatus.Static;
                    loadingRef.current = false;
                    callback();
                }
            }, 450);
        },
        [tipsHeight],
    );

    const handleTouchStart = useCallback(() => {
        if (disabled || loadingRef.current || !domRef.current || !ifShouldHandle()) return;
        setTouching(true);

        if (domRef.current && domRef.current.scrollTop === 0) {
            domRef.current.scrollTop = 1;
        }
    }, [disabled, ifShouldHandle]);

    const refresh = () =>
        new Promise<void>(resolve => {
            if (domRef.current) {
                domRef.current.style.overflow = 'hidden';
                const animationKey = new Date().getTime();
                setStatus(PullRefreshStatus.Loading);
                setLabelStyle({
                    position: 'relative',
                    top: 0,
                    height: `${tipsHeight}px`,
                    transition: 'height 0s',
                });
                animationRef.current = animationKey;
                handleRefresh().then(() => {
                    if (pullTextConfig[PullRefreshStatus.Finish]) {
                        setStatus(PullRefreshStatus.Finish);
                        setTimeout(() => {
                            reset(animationKey, resolve);
                        }, finishDelay);
                    } else {
                        reset(animationKey, resolve);
                    }
                });
            }
        });

    const handleTouchEnd = useCallback(() => {
        if (disabled || loadingRef.current || !domRef.current) return;
        setTouching(false);
        if (statusRef.current === PullRefreshStatus.Loosing) refresh();
    }, [disabled, tipsHeight]);

    const handleTouchMove = useCallback(() => {
        if (disabled || loadingRef.current || !domRef.current) return;
        setTimeout(() => {
            const isLoosing = -(domRef.current?.scrollTop ?? 0) > loosingHeight;
            if (isLoosing) lastScrollTop.current = domRef.current?.scrollTop ?? 0;
            statusRef.current = isLoosing ? PullRefreshStatus.Loosing : PullRefreshStatus.Pulling;
        });
    }, [disabled, loosingHeight]);

    const updateIOSHeight = useCallback(() => {
        if (domRef.current) {
            const { height } = domRef.current.getBoundingClientRect();
            setContentHeight(height);
        }
    }, []);

    useListenResize(updateIOSHeight);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        refresh,
        updateIOSHeight,
    }));

    useEffect(() => {
        updateIOSHeight();
        reset(animationRef.current);
    }, []);

    useAddScrollEvents({ domRef, handleTouchStart, handleTouchMove, handleTouchEnd });

    return (
        <div
            className={cls(`${prefixCls}-pull-refresh all-border-box is-ios`, className, {
                'is-disabled': disabled || (!touching && useHideAsNestedScroll),
            })}
            ref={domRef}
            style={contentHeight > 0 ? { height: contentHeight, ...(style || {}) } : style}
        >
            <div className={cls(`${prefixCls}-pull-refresh-content-wrapper`)}>
                <div
                    className={cls(`${prefixCls}-pull-refresh-label-wrapper`)}
                    style={currentLabelStyle}
                >
                    <div className={cls(`${prefixCls}-pull-refresh-label`)} ref={labelRef}>
                        {pullTextConfig[status]}
                    </div>
                </div>
                <div
                    className={cls(`${prefixCls}-pull-refresh-content`)}
                    style={contentHeight > 0 ? { minHeight: `${contentHeight + 1}px` } : {}}
                >
                    {children}
                </div>
            </div>
        </div>
    );
});
