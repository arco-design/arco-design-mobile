import React, { createRef, useState } from 'react';
import { act, render, waitFor, fireEvent } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import ImagePreview from '..';
import Button from '../../button';
import { pureDelay } from '../../../tests/helpers/utils';
import {
    createStartTouchEventObject,
    createMoveTouchEventObject,
    mockAddListener,
} from '../../../tests/helpers/mockEvent';
import { mockSwipe, mockSwipeEnd } from '../../carousel/__test__/utils';
import { defineHtmlRefProperties } from '../../../tests/helpers/mockElement';

demoTest('image-preview');

mountTest(ImagePreview, 'ImagePreview');

const { setHTMLProperties, unsetHTMLProperties } = defineHtmlRefProperties({
    offsetWidth: 375,
    offsetHeight: 200,
});

const prefix = `${defaultContext.prefixCls}-image-preview`;
const imagePrefix = `${defaultContext.prefixCls}-image`;
const carouselPrefix = `${defaultContext.prefixCls}-carousel`;

const demoImages = [
    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg' },
    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg' },
];

function TestDemo(props = {}) {
    const { btnDefaultIndex = 0, onChange, ...restProps } = props;
    const [openIndex, setOpenIndex] = useState(-1);
    return (
        <>
            <Button
                className="image-preview-test-btn"
                onClick={() => setOpenIndex(btnDefaultIndex)}
            >
                Click Me
            </Button>
            <ImagePreview
                showLoading={false}
                openIndex={openIndex}
                onChange={index => {
                    onChange && onChange(index);
                    setOpenIndex(index);
                }}
                close={() => setOpenIndex(-1)}
                images={demoImages}
                {...restProps}
            />
        </>
    );
}

function loadImage(container, rect) {
    const img = container.querySelector('.image-container img');
    expect(img).not.toBeNull();
    if (rect) {
        const mockBoundingClientRect = jest.fn(() => rect);
        Object.defineProperty(img, 'getBoundingClientRect', {
            value: mockBoundingClientRect,
        });
    }
    fireEvent.load(img);
}

function openAndLoadImage(view, props, index) {
    const { container, rerender } = view;
    rerender(<TestDemo {...props} btnDefaultIndex={index} />);
    fireEvent.click(container.querySelector('.image-preview-test-btn'));
    expect(document.querySelectorAll(`.${carouselPrefix}-item`)[index].classList).toContain(
        'active',
    );
    loadImage(document.querySelectorAll(`.${imagePrefix}`)[index]);
}

function rerenderOpen(view, props, index) {
    const { container, rerender } = view;
    rerender(<TestDemo {...props} btnDefaultIndex={index} />);
    fireEvent.click(container.querySelector('.image-preview-test-btn'));
}

describe('ImagePreview', () => {
    beforeAll(() => {
        // mockContainerSize();
        setHTMLProperties();
        window.requestAnimationFrame = jest.fn(fn => fn());
    });

    afterAll(() => {
        // resetContainerSizeMock();
        unsetHTMLProperties();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        act(() => {
            jest.runAllTimers();
        });

        jest.useRealTimers();
    });

    it('should open preview correctly', async () => {
        const onImageDoubleClick = jest.fn();
        const props = { staticLabel: true, onImageDoubleClick };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        expect(document.querySelectorAll(`.${imagePrefix}`)).toHaveLength(2);
        fireEvent.click(document.querySelector(`.${prefix}`));
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).toBeNull();
            },
            { timeout: 1000 },
        );
        openAndLoadImage(view, props, 1);
        expect(document.querySelectorAll(`.${imagePrefix}`)).toHaveLength(3);
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        expect(onImageDoubleClick.mock.calls).toHaveLength(1);
    });

    it('should support thumb bounds', async () => {
        const props = {
            staticLabel: true,
            images: [
                {
                    src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
                    fallbackSrc:
                        'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
                },
            ],
            getThumbBounds: () => ({
                top: 100,
                bottom: 200,
                left: 20,
                right: 120,
                width: 100,
                height: 100,
            }),
        };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        const fakeRect = document.querySelector('.image-preview-fake-rect');
        expect(fakeRect).not.toBeNull();
        expect(fakeRect.querySelectorAll(`.${imagePrefix}`)).toHaveLength(1);
        loadImage(fakeRect.querySelector(`.${imagePrefix}`), {
            top: 0,
            bottom: 700,
            left: 0,
            right: 375,
            width: 375,
            height: 700,
        });
        pureDelay(1000);
        expect(document.querySelectorAll('.image-preview-fake-rect')).toHaveLength(0);
        loadImage(document.querySelector(`.${imagePrefix}`), {
            top: 0,
            bottom: 700,
            left: 0,
            right: 375,
            width: 375,
            height: 700,
        });
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
        act(() => {
            fireEvent.click(document.querySelector('.image-container img'));
        });
        pureDelay(300);
        expect(document.querySelector('.closing-animation')).not.toBeNull();
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).toBeNull();
            },
            { timeout: 1000 },
        );
    });

    it('should support touch event correctly', () => {
        const onChange = jest.fn();
        const onAfterChange = jest.fn();
        const onImageLongTap = jest.fn();
        const props = {
            staticLabel: true,
            swipeable: true,
            onChange,
            onAfterChange,
            onImageLongTap,
        };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);

        // mock swipe and change index
        const map = mockAddListener(document.querySelector(`.${carouselPrefix}`));
        view.rerender(<TestDemo {...props} swipeable />);
        pureDelay(100);
        const wrapper = document.querySelector(`.${prefix}`);
        mockSwipe(map, wrapper, carouselPrefix, { touchstart: 300, touchmove: 100, touchend: 30 });
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([1]);
        pureDelay(600);
        expect(onAfterChange.mock.calls).toHaveLength(1);
        expect(onAfterChange.mock.calls[0]).toEqual([1]);

        // long tap
        act(() => {
            map.touchstart(createStartTouchEventObject({ x: 200, y: 0 }));
            jest.advanceTimersByTime(600);
        });
        mockSwipeEnd(wrapper, carouselPrefix, 200);
        expect(onImageLongTap.mock.calls).toHaveLength(1);
        expect(onImageLongTap.mock.calls[0][0]).toBe(1);

        // image load error
        const images = document.querySelectorAll(`.${imagePrefix}`);
        expect(images).toHaveLength(3);
        fireEvent.error(images[1].querySelector('img'));
    });

    it('should support `ImagePreview.open`', async () => {
        const onClose = jest.fn();
        window.instance = ImagePreview.open({
            staticLabel: true,
            onClose,
            images: demoImages,
            openIndex: 0,
        });
        pureDelay(1100);
        expect(document.querySelectorAll(`.${imagePrefix}`)).toHaveLength(2);
        expect(typeof window.instance.close).toBe('function');
        expect(typeof window.instance.update).toBe('function');
        window.instance.close();
        pureDelay(1100);
        expect(onClose.mock.calls).toHaveLength(1);
    });

    it('should expose dom and imageDoms via ref', () => {
        const ref = createRef();
        render(
            <ImagePreview ref={ref} images={demoImages} openIndex={0} close={() => {}} />,
        );
        expect(ref.current.dom).toBe(document.querySelector(`.${prefix}`));
        expect(Array.isArray(ref.current.imageDoms)).toBe(true);
    });

    it('should close preview when swiping out vertically', async () => {
        const props = { staticLabel: true };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);

        // 在轮播元素上竖直方向连续往外滑动，touchend 时关闭预览
        const carouselEle = document.querySelector(`.${carouselPrefix}`);
        fireEvent.touchStart(carouselEle, createStartTouchEventObject({ x: 100, y: 100 }));
        for (let i = 0; i < 4; i++) {
            fireEvent.touchMove(carouselEle, createMoveTouchEventObject({ x: 100, y: 60 }));
        }
        fireEvent.touchEnd(carouselEle, createMoveTouchEventObject({ x: 100, y: 60 }));
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).toBeNull();
            },
            { timeout: 1000 },
        );
    });

    it('should do nothing when double clicking before image loaded', () => {
        const onImageDoubleClick = jest.fn();
        const props = { staticLabel: true, onImageDoubleClick };
        const view = render(<TestDemo {...props} />);
        // 打开后不触发 load，双击无图片可缩放
        rerenderOpen(view, props, 0);
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        expect(onImageDoubleClick.mock.calls).toHaveLength(1);
    });

    it('should do nothing when double clicking after current image failed to load', () => {
        const onImageDoubleClick = jest.fn();
        const props = { staticLabel: true, onImageDoubleClick };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        // 当前图片加载失败后 imageDoms 被清空
        fireEvent.error(document.querySelectorAll(`.${imagePrefix}`)[0].querySelector('img'));
        pureDelay(100);
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(100);
        expect(onImageDoubleClick.mock.calls).toHaveLength(1);
    });

    it('should zoom in and restore when double clicking loaded image', () => {
        const onImageDoubleClick = jest.fn();
        const props = { staticLabel: true, onImageDoubleClick };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        const img = document.querySelectorAll(`.${imagePrefix}`)[0].querySelector('img');
        const wrapDom = img.closest('.preview-image-wrap');
        // 图片宽高均超出视口（window.innerWidth 1024 / innerHeight 768），双击放大后两轴可自由移动
        Object.defineProperty(img, 'getBoundingClientRect', {
            value: jest.fn(() => ({
                top: 0,
                bottom: 1000,
                left: 0,
                right: 2000,
                width: 2000,
                height: 1000,
            })),
        });

        const carouselEle = document.querySelector(`.${carouselPrefix}`);
        const resetDblClickStatus = () => {
            fireEvent.touchStart(carouselEle, createStartTouchEventObject({ x: 100, y: 0 }));
            fireEvent.touchEnd(carouselEle, createMoveTouchEventObject({ x: 100, y: 0 }));
        };

        // 第一次双击放大
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(onImageDoubleClick.mock.calls).toHaveLength(1);
        expect(wrapDom.style.transform).toContain('matrix(2');

        // 触摸复位双击状态后再次双击，还原缩放
        resetDblClickStatus();
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(onImageDoubleClick.mock.calls).toHaveLength(2);

        // 再放大后点击关闭：已放大状态下不做缩小过渡动画
        resetDblClickStatus();
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(wrapDom.style.transform).toContain('matrix(2');
        // 双击后需要触摸复位点击状态，点击才会触发关闭
        resetDblClickStatus();
        fireEvent.click(img);
        pureDelay(500);
        expect(document.querySelector('.closing-animation')).toBeNull();
    });

    it('should keep carousel gesture locked when touching during zoom animation', () => {
        const props = { staticLabel: true };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        const carouselEle = document.querySelector(`.${carouselPrefix}`);

        // 双击放大后动画进行中（200ms 内，fake timers 不推进），缩放状态下的触摸不触发轮播手势
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        fireEvent.touchStart(carouselEle, createStartTouchEventObject({ x: 100, y: 0 }));
        fireEvent.touchMove(carouselEle, createMoveTouchEventObject({ x: 60, y: 0 }));
        fireEvent.touchEnd(carouselEle, createMoveTouchEventObject({ x: 60, y: 0 }));
        pureDelay(600);
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should restore long image zoom specially when double clicking overflow image', () => {
        const props = {
            staticLabel: true,
            images: [{ src: demoImages[0].src, fit: 'preview-x' }],
        };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        const carouselEle = document.querySelector(`.${carouselPrefix}`);
        const resetDblClickStatus = () => {
            fireEvent.touchStart(carouselEle, createStartTouchEventObject({ x: 100, y: 0 }));
            fireEvent.touchEnd(carouselEle, createMoveTouchEventObject({ x: 100, y: 0 }));
        };

        // 第一次双击放大
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);

        // 长图再次双击走 zoomToScreenCenter + restore 的特殊还原路径
        resetDblClickStatus();
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should fix x axis when zoomed image is narrower than window', () => {
        const props = { staticLabel: true };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        const img = document.querySelectorAll(`.${imagePrefix}`)[0].querySelector('img');
        // 宽度不超过视口宽（1024）、高度超过视口高（768）
        Object.defineProperty(img, 'getBoundingClientRect', {
            value: jest.fn(() => ({
                top: 0,
                bottom: 900,
                left: 0,
                right: 800,
                width: 800,
                height: 900,
            })),
        });
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should use fitScale when image is much wider than tall', () => {
        const props = { staticLabel: true };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        const img = document.querySelectorAll(`.${imagePrefix}`)[0].querySelector('img');
        Object.defineProperty(img, 'naturalWidth', { value: 3750, configurable: true });
        Object.defineProperty(img, 'naturalHeight', { value: 100, configurable: true });
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should support custom scale config and update transformers', () => {
        const getMinScale = jest.fn(() => 0.5);
        const getMaxScale = jest.fn(() => 3);
        const getDoubleClickScale = jest.fn(() => 2);
        let props = { staticLabel: true, getMinScale, getMaxScale };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        expect(getMinScale).toBeCalled();
        expect(getMaxScale).toBeCalled();

        // 自定义双击倍数
        view.rerender(
            <TestDemo {...props} getDoubleClickScale={getDoubleClickScale} />,
        );
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(getDoubleClickScale).toBeCalled();

        // 更新缩放配置后同步到已创建的 transformer
        props = { staticLabel: true, getMinScale: () => 0.8, getMaxScale: () => 4 };
        view.rerender(<TestDemo {...props} />);
        pureDelay(100);
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should support custom touch event interceptors', () => {
        const onTouchStart = jest.fn(e => e.touches.length === 1);
        const onTouchMove = jest.fn(() => true);
        const onTouchEnd = jest.fn(() => true);
        const props = { staticLabel: true, onTouchStart, onTouchMove, onTouchEnd };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);

        const map = mockAddListener(document.querySelector(`.${carouselPrefix}`));
        view.rerender(<TestDemo {...props} swipeable />);
        pureDelay(100);

        // onTouchStart 返回 true 时中断处理
        map.touchstart(createStartTouchEventObject({ x: 100, y: 0 }));
        pureDelay(100);
        expect(onTouchStart).toBeCalled();

        // 多指触摸不触发长按
        map.touchstart({
            touches: [
                { clientX: 100, clientY: 0 },
                { clientX: 150, clientY: 0 },
            ],
            stopPropagation: () => {},
            preventDefault: () => {},
        });
        pureDelay(100);

        // onTouchMove / onTouchEnd 返回 true 时中断处理
        map.touchmove(createMoveTouchEventObject({ x: 120, y: 0 }));
        pureDelay(100);
        expect(onTouchMove).toBeCalled();
        fireEvent.touchEnd(
            document.querySelector(`.${carouselPrefix}`),
            createMoveTouchEventObject({ x: 150, y: 0 }),
        );
        pureDelay(100);
        expect(onTouchEnd).toBeCalled();
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should not close preview by clicking after swiping', () => {
        const props = { staticLabel: true, swipeable: true };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);

        const map = mockAddListener(document.querySelector(`.${carouselPrefix}`));
        view.rerender(<TestDemo {...props} swipeable />);
        pureDelay(100);
        const wrapper = document.querySelector(`.${prefix}`);
        mockSwipe(map, wrapper, carouselPrefix, { touchstart: 300, touchmove: 100, touchend: 30 });
        pureDelay(600);

        // 滑动后的点击不触发关闭
        fireEvent.click(wrapper);
        pureDelay(400);
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should ignore repeated close click during closing', () => {
        const props = { staticLabel: true };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        const img = document.querySelector('.image-container img');
        // 第一次点击触发关闭流程
        fireEvent.click(img);
        pureDelay(300);
        // 关闭过程中再次点击直接忽略
        fireEvent.click(img);
        pureDelay(600);
    });

    it('should ignore repeated double click', () => {
        const onImageDoubleClick = jest.fn();
        const props = { staticLabel: true, onImageDoubleClick };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        fireEvent.doubleClick(document.querySelector(`.${prefix}`));
        pureDelay(300);
        expect(onImageDoubleClick.mock.calls).toHaveLength(1);
    });

    it('should skip shrinking animation when thumb is out of view', async () => {
        const props = {
            staticLabel: true,
            images: [demoImages[0]],
            getThumbBounds: () => ({
                top: -200,
                bottom: -100,
                left: 20,
                right: 120,
                width: 100,
                height: 100,
            }),
        };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        fireEvent.click(document.querySelector('.image-container img'));
        pureDelay(300);
        expect(document.querySelector('.closing-animation')).toBeNull();
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).toBeNull();
            },
            { timeout: 1000 },
        );
    });

    it('should skip shrinking animation when image rect is empty', async () => {
        const props = {
            staticLabel: true,
            images: [demoImages[0]],
            getThumbBounds: () => ({
                top: 100,
                bottom: 200,
                left: 20,
                right: 120,
                width: 100,
                height: 100,
            }),
        };
        const view = render(<TestDemo {...props} />);
        // 加载图片但不 mock 图片 rect（jsdom 下 rect 为 0）
        rerenderOpen(view, props, 0);
        fireEvent.click(view.container.querySelector('.image-preview-test-btn'));
        loadImage(document.querySelectorAll(`.${imagePrefix}`)[0]);
        fireEvent.click(document.querySelector('.image-container img'));
        pureDelay(300);
        expect(document.querySelector('.closing-animation')).toBeNull();
        await waitFor(
            () => {
                expect(document.querySelector(`.${prefix}`)).toBeNull();
            },
            { timeout: 1000 },
        );
    });

    it('should cancel transition animation when thumb bounds is empty', () => {
        const props = {
            staticLabel: true,
            images: [
                {
                    src: demoImages[0].src,
                    fallbackSrc: demoImages[0].src,
                },
            ],
            getThumbBounds: () => ({
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0,
            }),
        };
        const view = render(<TestDemo {...props} />);
        rerenderOpen(view, props, 0);
        fireEvent.click(view.container.querySelector('.image-preview-test-btn'));
        pureDelay(100);
        expect(document.querySelectorAll('.image-preview-fake-rect')).toHaveLength(0);
    });

    it('should cancel transition animation when transition image fails to load', () => {
        const props = {
            staticLabel: true,
            images: [
                {
                    src: demoImages[0].src,
                    fallbackSrc: demoImages[0].src,
                },
            ],
            getThumbBounds: () => ({
                top: 100,
                bottom: 200,
                left: 20,
                right: 120,
                width: 100,
                height: 100,
            }),
        };
        const view = render(<TestDemo {...props} />);
        rerenderOpen(view, props, 0);
        fireEvent.click(view.container.querySelector('.image-preview-test-btn'));
        const fakeRect = document.querySelector('.image-preview-fake-rect');
        expect(fakeRect).not.toBeNull();
        fireEvent.error(fakeRect.querySelector('img'));
        pureDelay(100);
        expect(document.querySelectorAll('.image-preview-fake-rect')).toHaveLength(0);
    });

    it('should support custom renderIndicator', () => {
        const props = {
            staticLabel: true,
            renderIndicator: (index, total) => (
                <div className="custom-ip-indicator">{`${index}-${total}`}</div>
            ),
        };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        expect(document.querySelector('.custom-ip-indicator').textContent).toBe('0-3');
    });

    it('should mark placeholder when loading a non-current image', () => {
        const props = { staticLabel: true };
        const view = render(<TestDemo {...props} />);
        openAndLoadImage(view, props, 0);
        // 直接加载非当前索引的图片
        loadImage(document.querySelectorAll(`.${imagePrefix}`)[1]);
        pureDelay(100);
        expect(document.querySelector(`.${prefix}`)).not.toBeNull();
    });

    it('should support updating config and closing immediately after open', async () => {
        window.instance = ImagePreview.open({
            staticLabel: true,
            images: demoImages,
            openIndex: 0,
        });
        pureDelay(1100);
        loadImage(document.querySelectorAll(`.${imagePrefix}`)[0]);
        window.instance.update({ images: demoImages.slice(0, 2) });
        pureDelay(300);
        expect(document.querySelector('.image-preview-indicator').textContent).toBe('1/2');
        window.instance.close();
        pureDelay(1100);

        // 打开后立即关闭，跳过延迟打开的渲染
        const onClose = jest.fn();
        const instance = ImagePreview.open({
            staticLabel: true,
            onClose,
            images: demoImages,
            openIndex: 0,
        });
        instance.close();
        // 从未真正打开过（isInitialMount 保护），不触发 onClose
        pureDelay(600);
        expect(onClose.mock.calls).toHaveLength(0);
    });
});
