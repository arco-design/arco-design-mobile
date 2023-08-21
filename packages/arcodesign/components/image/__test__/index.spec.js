import React from 'react';
import { render } from '@testing-library/react';
// import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Image from '..';
import '@testing-library/jest-dom';

demoTest('image');

mountTest(Image, 'Image');

describe('Image', () => {
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
        const { getAllByRole } = render(
            <Image
                staticLabel
                src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
            />,
        );
        expect(getAllByRole('img').length).toBe(1);
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
        const { getByRole } = render(
            <Image
                fit="contain"
                staticLabel
                src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
            />,
        );
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
        const { container } = render(
            <Image
                status="loading"
                showLoading
                src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
            />,
        );
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
        const { container } = render(
            <Image
                status="error"
                showError
                errorArea={<div>加载失败</div>}
                src="https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg"
            />,
        );
        expect(container.textContent).toEqual('加载失败');
    });
});
