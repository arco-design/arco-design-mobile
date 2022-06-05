import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import IconCheck from '../../icon/IconCheck';
import Checkbox from '..';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-checkbox`;
const iconPrefix = `${defaultContext.prefixCls}-icon`;

demoTest('checkbox');

mountTest(Checkbox, 'Checkbox', { value: 1 });

mountTest(Checkbox.Group, 'Checkbox.Group', { options: [{ value: 1 }, { value: 2 }] });

describe('Checkbox', () => {
    it('should render correctly when uncontrolled checkbox set defaultCheck prop', () => {
        const component = mount(<Checkbox defaultCheck>Checkbox</Checkbox>);
        expect(component.find('.checkbox-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(
            true,
        );
    });
    it('should callback correctly when uncontrolled checkbox changed', () => {
        const mockFn = jest.fn();
        const component = mount(<Checkbox onChange={mockFn}>Checkbox</Checkbox>);
        expect(component.find('.checkbox-icon').hasClass('checked')).toBe(false);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(
            false,
        );
        const checkbox = component.find(`.${prefix}`);
        checkbox.simulate('click');
        expect(mockFn).toBeCalled();
        expect(component.find('.checkbox-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(
            true,
        );
        checkbox.simulate('click');
        expect(mockFn).toBeCalled();
        expect(component.find('.checkbox-icon').hasClass('checked')).toBe(false);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(
            false,
        );
    });
    it('should render and callback correctly when controlled checkbox changed', () => {
        let checked = true;
        const component = mount(
            <Checkbox onChange={v => (checked = v)} checked={checked}>
                Checkbox
            </Checkbox>,
        );
        expect(component.find('.checkbox-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(
            true,
        );
        component.setProps({ checked: false });
        expect(component.find('.checkbox-icon').hasClass('checked')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(
            true,
        );
    });
    it('should render and callback correctly when set disabled prop', () => {
        const mockFn = jest.fn();
        const component = mount(<Checkbox onChange={mockFn}>Checkbox</Checkbox>);
        expect(component.find(`.${prefix}`).hasClass('disabled')).toBe(false);
        expect(component.find('.checkbox-icon').hasClass('disabled')).toBe(false);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-disabled`)).toBe(
            false,
        );
        component.setProps({ disabled: true });
        const checkbox = component.find(`.${prefix}`);
        checkbox.simulate('click');
        expect(mockFn).not.toBeCalled();
        expect(component.find(`.${prefix}`).hasClass('disabled')).toBe(true);
        expect(component.find('.checkbox-icon').hasClass('disabled')).toBe(true);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-disabled`)).toBe(
            true,
        );
        expect(component.find('.checkbox-icon').hasClass('checked')).toBe(false);
        expect(component.find(`.${iconPrefix}`).hasClass(`${iconPrefix}-circle-checked`)).toBe(
            false,
        );
    });
    it('should render correctly when set layout prop', () => {
        const leftComponent = mount(<Checkbox layout="block">Checkbox</Checkbox>);
        expect(leftComponent.find(`.${prefix}`).hasClass('block')).toBe(true);
        const rightComponent = mount(<Checkbox layout="justify">Checkbox</Checkbox>);
        expect(rightComponent.find(`.${prefix}`).hasClass('justify')).toBe(true);
    });
    it('should render correctly when set custom/null icons', () => {
        const checkIcon = {
            normal: <IconCheck />,
            active: <IconCheck />,
            disabled: <IconCheck />,
            activeDisabled: <IconCheck />,
        };
        const customComponent = mount(<Checkbox icons={checkIcon}>Checkbox</Checkbox>);
        expect(customComponent.find('svg').hasClass(`${iconPrefix}-check`)).toBe(true);
        const nullComponent = mount(<Checkbox icons={null}>Checkbox</Checkbox>);
        expect(nullComponent.hasClass('checkbox-icon')).toBe(false);
    });
});

describe('Checkbox.Group', () => {
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
        const defaultValues = options.map(option => option.value);
        const component = mount(<Checkbox.Group options={options} value={defaultValues} />);
        const renderLabels = component.find(`.${prefix}`).map(checkbox => checkbox.text());
        expect(renderLabels).toEqual(options.map(option => option.label));
        const renderValues = component
            .find(`.${prefix}`)
            .map(checkbox => checkbox.find('.checkbox-icon').hasClass('checked'));
        const allChecked = renderValues.every(value => value);
        expect(allChecked).toBe(true);
    });
    it('should limit correctly when set max prop', () => {
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
        const defaultValues = [1, 2];
        const component = mount(<Checkbox.Group value={defaultValues} options={options} max={2} />);
        const lastChild = component.find(`.${prefix}`).last();
        lastChild.simulate('click');
        expect(lastChild.find('.checkbox-icon').hasClass('checked')).toBe(false);
    });
    it('should callback and render correctly when change checkbox group', () => {
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
        const component = mount(<Checkbox.Group options={options} onChange={mockFn} />);
        const lastChild = component.find(`.${prefix}`).last();
        lastChild.simulate('click');
        // expect(lastChild.find('.checkbox-icon').hasClass('checked')).toBe(true);
        expect(mockFn).toBeCalled();
    });
});
