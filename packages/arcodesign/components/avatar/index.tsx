import React, {
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    useContext,
    useState,
    useEffect,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { BaseImage, ImageProps, ImageRef } from '../image';
import { AvatarProps, AvatarRef } from './type';
import IconUserFill from '../icon/IconUserFill';
import { GlobalContext } from '../context-provider';
import Group, { AvatarGroupContext } from './group';

export * from './type';

export function componentGenerator<
    P extends ImageProps = ImageProps,
    R extends ImageRef = ImageRef,
>(Comp: React.ForwardRefExoticComponent<P & React.RefAttributes<R>>) {
    return forwardRef((props: AvatarProps<P>, ref: Ref<AvatarRef>) => {
        const { prefixCls } = useContext(GlobalContext);
        const { shape: groupShape, size: groupSize, isGroup } = useContext(AvatarGroupContext);
        const {
            shape = props.shape || (isGroup ? groupShape : 'circle'),
            size = props.size || (isGroup ? groupSize : 'small'),
            src,
            decoration = null,
            textAvatar = '',
            avatarStyle = {},
            autoFixFontSize = true,
            autoFixFontOffset = 2,
            avatarName = '',
            avatarDesc = '',
            children = null,
            renderInfo = null,
            className = '',
            style = {},
            imageProps = {},
            defaultOverLap,
            onClickDecoration,
            onClick,
        } = props;
        const domRef = useRef<HTMLDivElement | null>(null);
        const avatarRef = useRef<HTMLDivElement | null>(null);
        const avatarTextRef = useRef<HTMLDivElement | null>(null);
        const [textScale, setTextScale] = useState<number>(1);

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
        }));
        // 图片头像
        // @en Picture avatar
        const isImageAvatar = !children && src !== void 0;
        // 文字头像
        // @en Text avatar
        const isTextAvatar = !children && !isImageAvatar && textAvatar;
        // 使用默认头像
        // @en Whether to use default avatar
        const useDefaultAvatar = !children && !isImageAvatar && !isTextAvatar;

        useEffect(() => {
            getComputedTextScale();
        }, [textAvatar]);

        /**
         * 根据字体元素宽度和头像大小动态调整缩放比例
         * @en Dynamically adjust scaling based on font element width and avatar size
         */
        function getComputedTextScale() {
            if (!isTextAvatar || !autoFixFontSize || !avatarRef || !avatarTextRef) return;
            const { width: avatarWidth = 0 } = avatarRef.current?.getBoundingClientRect() || {};
            const { width: textWidth = 0 } = avatarTextRef.current?.getBoundingClientRect() || {};
            if (avatarWidth === 0 || textWidth === 0) return;
            // 文本节点宽度大于头像元素时进行动态缩放
            // @en Dynamic scaling when the width of the text node is larger than the avatar element
            const maxWidth = avatarWidth - 2 * autoFixFontOffset;
            if (textWidth > maxWidth) {
                const scale = maxWidth / textWidth;
                setTextScale(textScale * scale);
            }
        }

        return (
            <div
                ref={domRef}
                style={style}
                className={cls(
                    `${prefixCls}-avatar-wrapper`,
                    className,
                    size,
                    shape,
                    `${prefixCls}-avatar-wrapper-shape-${shape}`,
                    {
                        [`${prefixCls}-avatar-wrapper-with-info ${prefixCls}-avatar-wrapper-with-info-size-${size} with-info`]:
                            Boolean(avatarName),
                    },
                )}
                onClick={onClick}
            >
                <div
                    className={cls(
                        `${prefixCls}-avatar`,
                        `${prefixCls}-avatar-size-${size}`,
                        size,
                        `${prefixCls}-avatar-shape-${shape}`,
                        shape,
                        {
                            [`${prefixCls}-text-avatar ${prefixCls}-avatar-mode-text`]:
                                isTextAvatar,
                            [`${prefixCls}-image-avatar ${prefixCls}-avatar-mode-image`]:
                                isImageAvatar,
                            [`${prefixCls}-avatar-default-overlap default-overlap`]:
                                useDefaultAvatar,
                        },
                    )}
                    style={avatarStyle}
                    ref={avatarRef}
                >
                    {children}
                    {useDefaultAvatar &&
                        (defaultOverLap === void 0 ? (
                            <IconUserFill
                                className={`${prefixCls}-avatar-default ${prefixCls}-avatar-default-icon-size-${size}`}
                            />
                        ) : (
                            defaultOverLap
                        ))}
                    {isImageAvatar && src && (
                        <Comp
                            {...({
                                className: `${prefixCls}-avatar-img`,
                                src,
                            } as P)}
                            {...imageProps}
                        />
                    )}
                    {isTextAvatar && (
                        <span
                            className={`${prefixCls}-avatar-text ${prefixCls}-avatar-text-size-${size}`}
                            ref={avatarTextRef}
                            style={{
                                transform: `scale(${textScale})`,
                            }}
                        >
                            {textAvatar}
                        </span>
                    )}
                    {decoration && (
                        <div
                            className={`${prefixCls}-avatar-decoration`}
                            onClick={onClickDecoration}
                        >
                            {decoration}
                        </div>
                    )}
                </div>
                {renderInfo}
                {!renderInfo && avatarName && (
                    <div className={cls(`${prefixCls}-avatar-info`)}>
                        <div
                            className={`${prefixCls}-avatar-name ${prefixCls}-avatar-name-size-${size}`}
                        >
                            {avatarName}
                        </div>
                        {avatarDesc && (
                            <div
                                className={`${prefixCls}-avatar-desc ${prefixCls}-avatar-desc-size-${size}`}
                            >
                                {avatarDesc}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    });
}

const Avatar = componentGenerator(BaseImage);

/**
 * 头像展示组件，支持圆形和方形两种形状，支持图片文字头像，支持五种尺寸。
 * @en Avatar component supports two shapes of circle and square, supports pictures or text avatars, with five sizes.
 * @type 信息展示
 * @type_en Data Display
 * @name 头像
 * @name_en Avatar
 */
export default componentWrapper(Avatar, {
    Group,
});
