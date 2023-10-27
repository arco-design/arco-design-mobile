import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import { Promise } from 'es6-promise';
import { PullRefreshStatus } from './model';

export const useCommonState = ({
    onRefresh,
    loosingMinHeight,
}: {
    onRefresh?: () => Promise<void>;
    loosingMinHeight?: number;
}) => {
    const [status, setStatus] = useState<PullRefreshStatus>(PullRefreshStatus.Static);

    const loadingRef = useRef(false);
    const labelRef = useRef<HTMLDivElement>(null);
    const domRef = useRef<HTMLDivElement>(null);
    const [touching, setTouching] = useState(false);

    const tipsHeight = useMemo(() => {
        return labelRef.current?.getBoundingClientRect().height ?? 40;
    }, [status]);

    const loosingHeight = useMemo(
        () => loosingMinHeight || tipsHeight,
        [tipsHeight, loosingMinHeight],
    );

    const handleRefresh = useCallback(() => {
        loadingRef.current = true;
        // 避免动画过快，最短加载时间
        // @en Minimum load time, avoid animation too fast
        return Promise.all([
            onRefresh?.(),
            new Promise(resolve => {
                // 最少加载一秒
                // @en Load at least one second
                setTimeout(() => {
                    resolve();
                }, 500);
            }),
        ]);
    }, [onRefresh]);

    return {
        status,
        setStatus,
        touching,
        setTouching,

        loadingRef,
        labelRef,
        domRef,

        loosingHeight,
        handleRefresh,
        tipsHeight,
    };
};

export const useAddScrollEvents = ({
    domRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
}: {
    domRef: RefObject<HTMLDivElement>;
    handleTouchStart: (evt: HTMLElementEventMap['touchstart']) => void;
    handleTouchMove: (evt: HTMLElementEventMap['touchmove']) => void;
    handleTouchEnd: (evt: HTMLElementEventMap['touchend']) => void;
}) => {
    useEffect(() => {
        domRef.current?.addEventListener('touchstart', handleTouchStart, { passive: false });
        return () => {
            domRef.current?.removeEventListener('touchstart', handleTouchStart);
        };
    }, [handleTouchMove]);

    useEffect(() => {
        domRef.current?.addEventListener('touchmove', handleTouchMove, { passive: false });
        return () => {
            domRef.current?.removeEventListener('touchmove', handleTouchMove);
        };
    }, [handleTouchMove]);

    useEffect(() => {
        domRef.current?.addEventListener('touchend', handleTouchEnd);
        domRef.current?.addEventListener('touchcancel', handleTouchEnd);
        return () => {
            domRef.current?.removeEventListener('touchend', handleTouchEnd);
            domRef.current?.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [handleTouchEnd]);
};

export const useCheckAsStart = ({
    allowPullWhenNotTop,
    domRef,
}: {
    allowPullWhenNotTop: boolean;
    domRef: RefObject<HTMLDivElement>;
}) => {
    const ifShouldHandle = useCallback(() => {
        const domRefHeight = domRef.current?.offsetHeight ?? 0;
        return (
            domRef.current &&
            !(
                !allowPullWhenNotTop &&
                (domRef.current.scrollTop < 0 ||
                    domRef.current.scrollTop > domRef.current.scrollHeight - domRefHeight)
            )
        );
    }, [allowPullWhenNotTop]);
    return { ifShouldHandle };
};
