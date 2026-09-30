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
        // mock hide
        callback([
            {
                isIntersecting: false,
                target: ref.current.dom,
            },
        ]);
        expect(onVisibleChange).toBeCalledTimes(1);
        expect(onVisibleChange).toHaveBeenCalledWith(true, ref.current.dom);
        rerender(
            <ShowMonitor ref={ref} onVisibleChange={onVisibleChange} once disabled>
                <div style={{ height: 20, background: '#165dff' }}>Arco</div>
            </ShowMonitor>,
        );
        ref.current.flushVisibleStatus();
        expect(onVisibleChange).toHaveBeenLastCalledWith(true, ref.current.dom);
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

    it('should re-listen via flushVisibleStatus after once emitted (non-IO)', () => {
        window.IntersectionObserver = undefined;
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
        const originalGetClientRects = Element.prototype.getClientRects;
        let boundingClientRect = {
            width: 375,
            height: 20,
            top: 0,
            left: 0,
        };
        Element.prototype.getBoundingClientRect = () => boundingClientRect;
        Element.prototype.getClientRects = () => [{}];
        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        render(
            <ShowMonitor ref={ref} once throttle={0} onVisibleChange={onVisibleChange}>
                <div>Arco</div>
            </ShowMonitor>,
        );
        act(() => jest.runAllTimers());
        expect(onVisibleChange).toBeCalledTimes(1);
        // 此时 once 已触发的 listener 还在 once 队列里，flush 会先把它从 once 队列过滤掉
        ref.current.flushVisibleStatus();
        act(() => jest.runAllTimers());
        expect(onVisibleChange).toBeCalledTimes(1);
        // 滚出视口再滚回：once 再次入队并被 checkVisibleHandler 移出监听队列
        act(() => {
            boundingClientRect = { width: 375, height: 20, top: 1000, left: 0 };
        });
        fireEvent.scroll(window);
        act(() => jest.runAllTimers());
        expect(onVisibleChange).toBeCalledTimes(2);
        act(() => {
            boundingClientRect = { width: 375, height: 20, top: 0, left: 0 };
        });
        fireEvent.scroll(window);
        act(() => jest.runAllTimers());
        expect(onVisibleChange).toBeCalledTimes(3);
        // flushVisibleStatus 把已被移出监听队列的 listener 重新放回
        ref.current.flushVisibleStatus();
        act(() => jest.runAllTimers());
        expect(onVisibleChange).toBeCalledTimes(3);
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
        Element.prototype.getClientRects = originalGetClientRects;
    });

    it('checkVisible should return early when node is gone after unmount', () => {
        window.IntersectionObserver = undefined;
        const ref = React.createRef();
        const { unmount } = render(
            <ShowMonitor ref={ref} onVisibleChange={jest.fn()}>
                <div>Arco</div>
            </ShowMonitor>,
        );
        const handleBeforeUnmount = ref.current;
        unmount();
        expect(handleBeforeUnmount.checkVisible()).toBeUndefined();
    });

    it('should re-listen when disabled toggles back to false (non-IO)', () => {
        window.IntersectionObserver = undefined;
        const onVisibleChange = jest.fn();
        const ref = React.createRef();
        const { rerender } = render(
            <ShowMonitor ref={ref} throttle={0} onVisibleChange={onVisibleChange}>
                <div>Arco</div>
            </ShowMonitor>,
        );
        rerender(
            <ShowMonitor ref={ref} throttle={0} onVisibleChange={onVisibleChange} disabled>
                <div>Arco</div>
            </ShowMonitor>,
        );
        rerender(
            <ShowMonitor ref={ref} throttle={0} onVisibleChange={onVisibleChange}>
                <div>Arco</div>
            </ShowMonitor>,
        );
        act(() => jest.runAllTimers());
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
        const { unmount } = render(
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
        unmount();
    });

    it('should register window scroll listener when existing listeners are all overflow', () => {
        window.IntersectionObserver = undefined;
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
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });
});
