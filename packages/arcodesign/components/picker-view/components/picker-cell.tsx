import React, {
    useState,
    useLayoutEffect,
    useMemo,
    useRef,
    useCallback,
    useEffect,
    forwardRef,
    Ref,
    useImperativeHandle,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ValueType, PickerData, PickerCellMovingStatus } from '../type';
import { getStyleWithVendor, useMountedState, useRefState } from '../../_helpers';

export interface PickerCellProps {
    prefixCls: string;
    style?: React.CSSProperties;
    data: PickerData[];
    clickable: boolean;
    itemHeight: number;
    wrapperHeight: number;
    selectedValue?: ValueType;
    onValueChange?: (value: ValueType, data: PickerData) => void;
    disabled: boolean;
    hideEmptyCols?: boolean;
    /**
     * 一列展示可选项的个数，默认是5，最小为3
     * @en The number of options displayed in a column, the default is 5, the minimum is 3
     */
    rows?: number;
    touchToStop?: boolean | number;
}
export interface PickerCellRef {
    movingStatus: PickerCellMovingStatus;
    scrollToCurrentIndex: () => void;
}

const PickerCell = forwardRef((props: PickerCellProps, ref: Ref<PickerCellRef>) => {
    const {
        prefixCls,
        style,
        data,
        clickable,
        itemHeight,
        wrapperHeight,
        selectedValue,
        onValueChange,
        disabled,
        hideEmptyCols,
        rows = 5,
        touchToStop = false,
    } = props;
    const [transitionDuration, setTransitionDuration] = useMountedState('');
    const [bezier, setBezier] = useState('');
    const [currentIndex, setCurrentIndex] = useMountedState(0);
    const [currentValue, setCurrentValue] = useMountedState(selectedValue);
    // 是否开始touch
    // @en whether to start touch
    const [transformY, transformYRef, setTransformY] = useRefState(0);
    const lastTransformYRef = useRef(0);
    const touchStartTimeRef = useRef(0);
    const latestCallbackTimer = useRef(0);
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const touchingRef = useRef(false);
    const touchingXRef = useRef<boolean | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const movingStatusRef = useRef<PickerCellMovingStatus>('normal');
    const rowCount = Math.max(rows % 2 === 0 ? rows + 1 : rows, 3);
    const isTouchMoveRef = useRef(false);
    const isTouchStopped = useRef(false);
    const timeRef = useRef<number | null>(null);

    const colStyle = useMemo(
        () =>
            getStyleWithVendor({
                transform: `translate3d(0px, ${transformY || 0}px, 0px)`,
                ...(transitionDuration ? { transitionDuration } : {}),
                transitionTimingFunction: bezier,
                paddingBottom: `${((rowCount - 1) / 2) * itemHeight}px`,
                paddingTop: `${((rowCount - 1) / 2) * itemHeight}px`,
            }),
        [transitionDuration, transformY, bezier, itemHeight, rowCount],
    );

    function _scrollingComplete(nowItemIndex: number) {
        // index有改变时再抛出
        // @en Throws again when index changes
        if (currentIndex !== nowItemIndex) {
            setCurrentIndex(Math.max(nowItemIndex, 0));
            const newData = data[nowItemIndex];
            const newValue = newData?.value;

            if (newValue !== currentValue) {
                setCurrentValue(newValue);
                if (onValueChange) {
                    onValueChange(newValue, newData);
                }
            }
        }
    }

    function _scrollTo(transY: number, transDuration = 0, callback = () => {}) {
        setTransitionDuration(transDuration ? `${transDuration}ms` : '');
        setTransformY(transY);
        // 处理连续滑动的情况：
        // @en handle the case of continuous sliding:
        // 如果上一次callback还未执行，先cancel掉上一次回调，只执行最近的一次回调
        // @en If the last callback has not been executed, cancel the last callback first, and only execute the latest callback
        if (latestCallbackTimer.current) {
            clearTimeout(latestCallbackTimer.current);
        }

        latestCallbackTimer.current = window.setTimeout(() => {
            movingStatusRef.current = 'normal';
            setTransitionDuration('');
            callback();
        }, transDuration);
    }

    function _scrollToIndex(itemIndex: number, transDuration = 0, callback = () => {}) {
        _scrollTo(-1 * itemIndex * itemHeight, transDuration, callback);
    }

    function _scrollToIndexWithChange(itemIndex: number, transDuration = 0) {
        _scrollToIndex(itemIndex, transDuration, () => {
            _scrollingComplete(itemIndex);
        });
    }

    const _handleColumnTouchStart = useCallback(
        (e: TouchEvent) => {
            if (disabled) {
                return;
            }
            isTouchMoveRef.current = false;
            movingStatusRef.current = 'moving';
            const x = e.touches[0].screenX;
            const y = e.touches[0].screenY;
            touchStartTimeRef.current = Date.now();
            touchingRef.current = true;
            touchingXRef.current = null;
            touchStartXRef.current = x;
            touchStartYRef.current = y;
            lastTransformYRef.current = transformYRef.current;
        },
        [disabled],
    );

    const _handleColumnTouchMove = useCallback(
        (e: TouchEvent) => {
            if (disabled || !touchingRef.current) {
                return;
            }
            isTouchMoveRef.current = true;
            const lastTransformY = lastTransformYRef.current;
            const touchMoveX = e.touches[0].screenX;
            const touchMoveY = e.touches[0].screenY;
            const distanceX = touchMoveX - touchStartXRef.current;
            const distance = touchMoveY - touchStartYRef.current;
            if (touchingXRef.current === null) {
                touchingXRef.current = Math.abs(distanceX) > Math.abs(distance);
            }
            if (touchingXRef.current) {
                return;
            }
            e.cancelable && e.preventDefault();
            const newPos = lastTransformY + distance;
            const maxPos = -1 * (data.length - 1) * itemHeight;
            // 当滚动到上边界或下边界时增加阻尼效果
            // @en Add damping effect when scrolling to the upper or lower border
            setTransformY(
                (lastTransformY >= 0 && distance > 0) || (lastTransformY <= maxPos && distance < 0)
                    ? lastTransformY + distance / 4
                    : newPos,
            );
        },
        [data.length, disabled, itemHeight],
    );

    function _handleScrollEnd() {
        const maxIndex = data.length - 1;
        const nowIndex = Math.max(
            0,
            Math.min(maxIndex, Math.round((-1 * transformY) / itemHeight)),
        );
        // 滚动（包括加动量的滚动）完成之后定位到最近的一个index上
        // @en After scrolling (including scrolling with momentum) is completed, it is positioned on the nearest index
        _scrollToIndexWithChange(nowIndex, 200);
    }

    // Reference: https://juejin.im/post/6844904185121488910
    function momentum(current, start, duration, minY, maxY) {
        const durationMap = {
            noBounce: 2000,
            weekBounce: 500,
            strongBounce: 300,
        };
        const bezierMap = {
            noBounce: 'cubic-bezier(.17, .89, .45, 1)',
            weekBounce: 'cubic-bezier(.25, .46, .45, .94)',
            strongBounce: 'cubic-bezier(.25, .46, .45, .94)',
        };
        let type = 'noBounce';
        // 惯性滑动加速度
        // @en inertial sliding acceleration
        const deceleration = 0.003;
        // 回弹阻力
        // @en rebound resistance
        const bounceRate = 5;
        // 强弱回弹的分割值
        // @en Split value of strong and weak rebound
        const bounceThreshold = 300;
        // 回弹的最大限度
        // @en maximum rebound
        const maxOverflowY = wrapperHeight / 6;
        let overflowY;

        const distance = current - start;
        const speed = (2 * Math.abs(distance)) / duration;
        let destination = current + (speed / deceleration) * (distance < 0 ? -1 : 1);
        if (destination < minY) {
            overflowY = minY - destination;
            type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
            destination = Math.max(minY - maxOverflowY, minY - overflowY / bounceRate);
        } else if (destination > maxY) {
            overflowY = destination - maxY;
            type = overflowY > bounceThreshold ? 'strongBounce' : 'weekBounce';
            destination = Math.min(maxY + maxOverflowY, maxY + overflowY / bounceRate);
        }

        return {
            destination,
            duration: durationMap[type],
            bezier: bezierMap[type],
        };
    }

    function _handleColumnTouchEnd() {
        _clearTimer();
        movingStatusRef.current = 'normal';
        const lastTransformY = lastTransformYRef.current;
        if (!isTouchMoveRef.current || transformY === lastTransformY) {
            return;
        }
        touchingRef.current = false;
        const endTime = Date.now();
        const scrollerHeight = (data.length + rowCount - 1) * itemHeight;
        const duration = endTime - touchStartTimeRef.current;
        const absDistY = Math.abs(transformY - lastTransformY);
        // 计算动量，保证滚动顺畅，条件：手势时间小于300ms && 移动距离绝对值大于30时
        // @en Calculate the momentum to ensure smooth scrolling, condition: the gesture time is less than 300ms && the absolute value of the moving distance is greater than 30
        if (duration < 300 && absDistY > 30) {
            const momentumY = momentum(
                transformY,
                lastTransformY,
                duration,
                wrapperHeight - scrollerHeight,
                0,
            );
            const newItemIndex = Math.max(
                0,
                Math.min(data.length - 1, Math.round((-1 * momentumY.destination) / itemHeight)),
            );

            setBezier(momentumY.bezier);

            movingStatusRef.current = 'scrolling';
            _scrollToIndex(newItemIndex, momentumY.duration, () => {
                _scrollingComplete(newItemIndex);
            });
        } else {
            _handleScrollEnd();
        }
    }

    function scrollToCurrentIndex() {
        if (!wrapRef.current) {
            return;
        }
        const curStyle = window.getComputedStyle(wrapRef.current);
        const transformMatrix = curStyle.transform || curStyle.webkitTransform || '';
        const transY =
            Number(
                transformMatrix
                    .replace(/matrix\((.*?)\)/, '$1')
                    .split(/,\s*/)
                    .slice(-1)[0],
            ) || 0;
        const maxIndex = data.length - 1;
        const nowIndex = Math.max(0, Math.min(maxIndex, Math.round((-1 * transY) / itemHeight)));
        // 滚动（包括加动量的滚动）完成之后定位到最近的一个index上
        // @en After scrolling (including scrolling with momentum) is completed, it is positioned on the nearest index
        _scrollToIndexWithChange(nowIndex, 0);
    }

    function _clearTimer() {
        timeRef.current && clearTimeout(timeRef.current);
        timeRef.current = null;
    }

    function _handleItemTouchStart() {
        if (touchToStop === false) {
            return;
        }
        isTouchStopped.current = false;
        timeRef.current = window.setTimeout(
            () => {
                if (!isTouchMoveRef.current) {
                    isTouchStopped.current = true;
                    scrollToCurrentIndex();
                }
            },
            touchToStop === true ? 100 : touchToStop,
        );
    }

    function _handleItemClick(itemIndex: number) {
        if (!clickable || disabled || (touchToStop !== false && isTouchStopped.current)) {
            return;
        }
        _scrollToIndexWithChange(itemIndex, 200);
    }

    useEffect(() => {
        if (wrapRef.current) {
            wrapRef.current.addEventListener('touchstart', _handleColumnTouchStart);
            wrapRef.current.addEventListener('touchmove', _handleColumnTouchMove);
        }
        return () => {
            if (wrapRef.current) {
                wrapRef.current.removeEventListener('touchstart', _handleColumnTouchStart);
                wrapRef.current.removeEventListener('touchmove', _handleColumnTouchMove);
            }
        };
    }, [_handleColumnTouchStart, _handleColumnTouchMove]);

    useLayoutEffect(() => {
        if ('selectedValue' in props) {
            const curIndex = data.findIndex((item: PickerData) => item.value === selectedValue);
            setCurrentIndex(Math.max(curIndex, 0));

            if (curIndex >= 0) {
                _scrollToIndexWithChange(curIndex);
            }
        }
    }, [selectedValue, itemHeight, data]);

    useImperativeHandle(ref, () => ({
        movingStatus: movingStatusRef.current,
        scrollToCurrentIndex,
    }));

    return !hideEmptyCols || (data && data.length) ? (
        <div className={`${prefixCls}-column`}>
            <div
                className={`${prefixCls}-column-item-wrap`}
                style={colStyle}
                ref={wrapRef}
                onTouchStart={_handleItemTouchStart}
                onTouchEnd={_handleColumnTouchEnd}
                onTouchCancel={_handleColumnTouchEnd}
                aria-disabled={disabled}
            >
                {data.map((item, index) => {
                    const dis = Math.abs(index - currentIndex);
                    return (
                        <div
                            aria-label={index === currentIndex ? `${item.value}` : ''}
                            key={`${index}_${item.value}`}
                            className={cls(`${prefixCls}-column-item`, {
                                selected: index === currentIndex,
                                [`selected-neighbor-${dis}`]:
                                    dis && dis <= Math.floor(rowCount / 2),
                            })}
                            style={style}
                            onClick={() => _handleItemClick(index)}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
});

export default PickerCell;
