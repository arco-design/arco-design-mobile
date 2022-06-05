import React, { createRef } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import { getTestDemo, openMasking, testMaskingCase } from '../../masking/__test__/utils';
import { mockElementProperty } from '../../../tests/helpers/mockElement';
import { createMoveTouchEventObject, createStartTouchEventObject, mockAddListener } from '../../../tests/helpers/mockEvent';
import PopupSwiper from '..';

demoTest('popup-swiper');

const popupPrefix = `${defaultContext.prefixCls}-popup`;
const prefix = `${popupPrefix}-swiper`;

function mockContainer(content, wrapper) {
    expect(typeof content).toBe('object');
    // mock container size
    mockElementProperty(content, 'offsetWidth', 375);
    mockElementProperty(content, 'offsetHeight', 300);
    wrapper.update();
}

function mockSwipe(map, touchMoveMap, wrapper, direc, clientMap) {
    const { touchstart, touchmove, touchend } = clientMap;
    const getTouchObj = (dis) => direc === 'x' ? { x: dis, y: 0 } : { x: 0, y: dis };
    act(() => {
        map.touchstart(createStartTouchEventObject(getTouchObj(touchstart)));
        touchMoveMap.touchmove(createMoveTouchEventObject(getTouchObj(touchmove)));
        jest.advanceTimersByTime(200);
        map.touchend(createMoveTouchEventObject(getTouchObj(touchend)));
        jest.advanceTimersByTime(600);
    });
    wrapper.update();
}

describe('PopupSwiper', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    testMaskingCase('popup-swiper', PopupSwiper, prefix, `${popupPrefix}-content`, `${popupPrefix}-mask`);

    it('should support swipe to close', () => {
        const ref = createRef();
        const TestDemo = getTestDemo(PopupSwiper);
        const wrapper = mount(<TestDemo
            mountOnEnter={false}
            unmountOnExit={false}
            direction="bottom"
            speedToClose={Infinity}
            ref={ref}
        />);
        wrapper.setProps({ direction: 'left' });
        const { content, dom } = ref.current;
        mockContainer(content, wrapper);
        const map = mockAddListener(content, true);
        const touchMoveMap = mockAddListener(dom, true);

        // swipe left to close when direction=left
        openMasking(wrapper, PopupSwiper);
        // should not close when distance is too short
        mockSwipe(map, touchMoveMap, wrapper, 'x', { touchstart: 300, touchmove: 250, touchend: 250 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(true);
        mockSwipe(map, touchMoveMap, wrapper, 'x', { touchstart: 300, touchmove: 100, touchend: 100 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(false);

        // swipe right to close when direction=right
        wrapper.setProps({ direction: 'right' });
        openMasking(wrapper, PopupSwiper);
        mockSwipe(map, touchMoveMap, wrapper, 'x', { touchstart: 100, touchmove: 300, touchend: 300 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(false);

        // swipe top to close when direction=top
        wrapper.setProps({ direction: 'top' });
        openMasking(wrapper, PopupSwiper);
        mockSwipe(map, touchMoveMap, wrapper, 'y', { touchstart: 300, touchmove: 100, touchend: 100 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(false);

        // swipe bottom to close when direction=bottom
        // should support specifying multiple directions to swipe to close by setting the `allowSwipeDirections` property
        wrapper.setProps({ direction: 'bottom', allowSwipeDirections: ['bottom', 'right'] });
        openMasking(wrapper, PopupSwiper);
        mockSwipe(map, touchMoveMap, wrapper, 'y', { touchstart: 300, touchmove: 600, touchend: 600 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(false);
        openMasking(wrapper, PopupSwiper);
        mockSwipe(map, touchMoveMap, wrapper, 'x', { touchstart: 100, touchmove: 300, touchend: 300 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(false);

        // should support using `onTouchStart` to stop touch event
        const onTouchStart = jest.fn(() => true);
        wrapper.setProps({ onTouchStart });
        openMasking(wrapper, PopupSwiper);
        mockSwipe(map, touchMoveMap, wrapper, 'x', { touchstart: 300, touchmove: 600, touchend: 600 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(true);

        // should not close by swipe when `allowSwipeDirections` is an empty array
        wrapper.setProps({ onTouchStart: undefined, allowSwipeDirections: [] });
        mockSwipe(map, touchMoveMap, wrapper, 'x', { touchstart: 300, touchmove: 600, touchend: 600 });
        expect(wrapper.find(PopupSwiper).props().visible).toBe(true);
    });

});
