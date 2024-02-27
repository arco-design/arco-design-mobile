import React from 'react';
import { render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import IconStarFill from '../../icon/IconStarFill';
import Badge from '..';
import { defaultContext } from '../../context-provider';

const prefix = `${defaultContext.prefixCls}-badge`;

demoTest('badge');

mountTest(Badge, 'Badge');

describe('Badge', () => {
    // it('Render different types', () => {
    //     const wrapper = mount(<Badge absolute dot />);
    //     expect(wrapper.find(`.${prefix}.dot.absolute`).length).toBe(1);
    //     const wrapper1 = mount(<Badge absolute text="12" />);
    //     expect(wrapper1.find('.badge-text').length).toBe(1);
    //     expect(wrapper1.text()).toEqual('12');
    //     const wrapper2 = mount(<Badge absolute text="100" />);
    //     expect(wrapper2.find('.badge-text').length).toBe(1);
    //     expect(wrapper2.text()).toEqual('99+');
    //     const wrapper3 = mount(<Badge absolute text="新" />);
    //     expect(wrapper3.find('.badge-text').length).toBe(1);
    //     expect(wrapper3.text()).toEqual('新');
    //     const wrapper4 = mount(
    //         <Badge absolute>
    //             <IconStarFill />
    //         </Badge>,
    //     );
    //     expect(wrapper4.find('svg').length).toBe(1);
    // });

    it('Render different types', () => {
        const { container: container1 } = render(<Badge absolute dot />);
        expect(container1.querySelectorAll(`.${prefix}.dot.absolute`).length).toBe(1);

        const { container: container2, getByText } = render(<Badge absolute text="12" />);
        expect(container2.querySelectorAll('.badge-text').length).toBe(1);
        expect(getByText('12')).toBeTruthy();

        const { container: container3, getByText: getByText99 } = render(
            <Badge absolute text="100" />,
        );
        expect(container3.querySelectorAll('.badge-text').length).toBe(1);
        expect(getByText99('99+')).toBeTruthy();

        const { container: container4, getByText: getByTextNew } = render(
            <Badge absolute text="新" />,
        );
        expect(container4.querySelectorAll('.badge-text').length).toBe(1);
        expect(getByTextNew('新')).toBeTruthy();

        const { container: container5 } = render(
            <Badge absolute>
                <IconStarFill />
            </Badge>,
        );
        expect(container5.querySelectorAll('svg').length).toBe(1);
    });
});
