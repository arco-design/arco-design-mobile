import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Ellipsis from '..';

const prefix = `${defaultContext.prefixCls}-ellipsis`;

demoTest('ellipsis');

mountTest(Ellipsis, 'Ellipsis');

const text =
        'The Arco Design Mobile component library system consists of a pattern of "one core library + multiple business libraries". If the business to be used is already in the existing business component library list, it is recommended to use or jointly build the corresponding business component library; if there is no specific business or there is no corresponding business component library but you are anxious to use it, you can use the core basic library.';


export function EllipsisDemo() {
    const [ellipsis, setEllipsis] = React.useState(true);
    const collapseNode = <span className="hide">收起</span>;

    return (
        <Ellipsis
            ellipsis={ellipsis}
            text={text}
            maxLine={2}
            ellipsisNode={
                <span>
                    ...<span className="display">display</span>
                </span>
            }
            collapseNode={collapseNode}
            reflowOnResize={true}
            onEllipsisNodeClick={() => {
                setEllipsis(false);
            }}
            onCollapseNodeClick={() => {
                setEllipsis(true);
            }}
        />
    );
}

describe('Ellipsis style', () => {
    it('Text multi-line omission renders correctly', () => {
        const { container } = render(
            <Ellipsis text={text} maxLine={2}/>
        );
        expect(container.querySelector(`.${prefix}-native.ellipsis`).style.WebkitLineClamp).toBe('2');
    });
})

describe('Ellipsis action', () => {
    it('Text multi-line omission renders correctly', () => {
        const { container } = render(
            <EllipsisDemo />
        );
        const ellipsisBtn = screen.getByText('display');
        userEvent.click(ellipsisBtn);
        const hideEllipsisBtn = container.querySelector('.hide');
        expect(hideEllipsisBtn.textContent).toBe('收起');
        userEvent.click(hideEllipsisBtn);
        expect(container.querySelector(`.${prefix}-js-content-ellipsis`).style.display).toBe('none');
    });

    it('DangerousInnerHTML render correctly', async() => {
        const ref = createRef();
        const htmlText = `This wasn't the first time ''natural'' sounds had been used in <a class="demo-link-line">musical compositions</a>; that sort of thing had been going on at least as far back as the 19th century, and the surrealists and futurists of the 1920s and 1930s were way into this kind of thing`;
        jest.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
            getPropertyValue: () => 'normal'
        }));
        const { container } = render(<Ellipsis text={htmlText} dangerouslyUseInnerHTML maxLine={2} ref={ref} onReflow={() => {}} />);
        const child = container.querySelector(`.${prefix}-js`);
        Object.defineProperty(child, 'getBoundingClientRect', {
            value: jest.fn(() => ({ height: 60 })),
        });
        ref.current.reflow();
        expect(container.querySelectorAll(`.${prefix}-js-content-text`).length).toEqual(1);
        expect(container.querySelector(`.${prefix}-js-content-ellipsis`).style.display).toBe('inline');
    });
})

describe('Ellipsis js truncation', () => {
    let computedStyleSpy;
    beforeEach(() => {
        computedStyleSpy = jest
            .spyOn(window, 'getComputedStyle')
            .mockImplementation(() => ({ getPropertyValue: () => 'normal' }));
    });
    afterEach(() => {
        computedStyleSpy.mockRestore();
    });

    function mockRect(child, getHeight) {
        Object.defineProperty(child, 'getBoundingClientRect', {
            value: jest.fn(() => ({ height: getHeight() })),
        });
    }

    it('should trim end-excluded characters after text truncation', () => {
        const ref = createRef();
        const onReflow = jest.fn();
        const { container } = render(
            <Ellipsis
                text="axxxxxxxxx"
                maxLine={1}
                endExcludes={['x']}
                onReflow={onReflow}
                ref={ref}
            />,
        );
        const child = container.querySelector(`.${prefix}-js`);
        const contentEl = child.querySelector(`.${prefix}-js-content`);
        // jsdom 未实现 innerText，截断过程写入的是元素的 innerText 属性
        // @en jsdom does not implement innerText, truncation writes the innerText property
        const currentText = () => String(contentEl.innerText ?? contentEl.textContent);
        mockRect(child, () => (currentText().length > 3 ? 60 : 0));
        ref.current.reflow();
        expect(onReflow).toHaveBeenLastCalledWith(true, 'a');
        expect(currentText()).toBe('a');
    });

    it('should remove overflowing single html node entirely', () => {
        const ref = createRef();
        const onReflow = jest.fn();
        const { container } = render(
            <Ellipsis
                text="<b><i>bold text</i></b>"
                dangerouslyUseInnerHTML
                maxLine={1}
                onReflow={onReflow}
                ref={ref}
            />,
        );
        const child = container.querySelector(`.${prefix}-js`);
        const contentEl = child.querySelector(`.${prefix}-js-content`);
        mockRect(child, () => 60);
        ref.current.reflow();
        expect(onReflow).toHaveBeenLastCalledWith(true, '');
        expect(contentEl.childNodes.length).toBe(0);
    });

    it('should truncate html nodes recursively', () => {
        const ref = createRef();
        const onReflow = jest.fn();
        const { container } = render(
            <Ellipsis
                text="<b></b><b>xx</b>"
                dangerouslyUseInnerHTML
                maxLine={1}
                onReflow={onReflow}
                ref={ref}
            />,
        );
        const child = container.querySelector(`.${prefix}-js`);
        const contentEl = child.querySelector(`.${prefix}-js-content`);
        mockRect(child, () => (contentEl.textContent.length > 1 ? 60 : 0));
        ref.current.reflow();
        // 空节点被保留，第二个节点递归截断为空
        // @en Empty node is kept and the second node is truncated to empty recursively
        expect(onReflow).toHaveBeenLastCalledWith(true, '');
    });

    it('should remove overflowing leaf node when finding critical node', () => {
        const ref = createRef();
        const onReflow = jest.fn();
        const { container } = render(
            <Ellipsis
                text="<b></b><i></i>"
                dangerouslyUseInnerHTML
                maxLine={1}
                onReflow={onReflow}
                ref={ref}
            />,
        );
        const child = container.querySelector(`.${prefix}-js`);
        const contentEl = child.querySelector(`.${prefix}-js-content`);
        mockRect(child, () => (contentEl.innerHTML.length > 0 ? 60 : 0));
        ref.current.reflow();
        // 首个空节点即溢出，直接移除并回调
        // @en The first empty node overflows, remove it and callback
        expect(onReflow).toHaveBeenLastCalledWith(true, '');
        // 首个空节点即溢出被移除，后续节点尚未挂载
        // @en The first empty node overflows and is removed, later nodes are not attached yet
        expect(contentEl.childNodes.length).toBe(0);
    });

    it('should not throw when reflow is called after unmount', () => {
        const ref = createRef();
        const onReflow = jest.fn();
        const { unmount } = render(<Ellipsis text="hello world" onReflow={onReflow} ref={ref} />);
        const reflowFn = ref.current.reflow;
        unmount();
        expect(() => reflowFn()).not.toThrow();
        expect(onReflow).toBeCalledTimes(1);
    });
});
