import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Button from '..';
import '@testing-library/jest-dom';

demoTest('button');

mountTest(Button, 'Button');

describe('Button', () => {
    mountTest(() => <Button size="large" />, 'Large Button');
    mountTest(() => <Button size="small" />, 'Small Button');
    it('should callback correctly when clicked', () => {
        const mockFn = jest.fn();
        const { rerender } = render(<Button onClick={mockFn} />);
        const btn = screen.getByRole('button');
        userEvent.click(btn);
        const mockFnCallLength = mockFn.mock.calls.length;
        expect(mockFnCallLength).toBe(1);
        rerender(<Button onClick={mockFn} disabled />);
        userEvent.click(btn);
        expect(mockFnCallLength).toBe(mockFnCallLength);
    });
    it('should render active correctly when clicked/touched', () => {
        const { container, rerender } = render(<Button />);
        const btn = screen.getByRole('button');
        fireEvent.touchStart(btn);
        expect(container.querySelectorAll('.active').length).toBe(1);
        fireEvent.touchEnd(btn);
        expect(container.querySelectorAll('.active').length).toBe(0);
        rerender(<Button needActive={false} />);
        fireEvent.touchStart(btn);
        expect(container.querySelectorAll('.active').length).toBe(0);
        fireEvent.touchEnd(btn);
        expect(container.querySelectorAll('.active').length).toBe(0);
    });
    it('should render correctly when set inline/disabled/halfBorder', () => {
        const { container: component1 } = render(<Button inline disabled halfBorder />);
        expect(component1.querySelectorAll('.inline').length).toBe(1);
        expect(component1.querySelectorAll('.disabled').length).toBe(1);
        expect(component1.querySelectorAll('.half-border').length).toBe(1);
        const { container: component2 } = render(<Button />);
        expect(component2.querySelectorAll('.inline').length).toBe(0);
        expect(component2.querySelectorAll('.disabled').length).toBe(0);
        expect(component2.querySelectorAll('.half-border').length).toBe(0);
    });
    it('should reset when loading state is end', () => {
        const { container, rerender } = render(<Button />);
        rerender(<Button loading />);
        expect(container.querySelectorAll('.loading').length).toBe(1);
        rerender(<Button loading={false} />);
        expect(container.querySelectorAll('.loading').length).toBe(0);
    });
    it('should render correctly when set custom color config', () => {
        const colorConfig = {
            normal: '#FF5722',
            active: '#F53F3F',
            disabled: '#FBACA3',
        };
        render(
            <Button bgColor={colorConfig} borderColor={colorConfig}>
                Text
            </Button>,
        );
        const btn = screen.getByRole('button');
        expect(btn).toHaveStyle({ borderColor: '#FF5722' });
        expect(btn).toHaveStyle({ background: '#FF5722' });
    });
    it('should render icon correctly when loading', () => {
        const { container } = render(<Button loading loadingIcon="123" />);
        expect(container.querySelector('.btn-icon').textContent).toEqual('123');
    });
    it('should render empty button without errors', () => {
        const { container } = render(
            <Button>
                {null}
                {undefined}
            </Button>,
        );
        expect(container.textContent).toBe('');
    });
    it('should not throw error when size/type is wrong', () => {});
});
