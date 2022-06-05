import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { mount } from 'enzyme';
import Slider from '..';
import { defaultContext } from '../../context-provider';
import { createStartTouchEventObject, createMoveTouchEventObject, mockAddListener } from '../../../tests/helpers/mockEvent';
import { act } from 'react-dom/test-utils';

const prefix = `${defaultContext.prefixCls}-slider`;

demoTest('slider');

mountTest(Slider, 'Slider');

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 20,
        };
    }

    onChange = (value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return (
            <Slider
                value={value}
                onChange={this.onChange}
                {...this.props}
            />
        );
    }
}

describe('Slider', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('render correctly', () => {
        const component = mount(<Test />);
        expect(component.state('value')).toBe(20);
        expect(component.find(`.${prefix}`).length).toBe(1);
        expect(component.find(`.${prefix}-line`).length).toBe(2);
        expect(component.find(`.${prefix}-thumb`).length).toBe(1);
        component.setState({value: 30});
        component.find(`.${prefix}-thumb`).at(0).simulate('mouseenter');
        expect(component.state('value')).toBe(30);
        expect(component.find(`.${prefix}-line`).at(1).props().style.width).toBe('30%');
    });

    it('render range slider correctly', () => {
        const component = mount(<Slider range defaultValue={[15, 40]} />);
        expect(component.find(`.${prefix}-thumb`).length).toBe(2);
        const style = component.find(`.${prefix}-line`).at(1).props().style;
        expect(style.left).toBe('15%');
        expect(style.width).toBe('25%');
    });

    it('marks slider', () => {
        const component = mount(
            <Test
                max={20}
                showMarks
                marks={[0, 5, 10, 15, 20]}/>
        );
        expect(component.find(`.${prefix}`).hasClass('show-marks')).toBe(true);
        expect(component.find(`.${prefix}-marks-item`).length).toBe(5);
        expect(component.find(`.${prefix}-marks-item-label`).length).toBe(5);
        component.setState({value: 10});
        expect(component.find(`.${prefix}-marks-item`).find('.is-activated').length).toBe(5);
    });

    it('should select mark when onlyMarkValue is true', () => {
        const component = mount(
            <Slider
                showMarks
                useMarkOnly
                marks={[0, 5, 10, 15, 20]}
                defaultValue={12}
                max={20}
            />
        );
        expect(
            component.find(`.${prefix}-line`).at(1).getDOMNode().getAttribute('style')
        ).toContain('width: 50%');
    });

    it('touch event', () => {
        const wrapper = mount(
            <Slider
                showMarks
                useMarkOnly
                max={20}
                marks={[0, 5, 10, 15, 20]}
                defaultValue={10}
                disabled={false}/>
        );
        const map = mockAddListener(wrapper.find(`.${prefix}`));
        wrapper.setProps({ disabled: true });
        act(() => {
            map.touchstart(createStartTouchEventObject({ x: 0, y: 0 }));
            map.touchmove(createMoveTouchEventObject({ x: 300, y: 0 }));
        });
        wrapper.find(`.${prefix}-line`).at(1).simulate('touchEnd', createMoveTouchEventObject({ x: 300, y: 0 }));
        wrapper.update();
    });
    it('render tooltip correctly', () => {
        const component = mount(
            <Slider
                showTooltip="always"
                defaultValue={32}/>
        );
        expect(component.find(`.${prefix}-popover`).length).toBe(1);
    });
})
