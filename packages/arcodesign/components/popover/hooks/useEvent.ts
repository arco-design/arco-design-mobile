import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { isContains, isObject } from '@arco-design/mobile-utils';
import lodashThrottle from 'lodash.throttle';
import { PopoverProps, PopoverInnerRef } from '../type';
import { getDefaultValue } from '../../_helpers';
import { defaultAutoDirection } from './usePosition';

/**
 * 阻止最近一次点击事件计时器
 * @en Block last click event timer
 */
let preventRecentClickTimer = 0;

export const useEvent = (
    props: PopoverProps,
    wrapperRef: React.MutableRefObject<HTMLDivElement | null>,
    popoverInnerRef: React.MutableRefObject<PopoverInnerRef | null>,
    visibleRef: React.MutableRefObject<boolean>,
    onVisibleChange: (visible: boolean) => void,
    adjustVerticalDirection: () => void,
) => {
    const {
        clickOtherToClose = true,
        touchOtherToClose = props.touchToClose === void 0 ? false : props.touchToClose,
        duration = 0,
        useAutoDirection = true,
        verticalScrollThrottle = 100,
        preventBodyClick = false,
        getVerticalScrollContainer = () => document,
    } = props;

    /**
     * 浮窗消失计时器
     * @en Popup disappearing timer
     */
    const closeTimer = useRef(0);

    /** 垂直方向自适应 */
    const autoVerticalDirection = getDefaultValue(
        isObject(useAutoDirection) ? useAutoDirection.vertical : useAutoDirection,
        defaultAutoDirection,
    );

    const popoverDisappear = () => {
        onVisibleChange(false);
        window.clearTimeout(closeTimer.current);
        closeTimer.current = 0;
        mayRemoveEventListenerOnBody();
    };

    const throttleHandleVerticalScroll = useMemo(() => {
        return lodashThrottle(adjustVerticalDirection, verticalScrollThrottle);
    }, [adjustVerticalDirection, verticalScrollThrottle]);

    useEffect(() => {
        const verticalScrollEl = getVerticalScrollContainer();
        if (visibleRef.current && verticalScrollEl && autoVerticalDirection) {
            verticalScrollEl.addEventListener('scroll', throttleHandleVerticalScroll);
        }

        return () => {
            if (verticalScrollEl) {
                verticalScrollEl.removeEventListener('scroll', throttleHandleVerticalScroll);
            }
        };
    }, [
        throttleHandleVerticalScroll,
        getVerticalScrollContainer,
        autoVerticalDirection,
        visibleRef,
    ]);

    const mayRemoveEventListenerOnBody = useCallback(() => {
        document.body.removeEventListener('click', handleClickBody, true);
        document.body.removeEventListener('touchstart', handleTouchBody);

        const el = getVerticalScrollContainer();
        if (el) {
            el.removeEventListener('scroll', throttleHandleVerticalScroll);
            el.removeEventListener('scroll', handleScrollBody);
        }
    }, [throttleHandleVerticalScroll]);

    const handleClickBody = useCallback(
        e => {
            // 仅处理子元素和气泡元素外的点击事件
            // @en Only handle click events outside of children elements and bubble elements
            if (
                !isContains(wrapperRef.current, e.target) &&
                !isContains(popoverInnerRef.current?.dom || null, e.target)
            ) {
                if (preventBodyClick) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                popoverDisappear();
            }
        },
        [preventBodyClick],
    );

    /**
     * UE要求气泡出现后，点击页面任意元素只隐藏气泡，不响应点击事件
     * @en UE requires that after the bubble appears, clicking any element on the page only hides the bubble and does not respond to the click event
     * 由于touchstart不能取消点击事件
     * @en It can't cancel click event due to touchstart
     * 监听body的最近一次click事件进行取消
     * @en Listen to the body's latest click event to cancel
     * 如果500ms内没有点击事件，用户可能是通过滑动页面触发的touchstart，此时移除click监听
     * @en If there is no click event within 500ms, the user may have triggered the touchstart by sliding the page, and the click listener will be removed at this time.
     */
    const preventRecentClick = () => {
        clearTimeout(preventRecentClickTimer);
        const handle = (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            document.body.removeEventListener('click', handle, true);
            clearTimeout(preventRecentClickTimer);
        };
        document.body.addEventListener('click', handle, true);
        preventRecentClickTimer = window.setTimeout(() => {
            document.body.removeEventListener('click', handle, true);
        }, 500);
    };

    const handleTouchBody = useCallback(
        e => {
            if (
                !e.targetTouches[0]?.target ||
                !wrapperRef.current ||
                !popoverInnerRef.current?.dom ||
                !visibleRef.current
            ) {
                return;
            }

            // 判断元素是否非子元素和气泡元素，内部的事件交给组件内部自行处理
            // @en Determine whether the element is not a child element and a bubble element, and the internal events are handed over to the component to handle it by itself
            if (
                !isContains(wrapperRef.current, e.targetTouches[0]?.target) &&
                !isContains(popoverInnerRef.current.dom, e.targetTouches[0]?.target)
            ) {
                preventBodyClick && preventRecentClick();
                popoverDisappear();
            }
        },
        [preventBodyClick],
    );

    const handleScrollBody = useCallback(() => {
        if (visibleRef.current && touchOtherToClose) {
            popoverDisappear();
        }
    }, [touchOtherToClose]);

    useEffect(() => {
        const el = getVerticalScrollContainer();

        if (el && touchOtherToClose && visibleRef.current) {
            el.addEventListener('scroll', handleScrollBody);
        }

        return () => {
            el && el.removeEventListener('scroll', handleScrollBody);
        };
    }, [handleScrollBody, touchOtherToClose]);

    const mayAddEventOnBody = () => {
        if (touchOtherToClose) {
            document.body.addEventListener('touchstart', handleTouchBody);

            // FIXME: 解决按住气泡元素后上下滚动页面，气泡未消失的问题
            // @en FIXME: solve the problem that the bubble does not disappear after scrolling the page up and down after pressing the bubble element
            const el = getVerticalScrollContainer();
            el && el.addEventListener('scroll', handleScrollBody);
        } else if (clickOtherToClose) {
            document.body.addEventListener('click', handleClickBody, true);
        }
    };

    /**
     * 气泡自动关闭的场景下，计时关闭气泡
     * @en In the scene where the bubbles are automatically closed, time to close the bubbles
     */
    const startCloseTimer = () => {
        if (duration !== 0) {
            closeTimer.current = window.setTimeout(() => {
                onVisibleChange(false);
                mayRemoveEventListenerOnBody();
            }, duration);
        }
    };

    return {
        popoverDisappear,
        mayRemoveEventListenerOnBody,
        startCloseTimer,
        mayAddEventOnBody,
    };
};
