import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useCallback,
    useState,
    useEffect,
    useMemo,
} from 'react';
import { cls, componentWrapper, nextTick } from '@arco-design/mobile-utils';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import { OpenBaseProps } from '../masking';
import Popup, { DirectionType, PopupProps, PopupRef } from '../popup';
import { open } from './methods';
import { getStyleWithVendor, useRefState } from '../_helpers';

export interface PopupSwiperProps extends PopupProps {
    /**
     * 滑动超过内容的百分之多少时关闭弹窗，范围为[0, 1]，如果该属性和`distanceToClose`属性均设置，则实际计算结果更大的生效
     * @en Close the popup when sliding more than the percentage of the content, the range is [0, 1]. If both this property and the `distanceToClose` property are set, the larger the actual calculation result takes effect
     * @default 0.3
     */
    percentToClose?: number;
    /**
     * 滑动超过多少px时关闭弹窗，如果该属性和`percentToClose`属性均设置，则实际计算结果更大的生效
     * @en Close the popup when sliding more than px, if this property and the `percentToClose` property are both set, the larger the actual calculation result takes effect.
     * @default 10
     */
    distanceToClose?: number;
    /**
     * 手指从按下到抬起之间的滑动速度超过多少时关闭弹窗(单位为px/s)，与滑动关闭距离阈值同时设置时，满足其中一个即生效
     * @en Close the popup when the finger slides between pressing and lifting (unit: px/s). When it is set at the same time as the sliding closing distance threshold, it will take effect if one of them is satisfied.
     * @default 200
     */
    speedToClose?: number;
    /**
     * 自定义可手势滑动退出的方向，可指定多个方向
     * @en Custom direction of the gesture swipe exit, you can specify multiple directions
     * @default direction 属性指定的方向性
     * @default_en The value of direction property
     */
    allowSwipeDirections: DirectionType[];
    /**
     * 固定弹窗退出方向，默认跟随手势滑动方向
     * @en Fixed the exit direction of the pop-up window, and the default sliding direction follows the gesture
     */
    exitDirection?: DirectionType;
    /**
     * 内容面板 touchstart 事件，返回true时表示阻止本组件内部处理事件
     * @en The touchstart callback of content panel. When it returns true, it means that the event is prevented from being processed inside the component
     */
    onTouchStart?: (e: TouchEvent) => void | boolean;
    /**
     * 内容面板 touchmove 事件，返回true时表示阻止本组件内部处理事件
     * @en The touchmove callback of content panel. When it returns true, it means that the event is prevented from being processed inside the component
     */
    onTouchMove?: (e: TouchEvent, prevented: boolean, direction: 'x' | 'y') => void | boolean;
    /**
     * 内容面板 touchend / touchcancel 事件，返回true时表示阻止本组件内部处理事件
     * @en The touchend / touchcancel callback of content panel. When it returns true, it means that the event is prevented from being processed inside the component
     */
    onTouchEnd?: (e: TouchEvent) => void | boolean;
}

export interface PopupSwiperRef extends PopupRef {}

const PopupSwiper = forwardRef((props: PopupSwiperProps, ref: Ref<PopupSwiperRef>) => {
    const {
        className = '',
        visible,
        children,
        maskStyle,
        contentStyle,
        direction = 'bottom',
        percentToClose = 0.3,
        distanceToClose = 10,
        speedToClose = 200,
        allowSwipeDirections,
        exitDirection,
        onTouchMove,
        onTouchStart,
        onTouchEnd,
        onOpen,
        onClose,
        close,
        ...otherProps
    } = props;
    const [opened, setOpened] = useState(visible);
    const [distance, distanceRef, setDistance] = useRefState<{
        direction: 'X' | 'Y';
        value: number;
    }>({
        direction: 'X',
        value: 0,
    });
    const [hasTrans, setHasTrans] = useState(false);
    const popupRef = useRef<PopupRef>(null);
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const touchStartTimeRef = useRef(0);
    const hasTouchStartRef = useRef(false);
    const getContentSize = useCallback((direc: 'X' | 'Y') => {
        const contentDom = popupRef.current?.content;
        const contentWidth = contentDom?.offsetWidth || 0;
        const contentHeight = contentDom?.offsetHeight || 0;
        const contentSize = direc === 'X' ? contentWidth : contentHeight;
        return contentSize;
    }, []);
    const getPercent = useCallback((dis: { direction: 'X' | 'Y'; value: number }) => {
        const { direction: direc, value } = dis;
        const contentSize = getContentSize(direc);
        return contentSize ? Math.max(0, Math.min(1, Math.abs(value) / contentSize)) : 0;
    }, []);
    const percent = useMemo(() => getPercent(distance), [distance]);
    const allowedDirections = useMemo(
        () => (allowSwipeDirections !== void 0 ? allowSwipeDirections : [direction]),
        [allowSwipeDirections, direction],
    );

    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            if (onTouchStart && onTouchStart(e)) {
                return;
            }
            setHasTrans(false);
            hasTouchStartRef.current = true;
            touchStartXRef.current = e.touches?.[0]?.clientX || 0;
            touchStartYRef.current = e.touches?.[0]?.clientY || 0;
            touchStartTimeRef.current = new Date().getTime();
        },
        [onTouchStart],
    );

    const getMovingFromDirection = useCallback(
        (direc: 'X' | 'Y', disX: number, disY: number): DirectionType => {
            if (direc === 'X') {
                return disX > 0 ? 'right' : 'left';
            }
            return disY > 0 ? 'bottom' : 'top';
        },
        [],
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent, prevented: boolean, direc: 'x' | 'y') => {
            if (onTouchMove && onTouchMove(e, prevented, direc)) {
                return;
            }
            // 如果prevented=false说明正在滚动，则专心处理滚动事件而不处理跟手退出
            if (!prevented) {
                hasTouchStartRef.current = false;
            }
            if (!hasTouchStartRef.current || e.target === popupRef.current?.mask) {
                return;
            }
            const touchMoveX = e.changedTouches?.[0]?.clientX || 0;
            const touchMoveY = e.changedTouches?.[0]?.clientY || 0;
            const disX = touchMoveX < 0 ? 0 : touchMoveX - touchStartXRef.current;
            const disY = touchMoveY - touchStartYRef.current;
            const fromDirec = getMovingFromDirection(direc === 'x' ? 'X' : 'Y', disX, disY);
            const movingFromDirec = allowedDirections.includes(fromDirec) ? fromDirec : '';
            const disDirection = exitDirection || movingFromDirec;
            const direcValue = ['top', 'bottom'].includes(disDirection) ? 'Y' : 'X';
            const direcRatio = ['bottom', 'right'].includes(disDirection) ? 1 : -1;
            switch (movingFromDirec) {
                case 'top':
                case 'bottom':
                    setDistance({
                        direction: direcValue,
                        value: Math.abs(disY) * direcRatio,
                    });
                    break;
                case 'left':
                case 'right':
                    setDistance({
                        direction: direcValue,
                        value: Math.abs(disX) * direcRatio,
                    });
                    break;
                default:
                    break;
            }
        },
        [onTouchMove, allowedDirections, exitDirection],
    );

    const getDescDisFromDirection = useCallback((direc: 'X' | 'Y', dis: number): number => {
        const fromDirec = getMovingFromDirection(direc, dis, dis);
        const contentSize = getContentSize(direc);
        const prefix = fromDirec === 'left' || fromDirec === 'top' ? -1 : 1;
        return prefix * contentSize;
    }, []);

    const handleTouchEnd = useCallback(
        e => {
            if (onTouchEnd && onTouchEnd(e)) {
                return;
            }
            if (!hasTouchStartRef.current) {
                return;
            }
            hasTouchStartRef.current = false;
            const touchEndTime = new Date().getTime();
            const { direction: direc, value } = distanceRef.current;
            const per = getPercent(distanceRef.current);
            const speed = (value / (touchEndTime - touchStartTimeRef.current)) * 1000;
            if (
                (per > 0 && per >= percentToClose && Math.abs(value) > distanceToClose) ||
                Math.abs(speed) > speedToClose
            ) {
                setHasTrans(false);
                close(e);
                nextTick(() => {
                    setDistance({
                        direction: direc,
                        value: getDescDisFromDirection(direc, value),
                    });
                });
            } else {
                setHasTrans(true);
                setDistance({
                    direction: 'X',
                    value: 0,
                });
            }
            touchStartTimeRef.current = 0;
        },
        [onTouchEnd, percentToClose, distanceToClose, speedToClose, close],
    );

    useImperativeHandle(ref, () => popupRef.current!);

    useEffect(() => {
        const contentDom = popupRef.current?.content;
        if (opened && contentDom) {
            contentDom.addEventListener('touchstart', handleTouchStart);
            contentDom.addEventListener('touchend', handleTouchEnd);
            contentDom.addEventListener('touchcancel', handleTouchEnd);
        }
        return () => {
            const ctDom = popupRef.current?.content;
            if (opened && ctDom) {
                ctDom.removeEventListener('touchstart', handleTouchStart);
                ctDom.removeEventListener('touchend', handleTouchEnd);
                ctDom.removeEventListener('touchcancel', handleTouchEnd);
            }
        };
    }, [opened, handleTouchStart, handleTouchEnd]);

    function getContentStyle() {
        const disStyle = getStyleWithVendor({
            transform: distance.value
                ? `translate${distance.direction}(${distance.value}px) translateZ(2px)`
                : void 0,
        });
        return {
            ...(contentStyle || {}),
            ...disStyle,
        };
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <Popup
                    ref={popupRef}
                    visible={visible}
                    close={close}
                    className={cls(`${prefixCls}-popup-swiper`, className, {
                        'has-trans': hasTrans,
                    })}
                    direction={direction}
                    onTouchMove={handleTouchMove}
                    onOpen={() => {
                        setOpened(true);
                        onOpen?.();
                    }}
                    onClose={scene => {
                        setOpened(false);
                        setDistance({
                            direction: 'X',
                            value: 0,
                        });
                        onClose?.(scene);
                    }}
                    maskStyle={{
                        ...(maskStyle || {}),
                        opacity: percent ? 1 - percent : void 0,
                    }}
                    contentStyle={getContentStyle()}
                    {...otherProps}
                >
                    {children}
                </Popup>
            )}
        </ContextLayout>
    );
});

export function methodsGenerator<P extends OpenBaseProps>(Comp: React.FunctionComponent<P>) {
    return {
        /**
         * 打开弹出层
         * @desc {en} Open the PopupSwiper
         * @param {string | PopupSwiperProps} config Configuration
         * @returns {{ close: () => void; update: (newConfig: PopupSwiperProps) => void; }}
         */
        open: open(Comp),
    };
}

const PopupSwiperWithGlobalContext = CompWithGlobalContext(PopupSwiper);

/**
 * 基于弹出层(Popup)封装的具有手势关闭功能的弹出层组件，拥有 Popup 组件的其他能力。
 * @en The popup with gesture closing function based on the popup encapsulation, has other capabilities of the Popup component.
 * @type 反馈
 * @type_en Feedback
 * @name 可滑动弹出层
 * @name_en PopupSwiper
 */
export default componentWrapper(PopupSwiper, methodsGenerator(PopupSwiperWithGlobalContext));
