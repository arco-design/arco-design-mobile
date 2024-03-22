import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Pagination from '..';
import '@testing-library/jest-dom';

demoTest('pagination');

mountTest(Pagination, 'Pagination');

const Demo = props => {
    const [current, setCurrent] = React.useState(1);
    return (
        <Pagination
            {...props}
            current={current}
            onChange={({ current }) => {
                setCurrent(current);
                props.onChange();
            }}
        />
    );
};

describe('Pagination', () => {
    it('should render correctly', () => {
        const { container, rerender } = render(<Pagination icon total={25} pageSize={5} />);
        expect(container).toHaveTextContent(/1 \/ 5/);
        rerender(<Pagination icon={<div>.</div>} total={5} pageSize={5} />);
        expect(screen.getAllByText('.').length).toBe(2);
        rerender(<Pagination icon={[<div>left</div>, <div>right</div>]} total={5} pageSize={5} />);
        expect(screen.getByText('left')).toBeInTheDocument();
        expect(screen.getByText('right')).toBeInTheDocument();
        rerender(<Pagination icon total={5} pageSize={5} hideOnOnePage />);
        expect(container).toHaveTextContent('');
    });
    it('should callback correctly', async () => {
        const onChange = jest.fn();
        render(
            <Demo
                prevFieldText="prev"
                nextFieldText="next"
                total={50}
                pageSize={10}
                onChange={onChange}
            />,
        );
        const prev = screen.getByText('prev');
        await userEvent.click(prev);
        expect(onChange).toBeCalledTimes(0);
        const next = screen.getByText('next');
        await userEvent.click(next);
        expect(onChange).toBeCalledTimes(1);
        await userEvent.click(next);
        await userEvent.click(next);
        await userEvent.click(next);
        await userEvent.click(next);
        expect(onChange).toBeCalledTimes(4);
        await userEvent.click(prev);
        expect(onChange).toBeCalledTimes(5);
    });
});
