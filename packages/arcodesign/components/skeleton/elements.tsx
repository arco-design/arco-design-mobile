import React, {
    Ref,
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { cls, isArray, nextTick } from '@arco-design/mobile-utils';
import { useListenResize } from '../_helpers';
import { GlobalContext } from '../context-provider';
import {
    SkeletonAvatarProps,
    SkeletonGridProps,
    SkeletonNodeProps,
    SkeletonParagraphProps,
    SkeletonRef,
    SkeletonTitleProps,
} from './type';
import { SkeletonContext } from './skeleton-context';

const calcOffset = (dom?: HTMLElement | null, useRtl?: boolean) => {
    if (!dom) {
        return 0;
    }
    if (useRtl) {
        return dom.offsetLeft - dom.offsetTop;
    }
    return dom.offsetLeft + dom.offsetTop;
};

function useOffset<T extends HTMLElement, K extends React.MutableRefObject<T | null> | T[]>(
    dom?: K,
    useRtl?: boolean,
) {
    const [offset, setOffset] = useState<number | number[]>();
    const calcLayout = () => {
        const isList = Array.isArray(dom);
        if (
            !(isList ? (dom as T[]).length > 0 : (dom as React.MutableRefObject<T | null>)?.current)
        ) {
            return;
        }
        setOffset(
            isList
                ? (dom as T[]).map(item => calcOffset(item, useRtl))
                : calcOffset((dom as React.MutableRefObject<T | null>).current, useRtl),
        );
    };

    useEffect(() => {
        nextTick(() => {
            calcLayout();
        });
    }, [dom, useRtl]);

    useListenResize(calcLayout);
    return offset as K extends T[] ? number[] : number;
}

export const SkeletonNode = forwardRef((props: SkeletonNodeProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style, children } = props;
    const { useRtl, prefixCls } = useContext(GlobalContext);
    const { backgroundColor, showAnimation, animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const isGradientAnimation = showAnimation && animation === 'gradient';
    const offset = useOffset(isGradientAnimation ? domRef : undefined, useRtl);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <div
            className={cls(
                `${prefixCls}-skeleton-item`,
                `${prefixCls}-skeleton-node`,
                showAnimation && `${prefixCls}-skeleton-animation-${animation}`,
                className,
            )}
            style={{ backgroundColor, ...style }}
            ref={domRef}
        >
            {children}
            {isGradientAnimation && offset !== undefined && (
                <div
                    className={`${prefixCls}-skeleton-animation-item`}
                    style={{ left: 0 - offset }}
                />
            )}
        </div>
    );
});

export const SkeletonTitle = forwardRef((props: SkeletonTitleProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style, width = '40%' } = props;
    const { useRtl, prefixCls } = useContext(GlobalContext);
    const { backgroundColor, showAnimation, animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const isGradientAnimation = showAnimation && animation === 'gradient';
    const offset = useOffset(isGradientAnimation ? domRef : undefined, useRtl);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <div
            className={cls(
                `${prefixCls}-skeleton-item`,
                `${prefixCls}-skeleton-title`,
                showAnimation && `${prefixCls}-skeleton-animation-${animation}`,
                className,
            )}
            style={{ width, backgroundColor, ...style }}
            ref={domRef}
        >
            {isGradientAnimation && offset !== undefined && (
                <div
                    className={`${prefixCls}-skeleton-animation-item`}
                    style={{ left: 0 - offset }}
                />
            )}
        </div>
    );
});

export const SkeletonParagraph = forwardRef(
    (props: SkeletonParagraphProps, ref: Ref<SkeletonRef>) => {
        const { className = '', style, rows = 3, width = '60%' } = props;
        const { useRtl, prefixCls } = useContext(GlobalContext);
        const { backgroundColor, showAnimation, animation } = useContext(SkeletonContext);
        const domRef = useRef<HTMLDivElement | null>(null);
        const lineDomRefs = useRef<HTMLDivElement[]>([]);
        const isGradientAnimation = showAnimation && animation === 'gradient';
        const offsets = useOffset(isGradientAnimation ? lineDomRefs.current : undefined, useRtl);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        const getWidth = (idx: number) => {
            if (isArray(width)) {
                return width[idx];
            }
            if (rows - 1 === idx) {
                return width;
            }
            return undefined;
        };

        return (
            <div
                className={cls(`${prefixCls}-skeleton-paragraph`, className)}
                style={style}
                ref={domRef}
            >
                {Array.from(new Array(rows)).map((_, idx) => (
                    <div
                        key={idx}
                        className={cls(
                            `${prefixCls}-skeleton-item`,
                            `${prefixCls}-skeleton-paragraph-line`,
                            showAnimation && `${prefixCls}-skeleton-animation-${animation}`,
                        )}
                        style={{
                            width: getWidth(idx),
                            backgroundColor,
                        }}
                        ref={el => {
                            if (el) {
                                lineDomRefs.current[idx] = el;
                            }
                        }}
                    >
                        {isGradientAnimation && offsets !== undefined && (
                            <div
                                className={`${prefixCls}-skeleton-animation-item`}
                                style={{ left: 0 - (offsets[idx] || 0) }}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    },
);

export const SkeletonAvatar = forwardRef((props: SkeletonAvatarProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style } = props;
    const { useRtl, prefixCls } = useContext(GlobalContext);
    const { backgroundColor, showAnimation, animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const isGradientAnimation = showAnimation && animation === 'gradient';
    const offset = useOffset(isGradientAnimation ? domRef : undefined, useRtl);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <div
            className={cls(
                `${prefixCls}-skeleton-item`,
                `${prefixCls}-skeleton-avatar`,
                showAnimation && `${prefixCls}-skeleton-animation-${animation}`,
                className,
            )}
            style={{ backgroundColor, ...style }}
            ref={domRef}
        >
            {isGradientAnimation && offset !== undefined && (
                <div
                    className={`${prefixCls}-skeleton-animation-item`}
                    style={{ left: 0 - offset }}
                />
            )}
        </div>
    );
});

export const SkeletonGrid = forwardRef((props: SkeletonGridProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style, columns = 4 } = props;
    const { useRtl, prefixCls } = useContext(GlobalContext);
    const { backgroundColor, showAnimation, animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const iconDomRefs = useRef<HTMLDivElement[]>([]);
    const textDomRefs = useRef<HTMLDivElement[]>([]);
    const isGradientAnimation = showAnimation && animation === 'gradient';
    const iconOffsets = useOffset(isGradientAnimation ? iconDomRefs.current : undefined, useRtl);
    const textOffsets = useOffset(isGradientAnimation ? textDomRefs.current : undefined, useRtl);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <div className={cls(`${prefixCls}-skeleton-grid`, className)} style={style} ref={domRef}>
            {Array.from(new Array(columns)).map((_, idx) => (
                <div key={idx} className={cls(`${prefixCls}-skeleton-grid-item`)}>
                    <div
                        className={cls(
                            `${prefixCls}-skeleton-item`,
                            `${prefixCls}-skeleton-grid-icon`,
                            showAnimation && `${prefixCls}-skeleton-animation-${animation}`,
                        )}
                        style={{ backgroundColor }}
                        ref={el => {
                            if (el) {
                                iconDomRefs.current[idx] = el;
                            }
                        }}
                    >
                        {isGradientAnimation && iconOffsets !== undefined && (
                            <div
                                className={`${prefixCls}-skeleton-animation-item`}
                                style={{
                                    left: 0 - (iconOffsets?.[idx] || 0),
                                }}
                            />
                        )}
                    </div>
                    <div
                        className={cls(
                            `${prefixCls}-skeleton-item`,
                            `${prefixCls}-skeleton-grid-text`,
                            showAnimation && `${prefixCls}-skeleton-animation-${animation}`,
                        )}
                        style={{ backgroundColor }}
                        ref={el => {
                            if (el) {
                                textDomRefs.current[idx] = el;
                            }
                        }}
                    >
                        {isGradientAnimation && textOffsets !== undefined && (
                            <div
                                className={`${prefixCls}-skeleton-animation-item`}
                                style={{
                                    left: 0 - (textOffsets?.[idx] || 0),
                                }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
});
