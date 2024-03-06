import React from 'react';
import { render } from '@testing-library/react';
import mountTest from '../../../tests/mountTest';
import Portal from '..';
import '@testing-library/jest-dom';

mountTest(Portal, 'Portal');

describe('Portal', () => {
    it('should render correctly when use portal', () => {
        render(
            <Portal>
                <div className="portal">Portal</div>
            </Portal>,
        );
        expect(document.body.children.length).toBe(2);
        expect(document.querySelector('.portal')).toBeInTheDocument();
    });
});
