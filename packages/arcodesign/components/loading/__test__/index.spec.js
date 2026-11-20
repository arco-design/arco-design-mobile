import React from 'react';
import { act, render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Loading from '..';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-loading`;

demoTest('loading');

mountTest(Loading, 'Loading');

describe('Loading', () => {
    it('Different types render correctly', () => {
        const { container } = render(
            <div>
                <Loading type="arc" />
                <Loading type="circle" />
                <Loading type="spin" />
                <Loading type="dot" />
            </div>,
        );

        expect(container.querySelectorAll(`.${prefix}.all-border-box.arc svg`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}.all-border-box.circle svg`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}.all-border-box.spin span`).length).toBe(16);
        expect(container.querySelectorAll(`.${prefix}.all-border-box.dot span`).length).toBe(3);
    });

    it('Dot type rotates opacities periodically and exposes dom via ref', () => {
        jest.useFakeTimers();
        const ref = React.createRef();
        const { container } = render(<Loading ref={ref} type="dot" />);
        expect(ref.current.dom).toBe(container.querySelector(`.${prefix}`));

        const getCells = () => container.querySelectorAll('.dot-cell');
        expect(getCells().length).toBe(3);
        expect(getCells()[0].style.opacity).toBe('0.2');

        // 推进一个周期后第一个点变为最后一个
        // @en After advancing one interval, the first dot becomes the last one
        act(() => {
            jest.advanceTimersByTime(334);
        });
        expect(getCells()[0].style.opacity).toBe('1');
        jest.useRealTimers();
    });
});
