import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Image from '..';
import { mount } from 'enzyme';

demoTest('image');

mountTest(Image, 'Image');

describe('Image', () => {
    it('Image renders correctly', () => {
        const wrapper = mount(
            <Image
                staticLabel
                src="https://p6-tt-ipv6.byteimg.com/origin/pgc-image/1c578279490742fe805ecd9356ab0722"
            />,
        );
        expect(wrapper.find('img').length).toBe(1);
    });
    it('Fill mode renders correctly', () => {
        const wrapper = mount(
            <Image
                fit="contain"
                staticLabel
                src="https://p6-tt-ipv6.byteimg.com/origin/pgc-image/1c578279490742fe805ecd9356ab0722"
            />,
        );
        expect(wrapper.find('img').props().style.objectFit).toBe('contain');
    });
    it('Rendering correctly while loading', () => {
        const wrapper = mount(
            <Image
                status="loading"
                showLoading={true}
                src="https://p6-tt-ipv6.byteimg.com/origin/pgc-image/1c578279490742fe805ecd9356ab0722"
            />,
        );
        expect(wrapper.find('svg').length).toBe(1);
    });
    it('Failed to load renders correctly', () => {
        const wrapper = mount(
            <Image
                status="error"
                showError={true}
                errorArea={<div>加载失败</div>}
                src="https://p6-tt-ipv6.byteimg.com/origin/pgc-image/1c578279490742fe805ecd9356ab0722"
            />,
        );
        expect(wrapper.text()).toEqual('加载失败');
    });
})
