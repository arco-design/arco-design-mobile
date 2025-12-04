import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Cell from '..';
import IconSound from '../../icon/IconSound';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-cell`;

const options = [
    {
        label: 'content',
    },
    {
        label: 'content',
    },
    {
        label: 'content',
    },
];

demoTest('cell');

mountTest(Cell, 'Cell');

describe('Cell', () => {
    it('Cell render correctly', () => {
        const { container: wrapper } = render(
            <Cell label="content" desc="desc" bordered={false} />,
        );
        expect(wrapper.querySelectorAll(`.${prefix}`).length).toBe(1);
        const { container: wrapper1 } = render(<Cell label="content" text="desc" showArrow />);
        expect(wrapper1.querySelectorAll('.cell-text').length).toBe(1);
        expect(wrapper1.querySelectorAll('.cell-arrow-icon').length).toBe(1);
        const { container: wrapper2 } = render(
            <Cell icon={<IconSound />} label="content" showArrow />,
        );
        expect(wrapper2.querySelectorAll('.cell-label-icon svg').length).toBe(1);
        const { container: wrapper3 } = render(
            <Cell
                label="content"
                prepend={<div className="prepend">desc</div>}
                append={<div className="append">desc</div>}
                showArrow
            >
                <div className="demo-cell-info">
                    <div className="info">info</div>
                    <div className="sub-info">sub-info</div>
                </div>
            </Cell>,
        );
        expect(wrapper3.textContent).toEqual('desccontentinfosub-infodesc');
        const { container: wrapper4 } = render(<Cell.Group options={options} />);
        expect(wrapper4.querySelectorAll(`.${prefix}`).length).toBe(3);
    });

    it('Cell click correctly', () => {
        const mockFn = jest.fn();
        render(
            <Cell.Group>
                <Cell label="contentClick" onClick={mockFn} data-testid="cell" />
                <Cell label="content" showArrow />
                <Cell label="content" showArrow />
            </Cell.Group>,
        );
        userEvent.click(screen.getByText('contentClick'));
        expect(mockFn).toHaveBeenCalled();
    });

    it('Cell clickable and pressed states work correctly', () => {
        // 测试clickable状态：验证类名存在和按压状态变化
        const { container: clickableWrapper } = render(
            <Cell label="clickable cell" clickable />
        );
        const cellElement = clickableWrapper.querySelector(`.${prefix}`);

        // 验证clickable类名存在
        expect(cellElement.classList.contains(`${prefix}-clickable`)).toBe(true);

        // 使用fireEvent触发触摸事件
        fireEvent.touchStart(cellElement);
        expect(cellElement.classList.contains(`${prefix}-pressed`)).toBe(true);

        fireEvent.touchEnd(cellElement);
        expect(cellElement.classList.contains(`${prefix}-pressed`)).toBe(false);

        // 测试touchcancel事件
        fireEvent.touchStart(cellElement);
        fireEvent.touchCancel(cellElement);
        expect(cellElement.classList.contains(`${prefix}-pressed`)).toBe(false);

        // 测试非clickable状态：验证if条件分支覆盖
        const { container: nonClickableWrapper } = render(
            <Cell label="non-clickable cell" />
        );
        const nonClickableCell = nonClickableWrapper.querySelector(`.${prefix}`);

        // 非clickable状态不应有clickable类名，触摸事件不生效
        expect(nonClickableCell.classList.contains(`${prefix}-clickable`)).toBe(false);
        fireEvent.touchStart(nonClickableCell);
        expect(nonClickableCell.classList.contains(`${prefix}-pressed`)).toBe(false);

        // 验证clickable与onClick协同工作
        const mockFn = jest.fn();
        render(
            <Cell label="clickable with onClick" clickable onClick={mockFn} />
        );
        userEvent.click(screen.getByText('clickable with onClick'));
        expect(mockFn).toHaveBeenCalled();
    });
});
