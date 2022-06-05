import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import PullRefresh from '..';
import { mount } from 'enzyme';
import { createMoveTouchEventObject, createStartTouchEventObject, mockAddListener } from '../../../tests/helpers/mockEvent';
import { defaultContext } from '../../context-provider';
import { act } from 'react-dom/test-utils';

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
        const component = mount(<PullRefresh type="ios">Pull</PullRefresh>);
        expect(component.find(`.${prefix}-content`).length).toBe(1);
        expect(component.find(`.${prefix}-content`).text()).toBe('Pull');
    });

    it('should render correctly when set android type', () => {
        const component = mount(<PullRefresh type="android">Pull</PullRefresh>);
        expect(component.find(`.${prefix}-content`).length).toBe(1);
        expect(component.find(`.${prefix}-content`).text()).toBe('Pull');
    });
    it('should callback correctly when ios type pull is triggered', async () => {
        const ref = React.createRef();
        const mockFn = jest.fn();
        const component = mount(<PullRefresh type="ios" disabled={true} onRefresh={mockFn} tipsHeight={40} ref={ref}>Pull</PullRefresh>);
        const map = mockAddListener(component.find(`.${prefix}`));
        component.setProps({ disabled: false });
        expect(component.find(`.${prefix}-label`).text()).toBe('下拉即可刷新');
        act(() => {
            ref.current.dom.scrollTop = -50;
            map.touchstart(createStartTouchEventObject({ x: 0, y: 0 }));
            map.touchmove(createMoveTouchEventObject({ x: 0, y: 300 }));
            jest.advanceTimersByTime(0);
        });
        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 0, py: 500 }));
        });
        expect(component.find(`.${prefix}-label`).text()).toBe('加载中...');
        component.update();
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        component.update();
        expect(component.find(`.${prefix}-label`).text()).toBe('刷新成功');
    });
    it('should callback correctly when android type pull is triggered', async () => {
        const ref = React.createRef();
        const mockFn = jest.fn();
        const component = mount(<PullRefresh type="android" disabled={true} onRefresh={mockFn} tipsHeight={40} ref={ref}>Pull</PullRefresh>);
        const map = mockAddListener(component.find(`.${prefix}`));
        component.setProps({ disabled: false });
        expect(component.find(`.${prefix}-label`).text()).toBe('下拉即可刷新');
        act(() => {
            ref.current.dom.scrollTop = 0;
            map.touchstart(createStartTouchEventObject({ px: 100, py: 100 }));
        });
        component.update();
        expect(component.find(`.${prefix}-label`).text()).toBe('下拉即可刷新');
        act(() => {
            ref.current.dom.scrollTop = 0;
            map.touchmove(createStartTouchEventObject({ px: 0, py: 300 }));
        });
        component.update();
        expect(component.find(`.${prefix}-label`).text()).toBe('释放即可刷新');
        act(() => {
            map.touchend(createMoveTouchEventObject({ px: 0, py: 500 }));
        });
        component.update();
        expect(component.find(`.${prefix}-label`).text()).toBe('加载中...');
        component.update();
        await act(async () => {
            await jest.advanceTimersByTime(1000);
        });
        component.update();
        expect(component.find(`.${prefix}-label`).text()).toBe('刷新成功');
    });
});
