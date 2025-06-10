import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Tag from '..';

const prefix = `${defaultContext.prefixCls}-tag`;

demoTest('tag');

mountTest(Tag, 'Tag');

describe('Tag', () => {
    // 测试组件在不同属性下的挂载和卸载
    // Test component mounting and unmounting with different props
    it('should mount and unmount correctly with different props', () => {
        const { unmount: unmount1 } = render(<Tag type="hollow">Tag</Tag>);
        const { unmount: unmount2 } = render(<Tag size="small">Tag</Tag>);
        expect(() => {
            unmount1();
            unmount2();
        }).not.toThrow();
    });

    // 测试点击事件处理
    // Test click event handling
    it('should handle click events correctly', () => {
        const mockOnClick = jest.fn();
        const mockOnClose = jest.fn();

        const { container } = render(
            <Tag closeable onClick={mockOnClick} onClose={mockOnClose}>
                标签
            </Tag>,
        );

        // 测试标签点击
        // Test tag click
        userEvent.click(container.firstChild);
        expect(mockOnClick).toBeCalled();

        // 测试关闭按钮点击
        // Test close button click
        expect(container.querySelectorAll('.tag-close-wrap').length).toBe(1);
        userEvent.click(container.querySelector('.tag-close-wrap'));
        expect(mockOnClose).toBeCalled();
    });

    // 测试各种样式属性的渲染
    // Test rendering with various style properties
    it('should render correctly with various style props', () => {
        const { container } = render(
            <Tag
                type="primary"
                size="small"
                filleted
                halfBorder
                borderStyle="solid"
                color="#ff0000"
                bgColor="#00ff00"
                borderColor="#0000ff"
            >
                标签
            </Tag>,
        );

        const tagElement = container.querySelector(`.${prefix}`);

        // 测试类名
        // Test class names
        expect(tagElement).toHaveClass('half-border');
        expect(tagElement).toHaveClass('filleted');
        expect(tagElement).toHaveClass(`${prefix}-primary`);
        expect(tagElement).toHaveClass('size-small');

        // 测试样式
        // Test styles
        expect(tagElement.style.borderStyle).toBe('solid');
        expect(tagElement.style.color).toMatch(/^(rgb\(255, 0, 0\)|#ff0000)$/);
        expect(tagElement.style.background).toMatch(/^(rgb\(0, 255, 0\)|#00ff00)$/);
        expect(tagElement.style.borderColor).toMatch(/^(rgb\(0, 0, 255\)|#0000ff)$/);
    });

    // 测试不同类型和尺寸的组合渲染
    // Test rendering different type and size combinations
    it('should render different types and sizes correctly', () => {
        const { container: container1 } = render(
            <Tag type="hollow" size="medium">
                Hollow Medium
            </Tag>,
        );
        const { container: container2 } = render(
            <Tag type="solid" size="large">
                Solid Large
            </Tag>,
        );

        expect(container1.querySelector(`.${prefix}-hollow.size-medium`)).toBeInTheDocument();
        expect(container2.querySelector(`.${prefix}-solid.size-large`)).toBeInTheDocument();
    });

    // 测试边框样式处理
    // Test border style handling
    it('should handle border styles correctly', () => {
        const { container: container1 } = render(
            <Tag borderStyle="dashed" halfBorder={false}>
                Dashed
            </Tag>,
        );
        const { container: container2 } = render(<Tag borderStyle="dotted">Dotted</Tag>);

        const tag1 = container1.querySelector(`.${prefix}`);
        const tag2 = container2.querySelector(`.${prefix}`);

        expect(tag1.style.borderStyle).toBe('dashed');
        expect(tag1).not.toHaveClass('half-border');
        expect(tag2.style.borderStyle).toBe('dotted');
    });

    // 测试图标渲染
    // Test icon rendering
    it('should render icons correctly', () => {
        const TestIcon = () => <span data-testid="test-icon">🏷️</span>;
        const CustomCloseIcon = () => <span data-testid="custom-close">✕</span>;

        const { getByTestId, container } = render(
            <Tag closeable icon={<TestIcon />} closeIcon={<CustomCloseIcon />} closeColor="#ff0000">
                With Icons
            </Tag>,
        );

        expect(getByTestId('test-icon')).toBeInTheDocument();
        expect(getByTestId('custom-close')).toBeInTheDocument();
    });

    // 测试可关闭属性处理
    // Test closeable property handling
    it('should handle closeable prop correctly', () => {
        const { container } = render(<Tag closeable={false}>No Close</Tag>);
        expect(container.querySelector('.tag-close-wrap')).not.toBeInTheDocument();
    });

    // 测试标签列表渲染
    // Test tag list rendering
    it('should render tag list correctly', () => {
        const list = [1, 1].map(item => ({
            closeable: true,
            children: `标签${item}`,
        }));
        const { container } = render(<Tag.List list={list} />);
        expect(container.querySelectorAll(`.${prefix}`).length).toBe(3);
        expect(container.querySelectorAll('.tag-list-add-wrap').length).toBe(1);
    });
});

describe('Tag.List', () => {
    // 测试内边距配置处理
    // Test padding configuration handling
    it('should handle padding configurations correctly', () => {
        const list = [{ children: 'Tag 1' }, { children: 'Tag 2' }];

        // 测试字符串和数字padding
        // Test string and number padding
        const { container: container1 } = render(
            <Tag.List list={list} verticalPadding="10px" horizontalPadding="5px" />,
        );
        const { container: container2 } = render(
            <Tag.List list={list} verticalPadding={20} horizontalPadding={10} />,
        );

        const listElement1 = container1.querySelector(`.${defaultContext.prefixCls}-tag-list`);
        const listElement2 = container2.querySelector(`.${defaultContext.prefixCls}-tag-list`);

        expect(listElement1.style.marginBottom).toBe('-10px');
        expect(listElement2.style.marginBottom).toBe('-20px');

        // 测试标签间距
        // Test tag spacing
        const tags2 = container2.querySelectorAll(`.${prefix}`);
        expect(tags2[0].style.marginRight).toBe('10px');
        expect(tags2[0].style.marginBottom).toBe('20px');
    });

    // 测试添加按钮功能
    // Test add button functionality
    it('should handle add button functionality', () => {
        const mockAddFn = jest.fn();
        const list = [{ children: 'Tag 1' }];
        const CustomAddArea = () => <div data-testid="custom-add">Custom Add</div>;

        // 测试默认添加按钮
        // Test default add button
        const { container: container1 } = render(<Tag.List list={list} onAdd={mockAddFn} />);
        userEvent.click(container1.querySelector('.tag-list-add-wrap'));
        expect(mockAddFn).toBeCalled();

        // 测试自定义添加区域
        // Test custom add area
        const { getByTestId } = render(<Tag.List list={list} addArea={<CustomAddArea />} />);
        expect(getByTestId('custom-add')).toBeInTheDocument();

        // 测试隐藏添加按钮
        // Test hide add button
        const { container: container3 } = render(<Tag.List list={list} showAddButton={false} />);
        expect(container3.querySelector('.tag-list-add-wrap')).not.toBeInTheDocument();
    });

    // 测试标签交互和样式
    // Test tag interactions and styling
    it('should handle tag interactions and styling', () => {
        const mockCloseFn = jest.fn();
        const mockTagCloseFn = jest.fn();
        const customStyle = { backgroundColor: 'red' };

        const list = [
            {
                children: 'Tag 1',
                closeable: true,
                onClose: mockTagCloseFn,
                style: { color: 'blue' },
            },
        ];

        const { container } = render(
            <Tag.List
                list={list}
                onClose={mockCloseFn}
                type="hollow"
                className="custom-tag-list"
                style={customStyle}
                horizontalPadding={15}
                verticalPadding={10}
            />,
        );

        // 测试关闭功能
        // Test close functionality
        userEvent.click(container.querySelector('.tag-close-wrap'));
        expect(mockCloseFn).toBeCalledWith(0, expect.any(Object));
        expect(mockTagCloseFn).toBeCalled();

        // 测试样式继承
        // Test style inheritance
        expect(container.querySelector(`.${prefix}-hollow`)).toBeInTheDocument();

        // 测试自定义样式
        // Test custom styles
        const listElement = container.querySelector(`.${defaultContext.prefixCls}-tag-list`);
        expect(listElement).toHaveClass('custom-tag-list');
        expect(listElement.style.backgroundColor).toBe('red');

        // 测试标签个性化样式
        // Test tag personalized styles
        const tags = container.querySelectorAll(`.${prefix}`);
        expect(tags[0].style.color).toBe('blue');
    });

    // 测试边界情况处理
    // Test edge case handling
    it('should handle edge cases correctly', () => {
        // 测试空列表
        // Test empty list
        const { container } = render(<Tag.List list={[]} />);
        const listElement = container.querySelector(`.${defaultContext.prefixCls}-tag-list`);
        expect(listElement).toBeInTheDocument();
        expect(container.querySelector('.tag-list-add-wrap')).toBeInTheDocument();
    });
});
