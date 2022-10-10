import React, {
    useCallback,
    useContext,
    useState,
    useEffect,
    RefObject,
    useMemo,
    useRef,
} from 'react';
import { SliderContext, LinePosition } from '.';

enum IsTouchingStatus {
    Idle,
    Start,
    Moving,
}

export const useSliderEvents = ({
    getLinePosition,
    lineRef,
    valueGroup,
    setValueGroup,
    setCommonIsTouching,
}: {
    getLinePosition: () => LinePosition;
    lineRef: RefObject<HTMLDivElement>;
    valueGroup: number | number[];
    setValueGroup: React.Dispatch<React.SetStateAction<number | [number, number]>>;
    setCommonIsTouching: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { disabled, step, min, max, type, draggableTrackOnly } = useContext(SliderContext);
    const [isTouching, setIsTouching] = useState(IsTouchingStatus.Idle);
    const [touchStartPosition, setTouchStartPosition] = useState(0);
    const linePositionRef = useRef<LinePosition>({ length: 0, start: 0 });

    const isHorizontal = /^horizontal/g.test(type);

    const validateValue = useCallback(
        value => {
            if (value >= min && value <= max) return value;
            return value <= (min + max) / 2 ? min : max;
        },
        [min, max],
    );

    // 通过位置获取值
    // @en Get value by position
    const getValueFromPosition = useCallback(
        (touchPosition: number) => {
            const { length, start } = linePositionRef.current;
            if (length === 0) return 0;
            let newWidth = isHorizontal ? touchPosition - start : length - touchPosition + start;
            if (newWidth < 0) {
                newWidth = 0;
            } else if (newWidth > length) {
                newWidth = length;
            }
            const newRealTimeValue = validateValue(
                Math.round(((newWidth / length) * (max - min)) / step) * step + min,
            );
            return newRealTimeValue;
        },
        [isHorizontal, max, min, step],
    );

    // 设置不同的值，因为可以点击 line ，需要提前计算具体修改的是哪个值。
    // @en Set different values. Because line can  be clicked, it needs to calculate which value to modify in advance.
    const setCommonValue = useMemo(() => {
        const start = getValueFromPosition(touchStartPosition);
        if (!Array.isArray(valueGroup)) {
            if (isTouching) {
                setValueGroup(start);
                setCommonIsTouching(0);
                setIsTouching(IsTouchingStatus.Moving);
            }
            return (realTimeValue: number) => {
                setValueGroup(realTimeValue);
            };
        }
        const index = Math.abs(valueGroup[0] - start) < Math.abs(valueGroup[1] - start) ? 0 : 1;
        const handleValue = (realTimeValue: number) => {
            setValueGroup(passValueGroup => {
                if (typeof passValueGroup === 'number') {
                    return [passValueGroup, realTimeValue];
                }
                const newValueGroup = [...passValueGroup] as [number, number];
                newValueGroup[index] = realTimeValue;
                return newValueGroup;
            });
        };
        if (isTouching) {
            setCommonIsTouching(index);
            handleValue(start);
            setIsTouching(IsTouchingStatus.Moving);
        }
        return handleValue;
    }, [touchStartPosition, getValueFromPosition]);

    useEffect(() => {
        if (disabled) return;
        const handleTouchStart = (e: TouchEvent) => {
            if (draggableTrackOnly && e.target === lineRef.current) return;
            linePositionRef.current = getLinePosition();
            const { clientX, clientY } = e.touches[0];
            const touchPosition = isHorizontal ? clientX : clientY;
            setIsTouching(IsTouchingStatus.Start);
            setTouchStartPosition(touchPosition);
            e.stopPropagation();
            e.preventDefault();
        };

        lineRef.current?.addEventListener('touchstart', handleTouchStart);
        return () => {
            !disabled && lineRef.current?.removeEventListener('touchstart', handleTouchStart);
        };
    }, [disabled, isHorizontal, draggableTrackOnly]);

    useEffect(() => {
        if (disabled) return;
        const handleTouchMove = (e: TouchEvent) => {
            if (isTouching === IsTouchingStatus.Moving) {
                const { clientX, clientY } = e.touches[0];
                const touchPosition = isHorizontal ? clientX : clientY;
                setCommonValue(getValueFromPosition(touchPosition));
            }
            e.stopPropagation();
            e.cancelable && e.preventDefault();
        };
        lineRef.current?.addEventListener('touchmove', handleTouchMove);
        return () => {
            !disabled && lineRef.current?.removeEventListener('touchmove', handleTouchMove);
        };
    }, [disabled, isHorizontal, isTouching]);

    useEffect(() => {
        if (disabled) return;
        const handleTouchEnd = (e: TouchEvent) => {
            setIsTouching(IsTouchingStatus.Idle);
            setCommonIsTouching(-1);
            e.stopPropagation();
            e.preventDefault();
        };
        lineRef.current?.addEventListener('touchend', handleTouchEnd);
        lineRef.current?.addEventListener('touchcancel', handleTouchEnd);
        return () => {
            !disabled && lineRef.current?.removeEventListener('touchend', handleTouchEnd);
            !disabled && lineRef.current?.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [disabled]);

    return {
        isTouching,
    };
};
