import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
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

// 运行demo测试和挂载测试
// Run demo test and mount test
demoTest('carousel');
mountTest(Carousel, 'Carousel');

// 设置HTML属性模拟，用于测试DOM尺寸相关功能
// Set up HTML property mocking for testing DOM size-related functionality
const { setHTMLProperties, unsetHTMLProperties } = defineHtmlRefProperties({
    offsetWidth: 375,
    offsetHeight: 200,
});

// 轮播组件的CSS类名前缀
// CSS class prefix for carousel component
const prefix = `${defaultContext.prefixCls}-carousel`;

// 通用测试配置常量
// Common test configuration constants
const COMMON_PROPS = {
    boxWidth: 375,
    autoPlay: false,
};

const TEST_ITEMS = [
    <div key="1">Item 1</div>,
    <div key="2">Item 2</div>,
    <div key="3">Item 3</div>,
];

/**
 * 检查指定索引的轮播项是否处于激活状态
 * Check if the carousel item at the specified index is active
 * @param {HTMLElement} wrapper - 容器元素 / Container element
 * @param {number} index - 索引 / Index
 * @returns {boolean} 是否激活 / Whether active
 */
function indexIsActive(wrapper, index) {
    const items = wrapper.querySelectorAll(`.${prefix}-item.normal-item`);
    return items[index].classList.contains('active');
}

/**
 * 渲染轮播组件的辅助函数
 * Helper function to render carousel component
 * @param {object} props - 组件属性 / Component props
 * @param {React.ReactNode[]} children - 子元素 / Children elements
 * @returns {object} 渲染结果 / Render result
 */
function renderCarousel(props = {}, children = TEST_ITEMS) {
    return render(
        <Carousel {...COMMON_PROPS} {...props}>
            {children}
        </Carousel>,
    );
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

    // 基础功能测试组
    // Basic functionality test group
    describe('Basic Functionality', () => {
        it('should auto play correctly', () => {
            const onChange = jest.fn();
            const { container } = render(
                <Carousel stayDuration={1000} boxWidth={375} onChange={onChange}>
                    <div />
                    <div />
                </Carousel>,
            );
            act(() => {
                jest.advanceTimersByTime(1600);
            });
            expect(indexIsActive(container, 1)).toBe(true);
            expect(onChange.mock.calls).toHaveLength(1);
            expect(onChange.mock.calls[0]).toEqual([1]);
        });

        it('should render correctly and handle single child scenarios', () => {
            // 测试单个子元素时禁用循环播放
            // Test disabling loop when only one child
            const { container } = render(
                <Carousel stayDuration={1000} boxWidth={375}>
                    <div />
                </Carousel>,
            );
            const inner = container.querySelector(`.${prefix}-inner`);
            expect(inner.children).toHaveLength(1);
            act(() => {
                jest.advanceTimersByTime(1600);
            });
            expect(indexIsActive(container, 0)).toBe(true);
        });

        it('should render correctly when using list property', () => {
            const { container } = render(
                <Carousel
                    list={[
                        { src: '11', text: 'test 1' },
                        { src: '22', text: 'test 2' },
                    ]}
                />,
            );
            const items = container.querySelectorAll(`.${prefix}-item`);
            expect(items).toHaveLength(2);
        });
    });

    // 受控模式和引用方法测试组
    // Controlled mode and ref methods test group
    describe('Controlled Mode & Ref Methods', () => {
        it('should support ref methods and controlled mode', () => {
            const ref = React.createRef();
            const { container, rerender } = renderCarousel({ ref });

            // 测试ref方法
            // Test ref methods
            const { dom, wrap, items, noLoop, updateData, changeIndex } = ref.current;
            expect(dom).toBeTruthy();
            expect(wrap).toBeTruthy();
            expect(items).toHaveLength(3);
            expect(typeof noLoop).toBe('boolean');
            expect(typeof updateData).toBe('function');
            expect(typeof changeIndex).toBe('function');

            // 测试changeIndex方法
            // Test changeIndex method
            act(() => {
                changeIndex(1);
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 1)).toBe(true);

            // 测试受控模式
            // Test controlled mode
            rerender(
                <Carousel currentIndex={2} autoPlay={false} boxWidth={375}>
                    {TEST_ITEMS}
                </Carousel>,
            );
            act(() => {
                jest.advanceTimersByTime(600);
            });
            expect(indexIsActive(container, 2)).toBe(true);
        });
    });

    // 触摸事件处理测试组
    // Touch event handling test group
    describe('Touch Events', () => {
        it('should handle touch events and swipe gestures correctly', () => {
            const onTouchStart = jest.fn(() => true);
            const onTouchEnd = jest.fn(() => true);
            const onTouchMove = jest.fn();

            const { container, rerender } = render(
                <Carousel
                    autoPlay={false}
                    boxWidth={375}
                    swipeable={false}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                >
                    <div />
                    <div />
                </Carousel>,
            );

            // 测试swipeable=false时不触发touchend
            // Test not triggering touchend when swipeable=false
            fireEvent.touchEnd(
                container.querySelector(`.${prefix}`),
                createMoveTouchEventObject({ x: 100, y: 0 }),
            );
            expect(onTouchEnd.mock.calls).toHaveLength(0);

            const map = mockAddListener(container.querySelector(`.${prefix}`));
            rerender(
                <Carousel autoPlay={false} boxWidth={375} swipeable>
                    <div />
                    <div />
                </Carousel>,
            );

            // 测试向右滑动到下一项
            // Test swiping right to next item
            mockSwipe(map, container, prefix, { touchstart: 100, touchmove: 150, touchend: 300 });
            expect(indexIsActive(container, 1)).toBe(true);

            // 测试向左滑动到上一项
            // Test swiping left to previous item
            mockSwipe(map, container, prefix, { touchstart: 300, touchmove: 150, touchend: 100 });
            expect(indexIsActive(container, 0)).toBe(true);

            // 测试回调函数 - 重新渲染以绑定回调
            // Test callback functions - re-render to bind callbacks
            rerender(
                <Carousel
                    autoPlay={false}
                    boxWidth={375}
                    swipeable
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                >
                    <div />
                    <div />
                </Carousel>,
            );

            // 测试取消滑动
            // Test canceling swipe
            rerender(
                <Carousel
                    autoPlay={false}
                    boxWidth={375}
                    swipeable
                    speedToChange={Infinity}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                >
                    <div />
                    <div />
                </Carousel>,
            );

            mockSwipe(map, container, prefix, { touchstart: 100, touchmove: 150, touchend: 100 });
            expect(indexIsActive(container, 0)).toBe(true);

            // 验证回调函数被调用 - 需要onTouchStart返回true时才阻止默认逻辑
            // Verify callback functions were called - default logic is prevented when onTouchStart returns true
            mockSwipe(map, container, prefix, { touchstart: 100, touchmove: 150, touchend: 300 });
            expect(onTouchStart).toHaveBeenCalled();
        });

        it('should handle boundary touch events with bounce effect', () => {
            const onTouchStopped = jest.fn();
            const { container } = render(
                <Carousel
                    onTouchStopped={onTouchStopped}
                    stopTouchThreshold={50}
                    loop={false}
                    bounceWhenNoLoop={true}
                    bounceDampRate={2}
                    autoPlay={false}
                    boxWidth={375}
                >
                    {TEST_ITEMS}
                </Carousel>,
            );

            const map = mockAddListener(container.querySelector(`.${prefix}`));

            // 测试边界处的回弹效果
            // Test bounce effect at boundary
            mockSwipe(map, container, prefix, {
                touchstart: 200,
                touchmove: 100,
                touchend: 50,
            });
            expect(indexIsActive(container, 0)).toBe(true);
        });
    });

    // 垂直轮播测试组
    // Vertical carousel test group
    describe('Vertical Carousel', () => {
        it('should render vertical carousel correctly and show warnings', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

            // 测试垂直轮播正常渲染
            // Test vertical carousel normal rendering
            const { container } = render(
                <Carousel vertical boxHeight={300} boxWidth={375} autoPlay={false}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            const carousel = container.querySelector(`.${prefix}`);
            expect(carousel).toBeTruthy();

            const inner = container.querySelector(`.${prefix}-inner.vertical`);
            expect(inner).toBeTruthy();

            const items = container.querySelectorAll(`.${prefix}-item.vertical`);
            expect(items).toHaveLength(3);

            // 测试缺少boxHeight时的警告
            // Test warning when boxHeight is missing
            render(
                <Carousel vertical autoPlay={false}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                </Carousel>,
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                '[Carousel Rendering Warning] When the prop `vertical` is specified and the prop `boxHeight` is not specified, you need to set a fixed `height` style for the outermost element.',
            );

            consoleSpy.mockRestore();
        });
    });

    // 指示器测试组
    // Indicator test group
    describe('Indicators', () => {
        it('should render indicators with various configurations', () => {
            const customIndicator = (current, total, last) => (
                <div className="custom-indicator">
                    {current + 1} / {total} (last: {last})
                </div>
            );

            const { container, rerender } = render(
                <Carousel renderIndicator={customIndicator} autoPlay={false} initialIndex={1}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            // 测试自定义指示器
            // Test custom indicator
            const customIndicatorEl = container.querySelector('.custom-indicator');
            expect(customIndicatorEl).toBeTruthy();
            expect(customIndicatorEl.textContent).toBe('2 / 3 (last: -1)');

            // 测试指示器位置和样式配置
            // Test indicator position and style configuration
            rerender(
                <Carousel
                    indicatorPos="start"
                    indicatorType="circle"
                    indicatorClass="custom-class"
                    indicatorInverse={true}
                    indicatorOutside={true}
                    autoPlay={false}
                >
                    {TEST_ITEMS}
                </Carousel>,
            );

            let indicator = container.querySelector(`.${prefix}-indicator`);
            expect(indicator.classList.contains('pos-start')).toBe(true);
            expect(indicator.classList.contains('inverse')).toBe(true);
            expect(indicator.classList.contains('outside')).toBe(true);

            const indicatorItems = container.querySelectorAll(
                '.indicator.type-circle.custom-class',
            );
            expect(indicatorItems).toHaveLength(3);

            // 测试垂直指示器
            // Test vertical indicator
            rerender(
                <Carousel vertical boxHeight={300} indicatorVerticalPos="right" autoPlay={false}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            indicator = container.querySelector(`.${prefix}-indicator`);
            expect(indicator.classList.contains('vertical')).toBe(true);
            expect(indicator.classList.contains('ver-pos-right')).toBe(true);
        });

        it('should handle indicator visibility settings', () => {
            // 测试隐藏单个指示器
            // Test hiding single indicator
            const { container: singleContainer } = render(
                <Carousel hideSingleIndicator autoPlay={false}>
                    <div>Only Item</div>
                </Carousel>,
            );

            expect(singleContainer.querySelector(`.${prefix}-indicator`)).toBeFalsy();

            // 测试禁用指示器显示
            // Test disabling indicator display
            const { container: noIndicatorContainer } = render(
                <Carousel showIndicator={false} autoPlay={false}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            expect(noIndicatorContainer.querySelector(`.${prefix}-indicator`)).toBeFalsy();
        });
    });

    // 高级功能测试组
    // Advanced features test group
    describe('Advanced Features', () => {
        it('should handle lazy loading correctly', () => {
            const { container } = render(
                <Carousel lazyloadCount={1} initialIndex={2} autoPlay={false} boxWidth={375}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                    <div>Item 5</div>
                </Carousel>,
            );

            const items = container.querySelectorAll(`.${prefix}-item`);
            expect(items).toHaveLength(5);

            // 检查只有相邻的项被渲染内容
            // Check that only adjacent items have rendered content
            expect(items[0].textContent).toBe(''); // 不在范围内 / Not in range
            expect(items[1].textContent).toBe('Item 2'); // 在范围内 / In range
            expect(items[2].textContent).toBe('Item 3'); // 当前项 / Current item
            expect(items[3].textContent).toBe('Item 4'); // 在范围内 / In range
            expect(items[4].textContent).toBe(''); // 不在范围内 / Not in range
        });

        it('should handle various layout and style configurations', () => {
            // 测试偏移设置
            // Test offset settings
            const { container, rerender } = render(
                <Carousel offsetBetween={20} autoPlay={false} boxWidth={375}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            act(() => {
                jest.advanceTimersByTime(1600);
            });
            expect(indexIsActive(container, 0)).toBe(true);

            // 测试对象形式的偏移设置
            // Test object-form offset settings
            rerender(
                <Carousel offsetBetween={{ left: 10, right: 20 }} autoPlay={false} boxWidth={375}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            expect(container.querySelector(`.${prefix}`)).toBeTruthy();

            // 测试缩放效果
            // Test scale effect
            rerender(
                <Carousel inactiveScale={0.8} autoPlay={false} boxWidth={375}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            const itemInners = container.querySelectorAll(`.${prefix}-item-inner`);
            expect(itemInners).toHaveLength(3);
            expect(itemInners[0].style.transform).toContain('scale(1)');
            expect(itemInners[1].style.transform).toContain('scale(0.8)');

            // 测试元素间距
            // Test spacing between items
            rerender(
                <Carousel spaceBetween={20} autoPlay={false} boxWidth={375}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            const items = container.querySelectorAll(`.${prefix}-item`);
            expect(items[0].style.paddingLeft).toBe('20px');
        });

        it('should handle fake items and special configurations', () => {
            // 测试假元素功能
            // Test fake items functionality
            const { container } = render(
                <Carousel
                    stayDuration={1000}
                    boxWidth={375}
                    offsetBetween={20}
                    fakeItem
                    initialIndex={2}
                >
                    {TEST_ITEMS}
                </Carousel>,
            );

            act(() => {
                jest.advanceTimersByTime(1600);
            });
            expect(indexIsActive(container, 0)).toBe(true);

            const fakeItems = container.querySelectorAll(`.${prefix}-item.fake-item`);
            expect(fakeItems).toHaveLength(3);

            // 测试两个子元素的假元素处理
            // Test fake items with two children
            const { container: twoItemContainer } = render(
                <Carousel fakeItem={true} autoPlay={false} boxWidth={375}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                </Carousel>,
            );

            const items = twoItemContainer.querySelectorAll(`.${prefix}-item`);
            expect(items.length).toBeGreaterThanOrEqual(4);
        });
    });

    // 回调函数和事件测试组
    // Callbacks and events test group
    describe('Callbacks & Events', () => {
        it('should trigger all callback functions correctly', () => {
            const onChange = jest.fn();
            const onTransitionStart = jest.fn();
            const onTransitionEnd = jest.fn();
            const onAfterChange = jest.fn();
            const onDistanceChange = jest.fn();

            const ref = React.createRef();
            render(
                <Carousel
                    ref={ref}
                    autoPlay={false}
                    boxWidth={375}
                    onChange={onChange}
                    onTransitionStart={onTransitionStart}
                    onTransitionEnd={onTransitionEnd}
                    onAfterChange={onAfterChange}
                    onDistanceChange={onDistanceChange}
                >
                    {TEST_ITEMS}
                </Carousel>,
            );

            act(() => {
                ref.current.changeIndex(1);
                jest.advanceTimersByTime(600);
            });

            expect(onTransitionStart).toHaveBeenCalled();
            expect(onTransitionEnd).toHaveBeenCalled();
            expect(onAfterChange).toHaveBeenCalledWith(1, 0);

            // 测试反向自动播放
            // Test reverse auto play
            const { container } = render(
                <Carousel
                    autoPlayDirection="reverse"
                    stayDuration={1000}
                    boxWidth={375}
                    onChange={onChange}
                    initialIndex={2}
                >
                    {TEST_ITEMS}
                </Carousel>,
            );

            act(() => {
                jest.advanceTimersByTime(1600);
            });

            expect(onChange).toHaveBeenCalledWith(1);
            expect(indexIsActive(container, 1)).toBe(true);
        });

        it('should handle list mode with click events', () => {
            const onItemClick = jest.fn();
            const { container } = render(
                <Carousel
                    list={[
                        { src: 'image1.jpg', text: 'Image 1', onClick: onItemClick },
                        { src: 'image2.jpg', text: 'Image 2' },
                    ]}
                    autoPlay={false}
                />,
            );

            const firstImage = container.querySelector('.carousel-item-img');
            fireEvent.click(firstImage);

            expect(onItemClick).toHaveBeenCalled();

            // 验证文本显示
            // Verify text display
            const textEl = container.querySelector('.carousel-item-text');
            expect(textEl.textContent).toBe('Image 1');
        });
    });

    // 边界情况和特殊场景测试组
    // Edge cases and special scenarios test group
    describe('Edge Cases & Special Scenarios', () => {
        it('should handle warnings and validations', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

            // 测试distanceToChange过小时的警告
            // Test warning when distanceToChange is too small
            render(
                <Carousel distanceToChange={0.5} autoPlay={false}>
                    {TEST_ITEMS}
                </Carousel>,
            );

            expect(consoleSpy).toHaveBeenCalledWith(
                '[Carousel Props Warning] The value of the prop `distanceToChange` is too small(0.5). Do you meant to use the prop `percentToChange`?',
            );

            consoleSpy.mockRestore();
        });

        it('should handle document visibility changes and iOS optimization', () => {
            // 测试iOS文档可见性变化
            // Test iOS document visibility changes
            const { container } = render(
                <ContextProvider system="ios">
                    <Carousel boxWidth={375}>{TEST_ITEMS}</Carousel>
                </ContextProvider>,
            );

            const dom = container.querySelector(`.${prefix}:not(.wrap-placeholder)`);
            act(() => {
                mockDocumentVisibility('hidden');
            });
            expect(getComputedStyle(dom).getPropertyValue('display')).toBe('none');

            act(() => {
                mockDocumentVisibility('visible');
            });
            expect(getComputedStyle(dom).getPropertyValue('display')).toBe('block');

            // 测试禁用iOS优化
            // Test disabling iOS optimization
            const { container: noOptContainer } = render(
                <ContextProvider system="ios">
                    <Carousel iOSVisibleOptimize={false} boxWidth={375}>
                        {TEST_ITEMS}
                    </Carousel>
                </ContextProvider>,
            );

            const placeholder = noOptContainer.querySelector('.wrap-placeholder');
            expect(placeholder).toBeFalsy();
        });

        it('should handle children count changes and other edge cases', () => {
            // 测试children变化时的索引调整
            // Test index adjustment when children change
            const { container, rerender } = render(
                <Carousel autoPlay={false} boxWidth={375} initialIndex={3}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                    <div>Item 5</div>
                </Carousel>,
            );

            expect(indexIsActive(container, 3)).toBe(true);

            // 减少children数量，当前索引超出范围
            // Reduce children count, current index out of range
            rerender(
                <Carousel autoPlay={false} boxWidth={375}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                </Carousel>,
            );

            act(() => {
                jest.advanceTimersByTime(100);
            });

            // 应该自动调整到最后一个有效索引
            // Should automatically adjust to last valid index
            expect(indexIsActive(container, 1)).toBe(true);
        });

        it('should handle miscellaneous configurations', () => {
            const customProcessor = jest.fn((posDis, wrapSize, childSize) => {
                return childSize * (posDis / wrapSize) * 0.5;
            });

            const customPageVisibilityListener = jest.fn((updateVisible, updateInvisible) => {
                return () => {};
            });

            const renderExtra = currentIndex => (
                <div className="extra-content">Extra for index {currentIndex}</div>
            );

            const { container, rerender } = render(
                <Carousel
                    distanceProcessor={customProcessor}
                    onPageVisibleChange={customPageVisibilityListener}
                    renderExtra={renderExtra}
                    allowEndBlank={true}
                    loop={false}
                    width={200}
                    autoHeight={true}
                    stopPropagation={false}
                    autoPlay={false}
                    boxWidth={375}
                    swipeable={false}
                >
                    {TEST_ITEMS}
                </Carousel>,
            );

            // 验证额外内容渲染
            // Verify extra content rendering
            const extraContent = container.querySelector('.extra-content');
            expect(extraContent).toBeTruthy();
            expect(extraContent.textContent).toBe('Extra for index 0');

            // 验证自定义页面可见性监听器
            // Verify custom page visibility listener
            expect(customPageVisibilityListener).toHaveBeenCalled();

            // 测试自定义距离处理器
            // Test custom distance processor
            const map = mockAddListener(container.querySelector(`.${prefix}`));
            rerender(
                <Carousel
                    distanceProcessor={customProcessor}
                    autoPlay={false}
                    boxWidth={375}
                    swipeable={true}
                >
                    {TEST_ITEMS}
                </Carousel>,
            );

            mockSwipe(map, container, prefix, {
                touchstart: 100,
                touchmove: 150,
                touchend: 200,
            });

            expect(customProcessor).toHaveBeenCalled();
        });

        it('should work correctly in RTL mode', () => {
            const ref = React.createRef();
            const { container } = render(
                <ContextProvider useRtl>
                    <Carousel ref={ref} autoPlay={false} boxWidth={375}>
                        {TEST_ITEMS}
                    </Carousel>
                </ContextProvider>,
            );

            // 在RTL模式下测试方向变化
            // Test direction changes in RTL mode
            act(() => {
                ref.current.changeIndex(1, false, 'right');
                jest.advanceTimersByTime(600);
            });

            expect(indexIsActive(container, 1)).toBe(true);
        });
    });
});
