import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import ActionSheet from '..';
import Button from '../../button';
import { mount } from 'enzyme';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-action-sheet`;

demoTest('action-sheet');

mountTest(ActionSheet, 'ActionSheet');

class Test extends React.Component {
    state = {
        visible: true,
    };
    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button onClick={() => this.setState({
                    visible: true
                })}>Click Me</Button>
                <ActionSheet
                    visible={visible}
                    items={[
                        { content: '选项一' },
                        { content: '选项二' },
                        { content: '选项三' },
                        { content: '选项四' },
                    ]}
                />
            </div>
        );
    }
}

describe('ActionSheet style', () => {
    it('Open correctly', () => {
        const component = mount(
            <Test />
        );
        component.find(Button).simulate('click');
        expect(component.find(`.${prefix}-list`).length).toBe(1);
        expect(component.find(`.${prefix}-item`).length).toBe(4);
    });
    it('Cancel/Delete/Status render correctly', () => {
        const component = mount(
            <ActionSheet
                visible={true}
                items={[
                    { content: '选项一' },
                    { content: '选项二' },
                    { content: '选项三' },
                    { content: '禁用', status: 'disabled' },
                    { content: '删除', status: 'danger' },
                ]}
                cancelText='取消'
                title='这是一行标题文字'
                subTitle='这是一行或两行的描述信息这是一行或两行的描述。'/>
        );
        expect(component.find(`.${prefix}-item.danger`).length).toBe(1);
        expect(component.find(`.${prefix}-item.cancel-item`).length).toBe(1);
        expect(component.find(`.${prefix}-item.disabled`).length).toBe(1);
        expect(component.find(`.${prefix}-title`).text()).toEqual('这是一行标题文字');
        expect(component.find(`.${prefix}-sub-title`).text()).toEqual('这是一行或两行的描述信息这是一行或两行的描述。');
    });
})

describe('ActionSheet action', () => {
    it('Cancel action correctly', () => {
        const mockFn = jest.fn();
        const component = mount(
            <ActionSheet
                visible={true}
                items={[
                    { content: '删除', status: 'danger' },
                ]}
                cancelText='取消'
                close={mockFn}/>
        );
        component.find(`.${prefix}-item.cancel-item`).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });
    it('Disabled action correctly', () => {
        const mockFn = jest.fn();
        const component = mount(
            <ActionSheet
                visible={true}
                items={[
                    { content: '禁用', status: 'disabled' },
                ]}
                close={mockFn}/>
        );
        component.find(`.${prefix}-item.disabled`).simulate('click');
        expect(mockFn.mock.calls.length).toBe(0);
    });
    it('Disabled action correctly', () => {
        const mockFn = jest.fn();
        const component = mount(
            <ActionSheet
                visible={true}
                items={[
                    {
                        content: (
                            <span>加载</span>
                        ),
                        onClick: mockFn,
                    },
                    { content: '选项一' },
                ]}/>
        );
        component.find(`.${prefix}-item.normal`).at(0).simulate('click');
        component.find(`.${prefix}-item.normal`).at(1).simulate('click');
        expect(mockFn.mock.calls.length).toBe(1);
    });
})
