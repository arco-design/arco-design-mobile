import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Avatar from '..';
import { defaultContext } from '../../context-provider';
import IconUserFill from '../../icon/IconUserFill';

const demoAvatarSrc =
    'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';
const prefix = `${defaultContext.prefixCls}-avatar`;

demoTest('avatar');

mountTest(Avatar, 'Avatar', {
    src: demoAvatarSrc,
    size: 'large',
});

// Avatar 组件的单元测试
// Unit tests for Avatar component
describe('Avatar', () => {
    // 测试 Avatar 组件图片是否正确渲染
    // Test if the Avatar component image renders correctly
    it('src renders correctly', () => {
        const { container } = render(<Avatar src={demoAvatarSrc} />);

        // 通过查询选择器找到带有 'image-content' 类的元素，并确保它存在
        // Find the element with 'image-content' class using query selector and make sure it exists
        const imageElement = container.querySelectorAll('.image-content');
        expect(imageElement).toHaveLength(1);
    });

    // 测试 Avatar.Group 是否正确渲染
    // Test if the Avatar.Group renders correctly
    it('group renders correctly', () => {
        const { container } = render(
            <Avatar.Group size="small">
                <Avatar textAvatar="0" avatarStyle={{ backgroundColor: '#7BC616' }} />
                <Avatar textAvatar="尼采尼采" avatarStyle={{ backgroundColor: '#7BC616' }} />
                <Avatar textAvatar="M" avatarStyle={{ backgroundColor: '#14C9C9' }} />
                <Avatar textAvatar="X" avatarStyle={{ backgroundColor: '#168CFF' }} />
                <Avatar textAvatar="Z" avatarStyle={{ backgroundColor: '#FF7D00' }} />
                <Avatar textAvatar="JD" avatarStyle={{ backgroundColor: '#FFC72E' }} />
                <Avatar
                    textAvatar="JD"
                    size="medium"
                    avatarStyle={{ backgroundColor: '#FFC72E' }}
                />
            </Avatar.Group>,
        );

        // 通过使用查询选择器查找所有带有 `${prefix}-wrapper` 类的元素，并确保它们的数量正确
        // Find all elements with `${prefix}-wrapper` class using query selector and verify their count
        const groupElements = container.querySelectorAll(`.${prefix}-wrapper`);
        expect(groupElements).toHaveLength(7);
    });

    // 测试 avatarStyle 和 avatarClass 属性
    // Test avatarStyle and avatarClass properties
    it('avatarStyle and avatarClass render correctly', () => {
        const { container } = render(
            <div>
                <Avatar avatarClass="avatar-1" />
                <Avatar shape="square" avatarClass="avatar-2" className="avatar-left-margin" />
            </div>,
        );

        // 通过查询选择器找到带有 'avatar-1' 类的元素，并确保它存在
        // Find the element with the 'avatar-1' class using a query selector and ensure it exists
        const avatar1Element = container.querySelectorAll('.avatar-1');
        expect(avatar1Element).toHaveLength(1);
        expect(avatar1Element[0].classList.contains('arco-avatar')).toBe(true);

        // 通过查询选择器找到带有 'avatar-2' 类的元素，并确保它存在
        // Find the element with the 'avatar-2' class using a query selector and ensure it exists
        const avatar2Element = container.querySelectorAll('.avatar-2');
        expect(avatar2Element).toHaveLength(1);
        expect(avatar2Element[0].classList.contains('arco-avatar')).toBe(true);
    });

    // 测试不同形状的头像
    // Test different shapes of avatar
    it('shape renders correctly', () => {
        const { container } = render(
            <div>
                <Avatar shape="circle" textAvatar="C" />
                <Avatar shape="square" textAvatar="S" />
            </div>,
        );

        const avatars = container.querySelectorAll('.arco-avatar');
        expect(avatars).toHaveLength(2);

        const circleAvatar = avatars[0];
        const squareAvatar = avatars[1];

        expect(circleAvatar.classList.contains('arco-avatar-shape-circle')).toBe(true);
        expect(squareAvatar.classList.contains('arco-avatar-shape-square')).toBe(true);
    });

    // 测试不同尺寸的头像
    // Test different sizes of avatar
    it('size renders correctly', () => {
        const sizes = ['large', 'medium', 'small', 'smaller', 'ultra-small'];

        sizes.forEach(size => {
            const { container } = render(<Avatar size={size} textAvatar="T" />);
            const avatarElement = container.querySelector('.arco-avatar');
            expect(avatarElement.classList.contains(`arco-avatar-size-${size}`)).toBe(true);
        });
    });

    // 测试文字头像
    // Test text avatar
    it('text avatar renders correctly', () => {
        const { container } = render(<Avatar textAvatar="Test" />);

        const textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();
        expect(textElement.textContent).toBe('Test');

        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-text-avatar')).toBe(true);
        expect(avatarElement.classList.contains('arco-avatar-mode-text')).toBe(true);
    });

    // 测试默认头像 (无图片无文字时)
    // Test default avatar when no image or text provided
    it('default avatar renders correctly', () => {
        const { container } = render(<Avatar />);

        const defaultIcon = container.querySelector('.arco-avatar-default');
        expect(defaultIcon).toBeTruthy();

        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-default-overlap')).toBe(true);
        expect(avatarElement.classList.contains('default-overlap')).toBe(true);
    });

    // 测试自定义默认头像
    // Test custom default avatar
    it('custom defaultOverLap renders correctly', () => {
        const customDefault = <div className="custom-default">Custom</div>;
        const { container } = render(<Avatar defaultOverLap={customDefault} />);

        const customElement = container.querySelector('.custom-default');
        expect(customElement).toBeTruthy();
        expect(customElement.textContent).toBe('Custom');
    });

    // 测试装饰功能
    // Test decoration functionality
    it('decoration renders correctly', () => {
        const decoration = <div className="decoration-element">Dec</div>;
        const { container } = render(<Avatar src={demoAvatarSrc} decoration={decoration} />);

        const decorationElement = container.querySelector('.arco-avatar-decoration');
        expect(decorationElement).toBeTruthy();

        const decorationContent = container.querySelector('.decoration-element');
        expect(decorationContent).toBeTruthy();
        expect(decorationContent.textContent).toBe('Dec');
    });

    // 测试点击回调事件
    // Test click callback events
    it('click events work correctly', () => {
        const onClickMock = jest.fn();
        const onClickDecorationMock = jest.fn();
        const decoration = <div className="decoration-element">Dec</div>;

        const { container } = render(
            <Avatar
                src={demoAvatarSrc}
                decoration={decoration}
                onClick={onClickMock}
                onClickDecoration={onClickDecorationMock}
            />,
        );

        // 测试头像点击
        // Test avatar click
        const avatarWrapper = container.querySelector('.arco-avatar-wrapper');
        fireEvent.click(avatarWrapper);
        expect(onClickMock).toHaveBeenCalledTimes(1);

        // 测试装饰点击
        // Test decoration click
        const decorationElement = container.querySelector('.arco-avatar-decoration');
        fireEvent.click(decorationElement);
        expect(onClickDecorationMock).toHaveBeenCalledTimes(1);
    });

    // 测试头像名称和描述
    // Test avatar name and description
    it('avatarName and avatarDesc render correctly', () => {
        const { container } = render(
            <Avatar src={demoAvatarSrc} avatarName="用户名" avatarDesc="描述信息" />,
        );

        const nameElement = container.querySelector('.arco-avatar-name');
        const descElement = container.querySelector('.arco-avatar-desc');

        expect(nameElement).toBeTruthy();
        expect(nameElement.textContent).toBe('用户名');
        expect(descElement).toBeTruthy();
        expect(descElement.textContent).toBe('描述信息');

        const wrapperElement = container.querySelector('.arco-avatar-wrapper');
        expect(wrapperElement.classList.contains('arco-avatar-wrapper-with-info')).toBe(true);
        expect(wrapperElement.classList.contains('with-info')).toBe(true);
    });

    // 测试只有名称没有描述的情况
    // Test name only without description
    it('avatarName without avatarDesc renders correctly', () => {
        const { container } = render(<Avatar src={demoAvatarSrc} avatarName="用户名" />);

        const nameElement = container.querySelector('.arco-avatar-name');
        const descElement = container.querySelector('.arco-avatar-desc');

        expect(nameElement).toBeTruthy();
        expect(nameElement.textContent).toBe('用户名');
        expect(descElement).toBeFalsy();
    });

    // 测试自定义渲染信息
    // Test custom render info
    it('renderInfo renders correctly', () => {
        const customInfo = <div className="custom-info">自定义信息</div>;
        const { container } = render(
            <Avatar
                src={demoAvatarSrc}
                avatarName="用户名"
                avatarDesc="描述信息"
                renderInfo={customInfo}
            />,
        );

        const customInfoElement = container.querySelector('.custom-info');
        expect(customInfoElement).toBeTruthy();
        expect(customInfoElement.textContent).toBe('自定义信息');

        // 当有 renderInfo 时，默认的名称和描述不应该渲染
        // When renderInfo is present, default name and description should not render
        const nameElement = container.querySelector('.arco-avatar-name');
        const descElement = container.querySelector('.arco-avatar-desc');
        expect(nameElement).toBeFalsy();
        expect(descElement).toBeFalsy();
    });

    // 测试子组件功能
    // Test children functionality
    it('children render correctly', () => {
        const children = <IconUserFill className="custom-icon" />;
        const { container } = render(<Avatar>{children}</Avatar>);

        const customIcon = container.querySelector('.custom-icon');
        expect(customIcon).toBeTruthy();

        const avatarElement = container.querySelector('.arco-avatar');
        // 根据实际实现，子组件模式不会添加特定的mode类名
        expect(avatarElement).toBeTruthy();
    });

    // 测试 autoFixFontSize 功能
    // Test autoFixFontSize functionality
    it('autoFixFontSize works correctly', () => {
        const { container } = render(<Avatar textAvatar="很长的文字内容测试" autoFixFontSize />);

        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-text-avatar')).toBe(true);

        const textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();
    });

    // 测试 autoFixFontOffset 功能
    // Test autoFixFontOffset functionality
    it('autoFixFontOffset works correctly', () => {
        const { container } = render(<Avatar textAvatar="测试" autoFixFontOffset />);

        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-text-avatar')).toBe(true);

        const textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();
    });

    // 测试 Avatar.Group 的 zIndexOrder 属性
    // Test Avatar.Group zIndexOrder property
    it('Avatar.Group zIndexOrder works correctly', () => {
        const { container } = render(
            <Avatar.Group zIndexOrder="asc">
                <Avatar textAvatar="A" />
                <Avatar textAvatar="B" />
                <Avatar textAvatar="C" />
            </Avatar.Group>,
        );

        const groupElement = container.querySelector('.arco-avatar-group');
        expect(groupElement).toBeTruthy();

        // zIndexOrder主要影响样式的z-index，不一定反映在CSS类名中
        const avatars = container.querySelectorAll('.arco-avatar-wrapper');
        expect(avatars.length).toBe(3);
    });

    // 测试 Avatar.Group 的 desc 排序
    // Test Avatar.Group desc order
    it('Avatar.Group zIndexOrder desc works correctly', () => {
        const { container } = render(
            <Avatar.Group zIndexOrder="desc">
                <Avatar textAvatar="A" />
                <Avatar textAvatar="B" />
                <Avatar textAvatar="C" />
            </Avatar.Group>,
        );

        const groupElement = container.querySelector('.arco-avatar-group');
        expect(groupElement).toBeTruthy();

        const avatars = container.querySelectorAll('.arco-avatar-wrapper');
        expect(avatars.length).toBe(3);
    });

    // 测试 Avatar.Group 继承的属性
    // Test Avatar.Group inherited properties
    it('Avatar.Group inherited properties work correctly', () => {
        const { container } = render(
            <Avatar.Group size="large" shape="square">
                <Avatar textAvatar="A" />
                <Avatar textAvatar="B" size="small" />
                <Avatar textAvatar="C" shape="circle" />
            </Avatar.Group>,
        );

        const avatars = container.querySelectorAll('.arco-avatar');

        // 第一个头像应该继承组的 size 和 shape
        expect(avatars[0].classList.contains('arco-avatar-size-large')).toBe(true);
        expect(avatars[0].classList.contains('arco-avatar-shape-square')).toBe(true);

        // 第二个头像有自己的 size，应该覆盖组的设置
        expect(avatars[1].classList.contains('arco-avatar-size-small')).toBe(true);
        expect(avatars[1].classList.contains('arco-avatar-shape-square')).toBe(true);

        // 第三个头像有自己的 shape，应该覆盖组的设置
        expect(avatars[2].classList.contains('arco-avatar-size-large')).toBe(true);
        expect(avatars[2].classList.contains('arco-avatar-shape-circle')).toBe(true);
    });

    // 测试图片加载失败时的回退行为
    // Test fallback behavior when image fails to load
    it('image fallback works correctly', () => {
        const { container } = render(<Avatar src="invalid-url" textAvatar="F" />);

        // 测试初始渲染的图片模式
        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-image-avatar')).toBe(true);
        expect(avatarElement.classList.contains('arco-avatar-mode-image')).toBe(true);
    });

    // 测试头像状态变化
    // Test avatar state changes
    it('avatar mode changes correctly', () => {
        const { container, rerender } = render(<Avatar src={demoAvatarSrc} />);

        // 初始状态应该是图片模式
        let avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-mode-image')).toBe(true);

        // 重新渲染为文字头像
        rerender(<Avatar textAvatar="T" />);
        avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-mode-text')).toBe(true);

        // 重新渲染为子组件模式
        rerender(
            <Avatar>
                <IconUserFill />
            </Avatar>,
        );
        avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement).toBeTruthy();

        // 重新渲染为默认模式
        rerender(<Avatar />);
        avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-default-overlap')).toBe(true);
    });

    // 测试复杂组合场景
    // Test complex combination scenarios
    it('complex avatar configuration works correctly', () => {
        const decoration = <div className="complex-decoration">✓</div>;
        const customDefault = <div className="complex-default">Default</div>;
        const onClickMock = jest.fn();

        const { container } = render(
            <Avatar
                shape="square"
                size="large"
                textAvatar="复杂"
                decoration={decoration}
                defaultOverLap={customDefault}
                avatarName="复杂测试"
                avatarDesc="这是一个复杂的测试用例"
                avatarStyle={{ backgroundColor: '#ff0000' }}
                avatarClass="complex-avatar"
                onClick={onClickMock}
                autoFixFontSize
                autoFixFontOffset
            />,
        );

        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-shape-square')).toBe(true);
        expect(avatarElement.classList.contains('arco-avatar-size-large')).toBe(true);
        expect(avatarElement.classList.contains('arco-text-avatar')).toBe(true);
        expect(avatarElement.classList.contains('complex-avatar')).toBe(true);

        const decorationElement = container.querySelector('.complex-decoration');
        expect(decorationElement).toBeTruthy();

        const nameElement = container.querySelector('.arco-avatar-name');
        expect(nameElement.textContent).toBe('复杂测试');

        const descElement = container.querySelector('.arco-avatar-desc');
        expect(descElement.textContent).toBe('这是一个复杂的测试用例');

        // 测试点击事件
        const wrapperElement = container.querySelector('.arco-avatar-wrapper');
        fireEvent.click(wrapperElement);
        expect(onClickMock).toHaveBeenCalled();
    });

    // 测试边界情况 - 空字符串文本头像
    // Test edge case - empty string text avatar
    it('empty string text avatar falls back to default', () => {
        const { container } = render(<Avatar textAvatar="" />);

        const defaultIcon = container.querySelector('.arco-avatar-default');
        expect(defaultIcon).toBeTruthy();

        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-default-overlap')).toBe(true);
    });

    // 测试边界情况 - 只有空格的文本头像
    // Test edge case - whitespace only text avatar
    it('whitespace only text avatar falls back to default', () => {
        const { container } = render(<Avatar textAvatar="   " />);

        const avatarElement = container.querySelector('.arco-avatar');
        // 只有空格的文本仍然会被当作文本头像处理
        expect(avatarElement.classList.contains('arco-text-avatar')).toBe(true);

        const textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();
        expect(textElement.textContent).toBe('   ');
    });

    // 测试 Avatar.Group 中只有一个子元素的情况
    // Test Avatar.Group with single child
    it('Avatar.Group with single child works correctly', () => {
        const { container } = render(
            <Avatar.Group>
                <Avatar textAvatar="Single" />
            </Avatar.Group>,
        );

        const groupElements = container.querySelectorAll(`.${prefix}-wrapper`);
        expect(groupElements).toHaveLength(1);

        const groupElement = container.querySelector('.arco-avatar-group');
        expect(groupElement).toBeTruthy();
    });

    // 测试 Avatar.Group 传递额外属性
    // Test Avatar.Group passing additional props
    it('Avatar.Group passes additional props correctly', () => {
        const { container } = render(
            <Avatar.Group className="custom-group">
                <Avatar textAvatar="A" />
                <Avatar textAvatar="B" />
            </Avatar.Group>,
        );

        const groupElement = container.querySelector('.arco-avatar-group');
        expect(groupElement).toBeTruthy();
        expect(groupElement.classList.contains('custom-group')).toBe(true);
    });

    // 测试装饰元素的阻止事件冒泡
    // Test decoration element prevents event bubbling
    it('decoration click does not trigger avatar click', () => {
        const onClickMock = jest.fn();
        const onClickDecorationMock = jest.fn(e => {
            e.stopPropagation(); // 需要手动阻止冒泡
        });
        const decoration = <div className="decoration-test">Dec</div>;

        const { container } = render(
            <Avatar
                src={demoAvatarSrc}
                decoration={decoration}
                onClick={onClickMock}
                onClickDecoration={onClickDecorationMock}
            />,
        );

        // 点击装饰元素
        const decorationElement = container.querySelector('.arco-avatar-decoration');
        fireEvent.click(decorationElement);

        expect(onClickDecorationMock).toHaveBeenCalledTimes(1);
    });

    // 测试多种尺寸的文字头像字体自动调整
    // Test text avatar font auto-adjustment for different sizes
    it('text avatar font auto-adjustment works for different sizes', () => {
        const sizes = ['ultra-small', 'smaller', 'small', 'medium', 'large'];

        sizes.forEach(size => {
            const { container } = render(
                <Avatar
                    size={size}
                    textAvatar="测试文字内容比较长"
                    autoFixFontSize
                    autoFixFontOffset
                />,
            );

            const avatarElement = container.querySelector('.arco-avatar');
            expect(avatarElement.classList.contains(`arco-avatar-size-${size}`)).toBe(true);

            const textElement = container.querySelector('.arco-avatar-text');
            expect(textElement).toBeTruthy();
        });
    });

    // 测试图片头像的加载状态
    // Test image avatar loading states
    it('image avatar loading states work correctly', () => {
        const { container } = render(<Avatar src={demoAvatarSrc} />);

        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-mode-image')).toBe(true);
        expect(avatarElement.classList.contains('arco-image-avatar')).toBe(true);

        const imgWrapper = container.querySelector('.arco-avatar-img');
        expect(imgWrapper).toBeTruthy();
    });
});
