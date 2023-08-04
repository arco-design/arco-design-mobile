import React from 'react';
import { ImageProps } from '../image';
import { BaseProps, BaseRef } from '../_helpers';

export interface AvatarProps<T extends ImageProps = ImageProps> extends BaseProps {
    /**
     * 形状
     * @en Shapre
     * @default "circle"
     */
    shape?: 'circle' | 'square';
    /**
     * 尺寸
     * @en Size
     * @default "small"
     */
    size?: 'medium' | 'large' | 'small' | 'smaller' | 'ultra-small';
    /**
     * 图片头像的资源地址
     * @en resource of avatar picture
     */
    src?: string;
    /**
     * 图片头像组件参数，透传给Image组件
     * @en Image avatar component props, transparently passed to the Image component
     */
    imageProps?: Partial<T>;
    /**
     * 图片头像上的装饰
     * @en the decoration for image avatar
     * @default null
     */
    decoration?: React.ReactNode;
    /**
     * 文字头像，中文建议取两个字，英文建议在三个字以下
     * @en Text Avatar, two characters in Chinese, and three characters or less in English are recommended.
     * @default ""
     */
    textAvatar?: string;
    /**
     * 头像元素的自定义样式
     * @en Custom style for avatar element
     * @default {}
     */
    avatarStyle?: React.CSSProperties;
    /**
     * 是否自动根据头像尺寸调整字体大小
     * @en Whether to automatically adjust the font size according to the avatar size
     * @default true
     */
    autoFixFontSize?: boolean;
    /**
     * 自动调整文字头像大小时，文字距离头像容器左右的安全距离
     * @en When automatically adjusting the size of the text head image, the safe distance between the text and the left and right of the avatar container
     * @default 2
     */
    autoFixFontOffset?: number;
    /**
     * 头像旁的用户名信息
     * @en Username information next to the avatar
     * @default ""
     */
    avatarName?: string;
    /**
     * 头像旁的辅助信息，需要和用户名一起出现
     * @en Auxiliary information next to the avatar, which needs to appear together with the username
     * @default ""
     */
    avatarDesc?: string;
    /**
     * 自定义头像描述信息
     * @en Custom avatar description information
     * @default null
     */
    renderInfo?: React.ReactNode;
    /**
     * 头像组件为空时默认的状态
     * @en The default state when the avatar component is empty
     * @default 用户图标
     * @default_en User Icon
     */
    defaultOverLap?: React.ReactNode;
    /**
     * 点击头像的回调事件
     * @en callback event when clicking the avatar
     * @default () => {}
     */
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 点击头像上的装饰
     * @en callback when clicking on the decoration on the avatar
     * @default () => {}
     */
    onClickDecoration?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface AvatarRef extends BaseRef {}

export interface AvatarGroupContextParams {
    /**
     * 是否为头像组
     * @en Whether it is an avatar group
     * @default false
     */
    isGroup: boolean;
    /**
     * 形状，优先级低于Avatar组件本身
     * @en Shape, which has lower priority than the avatar component
     * @default "circle"
     */
    shape?: 'circle' | 'square';
    /**
     * 尺寸，优先级低于Avatar组件本身
     * @en Size,  which has lower priority than the avatar component
     * @default "medium"
     */
    size?: 'medium' | 'large' | 'small' | 'smaller' | 'ultra-small';
    /**
     * 头像组叠层层级顺序，z-index值大小，desc - 降序，asc - 升序
     * @en Avatar group stacking level order, that is, z-index value, desc - descending order, asc - ascending order
     * @default "desc"
     */
    zIndexOrder?: 'desc' | 'asc';
}

export interface AvatarGroupProps extends AvatarGroupContextParams, BaseProps {}

export interface AvatarGroupRef extends BaseRef {}
