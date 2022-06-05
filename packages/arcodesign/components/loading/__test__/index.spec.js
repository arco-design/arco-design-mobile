import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Loading from '..';
import { mount } from 'enzyme';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-loading`;

demoTest('loading');

mountTest(Loading, 'Loading');

describe('Loading', () => {
    it('Different types render correctly', () => {
        const wrapper = mount(
            <div>
                <Loading type="arc" />
                <Loading type="circle" />
                <Loading type="spin" />
                <Loading type="dot" />
            </div>
        );
        expect(wrapper.find(`.${prefix}.all-border-box.arc svg`).length).toBe(1);
        expect(wrapper.find(`.${prefix}.all-border-box.circle svg`).length).toBe(1);
        expect(wrapper.find(`.${prefix}.all-border-box.spin span`).length).toBe(16);
        expect(wrapper.find(`.${prefix}.all-border-box.dot span`).length).toBe(3);
    });
})
