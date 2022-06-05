import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import ImagePreview from '..';
import Button from '../../button';
import Image from '../../image';
import { delay } from '../../../tests/helpers/utils';
import { createStartTouchEventObject, mockAddListener } from '../../../tests/helpers/mockEvent';
import { mockSwipe, mockSwipeEnd } from '../../carousel/__test__/utils';
import { mockContainerSize, resetContainerSizeMock } from '../../../tests/helpers/mockElement';

demoTest('image-preview');

mountTest(ImagePreview, 'ImagePreview');

const carouselPrefix = `${defaultContext.prefixCls}-carousel`;

const TestDemo = (props = {}) => {
    const { btnDefaultIndex = 0, onChange, ...restProps } = props;
    const [openIndex, setOpenIndex] = useState(-1);
    return (
        <>
            <Button onClick={() => setOpenIndex(btnDefaultIndex)}>Click Me</Button>
            <ImagePreview
                showLoading={false}
                openIndex={openIndex}
                onChange={(index) => {
                    onChange && onChange(index);
                    setOpenIndex(index);
                }}
                close={() => setOpenIndex(-1)}
                images={[
                    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg' },
                    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg' },
                    { src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg' },
                ]}
                {...restProps}
            />
        </>
    );
}

function loadImage(wrapper, rect) {
    const img = wrapper.find('.image-container img');
    expect(img).toHaveLength(1);
    if (rect) {
        img.getDOMNode().getBoundingClientRect = jest.fn(() => rect);
    }
    img.simulate('load');
}

function openAndLoadImage(wrapper, index) {
    wrapper.setProps({ btnDefaultIndex: index });
    wrapper.find(Button).simulate('click');
    expect(wrapper.find(ImagePreview).props().openIndex).toBe(index);
    loadImage(wrapper.find(Image).at(index));
}

describe('ImagePreview', () => {
    beforeAll(() => {
        mockContainerSize();
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

    it('should open preview correctly', () => {
        const onImageDoubleClick = jest.fn();
        const wrapper = mount(<TestDemo
            staticLabel={true}
            onImageDoubleClick={onImageDoubleClick}
        />);
        openAndLoadImage(wrapper, 0);
        expect(wrapper.find(Image)).toHaveLength(2);
        wrapper.find(ImagePreview).simulate('click');
        delay(wrapper, 800);
        expect(wrapper.find(ImagePreview).props().openIndex).toBe(-1);
        openAndLoadImage(wrapper, 1);
        expect(wrapper.find(Image)).toHaveLength(3);
        wrapper.find(ImagePreview).simulate('doubleClick');
        expect(onImageDoubleClick.mock.calls).toHaveLength(1);
    });

    it('should support thumb bounds', () => {
        const wrapper = mount(<TestDemo
            staticLabel={true}
            images={[{
                src: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
                fallbackSrc: 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg',
            }]}
            getThumbBounds={() => ({ top: 100, bottom: 200, left: 20, right: 120, width: 100, height: 100 })}
        />);
        openAndLoadImage(wrapper, 0);
        const fakeRect = wrapper.find('.image-preview-fake-rect');
        expect(fakeRect).toHaveLength(1);
        expect(fakeRect.find(Image)).toHaveLength(1);
        loadImage(fakeRect.find(Image), { top: 0, bottom: 700, left: 0, right: 375, width: 375, height: 700 });
        delay(wrapper, 1000);
        expect(wrapper.find('.image-preview-fake-rect')).toHaveLength(0);
    });

    it('should support touch event correctly', () => {
        const onChange = jest.fn();
        const onAfterChange = jest.fn();
        const onImageLongTap = jest.fn();
        const wrapper = mount(<TestDemo
            staticLabel={true}
            swipeable={false}
            onChange={onChange}
            onAfterChange={onAfterChange}
            onImageLongTap={onImageLongTap}
        />);
        openAndLoadImage(wrapper, 0);

        // mock swipe and change index
        const map = mockAddListener(wrapper.find(`.${carouselPrefix}`));
        wrapper.setProps({ swipeable: true });
        delay(wrapper, 100);
        mockSwipe(map, wrapper, carouselPrefix, { touchstart: 300, touchmove: 100, touchend: 30 });
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0]).toEqual([1]);
        delay(wrapper, 600);
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
        expect(wrapper.find(Image)).toHaveLength(3);
        wrapper.find(Image).at(1).find('img').simulate('error');
    });
})
