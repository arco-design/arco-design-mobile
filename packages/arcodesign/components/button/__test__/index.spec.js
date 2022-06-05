import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Button from '..';
import { mount } from 'enzyme';

demoTest('button');

mountTest(Button, 'Button');

describe('Button', () => {
    mountTest(() => <Button size="large"/>, 'Large Button');
    mountTest(() => <Button size="small"/>, 'Small Button');
    it('should callback correctly when clicked', () => {
        const mockFn = jest.fn();
        const component = mount(<Button onClick={mockFn} />);
        const btn = component.find('button');
        btn.simulate('click');
        const mockFnCallLength = mockFn.mock.calls.length;
        expect(mockFnCallLength).toBe(1);

        component.setProps({
            disabled: true
        });
        btn.simulate('click');
        expect(mockFnCallLength).toBe(mockFnCallLength);
    })
    it('should render active correctly when clicked/touched', () => {
        const component = mount(<Button />);
        const btn = component.find('button');
        btn.simulate('mousedown');
        expect(component.find('.active').length).toBe(1);
        btn.simulate('mouseup');
        expect(component.find('.active').length).toBe(0);

        component.setProps({
            needActive: false
        });
        btn.simulate('mousedown');
        expect(component.find('.active').length).toBe(0);
        btn.simulate('mouseup');
        expect(component.find('.active').length).toBe(0);
    })
    it('should render correctly when set inline/disabled/halfBorder', () => {
        const component1 = mount(<Button inline disabled halfBorder/>);
        expect(component1.find('.inline').length).toBe(1);
        expect(component1.find('.disabled').length).toBe(1);
        expect(component1.find('.half-border').length).toBe(1);
        const component2 = mount(<Button />);
        expect(component2.find('.inline').length).toBe(0);
        expect(component2.find('.disabled').length).toBe(0);
        expect(component2.find('.half-border').length).toBe(0);
    })
    it('should reset when loading state is end', () => {
        const component = mount(<Button />);
        component.setProps({
            loading: true
        });
        expect(component.find('.loading').length).toBe(1);
        component.setProps({
            loading: false
        });
        expect(component.find('.loading').length).toBe(0);
    })
    it('should render correctly when set custom color config', () => {
        const colorConfig = {
            normal: "#FF5722",
            active: "#F53F3F",
            disabled: "#FBACA3",
        };
        const component = mount(<Button bgColor={colorConfig} borderColor={colorConfig}>Text</Button>);
        const btn = component.find('button');
        const style = btn.props().style;
        console.log(style)
        expect(btn.props().style.borderColor).toBe('#FF5722');
        expect(btn.props().style.background).toBe('#FF5722');
    })
    it('should render icon correctly when loading', () => {
        // const component = mount(<Button loadingIcon="123" />);
        // expect(component.find('.btn-icon').text()).toEqual('123')
    })
    it('should render empty button without errors', () => {
        const wrapper = mount(
            <Button>
            {null}
            {undefined}
            </Button>,
        );
        expect(wrapper.text()).toBe('');
    });
    it('should not throw error when size/type is wrong', () => {

    })
})
