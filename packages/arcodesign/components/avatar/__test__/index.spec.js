import React from 'react';
import { mount } from 'enzyme';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import Avatar from '..';
import { defaultContext } from '../../context-provider';

const demoAvatarSrc = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg';
const prefix = `${defaultContext.prefixCls}-avatar`;

demoTest('avatar');

mountTest(Avatar, 'Avatar', {
    src: demoAvatarSrc,
    size: 'large',
});

describe('Avatar', () => {

    it('src renders correctly', () => {
        const wrapper = mount(
        <Avatar
            src={demoAvatarSrc}/>,
        );
        expect(wrapper.find('.image-content').length).toBe(1);
    });

    it('group renders correctly', () => {
        const wrapper = mount(
            <Avatar.Group size="small">
                <Avatar textAvatar="尼采尼采尼采尼采尼采" avatarStyle={{backgroundColor: '#7BC616'}} />
                <Avatar textAvatar="M" avatarStyle={{backgroundColor: '#14C9C9'}} />
                <Avatar textAvatar="X" avatarStyle={{backgroundColor: '#168CFF'}} />
                <Avatar textAvatar="Z" avatarStyle={{backgroundColor: '#FF7D00'}} />
                <Avatar textAvatar="JD" avatarStyle={{backgroundColor: '#FFC72E'}} />
                <Avatar textAvatar="JD" size='medium' avatarStyle={{backgroundColor: '#FFC72E'}} />
            </Avatar.Group>,
        );
        expect(wrapper.find(`.${prefix}-wrapper`).length).toBe(6);
    });
})
