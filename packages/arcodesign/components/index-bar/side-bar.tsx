import React, { ReactNode, useState } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { IndexBarIndexType, IndexBarSideBarProps, IndexBarTipType } from './type';

export function IndexBarSideBar(props: IndexBarSideBarProps) {
    const {
        indexes,
        prefixCls,
        onTouching,
        onClick,
        activeIndex,
        tipType,
        renderSideBar,
        renderSideBarItem = index => index,
        renderTip: propsRenderTip,
    } = props;
    const [isTouching, originSetIsTouching] = useState(false);

    const setIsTouching = (touching: boolean) => {
        originSetIsTouching(touching);
        onTouching(touching);
    };

    const handleTouchingStart = () => setIsTouching(true);

    const handleTouchingStop = () => setIsTouching(false);

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isTouching || !e.touches?.length) {
            return;
        }
        const { clientX, clientY } = e.touches[0];
        const target = document.elementFromPoint(clientX, clientY) as HTMLElement;
        if (target && target.dataset?.index) {
            onClick(target.dataset.index);
        }
    };

    const renderSideBarTip = (index: IndexBarIndexType, type: IndexBarTipType): ReactNode => {
        if (propsRenderTip) {
            return propsRenderTip(index);
        }
        return <div className={`${prefixCls}-index-bar-sidebar-${type}`}>{index}</div>;
    };

    const node = (
        <div
            className={cls(`${prefixCls}-index-bar-sidebar`, {
                [`${prefixCls}-index-bar-sidebar-touching`]: isTouching,
            })}
            onTouchStart={() => handleTouchingStart()}
            onTouchEnd={() => handleTouchingStop()}
            onTouchCancel={() => handleTouchingStop()}
            onTouchMove={handleTouchMove}
        >
            {tipType === 'toast' &&
                isTouching &&
                activeIndex &&
                renderSideBarTip(activeIndex, 'toast')}
            {indexes.map(index => (
                <div
                    className={cls(`${prefixCls}-index-bar-sidebar-item`, {
                        [`${prefixCls}-index-bar-sidebar-active`]: activeIndex === index,
                    })}
                    key={index}
                    onTouchStart={() => onClick(index)}
                    data-index={index}
                >
                    {tipType === 'sweat' &&
                        isTouching &&
                        activeIndex === index &&
                        renderSideBarTip(index, 'sweat')}
                    <div className={`${prefixCls}-index-bar-sidebar-item-wrapper`}>
                        {renderSideBarItem(index)}
                    </div>
                </div>
            ))}
        </div>
    );

    return renderSideBar ? renderSideBar(node) : node;
}
