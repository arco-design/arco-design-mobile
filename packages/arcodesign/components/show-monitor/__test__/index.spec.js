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
});
