import React, { useMemo, CSSProperties, useContext, ReactNode } from 'react';
import { Popover } from './popover';
import { SliderContext } from './hooks';
import { GlobalContext } from '../context-provider';

const Thumb = ({
    className,
    value,
    style,
    isTouching,
}: {
    className?: string;
    value: number;
    isTouching: boolean;
    style?: CSSProperties;
}) => {
    const { prefixCls = '' } = useContext(GlobalContext);
    const { showTooltip, renderThumb, formatTooltip } = useContext(SliderContext);
    const isHidden = showTooltip === 'never';

    const renderValue = useMemo(() => formatTooltip(value), [formatTooltip, value]);
    const isTooltipVisible = useMemo(() => {
        if (isHidden) return false;
        if (showTooltip === 'always') return true;
        return isTouching;
    }, [showTooltip, isTouching]);

    const renderWrapper = (el: ReactNode) => (
        <div className={`${prefixCls}-slider-thumb-wrapper ${className}`} style={{ ...style }}>
            {el}
        </div>
    );

    const thumbEl = typeof renderThumb === 'function' ? renderThumb(value) : renderThumb;

    if (isHidden) return renderWrapper(thumbEl);

    return renderWrapper(
        <Popover visible={isTooltipVisible} content={renderValue}>
            {thumbEl}
        </Popover>,
    );
};

export default Thumb;
