import React, { forwardRef, Ref, useImperativeHandle, useRef, useContext, useEffect } from 'react';
import { cls } from '@arco-design/mobile-utils';
import IconClose from '../icon/IconClose';
import { getStyleWithVendor, useMountedState } from '../_helpers';
import { PopoverInnerProps, PopoverInnerRef } from './type';
import { GlobalContext } from '../context-provider';

export const PopoverInner = forwardRef((props: PopoverInnerProps, ref: Ref<PopoverInnerRef>) => {
    const { prefixCls } = useContext(GlobalContext);
    const {
        className,
        needShadow,
        content,
        direction,
        position,
        minWidth,
        maxWidth,
        arrowWidth,
        transformOrigin,
        mode,
        showCloseIcon = false,
        textSuffix = null,
        renderArrow,
        onClickCloseIcon,
        onClickTextSuffix,
    } = props;
    const domRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useMountedState(false);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        content: contentRef.current,
    }));

    useEffect(() => {
        const { top, bottom, height, left, width } = position;
        if (left || width || top || height || bottom) {
            if (!show) {
                setTimeout(() => {
                    setShow(() => {
                        // bugfix:
                        // 外层CSSTransition使用dom API而非通过react className属性修改class
                        // 如果内部通过react className属性动态修改class会覆盖CSSTransition的设置，导致CSSTransition enter相关的class无法应用到组件
                        domRef.current?.classList.add('show');
                        return true;
                    });
                }, 0);
            }
        }
    }, [position, show]);

    /**
     * 计算容器的样式
     * @en Calculate the stylesheet of the container
     */
    const getWrapperStyle = () => {
        const { top, bottom, height, left } = position;

        const obj: React.CSSProperties = {
            height: `${height}px`,
            left: `${left}px`,
            minWidth,
            maxWidth,
        };

        if (top) {
            obj.top = `${top}px`;
        } else if (bottom) {
            obj.bottom = `${bottom}px`;
        }
        // 用于执行缩放动画
        // @en Used to perform zoom animations
        obj.transformOrigin = `${transformOrigin.x} ${transformOrigin.y}`;
        return getStyleWithVendor(obj);
    };

    /**
     * 计算icon的样式
     * @en Calculate the stylesheet of the icon
     */
    const getArrowStyle = () => {
        const { arrowLeft } = position;
        return {
            width: arrowWidth,
            height: arrowWidth,
            marginLeft: arrowLeft ? `${arrowLeft}px` : null,
            marginRight: arrowLeft ? `${arrowLeft}px` : null,
        } as React.CSSProperties;
    };

    return (
        <div
            ref={domRef}
            className={cls(
                `${prefixCls}-popover-inner`,
                'popover-inner',
                'all-border-box',
                `${mode}-mode`,
                className,
                {
                    'with-shadow': needShadow,
                    'with-suffix': showCloseIcon || textSuffix,
                    'custom-content': typeof content !== 'string',
                },
            )}
            style={getWrapperStyle()}
        >
            <div className="popover-bg">
                {renderArrow ? (
                    renderArrow({ arrowWidth, arrowLeft: position.arrowLeft, direction })
                ) : (
                    <div className={`popover-arrow ${direction}`} style={getArrowStyle()}>
                        <div className="popover-arrow-content" />
                    </div>
                )}
            </div>
            <div
                className={cls('popover-content', direction, {
                    'show-close-icon': showCloseIcon,
                })}
                ref={contentRef}
            >
                {typeof content === 'string' ? (
                    <>
                        <div className="content-text">{content}</div>
                        {showCloseIcon && (
                            <>
                                <div className="icon-divider" />
                                <div className="text-close-icon" onClick={onClickCloseIcon}>
                                    <IconClose />
                                </div>
                            </>
                        )}
                        {textSuffix && (
                            <div className="text-suffix" onClick={onClickTextSuffix}>
                                {textSuffix}
                            </div>
                        )}
                    </>
                ) : (
                    content
                )}
            </div>
        </div>
    );
});
