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
    mountTest(() => <Tag type="hollow">Tag</Tag>, 'should mount correctly when set type prop');
    mountTest(() => <Tag size="small">Tag</Tag>, 'should mount correctly when set size prop');

    it('should callback correctly when close icon be clicked', () => {
        const mockFn = jest.fn();
        const { container } = render(
            <Tag closeable onClose={mockFn}>
                标签
            </Tag>,
        );
        expect(container.querySelectorAll('.tag-close-wrap').length).toBe(1);
        userEvent.click(container.querySelector('.tag-close-wrap'));
        expect(mockFn).toBeCalled();
    });

    it('should callback correctly when click tag', () => {
        const mockFn = jest.fn();
        const { container } = render(<Tag onClick={mockFn}>标签</Tag>);
        userEvent.click(container.firstChild);
        expect(mockFn).toBeCalled();
    });

    it('should render correctly when set filleted/halfBorder/borderStyle', () => {
        const { container } = render(
            <Tag filleted halfBorder borderStyle="solid">
                标签
            </Tag>,
        );
        const relevantComponent = container.querySelector(`.${prefix}`);
        expect(relevantComponent).toHaveClass('half-border');
        expect(relevantComponent.style.borderStyle).toBe('solid');
        expect(relevantComponent).toHaveClass('filleted');
    });

    it('should render correctly when use tag list', () => {
        const list = [1, 1].map(item => ({
            closeable: true,
            children: `标签${item}`,
        }));
        const { container } = render(<Tag.List list={list} />);
        expect(container.querySelectorAll(`.${prefix}`).length).toBe(3);
        expect(container.querySelectorAll('.tag-list-add-wrap').length).toBe(1);
    });

    it('should render correctly with different tag types', () => {
        const { container: container1 } = render(<Tag type="primary">Primary</Tag>);
        const { container: container2 } = render(<Tag type="hollow">Hollow</Tag>);
        const { container: container3 } = render(<Tag type="solid">Solid</Tag>);

        expect(container1.querySelector(`.${prefix}-primary`)).toBeInTheDocument();
        expect(container2.querySelector(`.${prefix}-hollow`)).toBeInTheDocument();
        expect(container3.querySelector(`.${prefix}-solid`)).toBeInTheDocument();
    });

    it('should render correctly with different sizes', () => {
        const { container: container1 } = render(<Tag size="small">Small</Tag>);
        const { container: container2 } = render(<Tag size="medium">Medium</Tag>);
        const { container: container3 } = render(<Tag size="large">Large</Tag>);

        expect(container1.querySelector('.size-small')).toBeInTheDocument();
        expect(container2.querySelector('.size-medium')).toBeInTheDocument();
        expect(container3.querySelector('.size-large')).toBeInTheDocument();
    });

    it('should render correctly with custom colors', () => {
        const { container } = render(
            <Tag color="#ff0000" bgColor="#00ff00" borderColor="#0000ff">
                Custom Color
            </Tag>,
        );
        const tagElement = container.querySelector(`.${prefix}`);
        // Color formats may vary between environments (RGB vs hex)
        expect(tagElement.style.color).toMatch(/^(rgb\(255, 0, 0\)|#ff0000)$/);
        expect(tagElement.style.background).toMatch(/^(rgb\(0, 255, 0\)|#00ff00)$/);
        expect(tagElement.style.borderColor).toMatch(/^(rgb\(0, 0, 255\)|#0000ff)$/);
    });

    it('should render correctly with icon', () => {
        const TestIcon = () => <span data-testid="test-icon">🏷️</span>;
        const { getByTestId } = render(<Tag icon={<TestIcon />}>With Icon</Tag>);
        expect(getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render correctly with custom close icon', () => {
        const CustomCloseIcon = () => <span data-testid="custom-close">✕</span>;
        const { getByTestId } = render(
            <Tag closeable closeIcon={<CustomCloseIcon />}>
                Custom Close
            </Tag>,
        );
        expect(getByTestId('custom-close')).toBeInTheDocument();
    });

    it('should render correctly with close color', () => {
        const { container } = render(
            <Tag closeable closeColor="#ff0000">
                Close Color
            </Tag>,
        );
        const closeIcon = container.querySelector('.tag-close-icon');
        expect(closeIcon).toBeInTheDocument();
    });

    it('should render correctly with different border styles', () => {
        const { container: container1 } = render(<Tag borderStyle="none">None</Tag>);
        const { container: container2 } = render(<Tag borderStyle="dotted">Dotted</Tag>);
        const { container: container3 } = render(<Tag borderStyle="dashed">Dashed</Tag>);

        expect(container1.querySelector(`.${prefix}`).style.borderStyle).toBe('none');
        expect(container2.querySelector(`.${prefix}`).style.borderStyle).toBe('dotted');
        expect(container3.querySelector(`.${prefix}`).style.borderStyle).toBe('dashed');
    });

    it('should render correctly without half border', () => {
        const { container } = render(<Tag halfBorder={false}>No Half Border</Tag>);
        const tagElement = container.querySelector(`.${prefix}`);
        expect(tagElement).not.toHaveClass('half-border');
    });

    it('should not render close button when closeable is false', () => {
        const { container } = render(<Tag closeable={false}>No Close</Tag>);
        expect(container.querySelector('.tag-close-wrap')).not.toBeInTheDocument();
    });
});

describe('Tag.List', () => {
    it('should render correctly with different padding configurations', () => {
        const list = [{ children: 'Tag 1' }, { children: 'Tag 2' }];

        // Test with string verticalPadding
        const { container: container1 } = render(
            <Tag.List list={list} verticalPadding="10px" horizontalPadding="5px" />,
        );
        const listElement1 = container1.querySelector(`.${defaultContext.prefixCls}-tag-list`);
        expect(listElement1.style.marginBottom).toBe('-10px');

        // Test with number verticalPadding
        const { container: container2 } = render(
            <Tag.List list={list} verticalPadding={20} horizontalPadding={10} />,
        );
        const listElement2 = container2.querySelector(`.${defaultContext.prefixCls}-tag-list`);
        expect(listElement2.style.marginBottom).toBe('-20px');
    });

    it('should not show add button when showAddButton is false', () => {
        const list = [{ children: 'Tag 1' }];
        const { container } = render(<Tag.List list={list} showAddButton={false} />);
        expect(container.querySelector('.tag-list-add-wrap')).not.toBeInTheDocument();
    });

    it('should render custom add area', () => {
        const list = [{ children: 'Tag 1' }];
        const CustomAddArea = () => <div data-testid="custom-add">Custom Add</div>;
        const { getByTestId } = render(<Tag.List list={list} addArea={<CustomAddArea />} />);
        expect(getByTestId('custom-add')).toBeInTheDocument();
    });

    it('should callback correctly when add button clicked', () => {
        const mockAddFn = jest.fn();
        const list = [{ children: 'Tag 1' }];
        const { container } = render(<Tag.List list={list} onAdd={mockAddFn} />);

        userEvent.click(container.querySelector('.tag-list-add-wrap'));
        expect(mockAddFn).toBeCalled();
    });

    it('should callback correctly when tag close button clicked', () => {
        const mockCloseFn = jest.fn();
        const mockTagCloseFn = jest.fn();
        const list = [
            {
                children: 'Tag 1',
                closeable: true,
                onClose: mockTagCloseFn,
            },
        ];
        const { container } = render(<Tag.List list={list} onClose={mockCloseFn} />);

        userEvent.click(container.querySelector('.tag-close-wrap'));
        expect(mockCloseFn).toBeCalledWith(0, expect.any(Object));
        expect(mockTagCloseFn).toBeCalled();
    });

    it('should inherit type from list to individual tags', () => {
        const list = [{ children: 'Tag 1' }];
        const { container } = render(<Tag.List list={list} type="hollow" />);
        expect(container.querySelector(`.${prefix}-hollow`)).toBeInTheDocument();
    });

    it('should apply custom styles and class names', () => {
        const list = [{ children: 'Tag 1' }];
        const customStyle = { backgroundColor: 'red' };
        const { container } = render(
            <Tag.List list={list} className="custom-tag-list" style={customStyle} />,
        );

        const listElement = container.querySelector(`.${defaultContext.prefixCls}-tag-list`);
        expect(listElement).toHaveClass('custom-tag-list');
        expect(listElement.style.backgroundColor).toBe('red');
    });

    it('should handle empty list', () => {
        const { container } = render(<Tag.List list={[]} />);
        const listElement = container.querySelector(`.${defaultContext.prefixCls}-tag-list`);
        expect(listElement).toBeInTheDocument();
        expect(container.querySelector('.tag-list-add-wrap')).toBeInTheDocument();
    });

    it('should handle tag with individual style correctly', () => {
        const list = [
            {
                children: 'Tag 1',
                style: { color: 'blue' },
            },
            {
                children: 'Tag 2',
            },
        ];
        const { container } = render(
            <Tag.List list={list} horizontalPadding={15} verticalPadding={10} />,
        );

        const tags = container.querySelectorAll(`.${prefix}`);
        expect(tags[0].style.color).toBe('blue');
        expect(tags[0].style.marginRight).toBe('15px');
        expect(tags[0].style.marginBottom).toBe('10px');
        expect(tags[1].style.marginBottom).toBe('10px');
        // Last tag should not have marginRight when showAddButton is true
    });
});
