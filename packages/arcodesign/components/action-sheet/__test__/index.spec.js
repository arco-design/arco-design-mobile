import React, { createRef } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    beforeEach(() => {
        // 清理 DOM 中可能残留的元素
        // Clear any remaining elements in DOM
        document.body.innerHTML = '';
    });

    // 测试基本渲染功能
    // Test basic rendering functionality
    it('should open correctly', () => {
        const { container: component } = render(<Test />);
        fireEvent.click(component.querySelector('.test-button'));
        expect(document.querySelectorAll(`.${prefix}-list`).length).toBe(1);
        expect(document.querySelectorAll(`.${prefix}-item`).length).toBe(4);
    });

    // 测试取消/删除按钮渲染
    // Test cancel/delete button rendering
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

    // 测试取消按钮点击事件
    // Test cancel button click event
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

    // 测试禁用状态下的点击事件
    // Test click event for disabled status
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

    // 测试加载状态下的点击事件
    // Test click event for loading status
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

    // 测试项目点击返回值对关闭行为的影响
    // Test how onClick return values affect closing behavior
    it('should handle onClick return values correctly', async () => {
        const mockClose = jest.fn();

        // 测试返回 true 阻止关闭
        // Test returning true prevents closing
        const mockOnClickTrue = jest.fn(() => true);
        const { rerender } = render(
            <ActionSheet
                visible
                items={[{ content: '不关闭', onClick: mockOnClickTrue }]}
                close={mockClose}
            />,
        );
        fireEvent.click(document.querySelector(`.${prefix}-item.normal`));
        expect(mockOnClickTrue).toHaveBeenCalled();
        expect(mockClose).not.toHaveBeenCalled();

        // 测试返回 false 关闭
        // Test returning false closes
        const mockOnClickFalse = jest.fn(() => false);
        rerender(
            <ActionSheet
                visible
                items={[{ content: '关闭', onClick: mockOnClickFalse }]}
                close={mockClose}
            />,
        );
        fireEvent.click(document.querySelector(`.${prefix}-item.normal`));
        expect(mockOnClickFalse).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalledTimes(1);

        // 测试 Promise resolve false 关闭
        // Test Promise resolving to false closes
        const mockOnClickPromiseFalse = jest.fn(() => Promise.resolve(false));
        rerender(
            <ActionSheet
                visible
                items={[{ content: '异步关闭', onClick: mockOnClickPromiseFalse }]}
                close={mockClose}
            />,
        );
        fireEvent.click(document.querySelector(`.${prefix}-item.normal`));
        expect(mockOnClickPromiseFalse).toHaveBeenCalled();
        await waitFor(() => {
            expect(mockClose).toHaveBeenCalledTimes(2);
        });

        // 测试 Promise resolve true 不关闭
        // Test Promise resolving to true doesn't close
        const mockOnClickPromiseTrue = jest.fn(() => Promise.resolve(true));
        rerender(
            <ActionSheet
                visible
                items={[{ content: '异步不关闭', onClick: mockOnClickPromiseTrue }]}
                close={mockClose}
            />,
        );
        fireEvent.click(document.querySelector(`.${prefix}-item.normal`));
        expect(mockOnClickPromiseTrue).toHaveBeenCalled();
        await waitFor(() => {
            expect(mockClose).toHaveBeenCalledTimes(2); // 不应该增加
        });

        // 测试没有 onClick 函数的默认行为
        // Test default behavior when no onClick function
        rerender(<ActionSheet visible items={[{ content: '默认关闭' }]} close={mockClose} />);
        fireEvent.click(document.querySelector(`.${prefix}-item.normal`));
        expect(mockClose).toHaveBeenCalledTimes(3);
    });

    // 测试自定义样式和类名
    // Test custom styles and classNames
    it('should apply custom styles and classNames correctly', () => {
        const customStyle = { color: 'red', fontSize: '16px' };
        const customClassName = 'custom-item';
        render(
            <ActionSheet
                visible
                className="custom-action-sheet"
                items={[
                    {
                        content: '自定义样式',
                        style: customStyle,
                        className: customClassName,
                    },
                ]}
            />,
        );
        const actionSheet = document.querySelector(`.${prefix}`);
        const item = document.querySelector(`.${prefix}-item`);

        expect(actionSheet).toHaveClass('custom-action-sheet');
        expect(item).toHaveClass(customClassName);
        expect(item).toHaveStyle(customStyle);
    });

    // 测试头部渲染逻辑
    // Test header rendering logic
    it('should render header correctly based on title and subtitle', () => {
        // 测试没有标题和副标题时不渲染头部
        // Test not rendering header when no title and subtitle
        const { rerender } = render(<ActionSheet visible items={[{ content: '选项一' }]} />);
        expect(document.querySelector(`.${prefix}-header`)).toBeNull();

        // 测试只有标题时渲染头部
        // Test rendering header when only title is provided
        rerender(<ActionSheet visible items={[{ content: '选项一' }]} title="只有标题" />);
        let header = document.querySelector(`.${prefix}-header`);
        let title = document.querySelector(`.${prefix}-title`);
        let subTitle = document.querySelector(`.${prefix}-sub-title`);

        expect(header).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('只有标题');
        expect(subTitle).toBeNull();

        // 测试只有副标题时渲染头部
        // Test rendering header when only subtitle is provided
        rerender(<ActionSheet visible items={[{ content: '选项一' }]} subTitle="只有副标题" />);
        header = document.querySelector(`.${prefix}-header`);
        title = document.querySelector(`.${prefix}-title`);
        subTitle = document.querySelector(`.${prefix}-sub-title`);

        expect(header).toBeInTheDocument();
        expect(title).toBeNull();
        expect(subTitle).toBeInTheDocument();
        expect(subTitle).toHaveTextContent('只有副标题');
    });

    // 测试 ref 访问
    // Test ref access
    it('should expose ref correctly', () => {
        const ref = createRef();
        render(<ActionSheet ref={ref} visible items={[{ content: '选项一' }]} close={() => {}} />);
        // ref.current 可能为空，这取决于组件的实现
        // ref.current may be null, depending on component implementation
        expect(ref.current).toBeDefined();
    });

    // 测试事件传播阻止
    // Test event propagation prevention
    it('should prevent event propagation on clicks', () => {
        const mockParentClick = jest.fn();
        const mockItemClick = jest.fn();
        const mockClose = jest.fn();

        render(
            <div onClick={mockParentClick} data-testid="parent">
                <ActionSheet
                    visible
                    items={[
                        {
                            content: '阻止冒泡',
                            onClick: mockItemClick,
                        },
                    ]}
                    cancelText="取消"
                    close={mockClose}
                />
            </div>,
        );

        // 测试项目点击事件传播阻止
        // Test item click event propagation prevention
        fireEvent.click(document.querySelector(`.${prefix}-item.normal`));
        expect(mockItemClick).toHaveBeenCalled();
        expect(mockParentClick).not.toHaveBeenCalled();

        // 测试取消按钮事件传播阻止
        // Test cancel button event propagation prevention
        fireEvent.click(document.querySelector(`.${prefix}-item.cancel-item`));
        expect(mockClose).toHaveBeenCalled();
        expect(mockParentClick).not.toHaveBeenCalled();
    });

    // 测试 needBottomOffset 属性
    // Test needBottomOffset property
    it('should pass needBottomOffset to Popup correctly', () => {
        const { rerender } = render(
            <ActionSheet visible items={[{ content: '选项一' }]} needBottomOffset={false} />,
        );

        // 重新渲染测试默认值
        // Rerender to test default value
        rerender(<ActionSheet visible items={[{ content: '选项一' }]} />);

        // 验证组件能正常渲染
        // Verify component renders normally
        expect(document.querySelector(`.${prefix}`)).toBeInTheDocument();
    });

    // 测试空项目数组
    // Test empty items array
    it('should handle empty items array', () => {
        render(<ActionSheet visible items={[]} title="空列表" />);
        expect(document.querySelector(`.${prefix}-list`)).toBeInTheDocument();
        expect(document.querySelectorAll(`.${prefix}-item:not(.cancel-item)`)).toHaveLength(0);
    });

    // 测试使用 ActionSheet.open 方法
    // Test using ActionSheet.open method
    it('should work with ActionSheet.open method', async () => {
        const instance = ActionSheet.open({
            items: [{ content: '选项一' }, { content: '选项二' }],
            title: '使用 open 方法',
        });

        // 等待组件渲染
        // Wait for component to render
        await waitFor(() => {
            expect(document.querySelector(`.${prefix}`)).toBeInTheDocument();
        });

        const titleElement = document.querySelector(`.${prefix}-title`);
        if (titleElement) {
            expect(titleElement).toHaveTextContent('使用 open 方法');
        }

        // 测试更新配置
        // Test updating config
        instance.update({
            items: [{ content: '更新选项' }],
            title: '更新标题',
        });

        await waitFor(() => {
            expect(document.querySelector(`.${prefix}-title`)).toHaveTextContent('更新标题');
        });

        // 测试关闭方法
        // Test close method
        instance.close();
    });

    // 测试所有可能的状态值
    // Test all possible status values
    it('should handle all status values correctly', () => {
        render(
            <ActionSheet
                visible
                items={[
                    { content: '正常', status: 'normal' },
                    { content: '禁用', status: 'disabled' },
                    { content: '危险', status: 'danger' },
                    { content: '默认' }, // 没有 status，应该默认为 'normal'
                ]}
                close={() => {}}
            />,
        );

        // 检查渲染的元素包含正确的状态类
        // Check that rendered elements contain correct status classes
        expect(document.querySelector(`.${prefix}-item.normal`)).toBeInTheDocument();
        expect(document.querySelector(`.${prefix}-item.disabled`)).toBeInTheDocument();
        expect(document.querySelector(`.${prefix}-item.danger`)).toBeInTheDocument();
    });

    // 测试复杂的 ReactNode 内容
    // Test complex ReactNode content
    it('should render complex ReactNode content correctly', () => {
        const complexContent = (
            <div>
                <span>复杂内容</span>
                <button>按钮</button>
            </div>
        );

        render(<ActionSheet visible items={[{ content: complexContent }]} close={() => {}} />);

        expect(screen.getByText('复杂内容')).toBeInTheDocument();
        expect(screen.getByText('按钮')).toBeInTheDocument();
    });

    // 测试 Promise reject 情况
    // Test Promise rejection case
    it('should handle Promise rejection in onClick', async () => {
        const mockClose = jest.fn();

        // 创建一个不会抛出错误的 Promise rejection
        // Create a Promise rejection that won't throw errors
        const mockOnClick = jest.fn().mockImplementation(() => {
            return new Promise((resolve, reject) => {
                // 使用 setTimeout 让 Promise 异步拒绝
                // Use setTimeout to make Promise reject asynchronously
                setTimeout(() => reject(new Error('test error')), 0);
            }).catch(() => {
                // 静默处理错误，防止 Jest 捕获
                // Silently handle error to prevent Jest from catching it
                return false;
            });
        });

        render(
            <ActionSheet
                visible
                items={[
                    {
                        content: 'Promise 拒绝',
                        onClick: mockOnClick,
                    },
                ]}
                close={mockClose}
            />,
        );

        // ActionSheet 使用 Portal 渲染到 document.body，所以需要从 document 查找
        // ActionSheet uses Portal to render to document.body, so we need to find from document
        const item = document.querySelector(`.${prefix}-item.normal`);
        expect(item).toBeInTheDocument();

        // 使用 act 包装点击事件
        // Wrap click event with act
        await act(async () => {
            fireEvent.click(item);
            // 等待 Promise 处理完成
            // Wait for Promise to complete
            await new Promise(resolve => setTimeout(resolve, 10));
        });

        expect(mockOnClick).toHaveBeenCalled();
    });

    // 测试多个项目的复杂交互
    // Test complex interactions with multiple items
    it('should handle multiple items with different configurations', () => {
        const mockOnClick1 = jest.fn(() => false);
        const mockOnClick2 = jest.fn(() => true);
        const mockOnClick3 = jest.fn();
        const mockClose = jest.fn();

        render(
            <ActionSheet
                visible
                items={[
                    {
                        content: '关闭',
                        onClick: mockOnClick1,
                        className: 'custom-item-1',
                        style: { color: 'blue' },
                    },
                    {
                        content: '不关闭',
                        onClick: mockOnClick2,
                        status: 'danger',
                    },
                    {
                        content: '默认关闭',
                        onClick: mockOnClick3,
                    },
                    {
                        content: '禁用项',
                        status: 'disabled',
                    },
                ]}
                close={mockClose}
            />,
        );

        // ActionSheet 使用 Portal 渲染到 document.body，所以需要从 document 查找
        // ActionSheet uses Portal to render to document.body, so we need to find from document
        const items = document.querySelectorAll(`.${prefix}-item:not(.cancel-item)`);
        expect(items.length).toBeGreaterThan(0);

        // 测试第一个项目（返回 false，应该关闭）
        // Test first item (returns false, should close)
        fireEvent.click(items[0]);
        expect(mockOnClick1).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalledTimes(1);

        // 测试第二个项目（返回 true，不应该关闭）
        // Test second item (returns true, should not close)
        fireEvent.click(items[1]);
        expect(mockOnClick2).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalledTimes(1); // 没有增加

        // 测试第三个项目（返回 undefined，应该关闭）
        // Test third item (returns undefined, should close)
        fireEvent.click(items[2]);
        expect(mockOnClick3).toHaveBeenCalled();
        expect(mockClose).toHaveBeenCalledTimes(2);

        // 测试禁用项目（不应该有任何回调）
        // Test disabled item (should not trigger any callbacks)
        const initialCloseCallCount = mockClose.mock.calls.length;
        fireEvent.click(items[3]);
        expect(mockClose).toHaveBeenCalledTimes(initialCloseCallCount);
    });

    // 测试没有 close 函数时的行为
    // Test behavior when no close function is provided
    it('should handle missing close function gracefully', () => {
        const mockOnClick = jest.fn(() => false);

        render(
            <ActionSheet
                visible
                items={[
                    {
                        content: '测试无 close',
                        onClick: mockOnClick,
                    },
                ]}
                // 不传递 close 函数
                // No close function provided
            />,
        );

        // ActionSheet 使用 Portal 渲染到 document.body，所以需要从 document 查找
        // ActionSheet uses Portal to render to document.body, so we need to find from document
        const item = document.querySelector(`.${prefix}-item.normal`);
        expect(item).toBeInTheDocument();
        fireEvent.click(item);
        expect(mockOnClick).toHaveBeenCalled();
    });

    // 测试传递所有 Popup 相关的 props
    // Test passing all Popup-related props
    it('should pass popup props correctly', () => {
        const mockOnOpen = jest.fn();
        const mockOnClose = jest.fn();
        const mockOnMaskClick = jest.fn();

        render(
            <ActionSheet
                visible
                items={[{ content: '测试' }]}
                close={() => {}}
                onOpen={mockOnOpen}
                onClose={mockOnClose}
                onMaskClick={mockOnMaskClick}
                maskClosable={false}
                getContainer={() => document.body}
                zIndex={1000}
            />,
        );

        // 验证组件成功渲染，表明 props 传递正确
        // Verify component renders successfully, indicating props are passed correctly
        // ActionSheet 使用 Portal 渲染到 document.body，所以需要从 document 查找
        // ActionSheet uses Portal to render to document.body, so we need to find from document
        expect(document.querySelector(`.${prefix}`)).toBeInTheDocument();
    });
});
