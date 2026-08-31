import { act } from '@testing-library/react';

export function pureDelay(time) {
    act(() => {
        jest.advanceTimersByTime(time);
    });
}
