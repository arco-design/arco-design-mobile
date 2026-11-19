import '../../../style/public.less';
import '../style';
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import ScrollArea from '..';

demoTest('scroll-area');

mountTest(ScrollArea, 'ScrollArea');

const prefix = `${defaultContext.prefixCls}-scroll-area`;

// jsdom does not do layout, so fake the geometry of the viewport
function mockLayout(viewport, layout) {
    Object.keys(layout).forEach(key => {
        Object.defineProperty(viewport, key, {
            configurable: true,
            writable: true,
            value: layout[key],
        });
    });
}

const verticalLayout = {
    clientHeight: 100,
    scrollHeight: 400,
    scrollTop: 0,
    clientWidth: 200,
    scrollWidth: 200,
    scrollLeft: 0,
};
const horizontalLayout = {
    clientHeight: 100,
    scrollHeight: 100,
    scrollTop: 0,
    clientWidth: 200,
    scrollWidth: 800,
    scrollLeft: 0,
};

function renderWithLayout(layout, props = {}) {
    const ref = React.createRef();
    const utils = render(
        <ScrollArea ref={ref} {...props}>
            <div>content</div>
        </ScrollArea>,
    );
    const viewport = utils.container.querySelector(`.${prefix}-viewport`);
    mockLayout(viewport, layout);
    act(() => {
        ref.current.update();
    });
    return { ...utils, ref, viewport };
}

describe('ScrollArea', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render children inside the viewport with custom classnames', () => {
        const { container } = render(
            <ScrollArea className="custom" viewportClassName="vp" direction="both">
                <span className="child">hello</span>
            </ScrollArea>,
        );
        const root = container.querySelector(`.${prefix}`);
        expect(root.className).toContain(`${prefix}-both`);
        expect(root.className).toContain('custom');
        expect(root.querySelector(`.${prefix}-viewport.vp .${prefix}-content .child`)).toBeTruthy();
    });

    it('should expose dom and viewport via ref', () => {
        const { ref, container } = renderWithLayout(verticalLayout);
        expect(ref.current.dom).toBe(container.querySelector(`.${prefix}`));
        expect(ref.current.viewport).toBe(container.querySelector(`.${prefix}-viewport`));
    });

    it('should not render a scrollbar when content does not overflow', () => {
        const { container } = renderWithLayout({
            ...verticalLayout,
            scrollHeight: 100,
        });
        expect(container.querySelector(`.${prefix}-track`)).toBeNull();
    });

    it('should size and position the vertical thumb by the scroll progress', () => {
        const { container, viewport } = renderWithLayout(verticalLayout);
        const thumb = () => container.querySelector(`.${prefix}-thumb-vertical`);
        // visible ratio is 100 / 400
        expect(thumb().style.height).toBe('25%');
        expect(thumb().style.transform).toBe('translate3d(0, 0%, 0)');
        expect(container.querySelector(`.${prefix}-track-horizontal`)).toBeNull();

        mockLayout(viewport, { scrollTop: 300 });
        fireEvent.scroll(viewport);
        // scrolled to the bottom: the thumb is moved by 3 times of its own height
        expect(thumb().style.transform).toBe('translate3d(0, 300%, 0)');

        // iOS rubber band scrolling must not push the thumb out of the track
        mockLayout(viewport, { scrollTop: 450 });
        fireEvent.scroll(viewport);
        expect(thumb().style.transform).toBe('translate3d(0, 300%, 0)');
        mockLayout(viewport, { scrollTop: -50 });
        fireEvent.scroll(viewport);
        expect(thumb().style.transform).toBe('translate3d(0, 0%, 0)');
    });

    it('should keep a minimum thumb size for very long content', () => {
        const { container } = renderWithLayout({ ...verticalLayout, scrollHeight: 100000 });
        // at least 20px of the 100px track
        expect(container.querySelector(`.${prefix}-thumb-vertical`).style.height).toBe('20%');
    });

    it('should only render the horizontal scrollbar for direction="horizontal"', () => {
        const { container, viewport } = renderWithLayout(
            { ...horizontalLayout, scrollHeight: 500 },
            { direction: 'horizontal' },
        );
        expect(container.querySelector(`.${prefix}`).className).toContain(`${prefix}-horizontal`);
        expect(container.querySelector(`.${prefix}-track-vertical`)).toBeNull();
        const thumb = container.querySelector(`.${prefix}-thumb-horizontal`);
        expect(thumb.style.width).toBe('25%');
        mockLayout(viewport, { scrollLeft: 300 });
        fireEvent.scroll(viewport);
        expect(thumb.style.transform).toBe('translate3d(150%, 0, 0)');
    });

    it('should render both scrollbars for direction="both"', () => {
        const { container } = renderWithLayout(
            { ...verticalLayout, scrollWidth: 800 },
            { direction: 'both' },
        );
        expect(container.querySelector(`.${prefix}-thumb-vertical`)).toBeTruthy();
        expect(container.querySelector(`.${prefix}-thumb-horizontal`)).toBeTruthy();
    });

    it('should move the horizontal thumb backwards in rtl', () => {
        const { container, viewport } = renderWithLayout(horizontalLayout, {
            direction: 'horizontal',
            viewportStyle: { direction: 'rtl' },
        });
        mockLayout(viewport, { scrollLeft: -300 });
        fireEvent.scroll(viewport);
        expect(container.querySelector(`.${prefix}`).className).toContain(`${prefix}-rtl`);
        expect(container.querySelector(`.${prefix}-thumb-horizontal`).style.transform).toBe(
            'translate3d(-150%, 0, 0)',
        );
    });

    it('should show the scrollbar while scrolling and hide it after hideDelay', () => {
        const onScroll = jest.fn();
        const { container, viewport } = renderWithLayout(verticalLayout, {
            hideDelay: 500,
            onScroll,
        });
        const root = container.querySelector(`.${prefix}`);
        expect(root.className).not.toContain(`${prefix}-scrolling`);

        fireEvent.scroll(viewport);
        expect(onScroll).toHaveBeenCalledTimes(1);
        expect(root.className).toContain(`${prefix}-scrolling`);

        act(() => {
            jest.advanceTimersByTime(400);
        });
        // scrolling again postpones the hiding
        fireEvent.scroll(viewport);
        act(() => {
            jest.advanceTimersByTime(400);
        });
        expect(root.className).toContain(`${prefix}-scrolling`);
        act(() => {
            jest.advanceTimersByTime(100);
        });
        expect(root.className).not.toContain(`${prefix}-scrolling`);
    });

    it('should always show the scrollbar when scrollbarVisibility is "always"', () => {
        const { container, viewport } = renderWithLayout(verticalLayout, {
            scrollbarVisibility: 'always',
        });
        const root = container.querySelector(`.${prefix}`);
        expect(root.className).toContain(`${prefix}-always`);
        fireEvent.scroll(viewport);
        expect(root.className).not.toContain(`${prefix}-scrolling`);
    });

    it('should not render the scrollbar when scrollbarVisibility is "hidden"', () => {
        const { container } = renderWithLayout(verticalLayout, { scrollbarVisibility: 'hidden' });
        expect(container.querySelector(`.${prefix}-track`)).toBeNull();
    });

    it('should scroll the viewport via ref.scrollTo', () => {
        const { ref, viewport } = renderWithLayout(verticalLayout);
        viewport.scrollTo = jest.fn();
        ref.current.scrollTo({ top: 120 });
        expect(viewport.scrollTo).toHaveBeenCalledWith({ top: 120 });

        viewport.scrollTo = undefined;
        ref.current.scrollTo({ top: 80, left: 10 });
        expect(viewport.scrollTop).toBe(80);
        expect(viewport.scrollLeft).toBe(10);
    });

    it('should clear the pending hide timer on unmount', () => {
        const { viewport, unmount } = renderWithLayout(verticalLayout);
        fireEvent.scroll(viewport);
        const clearSpy = jest.spyOn(window, 'clearTimeout');
        unmount();
        expect(clearSpy).toHaveBeenCalled();
        clearSpy.mockRestore();
    });
});
