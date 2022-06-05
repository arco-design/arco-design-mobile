import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Button from '../../button';

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
                <Comp
                    visible={visible}
                    close={() => setVisible(false)}
                    ref={compRef}
                    {...props}
                >
                    Content
                </Comp>
            </>
        );
    });
}

export function openMasking(wrapper, Comp) {
    wrapper.find('#demo-btn').simulate('click');
    expect(wrapper.find(Comp).props().visible).toBe(true);
    act(() => {
        jest.advanceTimersByTime(800);
    });
    wrapper.update();
}

export function testMaskingCase(compName, Comp, prefix, contentClass = `${prefix}-content`, maskClass = `${prefix}-mask`) {
    it(`should open ${compName} correctly`, () => {
        const onOpen = jest.fn();
        const onClose = jest.fn();
        const onMaskClick = jest.fn();
        const TestDemo = getTestDemo(Comp);
        const wrapper = mount(<TestDemo onOpen={onOpen} onClose={onClose} onMaskClick={onMaskClick} maskClosable={false} />);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(0);
        openMasking(wrapper, Comp);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        expect(onOpen.mock.calls).toHaveLength(1);
        expect(wrapper.find(`.${maskClass}`)).toHaveLength(1);
        // simulate close masking
        wrapper.find(`.${maskClass}`).simulate('click');
        expect(onMaskClick.mock.calls).toHaveLength(1);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        expect(wrapper.find(Comp).props().visible).toBe(true);
        wrapper.setProps({ maskClosable: true });
        wrapper.find(`.${maskClass}`).simulate('click');
        expect(wrapper.find(Comp).props().visible).toBe(false);
        act(() => {
            jest.advanceTimersByTime(800);
        });
        wrapper.update();
        expect(onClose.mock.calls).toHaveLength(1);
        expect(onClose.mock.calls[0]).toEqual(['mask']);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(0);
    });

    it('should keep dom when invisible and `mountOnEnter=false` and `unmountOnExit=false`', () => {
        const TestDemo = getTestDemo(Comp);
        const wrapper = mount(<TestDemo mountOnEnter={false} unmountOnExit={false} />);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        expect(wrapper.find(`.${maskClass}`)).toHaveLength(1);
        expect(wrapper.find(`.${contentClass}`)).toHaveLength(1);
        expect(wrapper.find(`.${maskClass}`).hasClass('pre-mount')).toBe(true);
        expect(wrapper.find(`.${contentClass}`).hasClass('pre-mount')).toBe(true);
        openMasking(wrapper, Comp);
        expect(document.querySelectorAll(`.${prefix}`)).toHaveLength(1);
        expect(wrapper.find(`.${maskClass}`).hasClass('pre-mount')).toBe(false);
    });

    it('should support `open` and `setCloseScene`', () => {
        const onClose = jest.fn();
        const ref = React.createRef();
        window.maskingInstance = Comp.open({
            ref,
            onClose,
            maskTransitionTimeout: 1000,
            className: 'demo-global',
            children: 'Content',
        });
        act(() => {
            jest.advanceTimersByTime(1100);
        });
        expect(document.querySelectorAll('.demo-global')).toHaveLength(1);
        expect(typeof window.maskingInstance.close).toBe('function');
        expect(typeof window.maskingInstance.update).toBe('function');
        const { setCloseScene } = ref.current;
        expect(typeof setCloseScene).toBe('function');
        setCloseScene('global');
        window.maskingInstance.close();
        act(() => {
            jest.advanceTimersByTime(1100);
        });
        expect(onClose.mock.calls).toHaveLength(1);
        expect(onClose.mock.calls[0]).toEqual(['global']);
    });
}
