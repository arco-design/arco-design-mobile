import React, { useState } from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import ImagePicker from '..';

demoTest('image-picker');

mountTest(ImagePicker, 'ImagePicker');

const prefix = `${defaultContext.prefixCls}-image-picker`;
const imagePrefix = `${defaultContext.prefixCls}-image`;

const IMG_URL = 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg';
describe('ImagePicker', () => {
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(<ImagePicker images={[]} />);
        expect(wrapper.find(`.${prefix}-add`).length).toBe(1);
    });
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(<ImagePicker images={[{ url: IMG_URL }, { url: IMG_URL }]} />);
        expect(wrapper.find(`.${imagePrefix}`).length).toBe(2);
    });
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(
            <ImagePicker images={[{ url: IMG_URL }, { url: IMG_URL }]} limit={1} />,
        );
        expect(wrapper.find(`.${imagePrefix}`).length).toBe(1);
    });
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(
            <ImagePicker images={[{ url: IMG_URL }, { url: IMG_URL }]} limit={1} />,
        );
        expect(wrapper.find(`.${imagePrefix}`).length).toBe(1);
        wrapper.setProps({
            images: [],
        });
        expect(wrapper.find(`.${imagePrefix}`).length).toBe(0);
    });
    it('onChange listener correctly', () => {
        const onChange = jest.fn();
        const wrapper = mount(<ImagePicker images={[{ url: IMG_URL }]} onChange={onChange} />);
        wrapper.find(`.${prefix}-close`).at(0).simulate('click', 0);

        expect(onChange.mock.calls.length).toBe(1);
    });
});
