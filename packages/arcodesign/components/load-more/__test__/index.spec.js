import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import { mockAddListener, createStartTouchEventObject, createMoveTouchEventObject } from '../../../tests/helpers/mockEvent';
import { mockContainerSize, resetContainerSizeMock } from '../../../tests/helpers/mockElement';
import LoadMore from '..';

const prefix = `${defaultContext.prefixCls}-load-more`;

demoTest('load-more');

mountTest(LoadMore, 'LoadMore');

describe('LoadMore type', () => {
    it('Loading state is rendered correctly', () => {
        const wrapper = mount(<LoadMore status='loading' />);
        expect(wrapper.find(`.${prefix}`).text()).toEqual('正在努力加载中...');
    });
    it('Prepare state is rendered correctly', () => {
        const wrapper = mount(<LoadMore status='prepare' />);
        expect(wrapper.find(`.${prefix}`).text()).toEqual('上拉加载更多');
    });
    it('Nomore state is rendered correctly', () => {
        const wrapper = mount(<LoadMore status='nomore' />);
        expect(wrapper.find(`.${prefix}`).text()).toEqual('没有更多数据了');
    });
    it('Retry state is rendered correctly', () => {
        const wrapper = mount(<LoadMore status='retry' />);
        expect(wrapper.find(`.${prefix}`).text()).toEqual('加载失败，点击重试');
    });
})

describe('LoadMore action', () => {

    beforeAll(() => {
        mockContainerSize();
    });

    afterAll(() => {
        resetContainerSizeMock();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('onClick listener correctly', () => {
        const onClick = jest.fn();
        const wrapper = mount(<LoadMore onClick={onClick} throttle={200}/>);
        const map = mockAddListener(wrapper.find(`.${prefix}`));
        wrapper.setProps({
            throttle: 500,
        });
        act(() => {
            map.touchstart(createStartTouchEventObject({ x: 0, y: 0 }));
            map.touchmove(createMoveTouchEventObject({ x: 0, y: 300 }));
            jest.advanceTimersByTime(0);
        });
        act(() => {
            map.touchend(createMoveTouchEventObject({ x: 0, y: 500 }));
        });
        wrapper.update();
    });
})
