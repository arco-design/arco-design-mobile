import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import TabBar from '..';

demoTest('tab-bar');

mountTest(TabBar, 'TabBar');

const prefix = `${defaultContext.prefixCls}-tab-bar`;

describe('TabBar', () => {
    const dataSource = [{ title: 'A' }, { title: 'B' }, { title: 'C' }];

    it('should switch active item and callback onChange when clicking item', () => {
        const onChange = jest.fn();
        const { container } = render(
            <TabBar dataSource={dataSource} onChange={onChange} />,
        );

        const items = container.querySelectorAll(`.${prefix}-item`);
        expect(items).toHaveLength(3);
        expect(items[0]).toHaveClass(`${prefix}-item-active`);

        userEvent.click(items[1]);
        act(() => {});
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith(1);
        expect(items[1]).toHaveClass(`${prefix}-item-active`);

        // 再次点击当前激活项不重复触发 onChange
        userEvent.click(items[1]);
        act(() => {});
        expect(onChange).toBeCalledTimes(1);
        expect(items[1]).toHaveClass(`${prefix}-item-active`);
    });

    it('should callback item onClick when clicking item', () => {
        const onClick = jest.fn();
        const { container } = render(
            <TabBar>
                <TabBar.Item title="A" onClick={onClick} />
                <TabBar.Item title="B" onClick={onClick} />
            </TabBar>,
        );

        const items = container.querySelectorAll(`.${prefix}-item`);
        userEvent.click(items[1]);
        expect(onClick).toBeCalledTimes(1);
    });

    it('should keep active item following activeIndex prop in controlled mode', () => {
        const onChange = jest.fn();
        const { container, rerender } = render(
            <TabBar activeIndex={0} dataSource={dataSource} onChange={onChange} />,
        );

        const items = container.querySelectorAll(`.${prefix}-item`);
        userEvent.click(items[2]);
        expect(onChange).toBeCalledWith(2);
        // 受控模式下未更新 activeIndex 前激活项不变
        expect(items[0]).toHaveClass(`${prefix}-item-active`);

        rerender(
            <TabBar activeIndex={2} dataSource={dataSource} onChange={onChange} />,
        );
        expect(container.querySelectorAll(`.${prefix}-item`)[2]).toHaveClass(
            `${prefix}-item-active`,
        );
    });

    it('should expose dom and changeIndex via ref', () => {
        const onChange = jest.fn();
        const ref = React.createRef();
        const { container } = render(
            <TabBar ref={ref} dataSource={dataSource} onChange={onChange} />,
        );

        expect(ref.current.dom).toBe(container.querySelector(`.${prefix}`));
        act(() => {
            ref.current.changeIndex(2);
        });
        expect(onChange).toBeCalledWith(2);
        expect(container.querySelectorAll(`.${prefix}-item`)[2]).toHaveClass(
            `${prefix}-item-active`,
        );
    });

    it('should expose item dom via ref', () => {
        const itemRef = React.createRef();
        const { container } = render(
            <TabBar>
                <TabBar.Item ref={itemRef} title="A" />
            </TabBar>,
        );

        expect(itemRef.current.dom).toBe(container.querySelector(`.${prefix}-item`));
    });
});
