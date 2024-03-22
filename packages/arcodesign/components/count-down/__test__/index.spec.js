import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import CountDown from '..';
import '@testing-library/jest-dom';

demoTest('count-down', { useFakeTimers: true });

mountTest(CountDown, 'CountDown');

const Demo = props => {
    const ref = React.useRef();
    return (
        <>
            <CountDown {...props} ref={ref} />
            <button
                onClick={() => {
                    ref.current.start();
                }}
            >
                start
            </button>
        </>
    );
};

describe('CountDown', () => {
    it('should render correctly', async () => {
        const { container } = render(
            <Demo format={'S'} time={{ hours: 0, minutes: 0, seconds: 9 }} />,
        );
        expect(container).toHaveTextContent('9');
    });
});
