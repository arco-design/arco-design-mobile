import React from 'react';
import { render, screen } from '@testing-library/react';
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

    it('Cell clickable property works correctly', () => {
        // 测试clickable=true时添加正确的类名
        const { container: clickableWrapper } = render(
            <Cell label="clickable cell" clickable />
        );
        expect(clickableWrapper.querySelector(`.${prefix}-clickable`)).toBeTruthy();

        // 测试clickable=false/默认时不添加类名
        const { container: nonClickableWrapper } = render(
            <Cell label="non-clickable cell" />
        );
        expect(nonClickableWrapper.querySelector(`.${prefix}-clickable`)).toBeFalsy();

        // 测试clickable属性与onClick事件同时工作
        const mockFn = jest.fn();
        render(
            <Cell label="clickable with onClick" clickable onClick={mockFn} />
        );
        userEvent.click(screen.getByText('clickable with onClick'));
        expect(mockFn).toHaveBeenCalled();
    });
});
