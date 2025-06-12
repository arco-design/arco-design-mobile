import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultContext } from '../../context-provider';
import Button from '../../button';
import '@testing-library/jest-dom';
import { pureDelay } from '../../../tests/helpers/utils';

const maskingPrefix = `${defaultContext.prefixCls}-masking`;

export function getTestDemo(Comp) {
    return forwardRef((props = {}, ref) => {
        const [visible, setVisible] = useState(false);
        const compRef = useRef(null);

        useImperativeHandle(ref, () => compRef.current);

        return (
            <>
                <Button id="demo-btn" onClick={() => setVisible(true)} type="primary">
                    Open
                </Button>
                <Comp visible={visible} close={() => setVisible(false)} ref={compRef} {...props}>
                    Content
                </Comp>
            </>
        );
    });
}

export function openMasking() {
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    act(() => {
        jest.advanceTimersByTime(20);
    });
}

export function testMaskingCase(
    compName,
    Comp,
    prefix,
    containerId,
    contentClass = `${prefix}-content`,
    maskClass = `${prefix}-mask`,
) {
    it(`should open ${compName} correctly`, () => {
        const onOpen = jest.fn();
        const onClose = jest.fn();
        const onMaskClick = jest.fn();
        const TestDemo = getTestDemo(Comp);
        const { rerender } = render(
            <TestDemo
                onOpen={onOpen}
                onClose={onClose}
                onMaskClick={onMaskClick}
                maskClosable={false}
            />,
        );
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(0);
        openMasking();
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        act(() => jest.runAllTimers());
        expect(onOpen.mock.calls).toHaveLength(1);
        expect(document.querySelectorAll(`.${maskClass}`)).toHaveLength(1);
        // simulate close masking
        userEvent.click(document.querySelector(`.${maskClass}`));
        expect(onMaskClick.mock.calls).toHaveLength(1);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        act(() => jest.runAllTimers());
        expect(document.querySelector(`.${maskingPrefix}`)).toBeInTheDocument();
        rerender(
            <TestDemo onOpen={onOpen} onClose={onClose} onMaskClick={onMaskClick} maskClosable />,
        );
        userEvent.click(document.querySelector(`.${maskClass}`));
        act(() => jest.runAllTimers());
        expect(document.querySelectorAll(`.${prefix}`)).not.toHaveLength(1);
        expect(onClose.mock.calls).toHaveLength(1);
        expect(onClose.mock.calls[0]).toEqual(['mask']);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(0);
    });

    it('should keep dom whe n invisible and `mountOnEnter=false` and `unmountOnExit=false`', () => {
        const TestDemo = getTestDemo(Comp);
        render(<TestDemo mountOnEnter={false} unmountOnExit={false} />);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        expect(document.querySelectorAll(`.${maskClass}`)).toHaveLength(1);
        expect(document.querySelectorAll(`.${contentClass}`)).toHaveLength(1);
        expect(document.querySelector(`.${maskClass}`).classList.contains('pre-mount')).toBe(true);
        expect(document.querySelector(`.${contentClass}`).classList.contains('pre-mount')).toBe(
            true,
        );
        openMasking();
        act(() => jest.runAllTimers());
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        expect(document.querySelector(`.${maskClass}`).classList.contains('pre-mount')).toBe(false);
    });

    it('should support `open`', () => {
        const onClose = jest.fn();
        const props = {
            onClose,
            maskTransitionTimeout: 1000,
            className: 'demo-global',
            children: 'Content',
        };
        const divId = `#_${containerId}_DIV__`;
        // keep div after close when unmountOnExit=false
        window.maskingInstance = Comp.open({
            ...props,
            unmountOnExit: false,
        });
        pureDelay(1100);
        expect(document.querySelectorAll(divId)).toHaveLength(1);
        window.maskingInstance.close();
        pureDelay(1100);
        expect(onClose.mock.calls).toHaveLength(1);
        expect(document.querySelectorAll(divId)).toHaveLength(1);
        expect(document.querySelectorAll('.demo-global')).toHaveLength(1);
        // open again without unmountOnExit=false to clear side effects
        window.maskingInstance = Comp.open(props);
        pureDelay(1100);
        expect(document.querySelectorAll('.demo-global')).toHaveLength(1);
        expect(document.querySelectorAll(divId)).toHaveLength(1);
        expect(typeof window.maskingInstance.close).toBe('function');
        expect(typeof window.maskingInstance.update).toBe('function');
        window.maskingInstance.close();
        pureDelay(1100);
        expect(document.querySelectorAll(divId)).toHaveLength(0);
    });
}
