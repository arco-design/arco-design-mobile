import React, { useMemo, CSSProperties, useContext } from 'react';
import { Popover } from './popover';
import { SliderContext } from './hooks';
import { GlobalContext } from '../context-provider';

function Thumb({
    className,
    value,
    style,
    isTouching,
    idx,
}: {
    className?: string;
    value: number;
    isTouching: boolean;
    style?: CSSProperties;
    idx: number;
}) {
    const { prefixCls = '' } = useContext(GlobalContext);
    const { showTooltip, renderThumb, formatTooltip, renderThumbPopover } =
        useContext(SliderContext);
    const isHidden = showTooltip === 'never';

    const renderValue = useMemo(() => formatTooltip(value), [formatTooltip, value]);
    const isTooltipVisible = useMemo(() => {
        if (isHidden) return false;
        if (showTooltip === 'always') return true;
        return isTouching;
    }, [showTooltip, isTouching]);

    const thumbEl = typeof renderThumb === 'function' ? renderThumb(value) : renderThumb;
    const popoverEl =
        typeof renderThumbPopover === 'function' ? (
            renderThumbPopover({ value, visible: isTooltipVisible, thumbEl, index: idx })
        ) : (
            <Popover visible={isTooltipVisible} content={renderValue}>
                {thumbEl}
            </Popover>
        );

    return (
        <div className={`${prefixCls}-slider-thumb-wrapper ${className}`} style={{ ...style }}>
            {isHidden ? thumbEl : popoverEl}
        </div>
    );
}

export default Thumb;
