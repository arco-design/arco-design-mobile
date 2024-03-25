import React from 'react';
import { render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Steps from '..';

const prefix = `${defaultContext.prefixCls}-steps`;
const iconPrefix = `${defaultContext.prefixCls}-icon`;

demoTest('steps');

mountTest(Steps, 'Steps');

describe('Steps', () => {
    it('should render correctly when set default', () => {
        const items = [{
            title: '开始',
        }, {
            title: '进行中',
        }, {
            title: '步骤3',
        }, {
            title: '完成',
        }]
        const { container } = render(<Steps current={1} items={items} />);
        const beforeNode = container.querySelector(`.${prefix}-item`);
        expect(beforeNode.classList.contains('finish')).toBe(true);
        expect(beforeNode.querySelector('.finish-bg-color-with-config')).toBeTruthy();
        expect(beforeNode.querySelector('svg').classList.contains(`${iconPrefix}-check-bold`)).toBe(true);
        const currentNode = container.querySelectorAll(`.${prefix}-item`)[1];
        expect(currentNode.classList.contains('process')).toBe(true);
        expect(currentNode.querySelector('.process-bg-color-with-config')).toBeTruthy();
        expect(currentNode.querySelector('span').classList.contains(`${prefix}-item-icon-num`)).toBe(true);
        expect(currentNode.textContent).toBe('2进行中');
    });
    it('should render correctly when set description', () => {
        const items = [{
            title: '开始',
            description: 'test'
        }, {
            title: '进行中',
            description: 'test'
        }, {
            title: '步骤3',
            description: 'test'
        }, {
            title: '完成',
            description: 'test'
        }]
        const { container } = render(<Steps current={1} items={items} />);
        const children = container.querySelectorAll(`.${prefix}-item-description`);
        const descriptions = Array.from(children).map(child => child.textContent);
        expect(descriptions).toEqual(['test', 'test', 'test', 'test']);
    });
    it('should render correctly when set mini size and no text', () => {
        const { container } = render(<Steps current={1} items={new Array(4).fill({})} iconType="dot" />);
        expect(container.querySelectorAll(`.${prefix}-item-icon-dot`).length).toBe(4);
        expect(container.textContent).toEqual('');
    });
    it('should render correctly when set error status', () => {
        const items = [{
            title: '开始'
        }, {
            title: '错误',
            status: 'error',
        }, {
            title: '步骤3'
        }, {
            title: '完成'
        }];
        const { container } = render(<Steps current={1} items={items} />);
        const currentNode = container.querySelectorAll(`.${prefix}-item`)[1];
        expect(currentNode.classList.contains('error')).toBe(true);
    });
    it('should callback correctly when click step', () => {
        const mockFn = jest.fn();
        const items = [{
            title: '开始'
        }, {
            title: '错误',
            status: 'error',
        }, {
            title: '步骤3'
        }, {
            title: '完成'
        }];
        const { container } = render(<Steps current={1} items={items} onClick={mockFn}/>);
        const firstChild = container.querySelector(`.${prefix}-item`);
        firstChild.click();
        expect(mockFn).toBeCalled();
    });
});
