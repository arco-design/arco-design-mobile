import { act } from '@testing-library/react';

export function delay(wrapper, time) {
    act(() => {
        jest.advanceTimersByTime(time);
    });
    wrapper.update();
}

export function pureDelay(time) {
    act(() => {
        jest.advanceTimersByTime(time);
    });
}
