import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { mount } from 'enzyme';
import DropdownMenu from '..';
import { defaultContext } from '../../context-provider';

const { prefixCls } = defaultContext;
const prefix = `${prefixCls}-dropdown-menu`;

demoTest('dropdown-menu');

mountTest(DropdownMenu, 'DropdownMenu');

const options = ['海淀区', '丰台区', '昌平区'];

describe('Dropdown', () => {
    it('dropdown open correctly', () => {
        const component = mount(
            <DropdownMenu
                options={options}/>
        );
        component.find(`.${prefixCls}-select-item`).at(0).simulate('click');
        expect(component.find(`.${prefix}`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefixCls}-dropdown-options-item`).length).toBe(3);
    });
    it('dropdown open in the up direction', () => {
        const component = mount(
            <DropdownMenu
                options={options}
                extraForDropdown={{direction: 'up', maxHeight: 120}}/>
        );
        component.find(`.${prefixCls}-select-item`).at(0).simulate('click');
        expect(document.querySelectorAll('.drop-up').length).toBe(1);
    });
})
