import { act } from 'react-dom/test-utils';

export function delay(wrapper, time) {
    act(() => {
        jest.advanceTimersByTime(time);
    });
    wrapper.update();
}
