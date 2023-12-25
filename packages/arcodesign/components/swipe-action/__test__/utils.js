import { act, fireEvent } from '@testing-library/react';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
} from '../../../tests/helpers/mockEvent';

export function mockSwipeStart(comp, clientXMap) {
    const { touchstart, touchmove } = clientXMap;
    act(() => {
        fireEvent.touchStart(
            comp,
            createStartTouchEventObject({ x: touchstart, px: touchstart, y: 0 }),
        );
        fireEvent.touchMove(
            comp,
            createMoveTouchEventObject({ x: touchmove, px: touchmove, y: 0 }),
        );
    });
}
export function mockSwipeEnd(comp, touchend) {
    fireEvent.touchEnd(comp, createMoveTouchEventObject({ x: touchend, px: touchend, y: 0 }));
    act(() => {
        jest.advanceTimersByTime(600);
    });
}

export function mockSwipe(comp, clientXMap) {
    const { touchend } = clientXMap;
    mockSwipeStart(comp, clientXMap);
    mockSwipeEnd(comp, touchend);
}
