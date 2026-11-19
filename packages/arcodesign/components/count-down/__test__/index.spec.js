import React, { useEffect } from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import CountDown from '..';
import { startTask, stopTask } from '../singleton';
import '@testing-library/jest-dom';

demoTest('count-down', { useFakeTimers: true });

mountTest(CountDown, 'CountDown');

const Demo = props => {
    const ref = React.useRef();
    return (
        <>
            <CountDown {...props} ref={ref} />
            <button
                onClick={() => {
                    ref.current.start();
                }}
            >
                start
            </button>
        </>
    );
};

describe('CountDown', () => {
    it('should render correctly', async () => {
        const { container } = render(
            <Demo format={'S'} time={{ hours: 0, minutes: 0, seconds: 9 }} />,
        );
        expect(container).toHaveTextContent('9');
    });

    it('should count down per second and call onFinish (macro task)', () => {
        jest.useFakeTimers();
        const realNow = Date.now();
        let fakeNow = realNow;
        const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => fakeNow);
        const onChange = jest.fn();
        const onFinish = jest.fn();
        const { container } = render(
            <CountDown time={3000} format="s" autoStart onChange={onChange} onFinish={onFinish} />,
        );
        expect(container).toHaveTextContent('3');
        fakeNow = realNow + 1000;
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(container).toHaveTextContent('2');
        expect(onChange).toBeCalledTimes(1);
        fakeNow = realNow + 2000;
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(container).toHaveTextContent('1');
        fakeNow = realNow + 3000;
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(onFinish).toBeCalledTimes(1);
        expect(container).toHaveTextContent('0');
        dateSpy.mockRestore();
        jest.useRealTimers();
    });

    it('should count down per frame with raf polyfill (micro task)', () => {
        jest.useFakeTimers();
        const realNow = Date.now();
        let fakeNow = realNow;
        const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => fakeNow);
        const originalRaf = window.requestAnimationFrame;
        window.requestAnimationFrame = undefined;
        const onChange = jest.fn();
        const onFinish = jest.fn();
        const { container } = render(
            <CountDown
                time={500}
                millisecond
                format="SSS"
                autoStart
                onChange={onChange}
                onFinish={onFinish}
            />,
        );
        expect(container).toHaveTextContent('500');
        let iter = 0;
        while (!onFinish.mock.calls.length && iter < 60) {
            fakeNow = realNow + iter * 16;
            act(() => {
                jest.advanceTimersByTime(16);
            });
            iter += 1;
        }
        expect(onFinish).toBeCalledTimes(1);
        expect(container).toHaveTextContent('000');
        window.requestAnimationFrame = originalRaf;
        dateSpy.mockRestore();
        jest.useRealTimers();
    });

    it('should finish immediately when time is zero', () => {
        jest.useFakeTimers();
        const realNow = Date.now();
        const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => realNow);
        const onFinish = jest.fn();
        render(<CountDown time={0} format="s" autoStart onFinish={onFinish} />);
        expect(onFinish).toBeCalledTimes(1);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(onFinish).toBeCalledTimes(1);
        dateSpy.mockRestore();
        jest.useRealTimers();
    });

});

describe('CountDown task queue', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    it('finishes simultaneous countdowns in start order on the same tick', () => {
        const now = jest.spyOn(Date, 'now').mockReturnValue(0);
        const onFinish = jest.fn();
        const { getAllByText } = render(
            <>
                <CountDown time={1000} format="s" onFinish={() => onFinish('A')} />
                <CountDown time={1000} format="s" onFinish={() => onFinish('B')} />
            </>,
        );
        now.mockReturnValue(1000);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(onFinish.mock.calls).toEqual([['A'], ['B']]);
        expect(getAllByText('0')).toHaveLength(2);
    });

    it('skips cancelled tasks and runs new tasks on the next tick', () => {
        const calls = [];
        const finish = name => () => {
            calls.push(name);
            return false;
        };
        let cancelledId;
        startTask('macro', () => {
            calls.push('first');
            stopTask('macro', cancelledId);
            startTask('macro', finish('added'));
            return false;
        });
        cancelledId = startTask('macro', finish('cancelled'));
        startTask('macro', finish('last'));

        jest.advanceTimersByTime(1000);
        expect(calls).toEqual(['first', 'last']);
        jest.advanceTimersByTime(1000);
        expect(calls).toEqual(['first', 'last', 'added']);
    });
});
