import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Dropdown from '..';
import { mount } from 'enzyme';
import Button from '../../button';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-dropdown`;

demoTest('dropdown');

mountTest(Dropdown, 'Dropdown');

const options= [
    {
        label: 'title1',
        value: 0,
        disabled: false,
    },
    {
        label: 'title2',
        value: 1,
    },
    {
        label: 'title3',
        value: 2,
        disabled: true,
    }
]

class Test extends React.Component {
    state = {
        value: false,
    };
    render() {
        const { value } = this.state;
        return (
            <div>
                <Button onClick={() => this.setState({
                    value: !value
                })}>Click Me</Button>
                <Dropdown options={options} onOptionClick={() => this.setState({value: !value})} touchToClose={false} showDropdown={value} {...this.props}/>
            </div>
        );
    }
}

describe('Dropdown style', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Multi-column styles render correctly', () => {
        const wrapper = mount(
            <Dropdown
                useColumn={3}
                multiple={true}
                defaultSelectedValue={[0]}
                options={options}
                showDropdown={true}
                onOptionClick={() => { console.info('click'); }}
                onOptionChange={(value, item) => {
                    console.info(value,item);
                    // setShowDropdown(false);
                }}/>
        );
        wrapper.setProps({
            showDropdown: false,
            direction: 'up',
            height: '300px'
        })
        expect(wrapper.find(`.${prefix}-options-wrap.use-column`).length).toBe(1);
    });
    it('Custom nodes render correctly', () => {
        const wrapper = mount(
            <Dropdown
                showDropdown={true}
                getScrollContainer={() => document.getElementById('test')}
            >
                <div id="test">
                    content
                </div>
            </Dropdown>
        );
        expect(wrapper.find('#test').text()).toEqual('content');
    });
    it('Use options render correctly', () => {
        const wrapper = mount(
            <Dropdown
                showDropdown={true}
                direction="up">
                <Dropdown.Options
                    useColumn={3}
                    multiple={true}
                    selectedValue={[]}
                    options={options}
                ></Dropdown.Options>
                <Dropdown.Options
                    useColumn={3}
                    multiple={false}
                    selectedValue={[]}
                    options={[
                    {
                        label: 'title1',
                        value: 0,
                        disabled: false,
                    },
                    {
                        label: 'title2',
                        value: 1,
                    }]}
                ></Dropdown.Options>
            </Dropdown>
        );
        expect(wrapper.find(`.${prefix}-options-item-col`).length).toBe(5);
    });
})

describe('Dropdown open', () => {
    it('dropdown open correctly', () => {
        const wrapper = mount(<Test />);
        wrapper.find(Button).simulate('click');
        expect(wrapper.find(`.${prefix}-options-item`).length).toBe(3);
        wrapper.find(`.${prefix}-options-item`).at(1).simulate('click');
    });

    it('dropdown open in the right direction', () => {
        const wrapper = mount(<Test direction='up'/>);
        wrapper.find(Button).simulate('click');
        expect(wrapper.find('.drop-up').length).toBe(1);
    });
})
