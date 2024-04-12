import React from 'react';
import { render } from '@testing-library/react';
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
        render(
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
        const { container } = render(<Skeleton avatar />);
        expect(container.querySelectorAll(`.${prefix}-avatar`).length).toBe(1);
    });
    it('should render correctly when set grid', () => {
        const { container } = render(<Skeleton grid={{ columns: 5 }} />);
        expect(container.querySelectorAll(`.${prefix}-grid-item`).length).toBe(5);
    });
    it('should render correctly when set children', () => {
        const { container } = render(
            <Skeleton>
                <Skeleton.Node>
                    <div style={{ width: 20, height: 20 }} />
                </Skeleton.Node>
            </Skeleton>,
        );
        expect(container.querySelectorAll(`.${prefix}-node`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}-title`).length).toBe(1);
        expect(container.querySelectorAll(`.${prefix}-paragraph`).length).toBe(1);
    });
    it('should render correctly when set animation', () => {
        const { container, rerender } = render(
            <Skeleton>
                <Skeleton.Node>
                    <div style={{ width: 20, height: 20 }} />
                </Skeleton.Node>
            </Skeleton>,
        );
        expect(container.querySelectorAll(`.${prefix}-animation-gradient`).length).toBe(5);
        expect(container.querySelectorAll(`.${prefix}-animation-breath`).length).toBe(0);
        rerender(
            <Skeleton animation="breath">
                <Skeleton.Node>
                    <div style={{ width: 20, height: 20 }} />
                </Skeleton.Node>
            </Skeleton>,
        );
        expect(container.querySelectorAll(`.${prefix}-animation-gradient`).length).toBe(0);
        expect(container.querySelectorAll(`.${prefix}-animation-breath`).length).toBe(5);
        rerender(
            <Skeleton animation="breath" showAnimation={false}>
                <Skeleton.Node>
                    <div style={{ width: 20, height: 20 }} />
                </Skeleton.Node>
            </Skeleton>,
        );
        expect(container.querySelectorAll(`.${prefix}-animation-gradient`).length).toBe(0);
        expect(container.querySelectorAll(`.${prefix}-animation-breath`).length).toBe(0);
    });
});
