import React from 'react';
import { render } from '@testing-library/react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Avatar from '..';
import { defaultContext } from '../../context-provider';

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
});
