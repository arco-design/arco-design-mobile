import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Textarea from '..';

const inputPrefix = `${defaultContext.prefixCls}-input`;

demoTest('textarea');

mountTest(Textarea, 'Textarea');

describe('Textarea', () => {
    it('should callback correctly when change text', () => {
        const mockFn = jest.fn();
        const component = mount(<Textarea onInput={mockFn}/>);
        component.find('textarea').simulate('input', {
            target: {
                value: '123'
            }
        });
        expect(mockFn).toBeCalled();
    });
    it('should render and callback correctly when more than limit', () => {
        const mockFn = jest.fn();
        const component = mount(<Textarea statisticsMaxlength={5} onErrStatusChange={mockFn}/>);
        component.find('textarea').simulate('input', {
            target: {
                value: '12345678'
            }
        });
        expect(mockFn).toBeCalled();
        expect(component.find('.statistic-text').hasClass('exceed')).toBe(true);
        expect(component.find('.statistic-text').text()).toBe("8/5");
        expect(component.find('textarea').text()).toBe('12345678');
    });
    it('should render correctly when set area limit', () => {
        const component = mount(<Textarea textareaStyle={{ height: 55 }}/>);
        expect(component.find('textarea').props().style.height).toBe(55);
    });
    it('should render correctly when text calls the area resize', () => {
        // const component = mount(<Textarea autosize/>);
        // const initHeight = component.find('textarea').get(0).style;
        // console.log(component.find('textarea').html());
    });
    it('should render correctly when set prefix', () => {
        const component = mount(<Textarea prefix="prefix"/>);
        expect(component.find(`.${inputPrefix}-prefix`).length).toBe(1);
        expect(component.find(`.${inputPrefix}-prefix`).text()).toBe('prefix');
    });
});
