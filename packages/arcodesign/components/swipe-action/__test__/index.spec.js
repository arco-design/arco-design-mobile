import React, { createRef } from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import SwipeAction from '..';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { mockAddListener } from '../../../tests/helpers/mockEvent';
import { mockSwipe } from './utils';
demoTest('swipe-action');

mountTest(SwipeAction, 'SwipeAction');

const prefix = `${defaultContext.prefixCls}-swipe-action`;

const props = {
    rightActions: [
        {
            text: '置顶',
            style: {
                background: '#C9CDD4',
            },
        },
        {
            text: '删除',
            style: {
                background: '#F53F3F',
            },
        },
        {
            text: '点赞',
            style: {
                background: '#C9CDD4',
            },
        },
    ],
    leftActions: [
        {
            text: '置顶',
            style: {
                background: '#C9CDD4',
            },
            onClick: () => false,
        },
        {
            text: '删除',
            style: {
                background: '#F53F3F',
            },
        },
    ],
};

const contentStyle = {
    width: '100%',
    height: '50px',
};
const ContentDiv = () => <div style={contentStyle}></div>;

describe('SwipeAction', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render correctly when set swipe-action and children', () => {
        const component = mount(
            <SwipeAction {...props}>
                <ContentDiv />
            </SwipeAction>,
        );
        expect(component.find(`.${prefix}`).length).toBe(1);
        expect(component.find(`.${prefix}-menu`).length).toBe(2);
        expect(component.find(`.${prefix}-menu-action-left`).length).toBe(2);
        expect(component.find(`.${prefix}-menu-action-right`).length).toBe(3);
    });

    it('should should support swipe-action to onClose and onOpen', async () => {
        const mockOpenFn = jest.fn();
        const mockCloseFn = jest.fn();
        const ref = createRef();
        mount(
            <SwipeAction {...props} ref={ref} onOpen={mockOpenFn} onClose={mockCloseFn}>
                <ContentDiv />
            </SwipeAction>,
        );
        const wrapper = ref.current;
        wrapper.open('left');
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        expect(mockOpenFn).toBeCalled();
        wrapper.close();
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        expect(mockCloseFn).toBeCalled();
    });

    it('should allow to drag to show  menu', async () => {
        const ref = createRef();
        const mockOpenFn = jest.fn();
        const component = mount(
            <SwipeAction {...props} ref={ref} onOpen={mockOpenFn}>
                <ContentDiv />
            </SwipeAction>,
        );
        const map = mockAddListener(component.find(`.${prefix}`).at(0));
        mockSwipe(map, component, prefix, { touchstart: 100, touchmove: 200, touchend: 400 });
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        expect(mockOpenFn).toBeCalled();
    });

    it('click document the swipe action should close', async () => {
        const ref = createRef();
        const mockFn = jest.fn();
        const component = mount(
            <SwipeAction closeOnTouchOutside ref={ref} {...props} onClose={mockFn}>
                <ContentDiv />
            </SwipeAction>,
        );
        const SwipeElement = ref.current;
        const event = new Event('touchstart');

        act(() => {
            SwipeElement.open('right');
            document.dispatchEvent(event);
        });
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        expect(mockFn).toBeCalled();
    });
});
