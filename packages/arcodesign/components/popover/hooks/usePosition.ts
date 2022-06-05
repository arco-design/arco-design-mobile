import { isObject } from '@arco-design/mobile-utils';
import { useState, MutableRefObject, useEffect, useCallback, useMemo } from 'react';
import { getDefaultValue, useRefState } from '../../_helpers';
import {
    PopoverProps,
    PopoverPosition,
    PopoverTransformOrigin,
    PopoverInnerRef,
    ComputedConfig,
    Direction,
    EdgeOffset,
} from '../type';

const defaultPosition = {
    left: null,
    top: null,
    bottom: null,
    width: null,
    height: null,
    arrowLeft: 0,
};

/**
 * 安全边界距离默认值
 * @en Default safe boundary distance
 */
const defaultEdgeOffsetValue = 14;

/**
 * 安全距离默认值
 * @en Default safe distance
 */
const defaultEdgeOffset: Required<EdgeOffset> = {
    top: defaultEdgeOffsetValue,
    right: defaultEdgeOffsetValue,
    bottom: defaultEdgeOffsetValue,
    left: defaultEdgeOffsetValue,
};

/**
 * 自适应默认值
 * @en Default autoDirection
 */
export const defaultAutoDirection = true;

export const usePosition = (
    props: PopoverProps,
    popoverRef: MutableRefObject<PopoverInnerRef | null>,
    childRef: MutableRefObject<HTMLDivElement | null>,
    wrapperRef: MutableRefObject<HTMLDivElement | null>,
) => {
    const {
        direction = 'topRight',
        verticalOffset = 10,
        horizontalOffset = 8,
        edgeOffset = defaultEdgeOffsetValue,
        arrowWidth = 9,
        mode = 'follow',
        useAutoDirection = defaultAutoDirection,
    } = props;

    /**
     * 气泡的位置信息
     * @en Position information of the bubbles
     */
    const [position, setPosition] = useState<PopoverPosition>(defaultPosition);

    /**
     * 是否在计算气泡位置
     * @en Whether to calculate the bubble position
     */
    const isCalcPosition = useMemo(() => {
        const { top, bottom, height, left, width } = position;
        if (left || width || top || height || bottom) {
            return false;
        }
        return true;
    }, [position]);

    /**
     * 缩放动画中心，尖角的顶部
     * @en Scale animation center, top of sharp corners
     */
    const [transformOrigin, setTransformOrigin] = useState<PopoverTransformOrigin>({
        x: '0',
        y: '0',
    });
    /**
     * 气泡方向，可以会自适应变化
     * @en Bubble direction, can be adaptively changed
     */
    const [directionState, directionStateRef, setDirectionState] = useRefState(direction);

    const getOffset = useCallback(
        (dir: 'top' | 'right' | 'bottom' | 'left') =>
            getDefaultValue<number>(
                isObject(edgeOffset) ? edgeOffset[dir] : edgeOffset,
                defaultEdgeOffset[dir],
            ),
        [edgeOffset],
    );

    const getAutoDirection = useCallback(
        (dir: 'vertical' | 'horizontal') =>
            getDefaultValue(
                isObject(useAutoDirection) ? useAutoDirection[dir] : useAutoDirection,
                defaultAutoDirection,
            ),
        [useAutoDirection],
    );

    useEffect(() => {
        setDirectionState(direction);
    }, [direction]);

    /**
     * 调整尖角图标的位置
     * @en Adjust the position of the sharp corner icon
     */
    function adjustArrow({ childRect, config }) {
        if (directionState.indexOf('Left') !== -1 || directionState.indexOf('Right') !== -1) {
            return (childRect.width - arrowWidth) / 2 + horizontalOffset;
        }
        return (config.width - arrowWidth) / 2;
    }

    /**
     * 如果提示框超出屏幕，则向屏幕中间调整一下
     * @en If the prompt box is beyond the screen, adjust it to the middle of the screen
     */
    function adjustEdge({ childRect, config }: { childRect: DOMRect; config: PopoverPosition }) {
        const newConfig = { ...config, adjustOffset: 0 };
        newConfig.arrowLeft = adjustArrow({
            childRect,
            config,
        });
        const screenWidth = screen.availWidth;

        const [topOffset, rightOffset, bottomOffset, leftOffset] = [
            getOffset('top'),
            getOffset('right'),
            getOffset('bottom'),
            getOffset('left'),
        ];

        const [verticalAuto, horizontalAuto] = [
            getAutoDirection('vertical'),
            getAutoDirection('horizontal'),
        ];

        // 水平方向安全距离自动调整
        // @en Automatic adjustment of safety distance in horizontal direction
        if (horizontalAuto) {
            if (directionState.indexOf('Right') !== -1) {
                let overflow = Number(config.width) - childRect.left - childRect.width;
                // 左边是否溢出，向右平移安全距离
                // @en Whether the left overflows, pan to the right by a safe distance
                if (overflow > 0) {
                    const adjustOffset = overflow + leftOffset;
                    newConfig.left = Number(newConfig.left) + adjustOffset;
                    newConfig.arrowLeft += adjustOffset;
                    newConfig.adjustOffset = adjustOffset;
                }
                // 右边是否溢出，向左平移
                // @en Whether to overflow on the right, pan to the left
                if (screenWidth - childRect.right < rightOffset) {
                    overflow = rightOffset;
                    const adjustOffset = -(overflow - (screenWidth - childRect.right));
                    newConfig.left = Number(newConfig.left) + adjustOffset;
                    newConfig.adjustOffset = adjustOffset;
                }
            } else if (directionState.indexOf('Center') !== -1) {
                const beyondChildEdge = (Number(config.width) - childRect.width) / 2;
                const rightOverflow = beyondChildEdge - (screenWidth - childRect.right);
                const leftOverflow = beyondChildEdge - childRect.left;
                // 右边是否溢出
                // @en Whether to overflow on the right
                if (rightOverflow > 0) {
                    const adjustOffset = -(rightOverflow + rightOffset);
                    newConfig.left = Number(newConfig.left) + adjustOffset;
                    newConfig.arrowLeft -= adjustOffset;
                    newConfig.adjustOffset = adjustOffset;
                }
                // 左边是否溢出
                // @en Whether the left overflow
                if (leftOverflow > 0) {
                    const adjustOffset = leftOverflow + leftOffset;
                    newConfig.left = Number(newConfig.left) + adjustOffset;
                    newConfig.arrowLeft -= adjustOffset;
                    newConfig.adjustOffset = adjustOffset;
                }
            } else if (directionState.indexOf('Left') !== -1) {
                let overflow =
                    Number(config.width) - childRect.width - (screenWidth - childRect.right);
                // 右边是否溢出
                // @en Whether to overflow on the right
                if (overflow > 0) {
                    const adjustOffset = -(overflow + rightOffset);
                    newConfig.left = Number(newConfig.left) + adjustOffset;
                    newConfig.arrowLeft -= adjustOffset;
                    newConfig.adjustOffset = adjustOffset;
                }
                if (childRect.left < leftOffset) {
                    // 左边是否不够
                    // @en Whether the left is not enough
                    overflow = leftOffset;
                    newConfig.left = Number(newConfig.left) + overflow;
                    newConfig.adjustOffset = leftOffset;
                }
            }
        }

        // 垂直方向安全距离调整
        // @en Vertical safety distance adjustment
        if (verticalAuto) {
            const popoverTop =
                childRect.bottom -
                (newConfig.bottom && newConfig.height ? newConfig.bottom + newConfig.height : 0);
            const popoverBottom =
                childRect.top +
                (newConfig.top && newConfig.height ? newConfig.top + newConfig.height : 0);

            // 顶部安全距离不够，调整到底部
            // @en The top safety distance is not enough, adjust to the bottom
            if (directionState.indexOf('top') !== -1 && popoverTop < topOffset) {
                newConfig.top = verticalOffset + childRect.height;
                newConfig.bottom = null;
                onAdjustDirection('bottom');
            } else if (
                directionState.indexOf('bottom') !== -1 &&
                popoverBottom + bottomOffset > window.innerHeight
            ) {
                // 底部安全距离不够，调整到顶部
                // @en The bottom safety distance is not enough, adjust to the top
                newConfig.top = null;
                newConfig.bottom = verticalOffset + childRect.height;
                onAdjustDirection('top');
            }
        }

        // 挂载在全局的气泡需要计算相对屏幕的位置
        // @en Bubble mounted in the global needs to calculate the position relative to the screen
        if (mode === 'global') {
            const wrapperEl = wrapperRef.current;
            if (!wrapperEl) return newConfig;
            const { top, left, bottom } = wrapperEl.getBoundingClientRect();
            if (newConfig.left !== null) newConfig.left += left;
            if (newConfig.top !== null) newConfig.top += top;
            if (newConfig.bottom !== null) {
                const windowInnerHeight =
                    window.innerHeight || document.documentElement.clientHeight;
                newConfig.bottom = windowInnerHeight - (bottom - newConfig.bottom);
            }
        }

        return newConfig;
    }

    /**
     * 计算缩放动画中心尖角顶部的位置
     */
    function getOrigin(config: PopoverPosition, adjustOffset: number): PopoverTransformOrigin {
        const { arrowLeft } = config;
        const width = config.width || 0;
        const height = config.height || 0;
        const halfArrowWidth = arrowWidth / 2;
        let x = `${width / 2}px`;
        const y =
            directionStateRef.current.indexOf('top') > -1
                ? `${halfArrowWidth + height}px`
                : `-${halfArrowWidth}px`;
        if (directionStateRef.current.indexOf('Left') > -1) {
            x = `${arrowLeft + halfArrowWidth}px`;
        } else if (directionStateRef.current.indexOf('Right') > -1) {
            x = `${width - (arrowLeft + halfArrowWidth)}px`;
        } else {
            x = `${width / 2 - adjustOffset}px`;
        }
        return { x, y };
    }

    /**
     * 调整边界并更新气泡位置
     * @en Adjust bounds and update bubble position
     */
    function judgeAndUpdatePosition(childRect: DOMRect, config: PopoverPosition) {
        const { adjustOffset, ...newConfig } = adjustEdge({
            childRect,
            config,
        });
        const newTransformOrigin = getOrigin(newConfig, adjustOffset);
        setTransformOrigin(newTransformOrigin);
        setPosition(newConfig);
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    const setTopRightOffset = ({ popoverWidth, popoverHeight, childRect }: ComputedConfig) => {
        const left = -(popoverWidth - childRect.width - horizontalOffset);
        const bottom = verticalOffset + childRect.height;
        const config: PopoverPosition = {
            left,
            width: popoverWidth,
            top: null,
            height: popoverHeight,
            bottom,
            arrowLeft: 0,
        };

        judgeAndUpdatePosition(childRect, config);
    };

    const setTopCenterOffset = ({ popoverWidth, popoverHeight, childRect }: ComputedConfig) => {
        const left = -(popoverWidth - childRect.width) / 2;
        const bottom = verticalOffset + childRect.height;
        const config: PopoverPosition = {
            left,
            width: popoverWidth,
            top: null,
            height: popoverHeight,
            bottom,
            arrowLeft: 0,
        };

        judgeAndUpdatePosition(childRect, config);
    };

    const setTopLeftOffset = ({ popoverWidth, popoverHeight, childRect }: ComputedConfig) => {
        const left = -horizontalOffset;
        const bottom = verticalOffset + childRect.height;
        const config: PopoverPosition = {
            left,
            width: popoverWidth,
            top: null,
            height: popoverHeight,
            bottom,
            arrowLeft: 0,
        };

        judgeAndUpdatePosition(childRect, config);
    };

    const setBottomRightOffset = ({ popoverWidth, popoverHeight, childRect }: ComputedConfig) => {
        const left = -(popoverWidth - childRect.width - horizontalOffset);
        const top = verticalOffset + childRect.height;
        const config: PopoverPosition = {
            left,
            width: popoverWidth,
            bottom: null,
            height: popoverHeight,
            top,
            arrowLeft: 0,
        };

        judgeAndUpdatePosition(childRect, config);
    };

    const setBottomCenterOffset = ({ popoverWidth, popoverHeight, childRect }: ComputedConfig) => {
        const left = -(popoverWidth - childRect.width) / 2;
        const top = verticalOffset + childRect.height;
        const config: PopoverPosition = {
            left,
            width: popoverWidth,
            bottom: null,
            height: popoverHeight,
            top,
            arrowLeft: 0,
        };

        judgeAndUpdatePosition(childRect, config);
    };

    const setBottomLeftOffset = ({ popoverWidth, popoverHeight, childRect }: ComputedConfig) => {
        const left = -horizontalOffset;
        const top = verticalOffset + childRect.height;
        const config: PopoverPosition = {
            left,
            width: popoverWidth,
            bottom: null,
            height: popoverHeight,
            arrowLeft: 0,
            top,
        };

        judgeAndUpdatePosition(childRect, config);
    };

    /**
     * 计算气泡内容的位置
     * @en Calculate the position of the content of the bubble
     */
    const computedChildAndPopoverOffset = useCallback(() => {
        const popoverEle = popoverRef.current?.content;
        if (!popoverEle) return;
        const popoverWidth = popoverEle.offsetWidth;
        const popoverHeight = popoverEle.offsetHeight;
        if (popoverWidth === 0 || popoverHeight === 0) return;
        const childEle = childRef.current;
        if (!childEle) {
            return;
        }
        const childRect = childEle.getBoundingClientRect();
        const config: ComputedConfig = {
            popoverWidth,
            popoverHeight,
            childRect,
        };
        switch (directionState) {
            case 'topRight':
                setTopRightOffset(config);
                break;
            case 'topCenter':
                setTopCenterOffset(config);
                break;
            case 'topLeft':
                setTopLeftOffset(config);
                break;
            case 'bottomRight':
                setBottomRightOffset(config);
                break;
            case 'bottomCenter':
                setBottomCenterOffset(config);
                break;
            case 'bottomLeft':
                setBottomLeftOffset(config);
                break;
            default:
                break;
        }
    }, [
        childRef,
        directionState,
        popoverRef,
        setTopRightOffset,
        setTopCenterOffset,
        setTopLeftOffset,
        setBottomRightOffset,
        setBottomCenterOffset,
        setBottomLeftOffset,
    ]);

    const resetPosition = () => {
        setPosition(defaultPosition);
        setDirectionState(direction);
    };

    /**
     * 调整气泡垂直方向回调
     * @en Callback when adjusting the vertical direction of the bubble
     */
    const onAdjustDirection = (vertical: 'top' | 'bottom') => {
        if (directionState.indexOf(vertical) === -1) {
            const newDirection = directionState.replace(/top|bottom/, vertical) as Direction;
            setDirectionState(newDirection);
            directionStateRef.current = newDirection;
        }
    };

    /**
     * 判断垂直方向是否需要调整
     * @en Determine whether the vertical direction needs to be adjusted
     */
    const adjustVerticalDirection = useCallback(() => {
        const popover = popoverRef.current;
        if (!popover) {
            return;
        }
        const popoverEle = popover.content;
        if (!popoverEle) return;
        const { top, bottom } = popoverEle.getBoundingClientRect();

        // 顶部安全距离不够，调整到底部
        // @en The top safety distance is not enough, adjust to the bottom
        if (
            (directionState.indexOf('top') !== -1 && top < getOffset('top')) ||
            (directionState.indexOf('bottom') !== -1 &&
                bottom + getOffset('bottom') > window.innerHeight)
        ) {
            computedChildAndPopoverOffset();
        }
    }, [directionState, popoverRef, computedChildAndPopoverOffset, getOffset]);

    return {
        direction: directionState,
        position,
        isCalcPosition,
        arrowWidth,
        transformOrigin,
        computedChildAndPopoverOffset,
        resetPosition,
        onAdjustDirection,
        adjustVerticalDirection,
    };
};
