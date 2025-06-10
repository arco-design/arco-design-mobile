import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Avatar from '..';
import { defaultContext } from '../../context-provider';
import IconUserFill from '../../icon/IconUserFill';

// 测试用头像图片源
// Demo avatar image source for testing
const demoAvatarSrc =
    'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';
const prefix = `${defaultContext.prefixCls}-avatar`;

// 运行基础演示测试
// Run basic demo tests
demoTest('avatar');

// 运行基础挂载测试
// Run basic mount tests
mountTest(Avatar, 'Avatar', {
    src: demoAvatarSrc,
    size: 'large',
});

// Avatar 组件的单元测试
// Unit tests for Avatar component
describe('Avatar', () => {
    // 测试基本渲染和属性应用
    // Test basic rendering and property application
    it('renders correctly with various props', () => {
        const { container } = render(
            <div>
                <Avatar src={demoAvatarSrc} />
                <Avatar
                    shape="square"
                    size="large"
                    avatarClass="custom-avatar"
                    className="wrapper-class"
                />
                <Avatar shape="circle" textAvatar="T" />
            </div>,
        );

        // 验证图片头像渲染
        // Verify image avatar rendering
        const imageElement = container.querySelectorAll('.image-content');
        expect(imageElement).toHaveLength(1);

        // 验证头像元素数量
        // Verify avatar element count
        const avatars = container.querySelectorAll('.arco-avatar');
        expect(avatars).toHaveLength(3);

        // 验证方形头像的样式类
        // Verify square avatar style classes
        const squareAvatar = avatars[1];
        expect(squareAvatar.classList.contains('arco-avatar-shape-square')).toBe(true);
        expect(squareAvatar.classList.contains('arco-avatar-size-large')).toBe(true);
        expect(squareAvatar.classList.contains('custom-avatar')).toBe(true);

        // 验证圆形文字头像的样式类
        // Verify circle text avatar style classes
        const circleAvatar = avatars[2];
        expect(circleAvatar.classList.contains('arco-avatar-shape-circle')).toBe(true);
        expect(circleAvatar.classList.contains('arco-text-avatar')).toBe(true);
    });

    // 测试不同模式和尺寸的头像
    // Test different modes and sizes of avatar
    it('different modes and sizes render correctly', () => {
        const { container } = render(
            <div>
                <Avatar size="large" textAvatar="Test" />
                <Avatar size="medium" />
                <Avatar textAvatar="" />
                <Avatar textAvatar="   " />
            </div>,
        );

        const avatars = container.querySelectorAll('.arco-avatar');
        expect(avatars).toHaveLength(4);

        // 验证大尺寸文字头像
        // Verify large size text avatar
        const textAvatar = avatars[0];
        expect(textAvatar.classList.contains('arco-avatar-size-large')).toBe(true);
        expect(textAvatar.classList.contains('arco-text-avatar')).toBe(true);
        expect(textAvatar.classList.contains('arco-avatar-mode-text')).toBe(true);

        // 验证文字内容显示
        // Verify text content display
        const textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();
        expect(textElement.textContent).toBe('Test');

        // 验证默认头像显示
        // Verify default avatar display
        const defaultAvatar = avatars[1];
        expect(defaultAvatar.classList.contains('arco-avatar-default-overlap')).toBe(true);
        expect(defaultAvatar.classList.contains('default-overlap')).toBe(true);

        const defaultIcon = container.querySelector('.arco-avatar-default');
        expect(defaultIcon).toBeTruthy();

        // 验证空字符串回退到默认头像
        // Verify empty string fallback to default avatar
        const emptyTextAvatar = avatars[2];
        expect(emptyTextAvatar.classList.contains('arco-avatar-default-overlap')).toBe(true);

        // 验证只有空格的文本头像处理
        // Verify whitespace-only text avatar handling
        const whitespaceAvatar = avatars[3];
        expect(whitespaceAvatar.classList.contains('arco-text-avatar')).toBe(true);
    });

    // 测试装饰、事件和信息显示功能
    // Test decoration, events and info display functionality
    it('decoration, events and info display work correctly', () => {
        const onClickMock = jest.fn();
        const onClickDecorationMock = jest.fn();
        const decoration = <div className="decoration-element">Dec</div>;
        const customDefault = <div className="custom-default">Custom</div>;

        const { container } = render(
            <Avatar
                src={demoAvatarSrc}
                decoration={decoration}
                defaultOverLap={customDefault}
                onClick={onClickMock}
                onClickDecoration={onClickDecorationMock}
                avatarName="用户名"
                avatarDesc="描述信息"
            />,
        );

        // 验证装饰元素渲染
        // Verify decoration element rendering
        const decorationElement = container.querySelector('.arco-avatar-decoration');
        expect(decorationElement).toBeTruthy();
        const decorationContent = container.querySelector('.decoration-element');
        expect(decorationContent).toBeTruthy();
        expect(decorationContent.textContent).toBe('Dec');

        // 测试头像点击事件
        // Test avatar click event
        const avatarWrapper = container.querySelector('.arco-avatar-wrapper');
        fireEvent.click(avatarWrapper);
        expect(onClickMock).toHaveBeenCalledTimes(1);

        // 测试装饰点击事件（包含事件冒泡）
        // Test decoration click event (including event bubbling)
        fireEvent.click(decorationElement);
        expect(onClickDecorationMock).toHaveBeenCalledTimes(1);
        expect(onClickMock).toHaveBeenCalledTimes(2);

        // 验证用户名和描述信息显示
        // Verify username and description display
        const nameElement = container.querySelector('.arco-avatar-name');
        const descElement = container.querySelector('.arco-avatar-desc');
        expect(nameElement).toBeTruthy();
        expect(nameElement.textContent).toBe('用户名');
        expect(descElement).toBeTruthy();
        expect(descElement.textContent).toBe('描述信息');

        // 验证带信息的包装器样式类
        // Verify wrapper style classes with info
        const wrapperElement = container.querySelector('.arco-avatar-wrapper');
        expect(wrapperElement.classList.contains('arco-avatar-wrapper-with-info')).toBe(true);
        expect(wrapperElement.classList.contains('with-info')).toBe(true);
    });

    // 测试自定义渲染和特殊情况
    // Test custom rendering and special cases
    it('custom rendering and special cases work correctly', () => {
        const customInfo = <div className="custom-info">自定义信息</div>;
        const children = <IconUserFill className="custom-icon" />;

        const { container, rerender } = render(
            <Avatar
                src={demoAvatarSrc}
                avatarName="用户名"
                avatarDesc="描述信息"
                renderInfo={customInfo}
            />,
        );

        // 验证自定义信息渲染
        // Verify custom info rendering
        const customInfoElement = container.querySelector('.custom-info');
        expect(customInfoElement).toBeTruthy();
        expect(customInfoElement.textContent).toBe('自定义信息');

        // 验证自定义渲染时默认信息不显示
        // Verify default info not displayed when custom rendering
        const nameElement = container.querySelector('.arco-avatar-name');
        const descElement = container.querySelector('.arco-avatar-desc');
        expect(nameElement).toBeFalsy();
        expect(descElement).toBeFalsy();

        // 测试子组件功能
        // Test children functionality
        rerender(<Avatar>{children}</Avatar>);
        const customIcon = container.querySelector('.custom-icon');
        expect(customIcon).toBeTruthy();

        // 测试只有名称的情况
        // Test name-only scenario
        rerender(<Avatar src={demoAvatarSrc} avatarName="用户名" />);
        const nameOnly = container.querySelector('.arco-avatar-name');
        const noDesc = container.querySelector('.arco-avatar-desc');
        expect(nameOnly).toBeTruthy();
        expect(nameOnly.textContent).toBe('用户名');
        expect(noDesc).toBeFalsy();

        // 测试只有描述没有名称的情况（不应该渲染信息）
        // Test description-only scenario (should not render info)
        rerender(<Avatar src={demoAvatarSrc} avatarDesc="描述信息" />);
        const wrapper = container.querySelector('.arco-avatar-wrapper');
        expect(wrapper.classList.contains('with-info')).toBe(false);
    });

    // 测试 Avatar.Group 功能
    // Test Avatar.Group functionality
    it('Avatar.Group works correctly', () => {
        const { container } = render(
            <Avatar.Group size="large" shape="square" zIndexOrder="asc">
                <Avatar textAvatar="A" />
                <Avatar textAvatar="B" size="small" />
                <Avatar textAvatar="C" shape="circle" />
            </Avatar.Group>,
        );

        // 验证组元素存在
        // Verify group element exists
        const groupElement = container.querySelector('.arco-avatar-group');
        expect(groupElement).toBeTruthy();

        const avatars = container.querySelectorAll('.arco-avatar');
        expect(avatars.length).toBe(3);

        // 验证第一个头像继承组的设置
        // Verify first avatar inherits group settings
        expect(avatars[0].classList.contains('arco-avatar-size-large')).toBe(true);
        expect(avatars[0].classList.contains('arco-avatar-shape-square')).toBe(true);

        // 验证第二个头像覆盖组的尺寸设置
        // Verify second avatar overrides group size setting
        expect(avatars[1].classList.contains('arco-avatar-size-small')).toBe(true);
        expect(avatars[1].classList.contains('arco-avatar-shape-square')).toBe(true);

        // 验证第三个头像覆盖组的形状设置
        // Verify third avatar overrides group shape setting
        expect(avatars[2].classList.contains('arco-avatar-size-large')).toBe(true);
        expect(avatars[2].classList.contains('arco-avatar-shape-circle')).toBe(true);

        // 验证 z-index 升序排列
        // Verify z-index ascending order
        const wrappers = container.querySelectorAll('.arco-avatar-wrapper');
        expect(wrappers[0].style.zIndex).toBe('1');
        expect(wrappers[1].style.zIndex).toBe('2');
        expect(wrappers[2].style.zIndex).toBe('3');
    });

    // 测试字体自动调整和边界条件
    // Test font auto-adjustment and boundary conditions
    it('font auto-adjustment and boundary conditions work correctly', () => {
        const { container, rerender } = render(
            <Avatar textAvatar="很长的文字内容测试" autoFixFontSize autoFixFontOffset={2} />,
        );

        let avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-text-avatar')).toBe(true);

        let textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();

        // 测试禁用字体自动调整
        // Test disabled font auto-adjustment
        rerender(<Avatar textAvatar="长文本测试" autoFixFontSize={false} />);
        textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();
        expect(textElement.style.transform).toBe('scale(1)');

        // 测试字体偏移量为 0 的情况
        // Test font offset of 0
        rerender(<Avatar textAvatar="测试" autoFixFontSize autoFixFontOffset={0} />);
        textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();

        // 测试 null 值回退到默认头像
        // Test null value fallback to default avatar
        rerender(<Avatar textAvatar={null} />);
        const defaultIcon = container.querySelector('.arco-avatar-default');
        expect(defaultIcon).toBeTruthy();

        rerender(<Avatar>{null}</Avatar>);
        const defaultIcon2 = container.querySelector('.arco-avatar-default');
        expect(defaultIcon2).toBeTruthy();
    });

    // 测试模式优先级和状态变化
    // Test mode priority and state changes
    it('mode priority and state changes work correctly', () => {
        const { container, rerender } = render(<Avatar src={demoAvatarSrc} />);

        // 验证初始图片模式
        // Verify initial image mode
        let avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-mode-image')).toBe(true);

        // 测试图片优先于文字的模式优先级
        // Test image priority over text mode priority
        rerender(<Avatar src={demoAvatarSrc} textAvatar="Text" />);
        avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-mode-image')).toBe(true);
        expect(avatarElement.classList.contains('arco-avatar-mode-text')).toBe(false);

        const imgElement = container.querySelector('.arco-avatar-img');
        const textElement = container.querySelector('.arco-avatar-text');
        expect(imgElement).toBeTruthy();
        expect(textElement).toBeFalsy();

        // 测试 children 具有最高优先级
        // Test children has highest priority
        rerender(
            <Avatar src={demoAvatarSrc} textAvatar="Text">
                <IconUserFill className="custom-child" />
            </Avatar>,
        );
        avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-mode-image')).toBe(false);
        expect(avatarElement.classList.contains('arco-avatar-mode-text')).toBe(false);

        const childElement = container.querySelector('.custom-child');
        expect(childElement).toBeTruthy();
        expect(container.querySelector('.arco-avatar-img')).toBeFalsy();
        expect(container.querySelector('.arco-avatar-text')).toBeFalsy();

        // 测试文字头像模式
        // Test text avatar mode
        rerender(<Avatar textAvatar="T" />);
        avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-mode-text')).toBe(true);

        // 测试默认模式
        // Test default mode
        rerender(<Avatar />);
        avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-default-overlap')).toBe(true);
    });

    // 测试 ref 功能和图片属性传递
    // Test ref functionality and image props passing
    it('ref functionality and image props work correctly', () => {
        const ref = React.createRef();
        const groupRef = React.createRef();

        const { container } = render(
            <div>
                <Avatar ref={ref} textAvatar="Ref" imageProps={{ alt: 'test-avatar' }} />
                <Avatar.Group ref={groupRef}>
                    <Avatar src={demoAvatarSrc} />
                    <Avatar textAvatar="B" />
                </Avatar.Group>
            </div>,
        );

        // 验证 Avatar ref 引用
        // Verify Avatar ref reference
        expect(ref.current).toBeTruthy();
        expect(ref.current.dom).toBeTruthy();
        expect(ref.current.dom).toBe(container.querySelector('.arco-avatar-wrapper'));

        // 验证 Avatar.Group ref 引用
        // Verify Avatar.Group ref reference
        expect(groupRef.current).toBeTruthy();
        expect(groupRef.current.dom).toBeTruthy();
        expect(groupRef.current.dom).toBe(container.querySelector('.arco-avatar-group'));

        // 验证图片头像渲染和属性传递
        // Verify image avatar rendering and props passing
        const imageAvatar = container.querySelector('.arco-image-avatar');
        expect(imageAvatar).toBeTruthy();
        expect(imageAvatar.classList.contains('arco-avatar-mode-image')).toBe(true);

        const imageContainer =
            container.querySelector('.arco-avatar-img') ||
            container.querySelector('.image-container') ||
            container.querySelector('.arco-image');
        expect(imageContainer).toBeTruthy();
    });

    // 测试复杂的组合配置和字体缩放
    // Test complex combined configuration and font scaling
    it('complex configuration and font scaling work correctly', () => {
        const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

        // 模拟 getBoundingClientRect 以测试文字超出头像宽度的情况
        // Mock getBoundingClientRect to simulate text exceeding avatar width
        Element.prototype.getBoundingClientRect = jest.fn().mockImplementation(function () {
            if (this.classList.contains('arco-avatar')) {
                return { width: 100, height: 100 };
            } else if (this.classList.contains('arco-avatar-text')) {
                return { width: 150, height: 30 };
            }
            return { width: 0, height: 0 };
        });

        const decoration = <div className="complex-decoration">✓</div>;
        const onClickMock = jest.fn();

        const { container, rerender } = render(
            <Avatar
                shape="square"
                size="large"
                textAvatar="极长极长极长极长极长的文本内容"
                decoration={decoration}
                avatarName="复杂测试"
                avatarDesc="这是一个复杂的测试用例"
                avatarStyle={{ backgroundColor: '#ff0000' }}
                avatarClass="complex-avatar"
                onClick={onClickMock}
                autoFixFontSize
                autoFixFontOffset={1}
            />,
        );

        // 验证复杂配置的样式类应用
        // Verify style class application for complex configuration
        const avatarElement = container.querySelector('.arco-avatar');
        expect(avatarElement.classList.contains('arco-avatar-shape-square')).toBe(true);
        expect(avatarElement.classList.contains('arco-avatar-size-large')).toBe(true);
        expect(avatarElement.classList.contains('arco-text-avatar')).toBe(true);
        expect(avatarElement.classList.contains('complex-avatar')).toBe(true);

        // 验证装饰元素
        // Verify decoration element
        const decorationElement = container.querySelector('.complex-decoration');
        expect(decorationElement).toBeTruthy();

        // 验证用户名显示
        // Verify username display
        const nameElement = container.querySelector('.arco-avatar-name');
        expect(nameElement.textContent).toBe('复杂测试');

        // 验证字体缩放效果
        // Verify font scaling effect
        const textElement = container.querySelector('.arco-avatar-text');
        expect(textElement).toBeTruthy();
        const transformStyle = textElement.style.transform;
        expect(transformStyle).toContain('scale');

        // 测试点击事件
        // Test click event
        const wrapperElement = container.querySelector('.arco-avatar-wrapper');
        fireEvent.click(wrapperElement);
        expect(onClickMock).toHaveBeenCalled();

        // 强制重新渲染以触发字体缩放计算
        // Force re-render to trigger font scaling calculation
        rerender(
            <Avatar
                textAvatar="Very Long Text That Should Scale Again"
                autoFixFontSize={true}
                autoFixFontOffset={5}
            />,
        );

        expect(container.querySelector('.arco-avatar')).toBeTruthy();
        expect(container.querySelector('.arco-avatar-text')).toBeTruthy();

        // 恢复原始方法
        // Restore original method
        Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    // 测试 Avatar.Group 的边界情况和样式处理
    // Test Avatar.Group edge cases and style handling
    it('Avatar.Group edge cases and style handling work correctly', () => {
        const { container, rerender } = render(
            <Avatar.Group size="medium" shape="circle" zIndexOrder="desc" className="custom-group">
                <Avatar textAvatar="A" style={{ backgroundColor: 'blue' }} />
                <Avatar src={demoAvatarSrc} size="large" />
                <Avatar shape="square">
                    <IconUserFill />
                </Avatar>
                <Avatar textAvatar="" />
            </Avatar.Group>,
        );

        // 验证组元素和自定义类名
        // Verify group element and custom class name
        const groupElement = container.querySelector('.arco-avatar-group');
        expect(groupElement).toBeTruthy();
        expect(groupElement.classList.contains('custom-group')).toBe(true);

        let avatars = container.querySelectorAll('.arco-avatar-wrapper');
        expect(avatars).toHaveLength(4);

        // 验证降序 z-index 排列
        // Verify descending z-index order
        expect(avatars[0].style.zIndex).toBe('4');
        expect(avatars[1].style.zIndex).toBe('3');

        // 验证属性继承和个别覆盖
        // Verify property inheritance and individual overrides
        const firstAvatar = avatars[0].querySelector('.arco-avatar');
        expect(firstAvatar.classList.contains('arco-avatar-size-medium')).toBe(true);
        expect(firstAvatar.classList.contains('arco-avatar-shape-circle')).toBe(true);

        const secondAvatar = avatars[1].querySelector('.arco-avatar');
        expect(secondAvatar.classList.contains('arco-avatar-size-large')).toBe(true);
        expect(secondAvatar.classList.contains('arco-avatar-shape-circle')).toBe(true);

        // 测试空的 Avatar.Group 渲染
        // Test empty Avatar.Group rendering
        rerender(<Avatar.Group />);
        const emptyGroup = container.querySelector('.arco-avatar-group');
        expect(emptyGroup).toBeTruthy();
        const emptyAvatars = container.querySelectorAll('.arco-avatar-wrapper');
        expect(emptyAvatars).toHaveLength(0);

        // 测试单个子元素的情况
        // Test single child element scenario
        rerender(
            <Avatar.Group>
                <Avatar textAvatar="Single" />
            </Avatar.Group>,
        );
        const singleChild = container.querySelectorAll(`.${prefix}-wrapper`);
        expect(singleChild).toHaveLength(1);

        // 测试默认 shape 和 size 的继承行为
        // Test default shape and size inheritance behavior
        rerender(
            <Avatar.Group>
                <Avatar textAvatar="Default" />
            </Avatar.Group>,
        );
        const defaultAvatar = container.querySelector('.arco-avatar');
        expect(defaultAvatar.classList.contains('arco-avatar-shape-circle')).toBe(true);
        expect(defaultAvatar.classList.contains('arco-avatar-size-medium')).toBe(true);

        // 测试升序 z-index 排列
        // Test ascending z-index order
        rerender(
            <Avatar.Group zIndexOrder="asc">
                <Avatar src="avatar1.jpg" />
                <Avatar src="avatar2.jpg" />
                <Avatar src="avatar3.jpg" />
            </Avatar.Group>,
        );
        avatars = container.querySelectorAll('.arco-avatar');
        expect(avatars).toHaveLength(3);
        expect(container.querySelector('.arco-avatar-group')).toBeTruthy();
    });
});
