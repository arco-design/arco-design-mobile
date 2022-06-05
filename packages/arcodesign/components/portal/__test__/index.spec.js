import React from 'react'; 
import mountTest from '../../../tests/mountTest';
import Portal from '..';
import { mount } from 'enzyme';

mountTest(Portal, 'Portal');

describe('Portal', () => {
    it('should render correctly when use portal', () => {
        const component = mount(<Portal><div className="portal">Portal</div></Portal>);
        expect(document.body.children.length).toBe(1);
        expect(component.find('div').hasClass('portal')).toBe(true);
    });
});
