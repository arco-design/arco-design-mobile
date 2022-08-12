import React, { useState, forwardRef, Ref, useRef, useImperativeHandle, useContext } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import Loading from '../loading';
import { useSystem } from '../_helpers';
import { useCustomColor } from './hooks';

export type ButtonColorStatus =
    | string
    | {
          normal: string;
          active: string;
          disabled: string;
      };

export interface ButtonProps {
    /**
     * 样式类型
     * @en Style type
     * @default "primary"
     */
    type?: 'primary' | 'ghost' | 'default';
    /**
     * 尺寸
     * @en Size
     * @default "large"
     */
    size?: 'mini' | 'small' | 'medium' | 'large' | 'huge';
    /**
     * 是否为内联样式
     * @en Whether it's inline style
     * @default false
     */
    inline?: boolean;
    /**
     * 是否处于加载中状态
     * @en Whether it's in loading status
     * @default false
     */
    loading?: boolean;
    /**
     * 是否禁用
     * @en Whether to disable
     * @default false
     */
    disabled?: boolean;
    /**
     * border是否为0.5px
     * @en Whether the border is 0.5px
     * @default false
     */
    halfBorder?: boolean;
    /**
     * 图标名，传入Icon组件
     * @en icon, input icon component
     */
    icon?: React.ReactNode;
    /**
     * 加载中是否展示文字
     * @en Whether to show text when loading
     * @default true
     */
    showTextWhenLoading?: boolean;
    /**
     * 是否需要点击态
     * @en Whether it needs active status
     * @default true
     */
    needActive?: boolean;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 按钮形状
     * @en Button shape
     * @default "semi"
     */
    shape?: 'round' | 'semi' | 'square';
    /**
     * 自定义字体颜色
     * @en Custom font color
     */
    color?: ButtonColorStatus;
    /**
     * 自定义背景颜色
     * @en Custom background color
     */
    bgColor?: ButtonColorStatus;
    /**
     * 自定义边框颜色
     * @en Custom border color
     */
    borderColor?: ButtonColorStatus;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 加载图标，传入Icon组件type属性或node
     * @en Loading icon, input the icon component or its type
     */
    loadingIcon?: string | React.ReactNode;
    /**
     * 子元素
     * @en Children element
     */
    children?: null | React.ReactNode;
    /**
     * 点击按钮的回调函数
     * @en Callback function when clicking button
     */
    onClick?: (e: React.MouseEvent) => void;
    /**
     * 禁用状态下点击按钮的回调函数
     * @en Callback function when disabling button
     */
    onClickDisabled?: (e: React.MouseEvent) => void;
    /**
     * 加载中是否禁用按钮操作
     * @en Disable button when loading
     * @default true
     */
    disableWhenLoading?: boolean;
    /**
     * 加载中是否覆盖Icon
     * @en Whether to override Icon during loading
     * @default true
     */
    coverIconWhenLoading?: boolean;
}

export interface ButtonRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLButtonElement | null;
}

/**
 * 按钮用于开始一个即时操作。
 * @en Using for starting an immediate action
 * @type 通用
 * @type_en General
 * @name 按钮
 * @name_en Button
 */
const Button = forwardRef((props: ButtonProps, ref: Ref<ButtonRef>) => {
    const [isActive, setActive] = useState<boolean>(false);
    const system = useSystem();
    const {
        type = 'primary',
        size = 'large',
        inline = false,
        loading = false,
        disabled = false,
        disableWhenLoading = true,
        shape = 'semi',
        halfBorder = false,
        icon,
        showTextWhenLoading = true,
        needActive = true,
        style = {},
        color,
        bgColor,
        borderColor,
        className = '',
        children = null,
        loadingIcon,
        onClick,
        onClickDisabled,
        coverIconWhenLoading = true,
    } = props;
    const domRef = useRef<HTMLButtonElement | null>(null);
    const { prefixCls } = useContext(GlobalContext);
    const prefix = `${prefixCls}-button`;

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const { customColorClass, customColorStyle } = useCustomColor({
        color,
        bgColor,
        borderColor,
        isActive,
        disabled,
        halfBorder,
    });

    const handleTouchStart = () => {
        if (needActive && !disabled && !loading) {
            setActive(true);
        }
    };

    const handleTouchEnd = () => {
        setActive(false);
    };

    const renderIcon = () => {
        if (coverIconWhenLoading) {
            return loading ? null : icon;
        }
        return icon;
    };

    return (
        <button
            type="button"
            ref={domRef}
            style={{ ...customColorStyle, ...style }}
            className={cls(
                prefix,
                `${prefix}-type-${type} type-${type}`,
                `${prefix}-size-${size} ${prefix}-size-${size}-is-${shape} size-${size}`,
                className,
                `is-${shape}`,
                system,
                {
                    [`${prefix}-inline inline`]: inline,
                    [`${prefix}-type-${type}-disabled disabled`]: disabled,
                    loading,
                    [`${prefix}-type-${type}-active active`]: isActive,
                },
                ...customColorClass,
            )}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onClick={disabled || (loading && disableWhenLoading) ? onClickDisabled : onClick}
        >
            {icon || loading ? (
                <div className={`${prefix}-icon btn-icon`}>
                    {renderIcon()}
                    {loading &&
                        (loadingIcon === void 0 ? (
                            <Loading
                                className={`${prefix}-loading-icon loading-icon`}
                                radius={6}
                                type="circle"
                            />
                        ) : (
                            loadingIcon
                        ))}
                </div>
            ) : null}
            {(!loading || (loading && showTextWhenLoading)) && children ? (
                <div
                    className={cls(`${prefix}-text`, `${prefix}-text-${system}`, 'btn-text', {
                        [`${prefix}-text-has-icon has-icon`]: loading || icon,
                    })}
                >
                    {children}
                </div>
            ) : null}
        </button>
    );
});

export default Button;
