import { act, fireEvent } from '@testing-library/react';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
} from '../../../tests/helpers/mockEvent';

export function mockSwipeStart(map, clientXMap) {
    const { touchstart, touchmove } = clientXMap;
    act(() => {
        map.touchstart(createStartTouchEventObject({ x: touchstart, y: 0 }));
        map.touchmove(createMoveTouchEventObject({ x: touchmove, y: 0 }));
    });
}
export function mockSwipeEnd(wrapper, className, touchend) {
    fireEvent.touchEnd(
        wrapper.querySelector(`.${className}`),
        createMoveTouchEventObject({ x: touchend, y: 0 }),
    );
    act(() => {
        jest.advanceTimersByTime(600);
    });
}

export function mockSwipe(map, wrapper, className, clientXMap) {
    const { touchend } = clientXMap;
    mockSwipeStart(map, clientXMap);
    mockSwipeEnd(wrapper, className, touchend);
}
