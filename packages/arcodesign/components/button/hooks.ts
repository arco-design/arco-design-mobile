import { useMemo, CSSProperties } from 'react';
import { ButtonProps, ButtonColorStatus } from '.';

const formatColorStatus = (color?: ButtonColorStatus) => {
    if (!color) return null;
    return typeof color === 'string'
        ? {
              normal: color,
              active: color,
              disabled: color,
          }
        : color;
};

// 主要是用来 diff 颜色是否变化，将对象或者字符串的 diff 转换成字符串的 diff
// @en It is mainly used to judge whether the color has changed, and convert the diff of the object or string into the diff of the string
const diffColor = (color?: ButtonColorStatus) =>
    color && (typeof color === 'string' ? color : Object.values(color).join('-'));

// 允许传入定制所有颜色，忽略的值会继续走原生的颜色
// @en Allows to pass in all custom colors, ignored values will continue to use native colors
export const useCustomColor = ({
    color,
    bgColor,
    borderColor,
    isActive: active,
    disabled,
    halfBorder,
}: Pick<ButtonProps, 'color' | 'bgColor' | 'borderColor' | 'type' | 'disabled' | 'halfBorder'> & {
    isActive: boolean;
}) => {
    const state = { active, disabled };
    const priority = ['active', 'disabled'];
    const styleConfig = useMemo(() => {
        const [fmtColor, fmtBgColor, fmtBorderColor] = [color, bgColor, borderColor].map(
            formatColorStatus,
        );
        return { color: fmtColor, borderColor: fmtBorderColor, background: fmtBgColor };
    }, [color, bgColor, borderColor].map(diffColor));

    const customColorStyle = useMemo<CSSProperties>(() => {
        const res: CSSProperties = {};
        Object.entries(styleConfig).forEach(([styleName, fmtColorConfig]) => {
            if (fmtColorConfig) {
                let styleColor = fmtColorConfig.normal;
                priority.forEach(key => {
                    if (state[key] && fmtColorConfig[key]) {
                        styleColor = fmtColorConfig[key];
                    }
                });
                res[styleName] = styleColor;
            }
        });
        return res;
    }, [styleConfig, active, disabled]);

    const customColorClass = useMemo(() => {
        const borderCls = halfBorder ? 'half-border' : '';
        return styleConfig.borderColor ? ['has-custom-border'] : [borderCls];
    }, [styleConfig.borderColor, halfBorder]);

    return { customColorStyle, customColorClass };
};
