import React, {
    useState,
    useRef,
    forwardRef,
    Ref,
    useCallback,
    useMemo,
    useContext,
    useEffect,
    useImperativeHandle,
} from 'react';
import { cls, nextTick, defaultLocale } from '@arco-design/mobile-utils';
import Loading from '../loading';
import { GlobalContext } from '../context-provider';
import { PullRefreshRef, PullRefreshStatus, PullRefreshBasicProps } from './model';
import { useCommonState, useAddScrollEvents, useCheckAsStart } from './hooks';
import { getStyleWithVendor } from '../_helpers';

const dampRateCalculate = (val: number, tipsHeight: number, dampRate: number) =>
    val > tipsHeight ? tipsHeight + (val - tipsHeight) / dampRate : val;

export const PullRefresh = forwardRef((props: PullRefreshBasicProps, ref: Ref<PullRefreshRef>) => {
    const { prefixCls, locale = defaultLocale } = useContext(GlobalContext);

    const {
        className,
        style,
        children,
        loosingText = (
            <div className={cls(`${prefixCls}-pull-refresh-label-text`)}>
                <span>{locale.PullRefresh.loosingText}</span>
            </div>
        ),
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
        loosingMinHeight,
        dampRate = 4,
        disabled = false,
        useHideAsNestedScroll = true,
        onRefresh,
        allowPullWhenNotTop = false,
    } = props;
    const [transition, setTransition] = useState<{
        transform?: string;
        transition?: string;
    }>({});

    const touchRef = useRef<{ start: number; x: number; y: number } | null>(null);
    const currentTranslateYRef = useRef(0);
    const onTouching = useRef(false);
    const {
        loadingRef,
        status,
        setStatus,
        labelRef,
        domRef,
        touching,
        setTouching,
        loosingHeight,
        handleRefresh,
        tipsHeight,
    } = useCommonState({ loosingMinHeight, onRefresh });

    const { ifShouldHandle } = useCheckAsStart({ domRef, allowPullWhenNotTop });

    const currentLabelStyle = useMemo(() => {
        return useHideAsNestedScroll &&
            !touching &&
            status === PullRefreshStatus.Pulling &&
            (domRef?.current?.scrollTop ?? 0) > 0
            ? { opacity: 0 }
            : {};
    }, [useHideAsNestedScroll, touching]);

    const pullTextConfig = {
        [PullRefreshStatus.Static]: initialText === void 0 ? pullingText : initialText,
        [PullRefreshStatus.Pulling]: pullingText,
        [PullRefreshStatus.Loosing]: loosingText || pullingText,
        [PullRefreshStatus.Loading]: loadingText,
        [PullRefreshStatus.Finish]: finishText,
    };

    const scroll = (y: number, ms: number, callback?: () => void) => {
        if (y < 5) {
            if (y < 0) {
                currentTranslateYRef.current = 0;
                return;
            }
            if (ms === 0) {
                setTimeout(() => {
                    setTransition({
                        transition: 'all 0s',
                    });
                });
                currentTranslateYRef.current = 0;
                return;
            }
        }
        const translateY = dampRateCalculate(y, loosingHeight, dampRate);
        currentTranslateYRef.current = translateY;
        setTransition({
            transform: translateY ? `translateY(${translateY}px)` : '',
            transition: `all ${ms / 1000}s`,
        });
        setTimeout(() => {
            callback?.();
        }, ms);
    };

    const reset = (callback = () => {}) => {
        scroll(0, 300, () => {
            if (domRef.current && domRef.current.scrollTop < 0) {
                domRef.current.scrollTop = 0;
            }
            loadingRef.current = false;
            setStatus(PullRefreshStatus.Static);
            callback();
        });
    };

    const handleTouchStart = useCallback(
        (e: HTMLElementEventMap['touchstart']) => {
            if (disabled || touchRef.current || loadingRef.current || !domRef.current) return;
            if (!ifShouldHandle()) return;
            setTouching(true);
            if (domRef.current.scrollTop === 0) {
                domRef.current.scrollTop = 1;
            }
            const { pageX, pageY } = e.touches[0];
            if (pageX && pageY) {
                touchRef.current = { start: domRef.current?.scrollTop, x: pageX, y: pageY };
            }
            setStatus(PullRefreshStatus.Pulling);
        },
        [disabled, ifShouldHandle],
    );

    const refresh = () =>
        new Promise<void>(resolve => {
            setStatus(PullRefreshStatus.Loading);
            nextTick(() => {
                scroll(tipsHeight, 300);
                handleRefresh().then(() => {
                    if (pullTextConfig[PullRefreshStatus.Finish]) {
                        setStatus(PullRefreshStatus.Finish);
                        setTimeout(() => {
                            reset(resolve);
                        }, finishDelay);
                    } else {
                        reset(resolve);
                    }
                });
            });
        });
    const handleTouchEnd = useCallback(() => {
        if (currentTranslateYRef.current === 0 && !ifShouldHandle()) {
            return;
        }
        onTouching.current = false;
        setTouching(false);

        if (disabled || !touchRef.current || loadingRef.current) return;
        touchRef.current = null;
        if (status === PullRefreshStatus.Loosing) {
            refresh();
        } else {
            reset();
        }
    }, [disabled, status, tipsHeight, ifShouldHandle]);

    const handleTouchMove = useCallback(
        (e: HTMLElementEventMap['touchmove']) => {
            onTouching.current = true;

            if (disabled || loadingRef.current || !domRef.current) return;

            if (!touchRef.current) return;
            const { pageY } = e.touches[0];
            const pullY = pageY - touchRef.current.y - touchRef.current.start;

            if (currentTranslateYRef.current === 0 && domRef.current.scrollTop > 0) {
                return;
            }

            if (currentTranslateYRef.current === 0 && pullY < 0) {
                return;
            }
            setStatus(() =>
                pullY > loosingHeight ? PullRefreshStatus.Loosing : PullRefreshStatus.Pulling,
            );
            scroll(pullY, 0);

            e.stopPropagation();
            e.cancelable && e.preventDefault();
        },
        [disabled, loosingHeight],
    );

    useEffect(() => {
        const onScroll = () => {
            if (
                onTouching.current &&
                domRef.current &&
                (domRef.current.scrollTop < 0 || currentTranslateYRef.current)
            ) {
                // 禁止 ios 负 scrollTop 和双层滚动
                domRef.current.scrollTop = 0;
            }
        };
        domRef.current?.addEventListener('scroll', onScroll);
        return () => {
            domRef.current?.removeEventListener('scroll', onScroll);
        };
    }, []);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        refresh,
        updateIOSHeight() {
            console.warn('updateIOSHeight 仅在 type="ios" 时可用');
        },
    }));

    useAddScrollEvents({ domRef, handleTouchStart, handleTouchMove, handleTouchEnd });

    return (
        <div
            className={cls(`${prefixCls}-pull-refresh all-border-box is-android`, className, {
                'is-disabled':
                    (disabled || (!touching && useHideAsNestedScroll)) &&
                    status !== PullRefreshStatus.Loading,
            })}
            style={style}
            ref={domRef}
        >
            <div
                className={cls(`${prefixCls}-pull-refresh-place`)}
                style={getStyleWithVendor(transition)}
            >
                <div
                    className={cls(`${prefixCls}-pull-refresh-label`)}
                    ref={labelRef}
                    style={currentLabelStyle}
                >
                    {pullTextConfig[status]}
                </div>
                <div
                    className={cls(`${prefixCls}-pull-refresh-content`, {
                        'is-loading': [
                            PullRefreshStatus.Loading,
                            PullRefreshStatus.Finish,
                        ].includes(status),
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    );
});
