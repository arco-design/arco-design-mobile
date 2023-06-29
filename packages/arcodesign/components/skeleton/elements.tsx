import React, {
    Ref,
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { cls, isArray } from '@arco-design/mobile-utils';
import { useListenResize } from '../_helpers';
import { ContextLayout } from '../context-provider';
import Avatar from '../avatar';
import {
    SkeletonAvatarProps,
    SkeletonGridProps,
    SkeletonNodeProps,
    SkeletonParagraphProps,
    SkeletonRef,
    SkeletonTitleProps,
} from './type';
import { SkeletonContext } from './skeleton-context';

const calcOffset = (dom?: HTMLElement | null) => {
    if (!dom) {
        return 0;
    }
    return dom.offsetTop + dom.offsetLeft + 0.5 * dom.offsetHeight;
};

function useOffset<T extends HTMLElement, K extends React.MutableRefObject<T | null> | T[]>(
    dom?: K,
) {
    const [offset, setOffset] = useState<number | number[]>(0);
    const calcLayout = () => {
        const isList = Array.isArray(dom);
        if (
            !(isList ? (dom as T[]).length > 0 : (dom as React.MutableRefObject<T | null>)?.current)
        ) {
            return;
        }
        setOffset(
            isList
                ? (dom as T[]).map(calcOffset)
                : calcOffset((dom as React.MutableRefObject<T | null>).current),
        );
    };

    useEffect(() => {
        calcLayout();
    }, []);

    useListenResize(calcLayout);
    return offset as K extends T[] ? number[] : number;
}

export const SkeletonNode = forwardRef((props: SkeletonNodeProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style, children } = props;
    const { animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const isGradientAnimation = animation === 'gradient';
    const offset = useOffset(isGradientAnimation ? domRef : undefined);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(
                        `${prefixCls}-skeleton-item`,
                        `${prefixCls}-skeleton-node`,
                        animation && `${prefixCls}-skeleton-animation-${animation}`,
                        className,
                    )}
                    style={style}
                    ref={domRef}
                >
                    {children}
                    {isGradientAnimation && (
                        <div
                            className={`${prefixCls}-skeleton-animation-item`}
                            style={{ left: 0 - offset }}
                        />
                    )}
                </div>
            )}
        </ContextLayout>
    );
});

export const SkeletonTitle = forwardRef((props: SkeletonTitleProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style, width = '38%' } = props;
    const { animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const isGradientAnimation = animation === 'gradient';
    const offset = useOffset(isGradientAnimation ? domRef : undefined);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(
                        `${prefixCls}-skeleton-item`,
                        `${prefixCls}-skeleton-title`,
                        animation && `${prefixCls}-skeleton-animation-${animation}`,
                        className,
                    )}
                    style={{ width, ...style }}
                    ref={domRef}
                >
                    {isGradientAnimation && (
                        <div
                            className={`${prefixCls}-skeleton-animation-item`}
                            style={{ left: 0 - offset }}
                        />
                    )}
                </div>
            )}
        </ContextLayout>
    );
});

export const SkeletonParagraph = forwardRef(
    (props: SkeletonParagraphProps, ref: Ref<SkeletonRef>) => {
        const { className = '', style, rows = 3, width } = props;
        const { animation } = useContext(SkeletonContext);
        const domRef = useRef<HTMLDivElement | null>(null);
        const lineDomRefs = useRef<HTMLDivElement[]>([]);
        const isGradientAnimation = animation === 'gradient';
        const offsets = useOffset(isGradientAnimation ? lineDomRefs.current : undefined);

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
            <ContextLayout>
                {({ prefixCls }) => (
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
                                    animation && `${prefixCls}-skeleton-animation-${animation}`,
                                )}
                                style={{
                                    width: getWidth(idx),
                                }}
                                ref={el => el && (lineDomRefs.current[idx] = el)}
                            >
                                {isGradientAnimation && (
                                    <div
                                        className={`${prefixCls}-skeleton-animation-item`}
                                        style={{ left: 0 - (offsets[idx] || 0) }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </ContextLayout>
        );
    },
);

export const SkeletonAvatar = forwardRef((props: SkeletonAvatarProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style, shape = 'circle', size = 'smaller' } = props;
    const { animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const isGradientAnimation = animation === 'gradient';
    const offset = useOffset(isGradientAnimation ? domRef : undefined);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div className={cls(`${prefixCls}-skeleton-avatar`, className)} ref={domRef}>
                    <Avatar src="" shape={shape} size={size}>
                        <div
                            className={cls(
                                `${prefixCls}-skeleton-item`,
                                animation && `${prefixCls}-skeleton-animation-${animation}`,
                            )}
                            style={style}
                        >
                            {isGradientAnimation && (
                                <div
                                    className={`${prefixCls}-skeleton-animation-item`}
                                    style={{ left: 0 - offset }}
                                />
                            )}
                        </div>
                    </Avatar>
                </div>
            )}
        </ContextLayout>
    );
});

export const SkeletonGrid = forwardRef((props: SkeletonGridProps, ref: Ref<SkeletonRef>) => {
    const { className = '', style, columns = 4 } = props;
    const { animation } = useContext(SkeletonContext);
    const domRef = useRef<HTMLDivElement | null>(null);
    const iconDomRefs = useRef<HTMLDivElement[]>([]);
    const textDomRefs = useRef<HTMLDivElement[]>([]);
    const isGradientAnimation = animation === 'gradient';
    const iconOffsets = useOffset(isGradientAnimation ? iconDomRefs.current : undefined);
    const textOffsets = useOffset(isGradientAnimation ? textDomRefs.current : undefined);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(`${prefixCls}-skeleton-grid`, className)}
                    style={style}
                    ref={domRef}
                >
                    {Array.from(new Array(columns)).map((_, idx) => (
                        <div key={idx} className={cls(`${prefixCls}-skeleton-grid-item`)}>
                            <div
                                className={cls(
                                    `${prefixCls}-skeleton-item`,
                                    `${prefixCls}-skeleton-grid-icon`,
                                    animation && `${prefixCls}-skeleton-animation-${animation}`,
                                )}
                                ref={el => el && (iconDomRefs.current[idx] = el)}
                            >
                                {isGradientAnimation && (
                                    <div
                                        className={`${prefixCls}-skeleton-animation-item`}
                                        style={{ left: 0 - (iconOffsets?.[idx] || 0) }}
                                    />
                                )}
                            </div>
                            <div
                                className={cls(
                                    `${prefixCls}-skeleton-item`,
                                    `${prefixCls}-skeleton-grid-text`,
                                    animation && `${prefixCls}-skeleton-animation-${animation}`,
                                )}
                                ref={el => el && (textDomRefs.current[idx] = el)}
                            >
                                {isGradientAnimation && (
                                    <div
                                        className={`${prefixCls}-skeleton-animation-item`}
                                        style={{ left: 0 - (textOffsets?.[idx] || 0) }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ContextLayout>
    );
});
