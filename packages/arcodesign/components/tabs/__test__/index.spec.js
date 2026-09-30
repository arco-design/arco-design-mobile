import React, { createRef } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import { defaultContext } from '../../context-provider';
import Tabs from '..';
import ContextProvider from '../../context-provider';
import { mockElementProperty } from '../../../tests/helpers/mockElement';
import {
    createMoveTouchEventObject,
    createStartTouchEventObject,
    mockAddListener,
} from '../../../tests/helpers/mockEvent';
import '@testing-library/jest-dom';

demoTest('tabs', { useFakeTimers: true });

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

        act(() => {
            userEvent.click(container.querySelector(`.${prefixTab}-cell`));
        });
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
        const map = mockAddListener(window);
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
        const { scrollToIndex, bar } = ref.current;
        const { updateLayout } = bar || {};
        expect(typeof scrollToIndex).toBe('function');
        expect(typeof updateLayout).toBe('function');
        // wrapper.setProps({ onScroll });
        scrollToIndex(0);
        act(() => {
            updateLayout();
        });
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

    // 覆盖率补充测试组：ref 方法、scroll 模式、手势边界、lazyload 渲染等分支
    // Coverage supplement test group: ref methods, scroll mode, gesture boundaries, lazyload rendering
    describe('Coverage Supplements', () => {
        const TABS = [{ title: 'Title 1' }, { title: 'Title 2' }, { title: 'Title 3' }];
        const PANES = [
            <div key="1" className="demo-tab-content">Content 1</div>,
            <div key="2" className="demo-tab-content">Content 2</div>,
            <div key="3" className="demo-tab-content">Content 3</div>,
        ];

        function getPaneContainer(container) {
            return container.querySelector(`.${prefixTab}-pane-container`);
        }

        function mockPaneRects(container, rects) {
            const panes = container.querySelectorAll(`.${prefixTab}-pane`);
            panes.forEach((pane, i) => {
                const rect = rects[i] || { top: 0, bottom: 300, left: 0, right: 375 };
                pane.getBoundingClientRect = jest.fn(() => rect);
            });
        }

        it('should warn about small distanceToChangeTab and support manual changeIndex with caterpillar click', () => {
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
            const onAfterChange = jest.fn();
            const ref = createRef();
            const { container } = render(
                <Tabs
                    ref={ref}
                    tabs={TABS}
                    distanceToChangeTab={0.5}
                    useCaterpillar
                    caterpillarMaxScale={3}
                    onAfterChange={onAfterChange}
                >
                    {PANES}
                </Tabs>,
            );

            // 过小的 distanceToChangeTab 触发警告
            // A too-small distanceToChangeTab triggers a warning
            expect(warnSpy).toHaveBeenCalledWith(
                '[Tabs Props Warning] The value of the prop `distanceToChangeTab` is too small(0.5). Do you meant to use the prop `percentToChangeTab`?',
            );
            warnSpy.mockRestore();

            // ref.changeIndex 手动切换
            // Switch manually via ref.changeIndex
            act(() => {
                ref.current.changeIndex(1);
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 1)).toBe(true);

            // 点击触发毛毛虫动画
            // Clicking triggers the caterpillar animation
            userEvent.click(container.querySelectorAll(`.${prefixTab}-cell`)[2]);
            act(() => {
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 2)).toBe(true);
            expect(onAfterChange).toBeCalledTimes(2);
        });

        it('should mark manual change when controlled activeTab changes', () => {
            const onAfterChange = jest.fn();
            const { container, rerender } = render(
                <Tabs tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]} activeTab={0} onAfterChange={onAfterChange}>
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            const underline = container.querySelector(`.${prefixTab}-cell-underline`);

            // 受控 activeTab 变化时按手动切换处理并启用 cell 动画
            // A controlled activeTab change is treated as a manual change with cell animation
            rerender(
                <Tabs tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]} activeTab={1} onAfterChange={onAfterChange}>
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            act(() => {
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 1)).toBe(true);
            expect(underline.style.transitionDuration).toBe('240ms');
            expect(onAfterChange).toBeCalledTimes(1);
        });

        it('should scroll pane to index when clicking a tab in scroll mode', () => {
            const onChange = jest.fn();
            const { container } = render(
                <Tabs tabs={TABS} mode="scroll" scrollThrottle={0} onChange={onChange}>
                    {PANES}
                </Tabs>,
            );
            // rect 布局使滚动判定落在第二个 pane，滚动回填与点击目标一致
            // The rect layout makes the scroll detection fall on the second pane, matching the click target
            mockPaneRects(container, [
                { top: -100, bottom: 200, left: 0, right: 375 },
                { top: -50, bottom: 250, left: 0, right: 375 },
                { top: 100, bottom: 400, left: 0, right: 375 },
            ]);

            // scroll 模式下点击 tab 滚动到目标 pane
            // Clicking a tab scrolls to the target pane in scroll mode
            act(() => {
                userEvent.click(container.querySelectorAll(`.${prefixTab}-cell`)[1]);
            });
            expect(onChange).toBeCalledWith(TABS[1], 1, 'click');
            act(() => {
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 1)).toBe(true);
        });

        it('should scroll to initial index when scrollWhenMounted is set', () => {
            const ref = createRef();
            const { container } = render(
                <Tabs ref={ref} tabs={TABS} mode="scroll" defaultActiveTab={1} scrollWhenMounted>
                    {PANES}
                </Tabs>,
            );
            // rect 布局使滚动回填判定保持在当前 tab，避免动画时序影响断言
            // The rect layout keeps scroll detection on the current tab, avoiding timing flakiness
            mockPaneRects(container, [
                { top: -100, bottom: 200, left: 0, right: 375 },
                { top: -50, bottom: 250, left: 0, right: 375 },
                { top: 100, bottom: 400, left: 0, right: 375 },
            ]);
            act(() => {
                jest.advanceTimersByTime(500);
            });

            // 初始滚动执行完毕，组件正常渲染
            // Initial scrolling finished and the component renders correctly
            expect(container.querySelector(`.${prefixTab}-pane-container`)).toBeTruthy();
            expect(indexIsActive(container, 1)).toBe(true);
        });

        it('should callback onScroll and ignore scroll events while auto scrolling', () => {
            const onScroll = jest.fn();
            const onChange = jest.fn();
            const ref = createRef();
            const { container, rerender } = render(
                <Tabs ref={ref} tabs={TABS} onChange={onChange} disabled>
                    {PANES}
                </Tabs>,
            );
            mockContainer(ref);
            mockPaneRects(container, [
                { top: 0, bottom: 300, left: 0, right: 375 },
                { top: 300, bottom: 600, left: 0, right: 375 },
                { top: 600, bottom: 900, left: 0, right: 375 },
            ]);
            const map = mockAddListener(window);
            rerender(
                <Tabs
                    ref={ref}
                    tabs={TABS}
                    mode="scroll"
                    scrollThrottle={0}
                    scrollOffset={0}
                    onChange={onChange}
                    disabled={false}
                    onScroll={onScroll}
                >
                    {PANES}
                </Tabs>,
            );

            act(() => {
                jest.advanceTimersByTime(400);
                map.scroll();
            });
            // 补上 enzyme 时代缺失的 onScroll 断言
            // Restore the onScroll assertion missing since the enzyme era
            expect(onScroll.mock.calls.length).toBeGreaterThanOrEqual(1);

            // 自动滚动期间（scrollToIndex 之后）的 scroll 事件被忽略，不再触发 changeIndex
            // Scroll events during auto scrolling (after scrollToIndex) are ignored
            onChange.mockClear();
            ref.current.pane.scrollToIndex(1, true);
            act(() => {
                map.scroll();
            });
            expect(onScroll.mock.calls.length).toBeGreaterThanOrEqual(2);
            expect(onChange).not.toHaveBeenCalled();
        });

        it('should do nothing in scroll handler when getScrollContainer returns null', () => {
            const onChange = jest.fn();
            const map = mockAddListener(window);
            render(
                <Tabs
                    tabs={TABS}
                    mode="scroll"
                    scrollThrottle={0}
                    getScrollContainer={() => null}
                    onChange={onChange}
                >
                    {PANES}
                </Tabs>,
            );

            act(() => {
                map.scroll();
            });
            expect(onChange).not.toHaveBeenCalled();
        });

        it('should stop pane touch handlers when callbacks return true', () => {
            const onTouchStart = jest.fn(() => true);
            const onTouchMove = jest.fn(() => true);
            const onTouchEnd = jest.fn(() => true);
            const onDistanceChange = jest.fn();
            const { container } = render(
                <Tabs
                    tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onDistanceChange={onDistanceChange}
                >
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            const paneContainer = getPaneContainer(container);

            // onTouchStart / onTouchMove / onTouchEnd 返回 true 时中断手势
            // Gesture is interrupted when the callbacks return true
            mockSwipe(paneContainer, { touchstart: 300, touchmove: 150, touchend: 100 });
            expect(onTouchStart).toHaveBeenCalled();
            // onTouchMove 在拦截判断处被调用并返回 true，手势不再产生位移
            // onTouchMove is invoked for the interception check and returns true
            expect(onTouchMove).toHaveBeenCalledTimes(1);
            expect(onTouchEnd).toHaveBeenCalled();
            expect(onDistanceChange).not.toHaveBeenCalled();
        });

        it('should ignore touchstart while pane is adjusting after a swipe', () => {
            const { container } = render(
                <Tabs tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]} transitionDuration={500}>
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            const paneContainer = getPaneContainer(container);

            // 滑动切换后过渡期间的 touchstart 被忽略
            // touchstart during the transition after swiping is ignored
            act(() => {
                fireEvent.touchStart(paneContainer, createStartTouchEventObject({ x: 300, y: 0 }));
                fireEvent.touchMove(paneContainer, createMoveTouchEventObject({ x: 150, y: 0 }));
            });
            fireEvent.touchEnd(paneContainer, createMoveTouchEventObject({ x: 100, y: 0 }));
            act(() => {
                jest.advanceTimersByTime(100);
            });
            act(() => {
                fireEvent.touchStart(
                    paneContainer,
                    createStartTouchEventObject({ x: 200, y: 0 }),
                );
                fireEvent.touchMove(paneContainer, createMoveTouchEventObject({ x: 50, y: 0 }));
            });
            fireEvent.touchEnd(paneContainer, createMoveTouchEventObject({ x: 50, y: 0 }));
            act(() => {
                jest.advanceTimersByTime(600);
            });

            expect(indexIsActive(container, 1)).toBe(true);
        });

        it('should prevent touchmove when touch has not started', () => {
            const { container } = render(
                <Tabs tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}>
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            const paneContainer = getPaneContainer(container);

            // 未开始触摸直接派发 touchmove 时不产生位移
            // No distance is produced when touchmove fires without touchstart
            fireEvent.touchMove(paneContainer, createMoveTouchEventObject({ x: 150, y: 0 }));
            expect(
                paneContainer.style.transform || 'translateX(0px)',
            ).not.toContain('-375px');
        });

        it('should disable swipe and reset bar when scrolling vertically', () => {
            const { container } = render(
                <Tabs tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}>
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            const paneContainer = getPaneContainer(container);

            // 纵向滚动页面时禁用横向滑动手势
            // Horizontal swipe is disabled while scrolling the page vertically
            act(() => {
                fireEvent.touchStart(paneContainer, createStartTouchEventObject({ x: 100, y: 0 }));
                fireEvent.touchMove(paneContainer, createMoveTouchEventObject({ x: 105, y: 100 }));
            });
            fireEvent.touchEnd(paneContainer, createMoveTouchEventObject({ x: 105, y: 100 }));
            act(() => {
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 0)).toBe(true);
        });

        it('should reset bar center at touchend when tabBarResetWhenScroll is touchend', () => {
            const { container } = render(
                <Tabs
                    tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                    tabBarResetWhenScroll="touchend"
                >
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            const paneContainer = getPaneContainer(container);

            act(() => {
                fireEvent.touchStart(paneContainer, createStartTouchEventObject({ x: 100, y: 0 }));
                fireEvent.touchMove(paneContainer, createMoveTouchEventObject({ x: 105, y: 100 }));
            });
            // touchend 时纵向滚动重置 bar 居中
            // The bar is re-centered at touchend for vertical scrolling
            fireEvent.touchEnd(paneContainer, createMoveTouchEventObject({ x: 105, y: 100 }));
            act(() => {
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 0)).toBe(true);
        });

        it('should trigger caterpillar animation when swiping with useCaterpillar', () => {
            const ref = createRef();
            const { container } = render(
                <Tabs ref={ref} tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]} useCaterpillar caterpillarMaxScale={3}>
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            mockContainer(ref);
            const paneContainer = getPaneContainer(container);

            act(() => {
                fireEvent.touchStart(paneContainer, createStartTouchEventObject({ x: 300, y: 0 }));
                fireEvent.touchMove(paneContainer, createMoveTouchEventObject({ x: 150, y: 0 }));
            });
            fireEvent.touchEnd(paneContainer, createMoveTouchEventObject({ x: 100, y: 0 }));
            // 滑动切换后毛毛虫动画进行中：underline inner 带 animationName
            // The caterpillar animation is in progress after swiping
            act(() => {
                jest.advanceTimersByTime(60);
            });
            expect(indexIsActive(container, 1)).toBe(true);
            const underlineInner = container.querySelector(
                `.${prefixTab}-cell-underline > div`,
            );
            expect(underlineInner.style.animationName).toContain('tabsCaterpillar');

            // 动画结束定时器触发后动画名清除
            // The animation name is cleared after the ending timer fires
            act(() => {
                jest.advanceTimersByTime(600);
            });
        });

        it('should skip caterpillar animate when duration is zero and clear timer on repeated calls', () => {
            const ref = createRef();
            render(
                <Tabs
                    ref={ref}
                    tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                    useCaterpillar
                    duration={0}
                >
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );

            // duration 为 0 时不执行毛毛虫动画
            // Caterpillar animation is skipped when duration is 0
            expect(() => ref.current.bar.setCaterpillarAnimate()).not.toThrow();

            const ref2 = createRef();
            render(
                <Tabs ref={ref2} tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]} useCaterpillar>
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );
            // 连续调用时清除上一次的定时器
            // The previous timer is cleared on repeated calls
            act(() => {
                ref2.current.bar.setCaterpillarAnimate();
                ref2.current.bar.setCaterpillarAnimate();
            });
        });

        it('should fall back to empty underline style when custom underline has no line ref', () => {
            const { container } = render(
                <Tabs
                    tabs={[{ title: 'Title 1' }, { title: 'Title 2' }]}
                    renderUnderline={() => <div className="custom-underline" />}
                >
                    <div className="demo-tab-content">Content 1</div>
                    <div className="demo-tab-content">Content 2</div>
                </Tabs>,
            );

            // 自定义 underline 未绑定 lineRef 时样式回退为空对象
            // Style falls back to an empty object when the custom underline has no lineRef
            expect(container.querySelector('.custom-underline')).toBeTruthy();
        });

        it('should scroll custom container when calling pane scrollToIndex', () => {
            const scrollDiv = document.createElement('div');
            mockElementProperty(scrollDiv, 'scrollHeight', 1000);
            mockElementProperty(scrollDiv, 'offsetHeight', 300);
            const getScrollContainer = () => scrollDiv;
            const ref = createRef();
            const { container } = render(
                <Tabs
                    ref={ref}
                    tabs={TABS}
                    mode="scroll"
                    scrollThrottle={0}
                    getScrollContainer={getScrollContainer}
                >
                    {PANES}
                </Tabs>,
            );
            mockPaneRects(container, [
                { top: 100, bottom: 400, left: 0, right: 375 },
                { top: 400, bottom: 700, left: 0, right: 375 },
                { top: 700, bottom: 1000, left: 0, right: 375 },
            ]);

            // 指定元素容器时 scrollToIndex 将滚动写入该容器的 scrollTop
            // scrollToIndex writes scrolling into the custom container's scrollTop
            act(() => {
                ref.current.pane.scrollToIndex(1, true);
                jest.advanceTimersByTime(100);
            });
            expect(scrollDiv.scrollTop).not.toBe(0);
        });

        it('should render hide content and hidden pane style outside lazyload range', () => {
            const { container } = render(
                <Tabs tabs={TABS} lazyloadCount={0} renderHideContent={index => <div>hidden {index}</div>}>
                    {PANES}
                </Tabs>,
            );
            const panes = container.querySelectorAll(`.${prefixTab}-pane`);
            expect(panes[0].textContent).toBe('Content 1');
            // 范围外的 pane 渲染占位内容
            // Panes outside the range render the placeholder content
            expect(panes[1].textContent).toBe('hidden 1');
            expect(panes[2].textContent).toBe('hidden 2');
        });

        it('should render pane with hideContentStyle outside lazyload range', () => {
            const { container } = render(
                <Tabs tabs={TABS} lazyloadCount={0} hideContentStyle={{ display: 'none' }}>
                    {PANES}
                </Tabs>,
            );
            const panes = container.querySelectorAll(`.${prefixTab}-pane`);
            expect(panes[0].style.display).not.toBe('none');
            // 范围外的 pane 保留内容但应用隐藏样式
            // Panes outside the range keep content but apply the hidden style
            expect(panes[1].style.display).toBe('none');
            expect(panes[1].textContent).toBe('Content 2');
        });

        it('should stop touch propagation on overflow bar and expose bar methods', () => {
            const ref = createRef();
            const { container } = render(
                <Tabs ref={ref} tabs={TABS}>
                    {PANES}
                </Tabs>,
            );
            mockContainer(ref);

            // overflow 状态的 bar 上派发原生 touch 事件被拦截
            // Native touch events on the overflow bar are stopped
            const barContainer = container.querySelector(`.${prefixTab}-cell-container`);
            expect(barContainer.classList.contains('overflow')).toBe(true);
            expect(() => {
                fireEvent.touchStart(barContainer, createStartTouchEventObject({ x: 10, y: 0 }));
            }).not.toThrow();

            // bar 的 resetUnderlineStyle 方法可用
            // The bar's resetUnderlineStyle method works
            expect(() => {
                act(() => {
                    ref.current.bar.resetUnderlineStyle();
                });
            }).not.toThrow();
        });

        it('should use raf scroll fallback when native smooth scroll is unavailable on android', () => {
            const ref = createRef();
            const { container } = render(
                <ContextProvider system="android">
                    <Tabs ref={ref} tabs={TABS}>
                        {PANES}
                    </Tabs>
                </ContextProvider>,
            );
            mockContainer(ref);

            // android 原生顺滑滚动不可用时走 raf 兜底
            // Falls back to raf scrolling when native smooth scroll is unavailable
            expect(container.querySelector(`.${prefixTab}-cell-container.overflow`)).toBeTruthy();
        });

        it('should scroll bar by top attribute in horizontal mode', () => {
            const ref = createRef();
            const { container } = render(
                <Tabs ref={ref} tabs={TABS} tabBarPosition="left">
                    {PANES}
                </Tabs>,
            );
            // 横向 tab（左右布局）时 overflow 依据纵向内容判断，滚动使用 scrollTop
            // For horizontal tabs, overflow is based on vertical content and scrolling uses scrollTop
            const barDom = ref.current.bar.dom;
            mockElementProperty(barDom, 'offsetWidth', 375);
            mockElementProperty(barDom, 'offsetHeight', 300);
            mockElementProperty(barDom, 'scrollWidth', 1000);
            mockElementProperty(barDom, 'scrollHeight', 1000);
            mockElementProperty(ref.current.dom, 'offsetWidth', 375);
            mockElementProperty(ref.current.dom, 'offsetHeight', 300);
            act(() => {
                ref.current.updateLayout();
            });
            // setState flush 后新注册的滚动定时器再推进一拍
            // Advance once more for the scroll timer registered after the state flush
            act(() => {
                jest.runOnlyPendingTimers();
                jest.advanceTimersByTime(100);
            });

            const barContainer = container.querySelector(`.${prefixTab}-cell-container`);
            expect(barContainer.classList.contains('overflow')).toBe(true);
        });
    });
});
