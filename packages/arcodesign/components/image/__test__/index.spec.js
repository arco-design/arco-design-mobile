import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
    beforeAll(() => {
        Object.defineProperty(global.Image.prototype, 'onload', {
            get() {
                return this._onload;
            },
            set(onload) {
                onloadRef = onload;
                this._onload = onload;
            },
        });
        Object.defineProperty(global.Image.prototype, 'onerror', {
            get() {
                return this._onerror;
            },
            set(onerror) {
                onerrorRef = onerror;
                this._onerror = onerror;
            },
        });
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
        jest.runAllTimers();
        expect(onLoadError).not.toBeCalled();
        const imgNew = screen.getByRole('img');

        fireEvent.error(imgNew);
        expect(onLoadError).toBeCalled();
    });
    it('Load image correctly', () => {
        const onLoad = jest.fn();
        Object.defineProperty(global.Image.prototype, 'width', {
            get() {
                return 300;
            },
        });
        Object.defineProperty(global.Image.prototype, 'height', {
            get() {
                return 200;
            },
        });
        const { container, rerender } = render(
            <Image boxWidth={100} boxHeight={200} fit="preview-x" src={imgUrl} onLoad={onLoad} />,
        );
        onloadRef();
        jest.runAllTimers();
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
        jest.runAllTimers();
        expect(screen.getByRole('img')).toHaveClass('preview-overflow-y');
    });
});
