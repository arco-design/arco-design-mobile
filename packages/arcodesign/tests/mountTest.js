import React from 'react';
import { mount } from 'enzyme';

export default function mountTest(Component, compName) {
    describe(`${compName} mount and unmount`, () => {
        it(`${compName} could be updated and unmounted without errors`, () => {
            const wrapper = mount(<Component />);
            expect(() => {
                wrapper.setProps({});
                wrapper.unmount();
            }).not.toThrow();
        });
    });
}
