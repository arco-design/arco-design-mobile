import React, { useState } from 'react';
import { act, render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import ImagePreview from '..';
import Button from '../../button';
import Image from '../../image';
import { delay, pureDelay } from '../../../tests/helpers/utils';
import { createStartTouchEventObject, mockAddListener } from '../../../tests/helpers/mockEvent';
import { mockSwipe, mockSwipeEnd } from '../../carousel/__test__/utils-rtl';
import { mockContainerSize, resetContainerSizeMock } from '../../../tests/helpers/mockElement';

demoTest('image-preview');

mountTest(ImagePreview, 'ImagePreview');

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

describe('ImagePreview', () => {
    beforeAll(() => {
        mockContainerSize();
        window.requestAnimationFrame = jest.fn(fn => fn());
    });

    afterAll(() => {
        resetContainerSizeMock();
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
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

    it('should support thumb bounds', () => {
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
        const map = mockAddListener(document.querySelector(`.${carouselPrefix}`), true);
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
        window.instance = ImagePreview.open({ staticLabel: true, onClose, images: demoImages });
        // TODO: ReactDOM.render 不生效，待升级 react 18 版本对应的rtl
        // pureDelay(1100);
        // expect(document.querySelectorAll(`.${imagePrefix}`)).toHaveLength(2);
        expect(typeof window.instance.close).toBe('function');
        expect(typeof window.instance.update).toBe('function');
        window.instance.close();
        // pureDelay(1100);
        // expect(onClose.mock.calls).toHaveLength(1);
    });
});
