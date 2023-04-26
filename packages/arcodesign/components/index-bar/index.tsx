import { cls, componentWrapper, scrollWithAnimation } from '@arco-design/mobile-utils';
import lodashThrottle from 'lodash.throttle';
import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
    useState,
    useEffect,
} from 'react';
import { ContextLayout } from '../context-provider';
import { IndexBarContext } from './context';
import { IndexBarGroup as Group } from './group';
import { IndexBarSideBar } from './side-bar';
import type {
    IndexBarBaseData,
    IndexBarChangeTrigger,
    IndexBarIndexType,
    IndexBarProps,
    IndexBarRef,
    IndexBarContext as IndexBarContentType,
    IndexBarScrollParams,
} from './type';
import {
    filterValidIndexBarChild,
    getGroupDomFromIndex,
    getFormatIndex,
    isValidIndex,
} from './utils';
import { StickyRef } from '../sticky';

export type {
    IndexBarProps,
    IndexBarRef,
    IndexBarGroupProps,
    IndexBarGroupRef,
    IndexBarChangeTrigger,
    IndexBarIndexType,
    IndexBarTipType,
} from './type';

const IndexBar = forwardRef(
    <Data extends IndexBarBaseData = IndexBarBaseData>(
        props: IndexBarProps<Data>,
        ref: Ref<IndexBarRef>,
    ) => {
        const {
            className = '',
            style,
            children,
            sticky = true,
            groups = [],
            tipType = 'toast',
            defaultIndex,
            scrollBezier,
            scrollDuration = 0,
            disableSidebar = false,
            onChange,
            onGroupItemClick,
            renderSideBar,
            renderSideBarItem,
            renderTip,
            renderStickyItem,
            renderGroupItem,
        } = props;
        // 最外层dom元素的ref
        const domRef = useRef<HTMLDivElement | null>(null);
        // 所有group的容器dom，domRef的内容就是contanerRef和sidebar的内容
        const containerRef = useRef<HTMLDivElement | null>(null);
        // 过滤掉jsx写法中，奇怪的child
        const formatChildren = filterValidIndexBarChild(children);
        // 所有的索引内容，优先从props.groups中获取，再从formatChildren中获取
        const indexes = useMemo(() => {
            if (groups.length) {
                return groups.map(group => group.index);
            }
            return formatChildren.map(child => child.props.index);
        }, [children, groups]);
        const groupRefs = useRef<Record<IndexBarIndexType, StickyRef>>({});
        // 当前激活的Index
        const [activeIndex, setActiveIndex] = useState<IndexBarIndexType | undefined>(
            () => defaultIndex ?? indexes?.[0],
        );
        // 给IndexBarGroup用的上下文，主要是为了兼容jsx的写法
        const contextValue = useMemo<IndexBarContentType>(
            () => ({
                sticky,
                getScrollContainer: () => containerRef.current as HTMLDivElement,
                activeIndex,
                updateRef: (groupIndex, stickyRef) => {
                    groupRefs.current[groupIndex] = stickyRef;
                },
            }),
            [sticky, activeIndex],
        );
        // 用户是否正在触碰sidebar, 如果为true的话，禁用handleScroll的处理
        const isScrollHandlerDisabledRef = useRef(false);

        const handleChangeActiveIndex = (
            index: IndexBarIndexType,
            type: IndexBarChangeTrigger,
        ): void => {
            setActiveIndex(oldActiveIndex => {
                const newActiveIndex = getFormatIndex(index, oldActiveIndex);
                // 和上一次激活的acitveIndex不同，再触发onChange事件
                if (newActiveIndex !== oldActiveIndex) {
                    onChange?.(newActiveIndex, type);
                }
                return newActiveIndex;
            });
        };

        // 要滚动到哪个指定的index
        const handleScrollIntoIndex = (params: IndexBarScrollParams) => {
            const { index, type, rightNow = false } = params;
            // 不传index默认走第一个index
            const formatIndex = index ?? indexes?.[0];
            const containerDom = containerRef.current;
            if (!isValidIndex(index) || !containerDom) {
                return;
            }
            // 寻找Index对应的groupDom
            const groupDom = getGroupDomFromIndex(containerDom, formatIndex);
            if (groupDom) {
                handleChangeActiveIndex(formatIndex, type);
                const duration = rightNow ? 0 : scrollDuration;
                const targetScrollTop = groupDom.offsetTop;
                // 将屏幕滚动到groupDom
                // 手动触发需要禁用handleScroll事件
                if (type === 'manual') {
                    isScrollHandlerDisabledRef.current = true;
                    setTimeout(() => {
                        isScrollHandlerDisabledRef.current = false;
                    }, duration);
                }
                if (duration > 0) {
                    scrollWithAnimation(
                        containerDom.scrollTop,
                        targetScrollTop,
                        top => (containerDom.scrollTop = top),
                        duration,
                        scrollBezier,
                    );
                } else {
                    containerDom.scrollTop = targetScrollTop;
                }
            }
        };

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
            scrollToIndex(index, rightNow) {
                if (isValidIndex(index)) {
                    handleScrollIntoIndex({
                        index,
                        rightNow,
                        type: 'manual',
                    });
                }
            },
            recalculatePosition(targetIndex) {
                const formatIndex = targetIndex ?? activeIndex;
                if (formatIndex) {
                    const targetStickyRef = groupRefs.current[formatIndex];
                    if (targetStickyRef && targetStickyRef.recalculatePosition) {
                        targetStickyRef.recalculatePosition();
                    }
                }
            },
        }));

        const renderChildren = () => {
            if (formatChildren.length) {
                return formatChildren;
            }
            return groups?.map(group => (
                <Group
                    index={group.index}
                    key={group.index}
                    list={group.list}
                    onGroupItemClick={onGroupItemClick}
                    renderGroupItem={renderGroupItem}
                    renderStickyItem={renderStickyItem}
                />
            ));
        };

        useEffect(() => {
            const handleScroll = lodashThrottle(() => {
                // 用户正在触碰sidebar和手动触发scroll时禁用滚动事件的处理
                if (!containerRef.current || isScrollHandlerDisabledRef.current) {
                    return;
                }

                // 根据滚动的距离，获取处于屏幕最顶部的group是哪个
                const scrollTop = containerRef.current.scrollTop;
                for (let i = 0; i < containerRef.current.children.length; i++) {
                    const child = containerRef.current.children[i] as HTMLDivElement;
                    if (!child || !child.dataset || typeof child.dataset.index === 'undefined') {
                        continue;
                    }
                    if (child.offsetTop + child.clientHeight >= scrollTop) {
                        handleChangeActiveIndex(child.dataset.index, 'swipe');
                        break;
                    }
                }
            }, 100);

            // 页面挂载时，如果是传入了defaultIndex，则滚动到对应位置
            if (activeIndex) {
                handleScrollIntoIndex({
                    index: activeIndex,
                    rightNow: true,
                    type: 'manual',
                });
            }
            containerRef.current?.addEventListener('scroll', handleScroll);

            return () => {
                containerRef.current?.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return (
            <ContextLayout>
                {({ prefixCls }) => (
                    <IndexBarContext.Provider value={contextValue}>
                        <div
                            className={cls(`${prefixCls}-index-bar`, className)}
                            style={style}
                            ref={domRef}
                        >
                            <div className={`${prefixCls}-index-bar-container`} ref={containerRef}>
                                {renderChildren()}
                            </div>
                            {!disableSidebar && (
                                <IndexBarSideBar
                                    tipType={tipType}
                                    activeIndex={activeIndex}
                                    prefixCls={prefixCls}
                                    indexes={indexes}
                                    onTouching={isTouching =>
                                        (isScrollHandlerDisabledRef.current = isTouching)
                                    }
                                    onClick={newIndex =>
                                        handleScrollIntoIndex({ index: newIndex, type: 'sidebar' })
                                    }
                                    renderSideBar={renderSideBar}
                                    renderSideBarItem={renderSideBarItem}
                                    renderTip={renderTip}
                                />
                            )}
                        </div>
                    </IndexBarContext.Provider>
                )}
            </ContextLayout>
        );
    },
);

/**
 * 索引栏组件
 * @en IndexBar component
 * @type 导航
 * @type_en Navigation
 * @name 索引栏
 * @name_en SearchBar
 */
export default componentWrapper(IndexBar, { Group });
