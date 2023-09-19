import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef, useState } from 'react';
import Rate from '..';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';

demoTest('rate');

mountTest(Rate, 'Rate');

// 定义你的 SVG 图标
const Star = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.7 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>
);

const StarFilled = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.7 5.82 22 7 14.14l-5-4.87z" />
    </svg>
);

const HalfStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <defs>
            <linearGradient id="half-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="50%" stopColor="#FFEB3B" />
                <stop offset="50%" stopColor="#FFFFFF" />
            </linearGradient>
        </defs>
        <path
            d="M12,2 L15.09,8.26 L22,9.27 L17,14.14 L18.18,22 L12,18.7 L5.82,22 L7,14.14 L2,9.27 L8.91,8.26 L12,2 Z"
            fill="url(#half-gradient)"
        />
        <path d="M0,0 L24,0 L24,24 L0,24 Z" fill="none" />
    </svg>
);

describe('Rate Component', () => {
    // 测试默认值 (Test default value)
    it('should render with default value', () => {
        const { container } = render(<Rate />);
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        stars.forEach((star, index) => {
            expect(star).toHaveClass('normal');
        });
    });

    // 测试自定义值 (Test custom value)
    it('should render with custom value', () => {
        const { container } = render(<Rate defaultValue={3} />);
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        stars.forEach((star, index) => {
            if (index < 3) {
                expect(star).toHaveClass('active');
            } else {
                expect(star).toHaveClass('normal');
            }
        });
    });

    // 测试用户交互 (Test user interaction)
    it('should update value on user interaction', async () => {
        const { container } = render(<Rate />);
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        await userEvent.click(stars[4].querySelector('.arco-rate-icon-click-half.right'));
        stars.forEach((star, index) => {
            if (index <= 4) {
                expect(star).toHaveClass('active');
            } else {
                expect(star).toHaveClass('normal');
            }
        });
    });

    // 测试禁用属性 (Test disabled property)
    it('should not update value on user interaction when disabled', async () => {
        const { container } = render(<Rate defaultValue={3} disabled />);
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        await userEvent.click(stars[4].querySelector('.arco-rate-icon-click-half.right'));
        stars.forEach((star, index) => {
            if (index < 3) {
                expect(star).toHaveClass('active');
            } else {
                expect(star).toHaveClass('normal');
            }
        });
    });

    // 测试半星功能 (Test half-star feature)
    it('should support half-star ratings when allowHalf is true', async () => {
        const { container } = render(<Rate allowHalf />);
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        await userEvent.click(stars[2].querySelector('.arco-rate-icon-click-half.left'));
        stars.forEach((star, index) => {
            if (index < 2) {
                expect(star).toHaveClass('active');
            } else if (index === 2) {
                expect(star).toHaveClass('half-active');
            } else {
                expect(star).toHaveClass('normal');
            }
        });
    });

    // 测试不支持半星 (Test no half-star support)
    it('should not support half-star ratings when allowHalf is false', async () => {
        const { container } = render(<Rate allowHalf={false} />);
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        await userEvent.click(stars[2].querySelector('.arco-rate-icon-click-half.left'));
        stars.forEach((star, index) => {
            if (index <= 2) {
                expect(star).toHaveClass('active');
            } else {
                expect(star).toHaveClass('normal');
            }
        });
    });

    // 测试自定义图标数量 (Test custom icon count)
    it('should render correct number of stars when count is set', () => {
        const { container } = render(<Rate count={7} />);
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        expect(stars.length).toBe(7);
    });

    // 测试 step 属性 (Test step property)
    it('should support custom step values', async () => {
        let value = 0;
        const { container } = render(
            <Rate
                step={2}
                onChange={v => {
                    value = v;
                }}
            />,
        );
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        await userEvent.click(stars[2].querySelector('.arco-rate-icon-click-half.right'));
        expect(value).toBe(6); // 3 星 * 2 分/星 = 6 分
    });

    // 测试 step 属性的响应式 (Test reactivity of step property)
    it('should react to changes in step value', async () => {
        let value = 0;
        const TestComponent = () => {
            const [step, setStep] = useState(2);
            return (
                <>
                    <Rate
                        step={step}
                        onChange={v => {
                            value = v;
                        }}
                    />
                    <button onClick={() => setStep(3)}>Change Step</button>
                </>
            );
        };

        const { container } = render(<TestComponent />);

        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        await userEvent.click(stars[2].querySelector('.arco-rate-icon-click-half.right'));

        expect(value).toBe(6); // 3 星 * 2 分/星 = 6 分

        await userEvent.click(container.querySelector('button'));
        await userEvent.click(stars[3].querySelector('.arco-rate-icon-click-half.right'));

        expect(value).toBe(12); // 4 星 * 3 分/星 = 9 分
    });

    // 测试 icons 属性 (Test icons property)
    it('should support custom icons', () => {
        const { container } = render(
            <Rate
                icons={{
                    normal: () => <Star />,
                    active: () => <StarFilled />,
                    halfActive: () => <HalfStar />,
                }}
            />,
        );
        const stars = container.querySelectorAll('.arco-rate-icon-wrap');
        stars.forEach((star, index) => {
            expect(star.querySelector('svg')).not.toBeNull();
        });
    });

    // 测试 ref 属性 (Test ref property)
    it('should pass ref correctly', () => {
        const TestComponent = () => {
            const rateRef = useRef(null);
            return <Rate ref={rateRef} />;
        };

        render(<TestComponent />);
        const rate = screen.getByRole('slider');
        expect(rate).toBeInstanceOf(HTMLDivElement);
        expect(rate).toHaveClass('arco-rate');
    });
});
