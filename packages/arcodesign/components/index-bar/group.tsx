import { cls } from '@arco-design/mobile-utils';
import React, { useContext, useRef } from 'react';
import { GlobalContext } from '../context-provider';
import Sticky from '../sticky';
import { IndexBarContext } from './context';
import { IndexBarBaseData, IndexBarGroupProps } from './type';

export function IndexBarGroup<Data extends IndexBarBaseData = IndexBarBaseData>(
    props: IndexBarGroupProps<Data>,
) {
    const {
        index: groupIndex,
        list,
        className,
        style,
        children,
        listKey,
        onClick,
        renderGroupItem,
        renderStickyItem,
    } = props;
    const { prefixCls } = useContext(GlobalContext);
    // 有可能是IndexBar.Group的写法，因此sticky从context中获得
    const { sticky, getScrollContainer, activeIndex, updateRef } = useContext(IndexBarContext);
    const domRef = useRef<HTMLDivElement | null>(null);

    // 用户自定义列表元素vnode的key
    const formatGetListKey = (data: Data, index: number) => listKey?.(data, index) ?? index;

    const renderChildren = () =>
        children ??
        list?.map((data, index) => (
            <div
                className={`${prefixCls}-indexbar-group-item`}
                key={formatGetListKey(data, index)}
                onClick={() => onClick?.(groupIndex, data, index)}
            >
                {renderGroupItem ? renderGroupItem(groupIndex, data, index) : data.content}
            </div>
        )) ??
        null;

    const renderIndexTitle = () => {
        if (renderStickyItem) {
            return renderStickyItem(groupIndex);
        }
        const titleDom = (
            <div
                className={cls(`${prefixCls}-indexbar-group-title`, {
                    [`${prefixCls}-indexbar-group-active`]: activeIndex === groupIndex,
                })}
            >
                {groupIndex}
            </div>
        );
        const groupDom = domRef.current;
        return sticky ? (
            <Sticky
                getContainer={() => groupDom as HTMLDivElement}
                stickyStyle="absolute"
                getScrollContainer={getScrollContainer as () => HTMLDivElement}
                ref={ref => ref && updateRef(groupIndex, ref)}
            >
                {titleDom}
            </Sticky>
        ) : (
            titleDom
        );
    };

    return (
        <div
            className={cls(`${prefixCls}-indexbar-group`, className)}
            style={style}
            data-index={groupIndex}
            ref={domRef}
        >
            {renderIndexTitle()}
            {renderChildren()}
        </div>
    );
}
