import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import ShowMonitor from '..';

demoTest('show-monitor');

mountTest(ShowMonitor, 'ShowMonitor');

describe('ShowMonitor', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should monitor correctly with trigger once', () => {
        // mock IntersectionObserver
        const observe = jest.fn();
        const unobserve = jest.fn();
        window.IntersectionObserver = jest.fn(() => ({
            observe,
            unobserve,
        }));
        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        const { rerender } = render(
            <ShowMonitor ref={ref} onVisibleChange={onVisibleChange} once offset={[100, 30]}>
                <div style={{ height: 20, background: '#165dff' }}>Arco</div>
            </ShowMonitor>,
        );
        const [callback] = window.IntersectionObserver.mock.calls[0];
        // mock show
        expect(observe).toBeCalledTimes(1);
        callback([
            {
                isIntersecting: true,
                target: ref.current.dom,
            },
        ]);
        expect(onVisibleChange.mock.calls).toEqual([[true, ref.current.dom]]);

        // Recheck the still-visible element; once allows one new exposure after a reset.
        observe.mockClear();
        ref.current.flushVisibleStatus();
        expect(observe).toHaveBeenCalledWith(ref.current.dom);
        callback([{ isIntersecting: true, target: ref.current.dom }]);
        callback([{ isIntersecting: false, target: ref.current.dom }]);
        expect(onVisibleChange.mock.calls).toEqual([
            [true, ref.current.dom],
            [true, ref.current.dom],
        ]);
        rerender(
            <ShowMonitor ref={ref} onVisibleChange={onVisibleChange} once disabled>
                <div style={{ height: 20, background: '#165dff' }}>Arco</div>
            </ShowMonitor>,
        );
        ref.current.flushVisibleStatus();
        callback([{ isIntersecting: true, target: ref.current.dom }]);
        expect(onVisibleChange).toBeCalledTimes(2);
    });

    it('should monitor correctly with local scroll', () => {
        // mock IntersectionObserver
        const observe = jest.fn();
        const unobserve = jest.fn();
        window.IntersectionObserver = jest.fn(() => ({
            observe,
            unobserve,
        }));
        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        render(
            <div data-testid="wrap" style={{ height: 100, overflowY: 'auto' }}>
                <div data-testid="content" style={{ paddingTop: 500, paddingBottom: 100 }}>
                    <ShowMonitor
                        ref={ref}
                        overflow
                        throttle={0}
                        threshold={0.7}
                        onVisibleChange={onVisibleChange}
                    >
                        <div style={{ height: 20, background: '#165dff' }}>Arco</div>
                    </ShowMonitor>
                </div>
            </div>,
        );
        const content = screen.getByTestId('content');
        const [callback] = window.IntersectionObserver.mock.calls[0];
        // mock show
        expect(observe).toBeCalledTimes(1);
        callback([
            {
                isIntersecting: true,
                target: ref.current.dom,
            },
        ]);
        expect(onVisibleChange).toHaveBeenCalledWith(true, content.firstChild);

        // mock hide
        callback([
            {
                isIntersecting: false,
                target: ref.current.dom,
            },
        ]);
        expect(onVisibleChange).toHaveBeenLastCalledWith(false, content.firstChild);
        ref.current.flushVisibleStatus();
        expect(onVisibleChange).toHaveBeenLastCalledWith(false, content.firstChild);
    });

    it('should monitor correctly when IntersectionObserver not supported', async () => {
        // reset mock
        window.IntersectionObserver = undefined;
        // spy boundingClientRect for monitor
        let boundingClientRect;
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = () => boundingClientRect;

        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        const { rerender } = render(
            <div data-testid="wrap" style={{ height: 100, overflowY: 'auto' }}>
                <div data-testid="content" style={{ paddingTop: 500, paddingBottom: 100 }}>
                    <ShowMonitor
                        className="monitor"
                        ref={ref}
                        overflow
                        throttle={0}
                        onVisibleChange={onVisibleChange}
                    >
                        <div style={{ height: 20, background: '#165dff' }}>Arco</div>
                    </ShowMonitor>
                </div>
            </div>,
        );
        const wrap = screen.getByTestId('wrap');
        const content = screen.getByTestId('content');
        wrap.getBoundingClientRect = jest.fn(() => ({
            width: 375,
            height: 100,
            top: 0,
            left: 0,
        }));
        content.getBoundingClientRect = jest.fn(() => ({
            width: 375,
            height: 620,
            top: 0,
            left: 0,
        }));
        act(() => {
            boundingClientRect = {
                width: 375,
                height: 20,
                top: 500,
                left: 0,
            };
        });
        act(() => jest.runAllTimers());
        expect(ref.current.checkVisible()).toBe(false);

        // 滚动至出现
        content.getBoundingClientRect = jest.fn(() => ({
            width: 375,
            height: 500,
            top: -500,
            left: 0,
        }));
        act(() => {
            boundingClientRect = {
                width: 375,
                height: 20,
                top: 0,
                left: 0,
            };
        });
        fireEvent.scroll(wrap, { target: { scrollY: 500 } });
        expect(ref.current.checkVisible()).toBe(true);
        expect(onVisibleChange).toHaveBeenCalledWith(true, content.firstChild);

        // 滚动至消失
        content.getBoundingClientRect = jest.fn(() => ({
            width: 375,
            height: 500,
            top: -100,
            left: 0,
        }));
        act(() => {
            boundingClientRect = {
                width: 375,
                height: 20,
                top: 400,
                left: 10,
            };
        });
        fireEvent.scroll(wrap, { target: { scrollY: 100 } });
        expect(ref.current.checkVisible()).toBe(false);
        expect(onVisibleChange).toBeCalledTimes(2);
        expect(onVisibleChange).toHaveBeenLastCalledWith(false, content.firstChild);

        ref.current.flushVisibleStatus();
        rerender(
            <div data-testid="wrap" style={{ height: 100, overflowY: 'auto' }}>
                <div data-testid="content" style={{ paddingTop: 500, paddingBottom: 100 }}>
                    <ShowMonitor
                        ref={ref}
                        overflow
                        throttle={0}
                        threshold={0.7}
                        onVisibleChange={onVisibleChange}
                        disabled
                    >
                        <div style={{ height: 20, background: '#165dff' }}>Arco</div>
                    </ShowMonitor>
                </div>
            </div>,
        );
        ref.current.flushVisibleStatus();
        expect(ref.current.checkVisible()).toBe(false);
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    it('should report a first exposure on a manual recheck without IntersectionObserver', () => {
        window.IntersectionObserver = undefined;
        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        render(
            <ShowMonitor ref={ref} once throttle={0} onVisibleChange={onVisibleChange}>
                <div>Arco</div>
            </ShowMonitor>,
        );
        const node = ref.current.dom;
        const visibleRect = { width: 375, height: 20, top: 0, left: 0 };
        jest.spyOn(node, 'getClientRects').mockImplementation(() => [node.getBoundingClientRect()]);
        const measure = jest.spyOn(node, 'getBoundingClientRect').mockReturnValue({
            ...visibleRect,
            top: window.innerHeight + 1,
        });
        act(() => jest.runAllTimers());
        expect(onVisibleChange).not.toHaveBeenCalled();

        measure.mockReturnValue(visibleRect);
        ref.current.flushVisibleStatus();
        expect(onVisibleChange.mock.calls).toEqual([[true, node]]);
    });

    it('a saved checkVisible handle should be safe to call after unmount', () => {
        window.IntersectionObserver = undefined;
        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        const { unmount } = render(
            <ShowMonitor ref={ref} onVisibleChange={onVisibleChange}>
                <div>Arco</div>
            </ShowMonitor>,
        );
        const handleBeforeUnmount = ref.current;
        unmount();
        expect(() => handleBeforeUnmount.checkVisible()).not.toThrow();
        expect(onVisibleChange).not.toHaveBeenCalled();
    });

    it('should do nothing when getScrollContainer returns null', () => {
        window.IntersectionObserver = undefined;
        render(
            <ShowMonitor getScrollContainer={() => null} onVisibleChange={jest.fn()}>
                <div>Arco</div>
            </ShowMonitor>,
        );
        act(() => jest.runAllTimers());
    });

    it('should reuse IntersectionObserver singleton for same root config', () => {
        const observe = jest.fn();
        const unobserve = jest.fn();
        window.IntersectionObserver = jest.fn(() => ({ observe, unobserve }));
        const { unmount } = render(
            <div>
                <ShowMonitor onVisibleChange={jest.fn()} offset={[1, 2, 3, 4]}>
                    <div>A</div>
                </ShowMonitor>
                <ShowMonitor onVisibleChange={jest.fn()} offset={[1, 2, 3, 4]}>
                    <div>B</div>
                </ShowMonitor>
            </div>,
        );
        expect(window.IntersectionObserver).toBeCalledTimes(1);
        expect(observe).toBeCalledTimes(2);
        unmount();
    });

    it('should decrement listen flag when one of two overflow monitors unmounts', () => {
        window.IntersectionObserver = undefined;
        const { rerender } = render(
            <div data-testid="wrap" style={{ height: 100, overflowY: 'auto' }}>
                <div data-testid="content">
                    <ShowMonitor overflow throttle={0} onVisibleChange={jest.fn()}>
                        <div>A</div>
                    </ShowMonitor>
                    <ShowMonitor overflow throttle={0} onVisibleChange={jest.fn()}>
                        <div>B</div>
                    </ShowMonitor>
                </div>
            </div>,
        );
        const wrap = screen.getByTestId('wrap');
        expect(wrap.getAttribute('data-show-listened')).toBe('2');
        rerender(
            <div data-testid="wrap" style={{ height: 100, overflowY: 'auto' }}>
                <div data-testid="content">
                    <ShowMonitor overflow throttle={0} onVisibleChange={jest.fn()}>
                        <div>A</div>
                    </ShowMonitor>
                </div>
            </div>,
        );
        expect(wrap.getAttribute('data-show-listened')).toBe('1');
    });

    it('should register window scroll listener when existing listeners are all overflow', () => {
        window.IntersectionObserver = undefined;
        const addEventListener = jest.spyOn(window, 'addEventListener');
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = () => ({
            width: 375,
            height: 20,
            top: 0,
            left: 0,
        });
        // 先注册一个 overflow 监听
        const { rerender } = render(
            <div data-testid="wrap" style={{ height: 100, overflowY: 'auto' }}>
                <div data-testid="content" style={{ paddingTop: 500 }}>
                    <ShowMonitor overflow throttle={0} onVisibleChange={jest.fn()}>
                        <div>Arco</div>
                    </ShowMonitor>
                </div>
            </div>,
        );
        addEventListener.mockClear();
        // 再注册一个非 overflow 监听，此时同 key 下已有全部 overflow 的 listener
        rerender(
            <div data-testid="wrap" style={{ height: 100, overflowY: 'auto' }}>
                <div data-testid="content" style={{ paddingTop: 500 }}>
                    <ShowMonitor overflow throttle={0} onVisibleChange={jest.fn()}>
                        <div>Arco</div>
                    </ShowMonitor>
                    <ShowMonitor throttle={0} onVisibleChange={jest.fn()}>
                        <div>Arco2</div>
                    </ShowMonitor>
                </div>
            </div>,
        );
        act(() => jest.runAllTimers());
        expect(addEventListener).toBeCalledWith('scroll', expect.any(Function));
        addEventListener.mockRestore();
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });
});
