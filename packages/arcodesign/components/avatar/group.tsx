import React, {
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    useContext,
    ReactElement,
} from 'react';
import { cls } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import { AvatarGroupContextParams, AvatarGroupProps, AvatarGroupRef } from './type';

export const AvatarGroupContext = React.createContext<AvatarGroupContextParams>({
    isGroup: false,
    shape: 'circle',
    size: 'small',
});

/**
 * 头像叠层
 * @en Avatar group
 */
export const Group = forwardRef((props: AvatarGroupProps, ref: Ref<AvatarGroupRef | null>) => {
    const {
        style = {},
        className = '',
        shape = 'circle',
        size = 'medium',
        zIndexOrder = 'desc',
        children,
    } = props;
    const { prefixCls } = useContext(GlobalContext);
    const childrenArr = React.Children.toArray(children);
    const { length } = childrenArr;

    const domRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <div
            ref={domRef}
            style={style}
            className={cls(
                className,
                `${prefixCls}-avatar-group`,
                `${prefixCls}-avatar-group-size-${size}`,
                `group-${size}`,
            )}
        >
            <AvatarGroupContext.Provider value={{ isGroup: true, shape, size }}>
                {childrenArr.map((child, i) => {
                    const childProps = ((child as ReactElement) || {}).props as any;
                    const avatarStyle = {
                        zIndex: zIndexOrder === 'asc' ? i + 1 : length - i,
                        ...childProps.style,
                    };
                    return React.cloneElement(child as ReactElement, {
                        ...childProps,
                        style: avatarStyle,
                    });
                })}
            </AvatarGroupContext.Provider>
        </div>
    );
});

export default Group;
