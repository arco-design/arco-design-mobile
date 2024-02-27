import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Collapse from '..';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { defaultContext } from '../../context-provider';
import userEvent from '@testing-library/user-event';

const prefix = `${defaultContext.prefixCls}-collapse`;
const headerPrefix = `.${prefix}-header`;
const contentPrefix = `.${prefix}-content`;
const containerPrefix = `.${prefix}-content-container`;

demoTest('collapse');

mountTest(Collapse, 'Collapse');

const activeItem = ['1'];
const item = [
    {
        header: 'title1',
        value: '1',
        content: 'content1',
    },
    {
        header: 'title2',
        value: '2',
        content: 'content2',
    },
    {
        header: 'title3',
        value: '3',
        content: 'content3',
    },
];

describe('Collapse', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('Default expanded rendering is correct', () => {
        const { container } = render(
            <Collapse header="title1" value="1" content={<div>content</div>} />,
        );
        const header = container.querySelectorAll(headerPrefix)[0];
        userEvent.click(header);
        // 有动画，在这停顿！
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const content = container.querySelectorAll(contentPrefix)[0];
        const contentStyle = getComputedStyle(content);
        expect(contentStyle.getPropertyValue('height')).toBe('auto');
    });

    it('Default Group expanded rendering is correct', () => {
        const mockFn = jest.fn();
        const { container, rerender } = render(
            <Collapse.Group
                items={item}
                activeItem={activeItem}
                onCollapse={mockFn}
            ></Collapse.Group>,
        );
        rerender(
            <Collapse.Group items={item} activeItem={[2]} onCollapse={mockFn}></Collapse.Group>,
        );
        const header = container.querySelectorAll(headerPrefix)[0];
        userEvent.click(header);
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('OnCollapse rendering is correct', () => {
        const mockFn = jest.fn();
        const { container } = render(
            <Collapse header="title1" value="1" content={<div>content</div>} onCollapse={mockFn} />,
        );
        const header = container.querySelectorAll(headerPrefix)[0];
        userEvent.click(header);
        const contentContainer = container.querySelectorAll(containerPrefix)[0];
        expect(contentContainer.textContent).toEqual('content');
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('Rerender is correct', () => {
        const { container, rerender } = render(
            <Collapse header="title1" value="1" content={<div>content</div>} />,
        );
        rerender(
            <Collapse
                header="title1"
                value="1"
                content={
                    <div>
                        <div>content1</div>
                        <div>content1</div>
                        <div>content1</div>
                        <div>content1</div>
                    </div>
                }
            />,
        );
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        const header = container.querySelectorAll(headerPrefix)[0];
        userEvent.click(header);
        const contentContainer = container.querySelectorAll(containerPrefix)[0];
        expect(contentContainer.textContent).toEqual('content1content1content1content1');
    });

    it('Disabled rendering is correct', () => {
        const { container } = render(
            <Collapse header="title3" value="3" disabled content={<div>content</div>} />,
        );

        const content = container.querySelectorAll(contentPrefix)[0];
        const contentStyle = getComputedStyle(content);
        expect(contentStyle.getPropertyValue('height')).toBe('0px');
        const header = container.querySelectorAll(headerPrefix)[0];
        userEvent.click(header);
        act(() => {
            jest.advanceTimersByTime(1000);
        });
        expect(contentStyle.getPropertyValue('height')).toBe('0px');
    });

    it('Combined folds render correctly', () => {
        const { container } = render(
            <Collapse.Group defaultActiveItems={['1']} useAccordion>
                <Collapse
                    header="title1"
                    value="1"
                    content={
                        <Collapse.Group
                            defaultActiveItems={['1']}
                            useAccordion
                            groupKey="sub-group"
                        >
                            <Collapse header="children-title" value="1" content="content1" />
                        </Collapse.Group>
                    }
                />
                <Collapse header="content2" active value="2" content="content2" />
            </Collapse.Group>,
        );
        const getContentHeightByIndex = index =>
            getComputedStyle(container.querySelectorAll(contentPrefix)[index]).getPropertyValue(
                'height',
            );
        expect(getContentHeightByIndex(0)).toBe('auto');
        expect(getContentHeightByIndex(1)).toBe('auto');
        expect(getContentHeightByIndex(2)).toBe('0px');

        const header = container.querySelectorAll(headerPrefix)[2];
        userEvent.click(header);
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(getContentHeightByIndex(0)).toBe('0px');
        expect(getContentHeightByIndex(1)).toBe('auto');
        expect(getContentHeightByIndex(2)).toBe('auto');
    });
});
