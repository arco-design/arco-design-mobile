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

demoTest('pull-refresh');

mountTest(PullRefresh, 'PullRefresh');

const prefix = `${defaultContext.prefixCls}-pull-refresh`;

describe('PullRefresh', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
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
});
