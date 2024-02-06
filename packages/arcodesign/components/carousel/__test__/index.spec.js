import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Carousel from '..';
import ContextProvider, { defaultContext } from '../../context-provider';
import {
    createMoveTouchEventObject,
    mockAddListener,
    mockDocumentVisibility,
} from '../../../tests/helpers/mockEvent';
import { defineHtmlRefProperties } from '../../../tests/helpers/mockElement';
import { mockSwipe } from './utils';

demoTest('carousel');

mountTest(Carousel, 'Carousel');

const { setHTMLProperties, unsetHTMLProperties } = defineHtmlRefProperties({
    offsetWidth: 375,
    offsetHeight: 200,
});

const prefix = `${defaultContext.prefixCls}-carousel`;

function indexIsActive(wrapper, index) {
    const items = wrapper.querySelectorAll(`.${prefix}-item.normal-item`);
    return items[index].classList.contains('active');
}

describe('Carousel', () => {
    beforeAll(() => {
        setHTMLProperties();
    });

    afterAll(() => {
        unsetHTMLProperties();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should auto play correctly', () => {
        const onChange = jest.fn();
        const { container: wrapper } = render(
            <Carousel stayDuration={1000} boxWidth={375} onChange={onChange}>
                <div />
                <div />
            </Carousel>,
        );
        act(() => {
            jest.advanceTimersByTime(1600);
        });
        expect(indexIsActive(wrapper, 1)).toBe(true);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([1]);
    });

    it('should render correctly and disable loop when only one child', () => {
        const { container: wrapper } = render(
            <Carousel stayDuration={1000} boxWidth={375}>
                <div />
            </Carousel>,
        );
        const inner = wrapper.querySelector(`.${prefix}-inner`);
        expect(inner.children).toHaveLength(1);
        act(() => {
            jest.advanceTimersByTime(1600);
        });
        expect(indexIsActive(wrapper, 0)).toBe(true);
    });

    it('should render correctly when using the property `list`', () => {
        const { container: wrapper } = render(
            <Carousel
                list={[
                    { src: '11', text: 'test 1' },
                    { src: '22', text: 'test 2' },
                ]}
            />,
        );
        const items = wrapper.querySelectorAll(`.${prefix}-item`);
        expect(items).toHaveLength(2);
    });

    it('should disable loop playback when using the property `offsetBetween`', () => {
        const { container: wrapper } = render(
            <Carousel stayDuration={1000} boxWidth={375} offsetBetween={20}>
                <div />
                <div />
            </Carousel>,
        );
        act(() => {
            jest.advanceTimersByTime(1600);
        });
        expect(indexIsActive(wrapper, 0)).toBe(true);
    });

    it('should enable loop playback and render fake dom when using the property `offsetBetween` and `fakeItem`', () => {
        const { container: wrapper } = render(
            <Carousel
                stayDuration={1000}
                boxWidth={375}
                offsetBetween={20}
                fakeItem
                initialIndex={2}
            >
                <div />
                <div />
                <div />
            </Carousel>,
        );
        act(() => {
            jest.advanceTimersByTime(1600);
        });
        expect(indexIsActive(wrapper, 0)).toBe(true);
        const items = wrapper.querySelectorAll(`.${prefix}-item.fake-item`);
        expect(items).toHaveLength(3);
    });

    it('should support using ref to change index', () => {
        const ref = React.createRef();
        const { container: wrapper } = render(
            <Carousel autoPlay={false} boxWidth={375} ref={ref}>
                <div />
                <div />
            </Carousel>,
        );
        const { changeIndex } = ref.current;
        expect(typeof changeIndex).toBe('function');
        act(() => {
            changeIndex(1);
            jest.advanceTimersByTime(600);
        });
        expect(indexIsActive(wrapper, 1)).toBe(true);
    });

    it('should handle touch event correctly', () => {
        const { container: wrapper, rerender } = render(
            <Carousel autoPlay={false} boxWidth={375} swipeable={false}>
                <div />
                <div />
            </Carousel>,
        );
        const map = mockAddListener(wrapper.querySelector(`.${prefix}`));
        rerender(
            <Carousel autoPlay={false} boxWidth={375} swipeable>
                <div />
                <div />
            </Carousel>,
        );

        // move to last item
        mockSwipe(map, wrapper, prefix, { touchstart: 100, touchmove: 150, touchend: 300 });
        expect(indexIsActive(wrapper, 1)).toBe(true);

        // move to next item
        mockSwipe(map, wrapper, prefix, { touchstart: 300, touchmove: 150, touchend: 100 });
        expect(indexIsActive(wrapper, 0)).toBe(true);

        // move and cancel
        rerender(
            <Carousel autoPlay={false} boxWidth={375} swipeable speedToChange={Infinity}>
                <div />
                <div />
            </Carousel>,
        );
        mockSwipe(map, wrapper, prefix, { touchstart: 100, touchmove: 150, touchend: 100 });
        expect(indexIsActive(wrapper, 0)).toBe(true);
    });

    it('should support using `onTouchStart` to prevent default logic', () => {
        const onTouchStart = jest.fn(() => true);
        const onTouchEnd = jest.fn(() => true);
        const props = {
            autoPlay: false,
            boxWidth: 375,
            onTouchStart,
            onTouchEnd,
            autoHeight: true,
        };
        const { container: wrapper, rerender } = render(
            <Carousel {...props} swipeable={false}>
                <div />
                <div />
            </Carousel>,
        );
        // should not trigger touchend when swipeable=false
        fireEvent.touchEnd(
            wrapper.querySelector(`.${prefix}`),
            createMoveTouchEventObject({ x: 100, y: 0 }),
        );
        expect(onTouchEnd.mock.calls).toHaveLength(0);

        // should prevent default logic when onTouchStart or onTouchEnd return true
        const map = mockAddListener(wrapper.querySelector(`.${prefix}`));
        rerender(
            <Carousel {...props} swipeable>
                <div />
                <div />
            </Carousel>,
        );
        mockSwipe(map, wrapper, prefix, { touchstart: 100, touchmove: 150, touchend: 300 });
        expect(onTouchStart.mock.calls).toHaveLength(1);
        expect(indexIsActive(wrapper, 0)).toBe(true);
    });

    it('should hide carousel when invisible and rerender forcibly when visible in ios', () => {
        const { container: wrapper } = render(
            <ContextProvider system="ios">
                <Carousel boxWidth={375}>
                    <div />
                    <div />
                </Carousel>
            </ContextProvider>,
        );
        const dom = wrapper.querySelector(`.${prefix}:not(.wrap-placeholder)`);
        act(() => {
            mockDocumentVisibility('hidden');
        });
        expect(getComputedStyle(dom).getPropertyValue('display')).toBe('none');
        act(() => {
            mockDocumentVisibility('visible');
        });
        expect(getComputedStyle(dom).getPropertyValue('display')).toBe('block');
    });
});
