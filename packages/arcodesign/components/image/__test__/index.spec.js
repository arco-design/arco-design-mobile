import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Image from '..';
import '@testing-library/jest-dom';

const imgUrl = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg';

demoTest('image');

mountTest(Image, 'Image');

function loadStaticImage() {
    const img = screen.getAllByRole('img');
    expect(img.length).toBe(1);
    fireEvent.load(img[0]);
}

describe('Image', () => {
    let onerrorRef;
    let onloadRef;
    let originalImage;
    beforeAll(() => {
        originalImage = global.Image;
        function MockImage(...args) {
            const img = new originalImage(...args);
            Object.defineProperties(img, {
                onload: {
                    get() {
                        return this._onload;
                    },
                    set(onload) {
                        onloadRef = onload;
                        this._onload = onload;
                    },
                    configurable: true,
                },
                onerror: {
                    get() {
                        return this._onerror;
                    },
                    set(onerror) {
                        onerrorRef = onerror;
                        this._onerror = onerror;
                    },
                    configurable: true,
                },
                width: {
                    get() {
                        return 300;
                    },
                    configurable: true,
                },
                height: {
                    get() {
                        return 200;
                    },
                    configurable: true,
                },
            });
            return img;
        }
        MockImage.prototype = originalImage.prototype;
        global.Image = MockImage;
    });
    afterAll(() => {
        global.Image = originalImage;
    });
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    // it('Image renders correctly', () => {
    //     const wrapper = mount(
    //         <Image
    //             staticLabel
    //             src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
    //         />,
    //     );
    //     expect(wrapper.find('img').length).toBe(1);
    // });
    it('Image renders correctly', () => {
        const onLoad = jest.fn();
        render(
            <Image
                staticLabel
                src={imgUrl}
                onLoad={onLoad}
                nativeProps={{
                    crossOrigin: 'anonymous',
                }}
            />,
        );
        loadStaticImage();
        expect(onLoad).toBeCalledTimes(1);
    });
    // it('Fill mode renders correctly', () => {
    //     const wrapper = mount(
    //         <Image
    //             fit="contain"
    //             staticLabel
    //             src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
    //         />,
    //     );
    //     expect(wrapper.find('img').props().style.objectFit).toBe('contain');
    // });
    it('Fill mode renders correctly', () => {
        const { getByRole } = render(<Image fit="contain" staticLabel src={imgUrl} />);
        expect(getByRole('img')).toHaveStyle({ objectFit: 'contain' });
    });
    // it('Rendering correctly while loading', () => {
    //     const wrapper = mount(
    //         <Image
    //             status="loading"
    //             showLoading={true}
    //             src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
    //         />,
    //     );
    //     expect(wrapper.find('svg').length).toBe(1);
    // });
    it('Rendering correctly while loading', () => {
        const { container } = render(<Image status="loading" showLoading src={imgUrl} />);
        expect(container.querySelectorAll('svg').length).toBe(1);
    });
    // it('Failed to load renders correctly', () => {
    //     const wrapper = mount(
    //         <Image
    //             status="error"
    //             showError={true}
    //             errorArea={<div>加载失败</div>}
    //             src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
    //         />,
    //     );
    //     expect(wrapper.text()).toEqual('加载失败');
    // });
    it('Failed to load renders correctly', () => {
        const onLoadError = jest.fn();
        const onAutoRetry = jest.fn();
        render(
            <Image
                src={imgUrl}
                onError={onLoadError}
                onAutoRetry={onAutoRetry}
                retryTime={1}
                showError
                errorArea={<div>加载失败</div>}
            />,
        );
        onerrorRef();
        expect(onLoadError).not.toBeCalled();
        onerrorRef();
        expect(onLoadError).toBeCalled();
        expect(onAutoRetry).toBeCalled();
        const retryBtn = screen.getByText('加载失败');
        expect(retryBtn).toBeInTheDocument();
        userEvent.click(retryBtn);
        onerrorRef();
        expect(onLoadError).toBeCalledTimes(2);
    });
    it('Failed to load renders correctly without loading process', async () => {
        const onLoadError = jest.fn();
        const onAutoRetry = jest.fn();
        render(
            <Image
                staticLabel
                showError
                retryTime={1}
                src={imgUrl}
                onError={onLoadError}
                onAutoRetry={onAutoRetry}
            />,
        );
        const img = screen.getByRole('img');
        fireEvent.error(img);
        expect(onAutoRetry).toBeCalled();
        act(() => jest.runAllTimers());
        expect(onLoadError).not.toBeCalled();
        const imgNew = screen.getByRole('img');

        fireEvent.error(imgNew);
        expect(onLoadError).toBeCalled();
    });
    it('Load image correctly', () => {
        const onLoad = jest.fn();
        const { container, rerender } = render(
            <Image boxWidth={100} boxHeight={200} fit="preview-x" src={imgUrl} onLoad={onLoad} />,
        );
        onloadRef();
        act(() => jest.runAllTimers());
        expect(onLoad).toBeCalled();
        const imgWrapper = container.querySelector('.image-container');
        expect(imgWrapper).toHaveClass('loaded');
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveClass('preview-overflow-x');
        const ref = React.createRef();
        rerender(
            <Image
                ref={ref}
                boxWidth={200}
                boxHeight={100}
                fit="preview-y"
                src={imgUrl}
                onLoad={onLoad}
            />,
        );
        ref.current.retry();
        onloadRef();
        act(() => jest.runAllTimers());
        expect(screen.getByRole('img')).toHaveClass('preview-overflow-y');
    });

    it('Preview-x image fits the box renders correctly', () => {
        render(<Image boxWidth={300} boxHeight={100} fit="preview-x" src={imgUrl} />);
        onloadRef();
        act(() => jest.runAllTimers());
        expect(screen.getByRole('img')).toHaveClass('preview-fit-contain-x');
    });

    it('Preview-y image fits the box renders correctly', () => {
        render(<Image boxWidth={150} boxHeight={100} fit="preview-y" src={imgUrl} />);
        onloadRef();
        act(() => jest.runAllTimers());
        expect(screen.getByRole('img')).toHaveClass('preview-fit-contain-y');
    });

    it('Native props are applied to the loaded image', () => {
        render(<Image src={imgUrl} nativeProps={{ referrerPolicy: 'no-referrer' }} />);
        onloadRef();
        act(() => jest.runAllTimers());
        expect(screen.getByRole('img').referrerPolicy).toBe('no-referrer');
    });

    it('Load callback still works after unmounted', () => {
        const onLoad = jest.fn();
        const { unmount } = render(<Image src={imgUrl} onLoad={onLoad} />);
        unmount();
        onloadRef();
        act(() => jest.runAllTimers());
        expect(onLoad).toBeCalled();
    });

    it('Static image with completed img element triggers load or error', () => {
        const completeDesc = Object.getOwnPropertyDescriptor(
            HTMLImageElement.prototype,
            'complete',
        );
        const naturalWidthDesc = Object.getOwnPropertyDescriptor(
            HTMLImageElement.prototype,
            'naturalWidth',
        );
        Object.defineProperty(HTMLImageElement.prototype, 'complete', {
            get: () => true,
            configurable: true,
        });
        Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
            get: () => 100,
            configurable: true,
        });
        const onLoad = jest.fn();
        const { unmount: unmount1 } = render(
            <Image staticLabel src={imgUrl} onLoad={onLoad} />,
        );
        // 图片加载完成且有宽度时触发onLoad
        // @en Trigger onLoad when image is complete and has width
        expect(onLoad).toBeCalled();
        unmount1();

        Object.defineProperty(HTMLImageElement.prototype, 'naturalWidth', {
            get: () => 0,
            configurable: true,
        });
        const onError = jest.fn();
        const { unmount: unmount2 } = render(
            <Image staticLabel src={imgUrl} onError={onError} />,
        );
        // 图片加载完成但无宽高时触发onError
        // @en Trigger onError when image is complete but has no width
        expect(onError).toBeCalled();
        unmount2();

        completeDesc &&
            Object.defineProperty(HTMLImageElement.prototype, 'complete', completeDesc);
        naturalWidthDesc &&
            Object.defineProperty(
                HTMLImageElement.prototype,
                'naturalWidth',
                naturalWidthDesc,
            );
    });
});
