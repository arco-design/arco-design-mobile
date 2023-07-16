import React, { useRef, forwardRef, Ref, useImperativeHandle, useContext } from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { SkeletonProps, SkeletonRef } from './type';
import {
    SkeletonAvatar as Avatar,
    SkeletonGrid as Grid,
    SkeletonNode as Node,
    SkeletonParagraph as Paragraph,
    SkeletonTitle as Title,
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
        title = true,
        paragraph = true,
        avatar = false,
        grid,
        showAnimation = true,
        animation = 'gradient',
        animationGradientColor,
        backgroundColor,
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
        <Grid {...getComponentProps(grid)} />
    ) : (
        <>
            {hasAvatar && <Avatar {...getComponentProps(avatar)} />}
            {(hasTitle || hasParagraph) && (
                <div className={`${prefixCls}-skeleton-content`}>
                    {hasTitle && <Title {...getComponentProps(title)} />}
                    {hasParagraph && <Paragraph {...getComponentProps(paragraph)} />}
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
            style={{ color: animationGradientColor, ...style }}
            ref={domRef}
        >
            <SkeletonContext.Provider value={{ showAnimation, animation, backgroundColor }}>
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
    Node,
    Title,
    Paragraph,
    Avatar,
    Grid,
});
