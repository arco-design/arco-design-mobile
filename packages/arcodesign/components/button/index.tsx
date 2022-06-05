import React, { useState, forwardRef, Ref, useRef, useImperativeHandle } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
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
    } = props;
    const domRef = useRef<HTMLButtonElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const { customColorClass, customColorStyle } = useCustomColor({
        color,
        bgColor,
        borderColor,
        isActive,
        disabled,
    });

    const handleTouchStart = () => {
        if (needActive && !disabled && !loading) {
            setActive(true);
        }
    };

    const handleTouchEnd = () => {
        setActive(false);
    };

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <button
                    type="button"
                    ref={domRef}
                    style={{ ...customColorStyle, ...style }}
                    className={cls(
                        `${prefixCls}-button`,
                        className,
                        `type-${type}`,
                        `size-${size}`,
                        `is-${shape}`,
                        system,
                        {
                            inline,
                            disabled,
                            loading,
                            active: isActive,
                            'half-border': halfBorder,
                        },
                        ...customColorClass,
                    )}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    onClick={disabled ? onClickDisabled : onClick}
                >
                    <div className="btn-icon">
                        {icon}
                        {loading &&
                            (loadingIcon === void 0 ? (
                                <Loading className="loading-icon" radius={6} type="circle" />
                            ) : (
                                loadingIcon
                            ))}
                    </div>
                    {(!loading || (loading && showTextWhenLoading)) && children ? (
                        <div className={cls('btn-text', { 'has-icon': loading || icon })}>
                            {children}
                        </div>
                    ) : null}
                </button>
            )}
        </ContextLayout>
    );
});

export default Button;
