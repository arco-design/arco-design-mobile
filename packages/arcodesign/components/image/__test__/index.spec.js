import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Image from '..';
import '@testing-library/jest-dom';

const imgUrl = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg';

demoTest('image');

mountTest(Image, 'Image');

describe('Image', () => {
    let onerrorRef;
    let loadingImage;
    let originalImage;

    function getRequestedImage() {
        act(() => jest.runOnlyPendingTimers());
        expect(loadingImage).toHaveAttribute('src', imgUrl);
        expect(typeof loadingImage.onload).toBe('function');
        return loadingImage;
    }

    function completeRequest(image = getRequestedImage()) {
        act(() => {
            image.onload?.(new Event('load'));
        });
    }

    beforeAll(() => {
        originalImage = global.Image;
        function MockImage(...args) {
            const img = new originalImage(...args);
            loadingImage = img;
            Object.defineProperties(img, {
                onload: { value: null, writable: true, configurable: true },
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
        loadingImage = undefined;
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
        const img = screen.getByRole('img');
        const load = new Event('load');
        fireEvent(img, load);
        expect(onLoad.mock.calls).toEqual([[load, img]]);
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
        const error = new Event('error');
        fireEvent(img, error);
        expect(onAutoRetry.mock.calls).toEqual([[error]]);
        act(() => jest.runAllTimers());
        expect(onLoadError).not.toBeCalled();
        const imgNew = screen.getByRole('img');
        expect(imgNew).not.toBe(img);

        const retryError = new Event('error');
        fireEvent(imgNew, retryError);
        expect(onLoadError.mock.calls).toEqual([[retryError]]);
    });
    it('Load image correctly', () => {
        const onLoad = jest.fn();
        const { container, rerender } = render(
            <Image boxWidth={100} boxHeight={200} fit="preview-x" src={imgUrl} onLoad={onLoad} />,
        );
        completeRequest();
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
        act(() => ref.current.retry());
        completeRequest();
        expect(screen.getByRole('img')).toHaveClass('preview-overflow-y');
    });

    it('Preview-x image fits the box renders correctly', () => {
        render(<Image boxWidth={300} boxHeight={100} fit="preview-x" src={imgUrl} />);
        completeRequest();
        expect(screen.getByRole('img')).toHaveClass('preview-fit-contain-x');
    });

    it('Preview-y image fits the box renders correctly', () => {
        render(<Image boxWidth={150} boxHeight={100} fit="preview-y" src={imgUrl} />);
        completeRequest();
        expect(screen.getByRole('img')).toHaveClass('preview-fit-contain-y');
    });

    it('Native props are applied to the loaded image', () => {
        render(<Image src={imgUrl} nativeProps={{ referrerPolicy: 'no-referrer' }} />);
        completeRequest();
        expect(screen.getByRole('img').referrerPolicy).toBe('no-referrer');
    });

    it('A late load leaves the unmounted image container empty', () => {
        const { container, unmount } = render(<Image src={imgUrl} />);
        const imageContainer = container.querySelector('.image-container');
        const image = getRequestedImage();
        unmount();
        completeRequest(image);
        expect(imageContainer).toBeEmptyDOMElement();
    });

    describe('a static image already complete on mount', () => {
        let naturalWidth;

        beforeEach(() => {
            jest.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);
            naturalWidth = jest.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get');
            naturalWidth.mockReturnValue(100);
        });

        afterEach(() => jest.restoreAllMocks());

        it('reports the cached load only once across a layout update and a native load', () => {
            const onLoad = jest.fn();
            const onChange = jest.fn();
            const props = { staticLabel: true, src: imgUrl, onLoad, onChange };
            const { rerender } = render(<Image {...props} />);
            const img = screen.getByRole('img');
            expect(onLoad.mock.calls).toEqual([[null, img]]);

            rerender(<Image {...props} width={200} />);
            expect(screen.getByRole('img')).toBe(img);
            fireEvent.load(img);
            expect(onLoad).toHaveBeenCalledTimes(1);
            expect(onChange.mock.calls).toEqual([['loaded']]);

            rerender(<Image {...props} src={`${imgUrl}?other`} />);
            const nextImg = screen.getByRole('img');
            const load = new Event('load');
            fireEvent(nextImg, load);
            expect(onLoad).toHaveBeenCalledTimes(2);
            expect(onLoad.mock.calls[1][0]).toBe(load);
            expect(onLoad.mock.calls[1][1]).toBe(nextImg);
        });

        it('reports the native event if it arrives before the cache check', () => {
            const onLoad = jest.fn();
            const load = new Event('load');
            const container = document.createElement('div');
            // Dispatch after the DOM commit but before act flushes the cache check in useEffect.
            try {
                act(() => {
                    ReactDOM.render(<Image staticLabel src={imgUrl} onLoad={onLoad} />, container);
                    container.querySelector('img').dispatchEvent(load);
                });
                const img = container.querySelector('img');
                expect(onLoad).toHaveBeenCalledTimes(1);
                expect(onLoad.mock.calls[0][0]).toBe(load);
                expect(onLoad.mock.calls[0][1]).toBe(img);
            } finally {
                act(() => {
                    ReactDOM.unmountComponentAtNode(container);
                });
            }
        });

        it('reports a native load after changing the source and returning to the cached URL', () => {
            const onLoad = jest.fn();
            const props = { staticLabel: true, src: imgUrl, onLoad };
            const { rerender } = render(<Image {...props} />);
            const img = screen.getByRole('img');
            rerender(<Image {...props} src={`${imgUrl}?other`} />);
            rerender(<Image {...props} />);
            const load = new Event('load');
            fireEvent(screen.getByRole('img'), load);
            expect(onLoad.mock.calls).toEqual([
                [null, img],
                [load, screen.getByRole('img')],
            ]);
        });

        it('reports a native load when the browser selects a different srcSet candidate', () => {
            const larger = `${imgUrl}?large`;
            const currentSrc = jest.spyOn(HTMLImageElement.prototype, 'currentSrc', 'get');
            currentSrc.mockReturnValue(imgUrl);
            const onLoad = jest.fn();
            render(
                <Image
                    staticLabel
                    src={imgUrl}
                    nativeProps={{ srcSet: `${imgUrl} 1x, ${larger} 2x` }}
                    onLoad={onLoad}
                />,
            );
            const img = screen.getByRole('img');
            currentSrc.mockReturnValue(larger);
            const load = new Event('load');
            fireEvent(img, load);
            expect(onLoad.mock.calls).toEqual([
                [null, img],
                [load, img],
            ]);
        });

        it('reports a cached failure and the native load of the retry with the same URL', () => {
            naturalWidth.mockReturnValue(0);
            const onLoad = jest.fn();
            const onError = jest.fn();
            const onAutoRetry = jest.fn();
            render(
                <Image
                    staticLabel
                    src={imgUrl}
                    retryTime={1}
                    onLoad={onLoad}
                    onError={onError}
                    onAutoRetry={onAutoRetry}
                />,
            );
            expect(onAutoRetry.mock.calls).toEqual([[null]]);
            expect(onLoad).not.toHaveBeenCalled();
            act(() => jest.runAllTimers());
            const img = screen.getByRole('img');
            const load = new Event('load');
            fireEvent(img, load);
            expect(onLoad.mock.calls).toEqual([[load, img]]);
            expect(onError).not.toHaveBeenCalled();
        });

        it('reports an error when the completed image has no dimensions', () => {
            naturalWidth.mockReturnValue(0);
            const onLoad = jest.fn();
            const onError = jest.fn();
            render(<Image staticLabel src={imgUrl} onLoad={onLoad} onError={onError} />);
            expect(onError.mock.calls).toEqual([[null]]);
            expect(onLoad).not.toHaveBeenCalled();
        });
    });
});
