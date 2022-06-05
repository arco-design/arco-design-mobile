import React, { useMemo, useContext, ReactNode } from 'react';
import { GlobalContext } from '../../context-provider';
import { SliderContext } from '.';

export const useSliderIcon = ({ valueGroup }: { valueGroup: number | [number, number] }) => {
    const { prefixCls = '' } = useContext(GlobalContext);

    const { max, suffixLabel, min, prefixLabel } = useContext(SliderContext);
    const renderPrefixLabel = useMemo(() => {
        if (!prefixLabel) return null;
        let inner: ReactNode;
        if (typeof prefixLabel === 'boolean' && prefixLabel) {
            inner = min;
        } else if (typeof prefixLabel === 'function') {
            inner = prefixLabel(valueGroup);
        } else {
            inner = prefixLabel;
        }
        return <div className={`${prefixCls}-slider-label is-prefix`}>{inner}</div>;
    }, [min, prefixLabel, valueGroup]);

    const renderSuffixLabel = useMemo(() => {
        if (!suffixLabel) return null;
        let inner: ReactNode;
        if (typeof suffixLabel === 'boolean' && suffixLabel) {
            inner = max;
        } else if (typeof suffixLabel === 'function') {
            inner = suffixLabel(valueGroup);
        } else {
            inner = suffixLabel;
        }
        return <div className={`${prefixCls}-slider-label is-suffix`}>{inner}</div>;
    }, [max, suffixLabel, valueGroup]);
    return {
        renderPrefixLabel,
        renderSuffixLabel,
    };
};
