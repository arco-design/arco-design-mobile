import React, { useContext, CSSProperties, useCallback, ReactNode } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { SliderContext } from './hooks';

function Marks({
    runTimeConfig,
    className = '',
    style = {},
}: {
    runTimeConfig: Array<{ value: number; activated: boolean; label: ReactNode }>;
    className?: string;
    style?: CSSProperties;
}) {
    const { prefixCls = '' } = useContext(GlobalContext);
    const { type, showMarks, max, min } = useContext(SliderContext);
    const isHorizontal = /^horizontal/g.test(type);

    const genMarkStyle = useCallback(
        (value: number) => {
            return {
                [isHorizontal ? 'left' : 'bottom']: `${((value - min) / (max - min)) * 100}%`,
            };
        },
        [isHorizontal, min, max],
    );

    return (
        <div className={`${prefixCls}-slider-marks`}>
            {runTimeConfig.map(({ value, label, activated }) => (
                <div
                    key={value}
                    className={cls(
                        `${prefixCls}-slider-marks-item`,
                        { 'is-activated': activated },
                        className,
                    )}
                    style={{ ...genMarkStyle(value), ...style }}
                >
                    {showMarks && (
                        <div className={`${prefixCls}-slider-marks-item-label`}>{label}</div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Marks;
