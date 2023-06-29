import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import Skeleton from '..';

demoTest('skeleton');

mountTest(Skeleton, 'Skeleton');

const prefix = `${defaultContext.prefixCls}-skeleton`;

describe('Skeleton', () => {
    it('should render correctly when set ref', () => {
        const ref = React.createRef();
        const titleRef = React.createRef();
        const paragraphRef = React.createRef();
        const avatarRef = React.createRef();
        const nodeRef = React.createRef();
        mount(
            <Skeleton ref={ref}>
                <Skeleton.Title ref={titleRef} />
                <Skeleton.Paragraph ref={paragraphRef} />
                <Skeleton.Avatar ref={avatarRef} />
                <Skeleton.Node ref={nodeRef}>
                    <div />
                </Skeleton.Node>
            </Skeleton>,
        );
        expect(ref.current.dom).not.toBeUndefined();
        expect(titleRef.current.dom).not.toBeUndefined();
        expect(paragraphRef.current.dom).not.toBeUndefined();
        expect(avatarRef.current.dom).not.toBeUndefined();
        expect(nodeRef.current.dom).not.toBeUndefined();
    });
    it('should render correctly when set avatar', () => {
        const comp = mount(<Skeleton avatar />);
        expect(comp.find(`.${prefix}-avatar`).length).toBe(1);
        comp.setProps({
            avatar: { shape: 'square' },
        });
        expect(comp.find(`.${defaultContext.prefixCls}-avatar-shape-square`).length).toBe(1);
    });
    it('should render correctly when set grid', () => {
        const comp = mount(<Skeleton grid={{ columns: 5 }} />);
        expect(comp.find(`.${prefix}-grid-item`).length).toBe(5);
    });
    it('should render correctly when set children', () => {
        const comp = mount(
            <Skeleton>
                <Skeleton.Node>
                    <div style={{ width: 20, height: 20 }} />
                </Skeleton.Node>
            </Skeleton>,
        );
        expect(comp.find(`.${prefix}-node`).length).toBe(1);
        expect(comp.find(`.${prefix}-title`).length).toBe(1);
        expect(comp.find(`.${prefix}-paragraph`).length).toBe(1);
    });
    it('should render correctly when set animation', () => {
        const comp = mount(
            <Skeleton>
                <Skeleton.Node>
                    <div style={{ width: 20, height: 20 }} />
                </Skeleton.Node>
            </Skeleton>,
        );
        expect(comp.find(`.${prefix}-animation-gradient`).length).toBe(0);
        expect(comp.find(`.${prefix}-animation-breath`).length).toBe(0);
        comp.setProps({
            animation: 'gradient',
        });
        expect(comp.find(`.${prefix}-animation-gradient`).length).toBe(5);
        expect(comp.find(`.${prefix}-animation-breath`).length).toBe(0);
        comp.setProps({
            animation: 'breath',
        });
        expect(comp.find(`.${prefix}-animation-gradient`).length).toBe(0);
        expect(comp.find(`.${prefix}-animation-breath`).length).toBe(5);
    });
});
