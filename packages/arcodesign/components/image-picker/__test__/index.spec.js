import React, { useState } from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import ImagePicker from '..';
import { mount } from 'enzyme';

demoTest('image-picker');

mountTest(ImagePicker, 'ImagePicker');

const prefix = `${defaultContext.prefixCls}-image-picker`;
const IMG_URL = 'http://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg';
describe('ImagePicker', () => {
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(
            <ImagePicker images={[]}/>,
        );
        expect(wrapper.find('.arco-image-picker-add').length).toBe(1);
    });
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(
            <ImagePicker images={[{ url: IMG_URL },{ url: IMG_URL }]}/>,
        );
        expect(wrapper.find('.arco-image').length).toBe(2);
    });
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(
            <ImagePicker images={[{ url: IMG_URL },{ url: IMG_URL }]} limit={1}/>,
        );
        expect(wrapper.find('.arco-image').length).toBe(1);
    });
    it('ImagePicker renders correctly', () => {
        const wrapper = mount(
            <ImagePicker images={[{ url: IMG_URL },{ url: IMG_URL }]} limit={1}/>,
        );
        expect(wrapper.find('.arco-image').length).toBe(1);
        wrapper.setProps({
            images:[]
        })
        expect(wrapper.find('.arco-image').length).toBe(0);
    });
    it('onChange listener correctly', () => {
        const onChange = jest.fn();
        const wrapper = mount(<ImagePicker images={[{ url: IMG_URL }]} onChange={onChange}/>);
        wrapper.find('.arco-image-picker-close').at(0).simulate('click',0)
        
        expect(onChange.mock.calls.length).toBe(1);
    });
    
});
