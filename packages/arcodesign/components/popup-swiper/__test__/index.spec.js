import React, { createRef } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import { getTestDemo, openMasking, testMaskingCase } from '../../masking/__test__/utils';
import { mockElementProperty } from '../../../tests/helpers/mockElement';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
} from '../../../tests/helpers/mockEvent';
import PopupSwiper from '..';

demoTest('popup-swiper', { useFakeTimers: true, waitTimers: true });

const popupPrefix = `${defaultContext.prefixCls}-popup`;
const prefix = `${popupPrefix}-swiper`;

function mockContainer(content) {
    expect(typeof content).toBe('object');
    // mock container size
    mockElementProperty(content, 'offsetWidth', 375);
    mockElementProperty(content, 'offsetHeight', 300);
}

function mockSwipe(map, touchMoveMap, direc, clientMap) {
    const { touchstart, touchmove, touchend } = clientMap;
    const getTouchObj = dis => (direc === 'x' ? { x: dis, y: 0 } : { x: 0, y: dis });
    act(() => {
        fireEvent.touchStart(map, createStartTouchEventObject(getTouchObj(touchstart)));
        fireEvent.touchMove(touchMoveMap, createMoveTouchEventObject(getTouchObj(touchmove)));
        jest.advanceTimersByTime(200);
        fireEvent.touchEnd(map, createMoveTouchEventObject(getTouchObj(touchend)));
        jest.advanceTimersByTime(600);
    });
}

describe('PopupSwiper', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        act(() => jest.runAllTimers());
        jest.useRealTimers();
    });

    testMaskingCase(
        'popup-swiper',
        PopupSwiper,
        prefix,
        'ARCO_POPUP_SWIPER',
        `${popupPrefix}-content`,
        `${popupPrefix}-mask`,
    );

    it('should support swipe to close', () => {
        const ref = createRef();
        const TestDemo = getTestDemo(PopupSwiper);
        const { rerender } = render(
            <TestDemo
                mountOnEnter={false}
                unmountOnExit={false}
                direction="bottom"
                speedToClose={Infinity}
                ref={ref}
            />,
        );
        rerender(
            <TestDemo
                mountOnEnter={false}
                unmountOnExit={false}
                direction="left"
                speedToClose={Infinity}
                ref={ref}
            />,
        );
        const { content, dom, mask } = ref.current;
        mockContainer(content);
        const map = content;
        const touchMoveMap = dom;

        // swipe left to close when direction=left
        openMasking();
        act(() => jest.runAllTimers());
        // should not close when distance is too short
        mockSwipe(map, touchMoveMap, 'x', {
            touchstart: 300,
            touchmove: 250,
            touchend: 250,
        });
        act(() => jest.runAllTimers());
        // rtl 不支持检查组件props值，只能通过masking的className来判断是否visible
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(false);
        mockSwipe(map, touchMoveMap, 'x', {
            touchstart: 300,
            touchmove: 100,
            touchend: 100,
        });
        act(() => jest.runAllTimers());
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(true);

        // swipe right to close when direction=right
        rerender(
            <TestDemo
                mountOnEnter={false}
                unmountOnExit={false}
                direction="right"
                speedToClose={Infinity}
                ref={ref}
            />,
        );
        openMasking();
        act(() => jest.runAllTimers());
        mockSwipe(map, touchMoveMap, 'x', {
            touchstart: 100,
            touchmove: 300,
            touchend: 300,
        });
        act(() => jest.runAllTimers());
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(true);

        // swipe top to close when direction=top
        rerender(
            <TestDemo
                mountOnEnter={false}
                unmountOnExit={false}
                direction="top"
                speedToClose={Infinity}
                ref={ref}
            />,
        );
        openMasking();
        act(() => jest.runAllTimers());
        mockSwipe(map, touchMoveMap, 'y', {
            touchstart: 300,
            touchmove: 100,
            touchend: 100,
        });
        act(() => jest.runAllTimers());
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(true);

        // swipe bottom to close when direction=bottom
        // should support specifying multiple directions to swipe to close by setting the `allowSwipeDirections` property
        rerender(
            <TestDemo
                mountOnEnter={false}
                unmountOnExit={false}
                direction="bottom"
                allowSwipeDirections={['bottom', 'right']}
                speedToClose={Infinity}
                ref={ref}
            />,
        );
        openMasking();
        act(() => jest.runAllTimers());
        mockSwipe(map, touchMoveMap, 'y', {
            touchstart: 300,
            touchmove: 600,
            touchend: 600,
        });
        act(() => jest.runAllTimers());
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(true);
        openMasking();
        act(() => jest.runAllTimers());
        mockSwipe(map, touchMoveMap, 'x', {
            touchstart: 100,
            touchmove: 300,
            touchend: 300,
        });
        act(() => jest.runAllTimers());
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(true);

        // should support using `onTouchStart` to stop touch event
        const onTouchStart = jest.fn(() => true);
        rerender(
            <TestDemo
                mountOnEnter={false}
                unmountOnExit={false}
                direction="bottom"
                allowSwipeDirections={['bottom', 'right']}
                speedToClose={Infinity}
                onTouchStart={onTouchStart}
                ref={ref}
            />,
        );
        openMasking();
        act(() => jest.runAllTimers());
        mockSwipe(map, touchMoveMap, 'x', {
            touchstart: 300,
            touchmove: 600,
            touchend: 600,
        });
        act(() => jest.runAllTimers());
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(false);

        // should not close by swipe when `allowSwipeDirections` is an empty array
        rerender(
            <TestDemo
                mountOnEnter={false}
                unmountOnExit={false}
                direction="bottom"
                allowSwipeDirections={[]}
                speedToClose={Infinity}
                onTouchStart={undefined}
                ref={ref}
            />,
        );
        mockSwipe(map, touchMoveMap, 'x', {
            touchstart: 300,
            touchmove: 600,
            touchend: 600,
        });
        act(() => jest.runAllTimers());
        expect(mask.classList.contains('arco-fade-exit-done')).toBe(false);
    });
});
