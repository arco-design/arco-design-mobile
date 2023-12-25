import { useContext, useMemo, CSSProperties } from 'react';
import { SliderContext, LinePosition } from '.';
import { GlobalContext } from '../../context-provider';

export const useSliderStyle = ({
    getLinePosition,
    commonIsTouching,
    valueGroup,
}: {
    commonIsTouching: number;
    getLinePosition: () => LinePosition;
    valueGroup: number | [number, number];
}) => {
    const { useRtl } = useContext(GlobalContext);
    const { size, useAnimation, min, max, type } = useContext(SliderContext);
    const isHorizontal = /^horizontal/g.test(type);

    const heightStyle = useMemo(() => {
        if (size === void 0) return {};
        const sizeCount = typeof size === 'string' ? parseInt(size) : size;
        return { [isHorizontal ? 'height' : 'width']: `${sizeCount}px` };
    }, [size, isHorizontal]);

    const transitionClass = useMemo<string>(() => {
        return useAnimation && commonIsTouching === -1 ? 'is-transferable' : '';
    }, [commonIsTouching, useAnimation]);

    const activeLineStyle = useMemo<CSSProperties>(() => {
        let { length } = getLinePosition();
        let start = 0;
        if (typeof valueGroup === 'number') {
            length *= (valueGroup - min) / (max - min);
        } else {
            const [smaller, larger] = [...valueGroup].sort((a, b) => (a > b ? 1 : -1));
            start = ((smaller - min) / (max - min)) * length;
            length = ((larger - min) / (max - min)) * length - start;
        }
        const leftStyle = useRtl ? 'right' : 'left';
        return {
            [isHorizontal ? leftStyle : 'bottom']: `${start}px`,
            [isHorizontal ? 'width' : 'height']: `${Math.abs(length)}px`,
        };
    }, [valueGroup, getLinePosition, min, max, isHorizontal]);

    return {
        heightStyle,
        transitionClass,
        activeLineStyle,
    };
};
