import React from 'react';
import { act, render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import PullRefresh from '..';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
    mockAddListener,
} from '../../../tests/helpers/mockEvent';
import { defaultContext } from '../../context-provider';

demoTest('pull-refresh', { useFakeTimers: true });

mountTest(PullRefresh, 'PullRefresh');

const prefix = `${defaultContext.prefixCls}-pull-refresh`;

describe('PullRefresh', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        act(() => jest.runAllTimers());
        jest.useRealTimers();
    });

    it('should render correctly when set ios type', () => {
        const { container: component } = render(<PullRefresh type="ios">Pull</PullRefresh>);
        expect(component.querySelectorAll(`.${prefix}-content`).length).toBe(1);
        expect(component.querySelector(`.${prefix}-content`).innerHTML).toBe('Pull');
    });

    it('should render correctly when set android type', () => {
        const { container: component } = render(<PullRefresh type="android">Pull</PullRefresh>);
        expect(component.querySelectorAll(`.${prefix}-content`).length).toBe(1);
        expect(component.querySelector(`.${prefix}-content`).innerHTML).toBe('Pull');
    });

    it('should callback correctly when ios type pull is triggered', async () => {
        const ref = React.createRef();
        const mockFn = jest.fn();
        const props = { type: 'ios', onRefresh: mockFn, tipsHeight: 40, ref };
        const { container: component, rerender } = render(
            <PullRefresh {...props} disabled>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(
            <PullRefresh {...props} disabled={false}>
                Pull
            </PullRefresh>,
        );
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('下拉即可刷新');
        act(() => {
            ref.current.dom.scrollTop = -50;
            map.touchstart(createStartTouchEventObject({ x: 0, y: 0 }));
            map.touchmove(createMoveTouchEventObject({ x: 0, y: 300 }));
            jest.advanceTimersByTime(0);
        });
        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 0, py: 500 }));
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('加载中...');
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('刷新成功');
    });

    it('should callback correctly when android type pull is triggered', async () => {
        const ref = React.createRef();
        const mockFn = jest.fn();
        const props = { type: 'android', onRefresh: mockFn, tipsHeight: 40, ref };
        const { container: component, rerender } = render(
            <PullRefresh {...props} disabled>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(
            <PullRefresh {...props} disabled={false}>
                Pull
            </PullRefresh>,
        );
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('下拉即可刷新');
        act(() => {
            ref.current.dom.scrollTop = 0;
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('下拉即可刷新');
        act(() => {
            ref.current.dom.scrollTop = 0;
            map.touchmove(createStartTouchEventObject({ px: 0, py: 300 }));
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('释放即可刷新');
        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 0, py: 500 }));
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('加载中...');
        await act(async () => {
            await jest.advanceTimersByTime(1000);
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('刷新成功');
    });

    it('should cancel refresh when pulling back past the starting point on android type', () => {
        const onRefresh = jest.fn();
        const props = { type: 'android', loosingMinHeight: 40, onRefresh };
        const { container: component, rerender } = render(
            <PullRefresh {...props} disabled>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(<PullRefresh {...props}>Pull</PullRefresh>);
        const place = component.querySelector(`.${prefix}-place`);
        const label = component.querySelector(`.${prefix}-label`);

        act(() => {
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 300 }));
        });
        expect(place.style.transform).not.toBe('');
        expect(label.textContent).toContain('释放即可刷新');

        act(() => {
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 50 }));
        });
        expect(label.textContent).toContain('下拉即可刷新');

        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 100, py: 50 }));
            jest.advanceTimersByTime(400);
        });
        expect(onRefresh).not.toHaveBeenCalled();
        expect(place.style.transform).toBe('');
        expect(label.textContent).toContain('下拉即可刷新');
    });

    it('should restore scrollTop when reset with negative scrollTop on android type', async () => {
        const ref = React.createRef();
        const { container: component, rerender } = render(
            <PullRefresh type="android" disabled loosingMinHeight={40} ref={ref}>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(
            <PullRefresh type="android" disabled={false} loosingMinHeight={40} ref={ref}>
                Pull
            </PullRefresh>,
        );

        act(() => {
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 110 }));
            ref.current.dom.scrollTop = -50;
            map.touchend(createMoveTouchEventObject({ px: 100, py: 110 }));
        });
        await act(async () => {
            await jest.advanceTimersByTime(400);
        });
        // reset 回调中把负 scrollTop 恢复为 0
        expect(ref.current.dom.scrollTop).toBe(0);
    });

    it('should reset scrollTop on scroll event while touching on android type', () => {
        const ref = React.createRef();
        const { container: component, rerender } = render(
            <PullRefresh type="android" disabled ref={ref}>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(
            <PullRefresh type="android" disabled={false} ref={ref}>
                Pull
            </PullRefresh>,
        );

        act(() => {
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 110 }));
            ref.current.dom.scrollTop = -50;
            // 触摸过程中 scroll 事件会把负 scrollTop 归零
            ref.current.dom.dispatchEvent(new Event('scroll'));
        });
        expect(ref.current.dom.scrollTop).toBe(0);

        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 100, py: 110 }));
        });
    });

    it('should callback refresh and skip finish text when finishText is null on android type', async () => {
        const ref = React.createRef();
        const mockFn = jest.fn();
        const { container: component } = render(
            <PullRefresh type="android" ref={ref} finishText={null} onRefresh={mockFn}>
                Pull
            </PullRefresh>,
        );

        act(() => {
            ref.current.refresh();
            jest.advanceTimersByTime(100);
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('加载中...');

        // finishText 为空时跳过刷新成功文案直接复位
        await act(async () => {
            await jest.advanceTimersByTime(1000);
            await jest.advanceTimersByTime(500);
        });
        expect(mockFn).toBeCalledTimes(1);
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('下拉即可刷新');
    });

    it('should skip finish text when finishText is null on ios type', async () => {
        const ref = React.createRef();
        const mockFn = jest.fn();
        const { container: component } = render(
            <PullRefresh type="ios" ref={ref} finishText={null} onRefresh={mockFn}>
                Pull
            </PullRefresh>,
        );

        act(() => {
            ref.current.refresh();
        });
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('加载中...');

        await act(async () => {
            await jest.advanceTimersByTime(1000);
            await jest.advanceTimersByTime(500);
        });
        expect(mockFn).toBeCalledTimes(1);
        // finishText 为空时复位后直接回到下拉文案
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('下拉即可刷新');
    });
});
