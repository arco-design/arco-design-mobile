import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Collapse from '..';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { defaultContext } from '../../context-provider';
import userEvent from '@testing-library/user-event';
import { pureDelay } from '../../../tests/helpers/utils';

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
        pureDelay(1000);
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
        pureDelay(1000);
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
        pureDelay(1000);
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
        pureDelay(1000);

        expect(getContentHeightByIndex(0)).toBe('0px');
        expect(getContentHeightByIndex(1)).toBe('auto');
        expect(getContentHeightByIndex(2)).toBe('auto');
    });

    it('Controlled activeItems mode', () => {
        const mockFn = jest.fn();
        const { container } = render(
            <Collapse.Group items={item} activeItems={['1']} onCollapse={mockFn} />,
        );
        userEvent.click(container.querySelectorAll(headerPrefix)[1]);
        expect(mockFn.mock.calls.length).toBe(1);
    });

    it('Disabled group ignores clicks in children mode', () => {
        const mockFn = jest.fn();
        const { container } = render(
            <Collapse.Group disabled onCollapse={mockFn}>
                <Collapse header="a" value="1" content="c1" />
            </Collapse.Group>,
        );
        userEvent.click(container.querySelectorAll(headerPrefix)[0]);
        expect(mockFn.mock.calls.length).toBe(0);
    });

    it('Children mode closes an open item', () => {
        const { container } = render(
            <Collapse.Group defaultActiveItems={['1']}>
                <Collapse header="a" value="1" content="c1" />
                <Collapse header="b" value="2" content="c2" />
            </Collapse.Group>,
        );
        userEvent.click(container.querySelectorAll(headerPrefix)[0]);
        act(() => {
            jest.runAllTimers();
        });
        expect(
            getComputedStyle(container.querySelectorAll(contentPrefix)[0]).getPropertyValue(
                'height',
            ),
        ).toBe('0px');
    });

    it('Controlled children activeItems syncs on change', () => {
        const { rerender } = render(
            <Collapse.Group activeItems={['1']}>
                <Collapse header="a" value="1" content="c1" />
            </Collapse.Group>,
        );
        rerender(
            <Collapse.Group activeItems={['2']}>
                <Collapse header="a" value="1" content="c1" />
            </Collapse.Group>,
        );
        act(() => {
            jest.runAllTimers();
        });
    });

    it('Exposes refs of group and item', () => {
        const groupRef = React.createRef();
        const itemRef = React.createRef();
        const { container } = render(
            <Collapse.Group ref={groupRef}>
                <Collapse ref={itemRef} header="a" value="1" content="c1" />
            </Collapse.Group>,
        );
        expect(groupRef.current.dom).toBe(container.querySelector(`.${prefix}-group`));
        expect(itemRef.current.dom).toBe(container.querySelector(`.${prefix}-item`));
        expect(itemRef.current.head).toBe(container.querySelector(headerPrefix));
    });

    it('ResetHeight runs on second toggle', () => {
        const ref = React.createRef();
        const { container, unmount } = render(
            <Collapse ref={ref} header="t" value="1" content={<div>c</div>} />,
        );
        const contentNode = container.querySelector(containerPrefix);
        contentNode.getBoundingClientRect = () => ({ height: 100 });
        act(() => {
            userEvent.click(container.querySelectorAll(headerPrefix)[0]);
        });
        act(() => {
            jest.runAllTimers();
        });
        expect(
            getComputedStyle(container.querySelector(contentPrefix)).getPropertyValue('height'),
        ).toBe('auto');
        act(() => {
            userEvent.click(container.querySelectorAll(headerPrefix)[0]);
        });
        act(() => {
            jest.runAllTimers();
        });
        expect(
            getComputedStyle(container.querySelector(contentPrefix)).getPropertyValue('height'),
        ).toBe('0px');
        const handleBeforeUnmount = ref.current;
        unmount();
        // 卸载后调用 updateLayout 与 resetHeight 应直接返回
        handleBeforeUnmount.updateLayout();
        act(() => {
            jest.runAllTimers();
        });
    });

    it('resetHeight early-returns when unmounted during transition', () => {
        const { rerender, unmount } = render(
            <Collapse header="t" value="1" content={<div>c</div>} defaultActive />,
        );
        rerender(<Collapse header="t" value="1" content={<div>c2</div>} defaultActive />);
        unmount();
        act(() => {
            jest.runAllTimers();
        });
    });
});
