import React, { createContext } from 'react';
import { SliderProps } from '..';

export const baseRenderThumb = (prefixCls: string) =>
    function () {
        return <div className={`${prefixCls}-slider-thumb`} />;
    };

export type LinePosition = {
    length: number;
    start: number;
};

// 因为子组件和 hooks 较多, 为了代码整洁和可读性，做了拆分。
// 参数通过 context 共享
// @en Parameters are shared through context
export const SliderContext = createContext<
    Required<Omit<SliderProps, 'value' | 'marks' | 'defaultValue'>> &
        Pick<SliderProps, 'value' | 'marks' | 'defaultValue'>
>({
    className: '',
    style: {},
    disabled: false,
    useRange: false,
    useAnimation: true,
    size: 2,
    min: 0,
    max: 100,
    step: 1,
    type: 'horizontal',
    showTooltip: 'auto',
    useMarkOnly: false,
    showMarks: false,
    prefixLabel: false,
    suffixLabel: false,
    draggableTrackOnly: false,
    formatTooltip: value => String(value),
    onChange: () => {},
    onAfterChange: () => {},
    renderThumb: baseRenderThumb(''),
});

export * from './useSliderIcon';
export * from './useSliderInit';
export * from './useSliderStyle';
export * from './useSliderEvents';
