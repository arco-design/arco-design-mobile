import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import IconCheck from '../../icon/IconCheck';
import { defaultContext } from '../../context-provider';
import Radio from '..';

const prefix = `${defaultContext.prefixCls}-radio`;
const iconPrefix = `${defaultContext.prefixCls}-icon`;

mountTest(Radio, 'Radio', { value: 1 });

mountTest(Radio.Group, 'Radio.Group', { options: [{ value: 1 }, { value: 2 }] });

describe('Radio', () => {
    it('should render correctly when uncontrolled radio set defaultCheck prop', () => {
        const component = mount(<Radio defaultCheck={true}>Radio</Radio>);
        expect(component.find('.radio-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(true);
    });
    it('should callback correctly when uncontrolled radio changed', () => {
        const mockFn = jest.fn();
        const component = mount(<Radio onChange={mockFn}>Radio</Radio>);
        expect(component.find('.radio-icon').hasClass('checked')).toBe(false);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(false);
        const radio = component.find(`.${prefix}`);
        radio.simulate('click');
        expect(mockFn).toBeCalled();
        expect(component.find('.radio-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(true);
        radio.simulate('click');
        expect(mockFn).toBeCalled();
        expect(component.find('.radio-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(true);
    });
    it('should render and callback correctly when controlled radio changed', () => {
        let checked = true;
        const component = mount(
            <Radio onChange={v => (checked = v)} checked={checked}>
                Radio
            </Radio>,
        );
        expect(component.find('.radio-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(true);
        component.setProps({ checked: false });
        expect(component.find('.radio-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(true);
    });
    it('should render and callback correctly when set disabled prop', () => {
        const mockFn = jest.fn();
        const component = mount(<Radio onChange={mockFn}>Radio</Radio>);
        expect(component.find(`.${prefix}`).hasClass('disabled')).toBe(false);
        expect(component.find('.radio-icon').hasClass('disabled')).toBe(false);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-disabled`)).toBe(false);
        component.setProps({ disabled: true });
        const radio = component.find(`.${prefix}`);
        radio.simulate('click');
        expect(mockFn).not.toBeCalled();
        expect(component.find(`.${prefix}`).hasClass('disabled')).toBe(true);
        expect(component.find('.radio-icon').hasClass('disabled')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-disabled`)).toBe(true);
        expect(component.find('.radio-icon').hasClass('checked')).toBe(false);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(false);
    });
    it('should render correctly when set layout prop', () => {
        const leftComponent = mount(<Radio layout="block">Radio</Radio>);
        expect(leftComponent.find(`.${prefix}`).hasClass('block')).toBe(true);
        const rightComponent = mount(<Radio layout="justify">Radio</Radio>);
        expect(rightComponent.find(`.${prefix}`).hasClass('justify')).toBe(true);
    });
    it('should render correctly when set custom/null icons', () => {
        const checkIcon = {
            normal: <IconCheck />,
            active: <IconCheck />,
            disabled: <IconCheck />,
            activeDisabled: <IconCheck />,
        };
        const customComponent = mount(<Radio icons={checkIcon}>Radio</Radio>);
        expect(customComponent.find('svg').hasClass(`${iconPrefix}-check`)).toBe(true);
        const nullComponent = mount(<Radio icons={null}>Radio</Radio>);
        expect(nullComponent.hasClass('radio-icon')).toBe(false);
    });
});

describe('Radio.Group', () => {
    it('should render correctly when use options prop', () => {
        const options = [
            {
                label: '内容一',
                value: 1,
            },
            {
                label: '内容二',
                value: 2,
            },
            {
                label: '内容三',
                value: 3,
                disabled: true,
            },
        ];
        const defaultValues = 1;
        const component = mount(<Radio.Group options={options} value={defaultValues} />);
        const renderLabels = component.find(`.${prefix}`).map(radio => radio.text());
        expect(renderLabels).toEqual(options.map(option => option.label));
        const renderValues = component
            .find(`.${prefix}`)
            .map(radio => radio.find('.radio-icon').hasClass('checked'));
        expect(renderValues.map(value => value)).toEqual([true, false, false]);
    });
    it('should callback and render correctly when change radio group', () => {
        const mockFn = jest.fn();
        const options = [
            {
                label: '内容一',
                value: 1,
            },
            {
                label: '内容二',
                value: 2,
            },
            {
                label: '内容三',
                value: 3,
            },
        ];
        const component = mount(<Radio.Group options={options} onChange={mockFn} />);
        const lastChild = component.find(`.${prefix}`).last();
        lastChild.simulate('click');
        // expect(lastChild.find('.radio-icon').hasClass('checked')).toBe(true);
        expect(mockFn).toBeCalled();
    });
});
