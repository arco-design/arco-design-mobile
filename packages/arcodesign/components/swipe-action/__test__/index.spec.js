import React, { createRef } from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import SwipeAction from '..';
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
function ContentDiv() {
    return <div style={contentStyle} />;
}

describe('SwipeAction', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render correctly when set swipe-action and children', () => {
        const { container } = render(
            <SwipeAction {...props}>
                <ContentDiv />
            </SwipeAction>,
        );
        expect(container.querySelectorAll(`.${prefix}`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}-menu`).length).toBe(2);
        expect(container.querySelectorAll(`.${prefix}-menu-action-left`).length).toBe(2);
        expect(container.querySelectorAll(`.${prefix}-menu-action-right`).length).toBe(3);
    });

    it('should should support swipe-action to onClose and onOpen', async () => {
        const mockOpenFn = jest.fn();
        const mockCloseFn = jest.fn();
        const ref = createRef();
        render(
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

    it('should allow to drag to show menu', async () => {
        const mockOpenFn = jest.fn();
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = () => ({
            width: 64,
        });
        const { container } = render(
            <SwipeAction {...props} onOpen={mockOpenFn}>
                <ContentDiv />
            </SwipeAction>,
        );
        const comp = container.querySelector(`.${prefix}`);
        mockSwipe(comp, { touchstart: 100, touchmove: 200, touchend: 400 });
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        expect(mockOpenFn).toBeCalled();
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    it('click document the swipe action should close', async () => {
        const ref = createRef();
        const mockFn = jest.fn();
        const { container } = render(
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
        act(() => {
            SwipeElement.open('right');
        });
        userEvent.click(container.querySelector(`.${prefix}-menu-action-left`));
        await act(async () => {
            await jest.advanceTimersByTime(500);
        });
        expect(mockFn).toBeCalledTimes(2);
    });
});
