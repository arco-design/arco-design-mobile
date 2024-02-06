import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import ActionSheet from '..';
import Button from '../../button';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-action-sheet`;

demoTest('action-sheet');

mountTest(ActionSheet, 'ActionSheet');

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button
                    className="test-button"
                    onClick={() =>
                        this.setState({
                            visible: true,
                        })
                    }
                >
                    Click Me
                </Button>
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

describe('ActionSheet', () => {
    it('should open correctly', () => {
        const { container: component } = render(<Test />);
        fireEvent.click(component.querySelector('.test-button'));
        expect(document.querySelectorAll(`.${prefix}-list`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}-item`).length).toBe(4);
    });

    it('cancel/delete should render correctly', () => {
        render(
            <ActionSheet
                visible
                items={[
                    { content: '选项一' },
                    { content: '选项二' },
                    { content: '选项三' },
                    { content: '禁用', status: 'disabled' },
                    { content: '删除', status: 'danger' },
                ]}
                cancelText="取消"
                title="这是一行标题文字"
                subTitle="这是一行或两行的描述信息这是一行或两行的描述。"
            />,
        );
        expect(document.querySelectorAll(`.${prefix}-item.danger`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}-item.cancel-item`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}-item.disabled`).length).toBe(1);
        expect(document.querySelector(`.${prefix}-title`).innerHTML).toEqual('这是一行标题文字');
        expect(document.querySelector(`.${prefix}-sub-title`).innerHTML).toEqual(
            '这是一行或两行的描述信息这是一行或两行的描述。',
        );
    });

    it('should correctly execute cancel action', () => {
        const mockFn = jest.fn();
        render(
            <ActionSheet
                visible
                items={[{ content: '删除', status: 'danger' }]}
                cancelText="取消"
                close={mockFn}
            />,
        );
        fireEvent.click(document.querySelector(`.${prefix}-item.cancel-item`));
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('should correctly execute disable action', () => {
        const mockFn = jest.fn();
        render(
            <ActionSheet
                visible
                items={[{ content: '禁用', status: 'disabled' }]}
                close={mockFn}
            />,
        );
        fireEvent.click(document.querySelector(`.${prefix}-item.disabled`));
        expect(mockFn.mock.calls.length).toBe(0);
    });

    it('should correctly execute loading action', () => {
        const mockFn = jest.fn();
        render(
            <ActionSheet
                visible
                items={[
                    {
                        content: <span>加载</span>,
                        onClick: mockFn,
                    },
                    { content: '选项一' },
                ]}
            />,
        );
        const items = document.querySelectorAll(`.${prefix}-item.normal`);
        fireEvent.click(items[0]);
        fireEvent.click(items[1]);
        expect(mockFn.mock.calls.length).toBe(1);
    });
});
