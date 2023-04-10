import React, {
    CSSProperties,
    forwardRef,
    Ref,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { addCssKeyframes, cls, nextTick, removeCssStyleDom } from '@arco-design/mobile-utils';
import { TabCellUnderlineProps, TabCellUnderlineRef, UnderlineStyle } from './type';
import { getStyleWithVendor, useRefState, useSystem } from '../_helpers';

const TabCellUnderline = forwardRef(
    (props: TabCellUnderlineProps, ref: Ref<TabCellUnderlineRef>) => {
        const {
            prefix,
            useCaterpillar,
            distance,
            tabDirection,
            underlineInnerStyle,
            duration,
            cellTrans,
            showLine,
            activeIndex,
            wrapWidth,
            wrapHeight,
            jumpingDis,
            translateZ,
            caterpillarMaxScale,
            caterpillarProperty,
            underlineSize,
            underlineThick,
            underlineAdaptive,
            renderUnderline,
            getTabRect,
            getTabCenterLeft,
        } = props;
        const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyle>({});
        const [caterpillar, caterpillarRef, setCaterpillar] = useRefState(false);
        const [caterpillarDelay, setCaterpillarDelay] = useState(0);
        const lineRef = useRef<HTMLDivElement | null>(null);
        const timeRef = useRef(0);
        const system = useSystem();
        const isVertical = tabDirection === 'vertical';
        const maxScaleWithDefault = caterpillarMaxScale || 2;
        const translateZStr = translateZ ? ' translateZ(0)' : '';

        useImperativeHandle(
            ref,
            () => ({
                setCaterpillarAnimate,
                resetUnderlineStyle,
            }),
            [setCaterpillarAnimate, resetUnderlineStyle],
        );

        const animationKey = useMemo(() => {
            if (!useCaterpillar) {
                return '';
            }
            if (caterpillarProperty === 'size') {
                return `tabsCaterpillar${isVertical ? 'W' : 'H'}${maxScaleWithDefault}`;
            }
            if (caterpillarMaxScale) {
                return `tabsCaterpillar${isVertical ? 'X' : 'Y'}${caterpillarMaxScale}`;
            }
            return '';
        }, [useCaterpillar, isVertical, caterpillarMaxScale, caterpillarProperty]);

        useEffect(() => {
            if (!animationKey) {
                return;
            }
            const dir = isVertical ? 'X' : 'Y';
            if (caterpillarProperty === 'size') {
                const attr = isVertical ? 'width' : 'height';
                addCssKeyframes(
                    animationKey,
                    `{
                        0% {
                            ${attr}: 100%;
                        }
                        50% {
                            ${attr}: ${100 * maxScaleWithDefault}%;
                        }
                        100% {
                            ${attr}: 100%;
                        }
                    }`,
                );
                return;
            }
            addCssKeyframes(
                animationKey,
                `{
                    0% {
                        transform: scale${dir}(1)${translateZStr};
                        -webkit-transform: scale${dir}(1)${translateZStr};
                    }
                    50% {
                        transform: scale${dir}(${caterpillarMaxScale})${translateZStr};
                        -webkit-transform: scale${dir}(${caterpillarMaxScale})${translateZStr};
                    }
                    100% {
                        transform: scale${dir}(1)${translateZStr};
                        -webkit-transform: scale${dir}(1)${translateZStr};
                    }
                }`,
            );
            return () => {
                removeCssStyleDom(animationKey);
            };
        }, [animationKey]);

        useEffect(() => {
            if (jumpingDis && useCaterpillar && system !== 'ios') {
                const movedRatio = wrapWidth ? jumpingDis / wrapWidth : 0;
                setCaterpillarAnimate(movedRatio);
            }
        }, [jumpingDis]);

        useEffect(() => {
            resetUnderlineStyle();
        }, [
            useCaterpillar,
            caterpillar,
            cellTrans,
            duration,
            tabDirection,
            wrapWidth,
            wrapHeight,
            distance,
            animationKey,
            caterpillarDelay,
            underlineSize,
            underlineThick,
            underlineAdaptive,
        ]);

        function getLineWidth(index: number) {
            if (underlineAdaptive) {
                return getTabRect(index).width;
            }
            const offsetSize = isVertical
                ? lineRef.current?.offsetWidth
                : lineRef.current?.offsetHeight;
            const lineWidth = offsetSize || 0;
            return lineWidth;
        }

        function getLineLeft(index: number) {
            if (underlineAdaptive) {
                return getTabRect(index).left;
            }
            const lineWidth = getLineWidth(index);
            return getTabCenterLeft(index) - lineWidth / 2;
        }

        function getDescIndex() {
            if (distance > 0) {
                return activeIndex - 1;
            }
            if (distance < 0) {
                return activeIndex + 1;
            }
            return activeIndex;
        }

        function getLineScale(ratio: number) {
            const absRatio = Math.abs(ratio);
            return absRatio > 0.5
                ? (1 - absRatio) * 2 * (maxScaleWithDefault - 1) + 1
                : absRatio * 2 * (maxScaleWithDefault - 1) + 1;
        }

        function getLineStyle(): UnderlineStyle {
            if (!lineRef.current) {
                return {};
            }
            const currentLeft = getLineLeft(activeIndex);
            const descIndex = getDescIndex();
            const descLeft = getLineLeft(descIndex);
            const moveRatio = wrapWidth ? distance / wrapWidth : 0;
            const leftOffset = moveRatio * (currentLeft - descLeft);
            const direc = isVertical ? 'X' : 'Y';
            const transStyle: CSSProperties =
                useCaterpillar && !jumpingDis && !underlineAdaptive
                    ? caterpillarProperty === 'size'
                        ? {
                              [isVertical ? 'width' : 'height']: `${
                                  100 * getLineScale(moveRatio)
                              }%`,
                              willChange: 'width',
                          }
                        : {
                              transform: `scale${direc}(${getLineScale(moveRatio)})`,
                          }
                    : {};
            let adaptiveStyle: CSSProperties = {};
            let adaptiveOuterStyle: CSSProperties = {};
            if (underlineAdaptive) {
                const currentWidth = getLineWidth(activeIndex);
                const descWidth = getLineWidth(descIndex);
                const widthOffset = moveRatio * (currentWidth - descWidth);
                adaptiveStyle = {
                    [isVertical ? 'width' : 'height']:
                        distance > 0 ? currentWidth - widthOffset : currentWidth + widthOffset,
                    willChange: 'width',
                };
                adaptiveOuterStyle = isVertical ? { width: 'auto' } : { height: 'auto' };
            }
            const outerSize = isVertical
                ? {
                      width: underlineSize,
                      height: underlineThick,
                  }
                : {
                      height: underlineSize,
                      width: underlineThick,
                  };
            return {
                outer: {
                    transform: `translate${direc}(${
                        distance > 0 ? currentLeft - leftOffset : currentLeft + leftOffset
                    }px)${translateZStr}`,
                    ...outerSize,
                    ...adaptiveOuterStyle,
                },
                inner: {
                    ...transStyle,
                    ...adaptiveStyle,
                },
            };
        }

        function getUnderlineStyle(): UnderlineStyle {
            const transStyle: CSSProperties = {};
            if (!underlineAdaptive) {
                if (useCaterpillar) {
                    transStyle.animationDuration = `${duration}ms`;
                }
                if (caterpillarRef.current && animationKey) {
                    transStyle.animationName = animationKey;
                }
                if (caterpillarDelay) {
                    transStyle.animationDelay = `-${caterpillarDelay}ms`;
                }
            }
            const lineStyle: UnderlineStyle = getLineStyle();
            return {
                outer: getStyleWithVendor({
                    transitionDuration: cellTrans ? `${duration}ms` : '0ms',
                    ...(lineStyle.outer || {}),
                }),
                inner: getStyleWithVendor({
                    ...transStyle,
                    ...(lineStyle.inner || {}),
                }),
            };
        }

        function resetUnderlineStyle() {
            setUnderlineStyle(getUnderlineStyle());
        }

        function setCaterpillarAnimate(movedRatio = 0) {
            if (!duration) {
                return;
            }
            const movedTime = (duration || 0) * Math.abs(movedRatio);
            setCaterpillarDelay(movedTime);
            nextTick(() => {
                setCaterpillar(true);
            });
            if (timeRef.current) {
                clearTimeout(timeRef.current);
            }
            timeRef.current = window.setTimeout(() => {
                setCaterpillar(false);
                setCaterpillarDelay(0);
            }, (duration || 0) - movedTime + 20);
        }

        return renderUnderline ? (
            <>{renderUnderline(underlineStyle, showLine, lineRef)}</>
        ) : (
            <div
                className={cls(`${prefix}-underline`, { show: showLine })}
                ref={lineRef}
                style={underlineStyle.outer}
            >
                <div
                    className={cls(
                        `${prefix}-underline-inner`,
                        {
                            caterpillar,
                            'custom-animate': animationKey,
                            'caterpillar-moving': caterpillar || (useCaterpillar && distance),
                        },
                        tabDirection,
                    )}
                    style={{
                        ...(underlineStyle.inner || {}),
                        ...(underlineInnerStyle || {}),
                    }}
                />
            </div>
        );
    },
);

export default TabCellUnderline;
