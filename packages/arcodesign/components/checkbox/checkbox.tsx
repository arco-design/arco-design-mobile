import React, { useState, useEffect, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import IconCircleUnchecked from '../icon/IconCircleUnchecked';
import IconCircleChecked from '../icon/IconCircleChecked';
import IconCircleDisabled from '../icon/IconCircleDisabled';
import IconSquareChecked from '../icon/IconSquareChecked';
import IconSquareUnchecked from '../icon/IconSquareUnchecked';
import IconSquareDisabled from '../icon/IconSquareDisabled';
import { CheckboxGroupContext } from './group';
import { IconStatus, IconType, CheckboxProps, CheckboxRef, ValueType } from './type';
import { useMergeProps } from './hooks';

const getDefaultIcon = (shape: string, status: IconStatus) => {
    const defaultIcons: Record<string, IconType> = {
        circle: {
            normal: <IconCircleUnchecked />,
            active: <IconCircleChecked />,
            disabled: <IconCircleDisabled />,
            activeDisabled: <IconCircleChecked />,
        },
        square: {
            normal: <IconSquareUnchecked />,
            active: <IconSquareChecked />,
            disabled: <IconSquareDisabled />,
            activeDisabled: <IconSquareChecked />,
        },
        justify: {
            normal: <IconCircleUnchecked />,
            active: <IconCircleChecked />,
            disabled: <IconCircleDisabled />,
            activeDisabled: <IconCircleChecked />,
        },
    };
    return defaultIcons[shape][status];
};

export const Checkbox = forwardRef(
    <T extends ValueType = ValueType>(props: CheckboxProps<T>, ref: Ref<CheckboxRef>) => {
        const {
            style = {},
            className = '',
            children = null,
            label = '',
            layout = 'inline',
            value,
            defaultCheck = false,
            disabled = false,
            shape = 'circle',
            icons,
            isRadio = false,
            checked: propsChecked,
            onChange,
        } = useMergeProps<T>(props, CheckboxGroupContext);

        const [checked, setChecked] = useState(
            propsChecked === void 0 ? defaultCheck : propsChecked,
        );

        const [componentName] = useState(isRadio ? 'radio' : 'checkbox');

        const domRef = useRef<HTMLDivElement | null>(null);
        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));

        useEffect(() => {
            if (propsChecked !== void 0) setChecked(Boolean(propsChecked));
        }, [propsChecked]);

        /**
         * 获得图标样式
         * @en Get icon style
         */
        const getStatus = (): IconStatus => {
            if (checked) {
                if (disabled) return IconStatus.ACTIVE_DISABLED;
                return IconStatus.ACTIVE;
            }
            if (disabled) return IconStatus.DISABLED;
            return IconStatus.NORMAL;
        };

        /**
         * 计算展示的icon
         * @en Calculate the displayed icon
         */
        const renderIcon = () => {
            let Icon;
            const iconKey = getStatus();
            if (icons && icons[iconKey] !== void 0) {
                Icon = icons[iconKey];
            } else if (icons === null) {
                Icon = null;
            } else {
                Icon =
                    layout === 'justify'
                        ? getDefaultIcon('justify', iconKey)
                        : getDefaultIcon(shape, iconKey);
            }
            return Icon ? (
                <div
                    className={cls(`${componentName}-icon`, {
                        disabled,
                        checked,
                    })}
                >
                    {Icon}
                </div>
            ) : null;
        };

        /**
         * 处理点击事件
         * @en Handling click events
         */
        const onClick = (e: React.MouseEvent) => {
            if (disabled) return;

            // Radio组件不支持点击取消选中
            // @en Radio component does not support click to uncheck
            if (isRadio && checked) return;

            onChange && onChange(!checked, value, e);

            if (propsChecked === void 0) {
                setChecked(!checked);
            }
        };

        return (
            <ContextLayout>
                {({ prefixCls }) => (
                    <div
                        role="checkbox"
                        aria-checked={checked}
                        aria-disabled={disabled}
                        tabIndex={0}
                        ref={domRef}
                        style={style}
                        className={cls(
                            className,
                            `${prefixCls}-${componentName}`,
                            `shape-${shape}`,
                            { disabled },
                            layout,
                        )}
                        onClick={onClick}
                    >
                        {layout !== 'justify' && renderIcon()}
                        <div className={`${componentName}-text`}>{children || label || value}</div>
                        {layout === 'justify' && renderIcon()}
                    </div>
                )}
            </ContextLayout>
        );
    },
);
