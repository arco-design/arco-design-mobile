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

    it('should reset translate and pull status when pulling back on android type', async () => {
        const { container: component, rerender } = render(
            <PullRefresh type="android" disabled loosingMinHeight={40}>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(
            <PullRefresh type="android" disabled={false} loosingMinHeight={40}>
                Pull
            </PullRefresh>,
        );
        const place = component.querySelector(`.${prefix}-place`);

        act(() => {
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 300 }));
        });
        // 下拉超过 loosingHeight 后出现位移
        expect(place.style.transform).toContain('translateY(80px)');

        // 回拉到负值时位移立即停止更新（保持当前值），内部偏移量被重置
        act(() => {
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 50 }));
        });
        expect(place.style.transform).toContain('translateY(80px)');

        // 未达到释放高度时 touchend 走 reset 分支
        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 100, py: 50 }));
        });
        await act(async () => {
            await jest.advanceTimersByTime(400);
        });
        expect(place.style.transform).toBe('');
        expect(component.querySelector(`.${prefix}-label`).innerHTML).toContain('下拉即可刷新');
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

    it('should ignore touchstart when not at top or already touching on android type', () => {
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

        // scrollTop 为负时 touchstart 被忽略
        act(() => {
            ref.current.dom.scrollTop = -50;
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
        });
        expect(component.querySelector(`.${prefix}-place`).style.transform).toBe('');

        // 触摸未结束时再次 touchstart 被忽略
        act(() => {
            ref.current.dom.scrollTop = 0;
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
        });
        expect(component.querySelector(`.${prefix}-place`).style.transform).toBe('');

        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 100, py: 100 }));
        });
    });

    it('should ignore touchend when idle or not at top on android type', () => {
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

        // 未拉动且不在顶部时 touchend 直接返回
        act(() => {
            ref.current.dom.scrollTop = 10;
            map.touchend(createMoveTouchEventObject({ px: 100, py: 100 }));
        });
        // 未 touchstart 时 touchend 直接返回
        act(() => {
            ref.current.dom.scrollTop = 0;
            map.touchend(createMoveTouchEventObject({ px: 100, py: 100 }));
        });
        expect(component.querySelector(`.${prefix}-place`).style.transform).toBe('');
    });

    it('should ignore touchmove when disabled or not started on android type', () => {
        const ref = React.createRef();
        const { container: component, rerender } = render(
            <PullRefresh type="android" ref={ref}>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        // 禁用状态下 touchmove 直接返回
        rerender(
            <PullRefresh type="android" disabled ref={ref}>
                Pull
            </PullRefresh>,
        );
        act(() => {
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 300 }));
        });
        expect(component.querySelector(`.${prefix}-place`).style.transform).toBe('');

        // 未 touchstart 时 touchmove 直接返回
        rerender(
            <PullRefresh type="android" disabled={false} ref={ref}>
                Pull
            </PullRefresh>,
        );
        act(() => {
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 300 }));
        });
        expect(component.querySelector(`.${prefix}-place`).style.transform).toBe('');
    });

    it('should ignore touchmove when scrollTop positive or pulling back at beginning on android type', () => {
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
            // 未产生位移且 scrollTop > 0 时 touchmove 被忽略
            ref.current.dom.scrollTop = 10;
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 200 }));
        });
        expect(component.querySelector(`.${prefix}-place`).style.transform).toBe('');

        act(() => {
            // 未产生位移时向上拉（负向 pullY）被忽略
            ref.current.dom.scrollTop = 0;
            map.touchmove(createMoveTouchEventObject({ px: 100, py: 50 }));
        });
        expect(component.querySelector(`.${prefix}-place`).style.transform).toBe('');

        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 100, py: 50 }));
        });
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

    it('should warn when calling updateIOSHeight on android type', () => {
        const ref = React.createRef();
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(
            <PullRefresh type="android" ref={ref}>
                Pull
            </PullRefresh>,
        );

        act(() => {
            ref.current.updateIOSHeight();
        });
        expect(warnSpy).toBeCalledWith('updateIOSHeight 仅在 type="ios" 时可用');
        warnSpy.mockRestore();
    });

    it('should set scrollTop to 1 when touching start at top on ios type', () => {
        const ref = React.createRef();
        const { container: component, rerender } = render(
            <PullRefresh type="ios" disabled ref={ref}>
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(
            <PullRefresh type="ios" disabled={false} ref={ref}>
                Pull
            </PullRefresh>,
        );

        act(() => {
            map.touchstart(createStartTouchEventObject({ x: 0, y: 0 }));
        });
        // ios 在顶部开始触摸时 scrollTop 置为 1
        expect(ref.current.dom.scrollTop).toBe(1);
    });

    it('should ignore touchend and touchmove when disabled on ios type', () => {
        const { container: component, rerender } = render(
            <PullRefresh type="ios">
                Pull
            </PullRefresh>,
        );
        const map = mockAddListener(component.querySelector(`.${prefix}`));
        rerender(
            <PullRefresh type="ios" disabled>
                Pull
            </PullRefresh>,
        );

        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 0, py: 500 }));
            map.touchmove(createMoveTouchEventObject({ px: 0, py: 300 }));
        });
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
