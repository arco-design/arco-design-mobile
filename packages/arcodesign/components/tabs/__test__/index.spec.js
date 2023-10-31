import React, { createRef } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import Tabs from '..';
import { mockElementProperty } from '../../../tests/helpers/mockElement';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
    mockAddListener,
} from '../../../tests/helpers/mockEvent';
import '@testing-library/jest-dom';

demoTest('tabs', { useFakeTimers: true });

const prefix = `${defaultContext.prefixCls}-tabs`;
const prefixTab = `${defaultContext.prefixCls}-tab`;

function indexIsActive(container, index) {
    return container.querySelectorAll(`.${prefixTab}-cell`)[index].classList.contains('active');
}

function mockSwipe(map, clientXMap) {
    const { touchstart, touchmove, touchend } = clientXMap;
    act(() => {
        fireEvent.touchStart(map, createStartTouchEventObject({ x: touchstart, y: 0 }));
        fireEvent.touchMove(map, createMoveTouchEventObject({ x: touchmove, y: 0 }));
    });
    fireEvent.touchEnd(map, createMoveTouchEventObject({ x: touchend, y: 0 }));
    act(() => {
        jest.advanceTimersByTime(600);
    });
}

function mockContainer(ref) {
    const { dom, bar, updateLayout } = ref.current;
    const { dom: barDom } = bar || {};
    expect(typeof dom).toBe('object');
    expect(typeof barDom).toBe('object');
    // mock container size
    mockElementProperty(dom, 'offsetWidth', 375);
    mockElementProperty(dom, 'offsetHeight', 300);
    mockElementProperty(barDom, 'offsetWidth', 375);
    mockElementProperty(barDom, 'scrollWidth', 1000);
    expect(typeof updateLayout).toBe('function');
    act(() => {
        updateLayout();
        jest.runOnlyPendingTimers();
    });
}

describe('Tabs', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should switch tabs by clicking tab cell correctly', () => {
        const onChange = jest.fn();
        const onAfterChange = jest.fn();
        const onTabClick = jest.fn();
        const { container, rerender } = render(
            <Tabs
                tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                defaultActiveTab={1}
                onChange={onChange}
                onAfterChange={onAfterChange}
                onTabClick={onTabClick}
                transitionDuration={500}
                disabled
                useCaterpillar
            >
                <div className="demo-tab-content">Content 1</div>
                <div className="demo-tab-content">Content 2</div>
            </Tabs>,
        );
        expect(indexIsActive(container, 1)).toBe(true);
        expect(container.querySelectorAll(`.${prefixTab}-cell`).length).toBe(2);
        userEvent.click(container.querySelector(`.${prefixTab}-cell`));
        expect(onTabClick.mock.calls).toHaveLength(0);
        expect(onChange.mock.calls).toHaveLength(0);
        rerender(
            <Tabs
                tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                defaultActiveTab={1}
                onChange={onChange}
                onAfterChange={onAfterChange}
                onTabClick={onTabClick}
                transitionDuration={500}
                disabled={false}
                useCaterpillar
            >
                <div className="demo-tab-content">Content 1</div>
                <div className="demo-tab-content">Content 2</div>
            </Tabs>,
        );
        userEvent.click(container.querySelector(`.${prefixTab}-cell`));
        expect(onTabClick.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([{ title: 'Title 1' }, 0, 'click']);
        expect(onAfterChange.mock.calls).toHaveLength(0);
        act(() => {
            jest.advanceTimersByTime(600);
        });
        expect(onAfterChange.mock.calls).toHaveLength(1);
        expect(onAfterChange.mock.calls[0]).toEqual([{ title: 'Title 1' }, 0, 'click']);
    });

    it('should support scroll mode correctly', () => {
        const onChange = jest.fn();
        const ref = createRef();
        const { container: wrapper, rerender } = render(
            <Tabs
                tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                onChange={onChange}
                transitionDuration={500}
                disabled
                ref={ref}
            >
                <div style={{ height: 300 }}>Content 1</div>
                <div style={{ height: 300 }}>Content 2</div>
            </Tabs>,
        );
        // mock size
        mockElementProperty(window, 'innerHeight', 700);
        mockContainer(ref);
        const map = mockAddListener(window, true);
        // wrapper.setProps({ mode: 'scroll', disabled: false, scrollThrottle: 0 });
        rerender(
            <Tabs
                tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                onChange={onChange}
                transitionDuration={500}
                disabled={false}
                scrollOffset={0}
                mode="scroll"
                ref={ref}
            >
                <div style={{ height: 300 }}>Content 1</div>
                <div style={{ height: 300 }}>Content 2</div>
            </Tabs>,
        );
        // mock scroll position
        const firstPaneDom = wrapper.querySelector(`.${prefixTab}-pane`);
        firstPaneDom.getBoundingClientRect = jest.fn(() => ({
            top: 100,
            bottom: 400,
            left: 0,
            right: 375,
        }));
        const lastPaneDom = wrapper.querySelectorAll(`.${prefixTab}-pane`)[1];
        lastPaneDom.getBoundingClientRect = jest.fn(() => ({
            top: 400,
            bottom: 700,
            left: 0,
            right: 375,
        }));
        global.window.requestAnimationFrame = jest.fn(fn => setTimeout(fn, 20));
        act(() => {
            jest.advanceTimersByTime(400);
            map.scroll();
        });
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([{ title: 'Title 2' }, 1, 'scroll']);
        const onScroll = jest.fn();
        const { scrollToIndex } = ref.current;
        expect(typeof scrollToIndex).toBe('function');
        // wrapper.setProps({ onScroll });
        scrollToIndex(0);
        // wrapper.update();
        // expect(onScroll.mock.calls).toHaveLength(1);
    });

    it('should switch tabs by swiping correctly', () => {
        const onChange = jest.fn();
        const onAfterChange = jest.fn();
        const onTouchStopped = jest.fn();
        const ref = createRef();
        const { container: wrapper, rerender } = render(
            <Tabs
                tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                onChange={onChange}
                onAfterChange={onAfterChange}
                onTouchStopped={onTouchStopped}
                swipeable={false}
                touchSideDisableThreshold={40}
                stopTouchThreshold={40}
                ref={ref}
            >
                <div className="demo-tab-content">Content 1</div>
                <div className="demo-tab-content">Content 2</div>
            </Tabs>,
        );
        mockContainer(ref);
        expect(
            wrapper.querySelector(`.${prefixTab}-cell-container`).classList.contains('overflow'),
        ).toBe(true);
        const map = wrapper.querySelector(`.${prefixTab}-pane-container`);
        rerender(
            <Tabs
                tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                onChange={onChange}
                onAfterChange={onAfterChange}
                onTouchStopped={onTouchStopped}
                swipeable
                touchSideDisableThreshold={40}
                stopTouchThreshold={40}
                onTouchStart={onTouchStart}
                ref={ref}
            >
                <div className="demo-tab-content">Content 1</div>
                <div className="demo-tab-content">Content 2</div>
            </Tabs>,
        );
        // swipe to next tab
        mockSwipe(map, { touchstart: 300, touchmove: 150, touchend: 100 });
        expect(indexIsActive(wrapper, 1)).toBe(true);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([{ title: 'Title 2' }, 1, 'swipe']);
        expect(onAfterChange.mock.calls).toHaveLength(1);
        // swipe stopped when touch side
        mockSwipe(map, { touchstart: 10, touchmove: 50, touchend: 100 });
        expect(indexIsActive(wrapper, 1)).toBe(true);
        expect(onChange.mock.calls).toHaveLength(1);
        // swipe stopped when swipe to last tab
        mockSwipe(map, { touchstart: 300, touchmove: 150, touchend: 100 });
        expect(onTouchStopped.mock.calls).toHaveLength(1);
        expect(onTouchStopped.mock.calls[0]).toEqual([1]);
        // swipe to last tab
        mockSwipe(map, { touchstart: 100, touchmove: 150, touchend: 300 });
        expect(indexIsActive(wrapper, 0)).toBe(true);
        expect(onChange.mock.calls).toHaveLength(2);
        expect(onAfterChange.mock.calls).toHaveLength(2);
        // use onTouchStart to stop touch
        const onTouchStart = jest.fn(() => true);
        rerender(
            <Tabs
                tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                onChange={onChange}
                onAfterChange={onAfterChange}
                onTouchStopped={onTouchStopped}
                swipeable={false}
                touchSideDisableThreshold={40}
                stopTouchThreshold={40}
                onTouchStart={onTouchStart}
                ref={ref}
            >
                <div className="demo-tab-content">Content 1</div>
                <div className="demo-tab-content">Content 2</div>
            </Tabs>,
        );
        mockSwipe(map, { touchstart: 300, touchmove: 150, touchend: 100 });
        expect(indexIsActive(wrapper, 0)).toBe(true);
    });
});
