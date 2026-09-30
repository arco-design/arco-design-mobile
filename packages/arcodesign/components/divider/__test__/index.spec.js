import React from 'react';
import { render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Divider from '..';

demoTest('divider');

mountTest(Divider, 'Divider');

const prefix = `${defaultContext.prefixCls}-divider`;

describe('Divider', () => {
    it('should expose dom via ref', () => {
        const ref = React.createRef();
        const { container } = render(<Divider ref={ref} />);
        expect(ref.current.dom).toBe(container.querySelector(`.${prefix}`));
    });
});
