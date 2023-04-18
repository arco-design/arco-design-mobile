import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Keyboard from '..';

demoTest('keyboard');

mountTest(Keyboard, 'Keyboard');

const prefix = `${defaultContext.prefixCls}-keyboard`;
const keyboardKey = `${prefix}-key`;

describe('Keyboard', () => {
    it('onChange listener correctly', () => {
        const onChange = jest.fn();
        const wrapper = mount(<Keyboard onChange={onChange} />);
        const input = wrapper.find(keyboardKey);
        input.simulate('click');
        expect(onChange.mock.calls.length).toBe(1);
    });
});
