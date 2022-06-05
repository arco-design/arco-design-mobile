import React, { useRef, forwardRef, Ref, useImperativeHandle, CSSProperties } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { useSystem } from '../_helpers';
import IconClose from '../icon/IconClose';
import { TagProps, TagRef } from './type';

export const Tag = forwardRef((props: TagProps, ref: Ref<TagRef>) => {
    const {
        className,
        style,
        type = 'primary',
        icon,
        children,
        size = 'medium',
        color,
        bgColor,
        borderColor,
        borderStyle = 'solid',
        halfBorder = true,
        closeable,
        closeIcon,
        closeColor,
        filleted,
        onClose,
        onClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const system = useSystem();

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    function getTagStyle(): CSSProperties {
        return {
            color,
            background: bgColor,
            borderColor,
            borderStyle,
            ...(style || {}),
        };
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => {
                const prefix = `${prefixCls}-tag`;
                return (
                    <div
                        className={cls(
                            prefix,
                            'all-border-box',
                            className,
                            `${prefix}-${type}`,
                            { 'half-border': halfBorder },
                            system,
                            `size-${size}`,
                            { filleted },
                        )}
                        style={getTagStyle()}
                        ref={domRef}
                        onClick={onClick}
                    >
                        {icon}
                        <span className="tag-text">{children}</span>
                        {closeable ? (
                            <div
                                onClick={e => {
                                    e.stopPropagation();
                                    onClose && onClose(e);
                                }}
                                className="tag-close-wrap"
                            >
                                {closeIcon || (
                                    <IconClose className="tag-close-icon" color={closeColor} />
                                )}
                            </div>
                        ) : null}
                    </div>
                );
            }}
        </ContextLayout>
    );
});
