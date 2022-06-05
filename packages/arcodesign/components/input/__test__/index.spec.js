import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Input from '..';
import { mount } from 'enzyme';

demoTest('input');

mountTest(Input, 'Input');

describe('Input', () => {
    it('onChange listener correctly', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Input onChange={onChange}/>);
        const input = wrapper.find('input');
        input.simulate('change', {
          target: {
            value: 'Hello',
          },
        });
        expect(onChange.mock.calls.length).toBe(1);
    });

    it('validator render correctly', () => {
        const wrapper = mount(<Input validator={(val) => val.length <= 4}/>);
        const input = wrapper.find('input');
        input.simulate('change', {
          target: {
            value: 'Hello',
          },
        });
    });

    it('prefix, suffix, prepend, append correctly', () => {
        const wrapper = mount(
            <Input
                prefix={<span>prefix</span>}
                suffix={<span>suffix</span>}
                prepend={<span>prepend</span>}
                append={<span>append</span>}
            />
        )
        expect(wrapper.text()).toEqual('prependprefixsuffixappend');
    });

    it('test password', () => {
        const wrapper = mount(<Input type='password' />);
        expect(wrapper.find('input').getDOMNode().getAttribute('type')).toBe('password');
    });

    it('test maxLength', () => {
        const wrapper = mount(<Input maxLength={5} defaultValue='123456789' />);
        wrapper.find('input').value = '123456789';
        expect(wrapper.find('input').prop('maxLength')).toEqual(5);
    });
})
