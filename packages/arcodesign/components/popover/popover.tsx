import React, {
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    useState,
    useContext,
    useEffect,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { PopoverInner } from './popover-inner';
import Transition from '../transition';
import { PopoverRef, PopoverProps, PopoverInnerRef } from './type';
import { useEvent, usePosition } from './hooks';
import Portal from '../portal';

export const Popover = forwardRef((props: PopoverProps, ref: Ref<PopoverRef>) => {
    const {
        className = '',
        innerPopoverClassName = '',
        style = {},
        theme = 'black',
        needShadow = false,
        content = '',
        transitionTimeout = 300,
        minWidth = '10px',
        maxWidth = '90vw',
        transitionName = 'fade',
        clickSelfToClose = true,
        touchSelfToClose = props.touchToClose === void 0 ? false : props.touchToClose,
        defaultVisible = false,
        visible,
        children,
        bordered = props.theme === 'white',
        showCloseIcon = false,
        textSuffix = null,
        mode = 'follow',
        showMask = false,
        maskTransitionTimeout = { enter: 450, exit: 240 },
        renderArrow,
        onChange,
        onClickCloseIcon,
        onClickTextSuffix,
        onClickMask,
    } = props;
    const { prefixCls } = useContext(GlobalContext);
    const [visibleState, setVisibleState] = useState(false);
    const visibleRef = useRef(visibleState);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const childRef = useRef<HTMLDivElement | null>(null);
    const popoverRef = useRef<PopoverInnerRef | null>(null);
    const transitionNodeRef = useRef<HTMLDivElement | null>(null);
    const maskRef = useRef<HTMLDivElement | null>(null);
    const {
        direction,
        position,
        isCalcPosition,
        transformOrigin,
        computedChildAndPopoverOffset,
        arrowWidth,
        resetPosition,
        adjustVerticalDirection,
    } = usePosition(props, popoverRef, childRef, wrapperRef);

    /**
     * 气泡状态切换
     * @en Bubble state toggle
     */
    const onVisibleChange = (newVisible = true) => {
        // 为了防止退出中有缩放动画影响气泡位置计算，在退出动画结束前不可切换到展示气泡状态
        // @en In order to prevent the zoom animation in the exit from affecting the calculation of the bubble position, it is not possible to switch to the display bubble state before the exit animation ends.
        if (newVisible && !isCalcPosition) {
            return;
        }
        onChange?.(newVisible);
        if (visible === void 0) {
            setVisibleState(newVisible);
        }
    };

    const { popoverDisappear, mayAddEventOnBody, startCloseTimer, mayRemoveEventListenerOnBody } =
        useEvent(
            props,
            wrapperRef,
            popoverRef,
            visibleRef,
            onVisibleChange,
            adjustVerticalDirection,
        );

    useImperativeHandle(ref, () => ({
        dom: wrapperRef.current,
        child: childRef.current,
        innerPopover: popoverRef.current,
        innerPopoverDom: popoverRef.current?.dom || null,
        updatePosition,
    }));

    useEffect(() => {
        if (defaultVisible || visible) {
            setVisibleState(true);
        }

        return () => {
            mayRemoveEventListenerOnBody();
        };
    }, []);

    useEffect(() => {
        if (visible !== void 0) {
            setVisibleState(Boolean(visible));
        }
    }, [visible]);

    useEffect(() => {
        // 非 visibleState 变化引起的回调，仅用于更新位置
        // @en Callbacks not caused by visibleState changes, only used to update the position
        if (visibleRef.current) {
            computedChildAndPopoverOffset();
        }
    }, [children, content, direction, mode]);

    useEffect(() => {
        visibleState && showPopover();
        visibleRef.current = visibleState;
        if (!visibleState) {
            mayRemoveEventListenerOnBody();
            setTimeout(() => {
                !visibleRef.current && resetPosition();
            }, (typeof transitionTimeout === 'object' ? transitionTimeout.exit : transitionTimeout) || 300);
        }
    }, [visibleState]);

    function showPopover() {
        startCloseTimer();
        setTimeout(mayAddEventOnBody, 0);

        // 为了防止缩放动画影响气泡位置计算，气泡漏出阶段不重新计算位置
        // @en In order to prevent the zoom animation from affecting the bubble position calculation, the bubble leakage stage does not recalculate the position
        if (!isCalcPosition) {
            return;
        }

        // 异步计算气泡位置，等待气泡渲染
        // @en Calculate the bubble position asynchronously and wait for the bubble to render
        setTimeout(() => {
            computedChildAndPopoverOffset();
        }, 0);
    }

    function updatePosition() {
        if (!visibleState) return;
        computedChildAndPopoverOffset();
    }

    function onClickWrapper() {
        const visibleRefValue = visibleRef.current;
        if (!visibleRefValue) {
            onVisibleChange(true);
            return;
        }
        if (visibleRefValue && clickSelfToClose && !touchSelfToClose) {
            popoverDisappear();
        }
    }

    function onTouchWrapper() {
        // 仅处理气泡消失，气泡出现交给onClick来处理
        // @en Only the disappearance of the bubble is processed, and the appearance of the bubble is handed over to onClick for processing
        if (touchSelfToClose && visibleRef.current) {
            popoverDisappear();
        }
    }

    const renderInnerPopover = () => (
        <PopoverInner
            className={cls(`${theme}-theme`, innerPopoverClassName, {
                bordered,
            })}
            ref={ele => {
                popoverRef.current = ele;
                transitionNodeRef.current = ele?.dom!;
            }}
            direction={direction}
            minWidth={minWidth}
            maxWidth={maxWidth}
            position={position}
            arrowWidth={arrowWidth}
            transformOrigin={transformOrigin}
            needShadow={needShadow}
            content={content}
            mode={mode}
            showCloseIcon={showCloseIcon}
            textSuffix={textSuffix}
            renderArrow={renderArrow}
            onClickCloseIcon={onClickCloseIcon}
            onClickTextSuffix={onClickTextSuffix}
        />
    );

    const renderPopover = () => {
        return (
            <Portal
                getContainer={() => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return mode === 'global' ? document.body : wrapperRef.current!;
                }}
            >
                {visibleState && isCalcPosition && renderInnerPopover()}
                <Transition
                    in={visibleState && !isCalcPosition}
                    timeout={transitionTimeout}
                    type={transitionName}
                    nodeRef={transitionNodeRef}
                    mountOnEnter
                    unmountOnExit
                >
                    {renderInnerPopover()}
                </Transition>
            </Portal>
        );
    };

    return (
        <>
            {showMask && (
                <Portal>
                    <Transition
                        in={visibleState && !isCalcPosition}
                        timeout={maskTransitionTimeout}
                        nodeRef={maskRef}
                        type="fade"
                        mountOnEnter
                        unmountOnExit
                    >
                        <div
                            className={`${prefixCls}-popover-mask`}
                            onClick={onClickMask}
                            ref={maskRef}
                        />
                    </Transition>
                </Portal>
            )}
            <div
                className={cls(
                    `${prefixCls}-popover`,
                    className,
                    `${theme}-theme`,
                    `${mode}-mode`,
                    {
                        bordered,
                        'custom-content': typeof content !== 'string',
                    },
                )}
                style={style}
                ref={wrapperRef}
                onClick={onClickWrapper}
                onTouchStart={onTouchWrapper}
            >
                {renderPopover()}
                <div ref={childRef} className="popover-child-inner">
                    {children}
                </div>
            </div>
        </>
    );
});
