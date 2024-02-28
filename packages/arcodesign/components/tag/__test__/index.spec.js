import React from 'react';
import { render } from '@testing-library/react';
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

    import { render } from '@testing-library/react';
    import userEvent from '@testing-library/user-event';
    import React from 'react';
    import Tag from '../Tag'; // 请自行修改路径

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
});
