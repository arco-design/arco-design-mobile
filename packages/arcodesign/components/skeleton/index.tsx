import React, { useRef, forwardRef, Ref, useImperativeHandle, useContext } from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { SkeletonProps, SkeletonRef } from './type';
import {
    SkeletonAvatar,
    SkeletonGrid,
    SkeletonNode,
    SkeletonParagraph,
    SkeletonTitle,
} from './elements';
import { SkeletonContext } from './skeleton-context';

function getComponentProps<T>(prop?: T | boolean): T | {} {
    if (prop && typeof prop === 'object') {
        return prop;
    }
    return {};
}

const Skeleton = forwardRef((props: SkeletonProps, ref: Ref<SkeletonRef>) => {
    const {
        className = '',
        style,
        children,
        animation,
        title = true,
        paragraph = true,
        avatar = false,
        grid,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const { prefixCls } = useContext(GlobalContext);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const isGrid = !!grid;
    const hasTitle = !!title;
    const hasParagraph = !!paragraph;
    const hasAvatar = !!avatar;
    const content = isGrid ? (
        <SkeletonGrid {...getComponentProps(grid)} />
    ) : (
        <>
            {hasAvatar && <SkeletonAvatar {...getComponentProps(avatar)} />}
            {(hasTitle || hasParagraph) && (
                <div className={`${prefixCls}-skeleton-content`}>
                    {hasTitle && <SkeletonTitle {...getComponentProps(title)} />}
                    {hasParagraph && <SkeletonParagraph {...getComponentProps(paragraph)} />}
                </div>
            )}
        </>
    );

    return (
        <div
            className={cls(
                `${prefixCls}-skeleton`,
                {
                    [`${prefixCls}-skeleton-with-avatar`]: hasAvatar,
                },
                className,
            )}
            style={style}
            ref={domRef}
        >
            <SkeletonContext.Provider value={{ animation }}>
                {content}
                {children}
            </SkeletonContext.Provider>
        </div>
    );
});

/**
 * 在内容加载过程中展示一组占位图形。
 * @en Display a set of placeholder graphics during content loading
 * @type 信息展示
 * @type_en Data Display
 * @name 骨架屏
 * @name_en Skeleton
 */
export default componentWrapper(Skeleton, {
    Node: SkeletonNode,
    Title: SkeletonTitle,
    Paragraph: SkeletonParagraph,
    Avatar: SkeletonAvatar,
    Grid: SkeletonGrid,
});
