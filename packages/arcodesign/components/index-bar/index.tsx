import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { scrollWithAnimation } from '@arco-design/mobile-utils/utils';
import lodashThrottle from 'lodash.throttle';
import React, { useRef, forwardRef, Ref, useImperativeHandle, useMemo, useState } from 'react';
import { ContextLayout } from '../context-provider';
import { IndexBarContext } from './context';
import { IndexBarGroup } from './group';
import { IndexBarSideBar } from './side-bar';
import {
    IndexBarBaseData,
    IndexBarChangeTrigger,
    IndexBarIndexType,
    IndexBarProps,
    IndexBarRef,
} from './type';
import { filterValidIndexBarChild, getGroupDomFromIndex } from './utils';

/**
 * 索引栏组件
 * @en IndexBar component
 * @type 导航
 * @type_en Navigation
 * @name 索引栏
 * @name_en SearchBar
 */
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
        // 当前激活的Index
        const [activeIndex, setActiveIndex] = useState<IndexBarIndexType | undefined>(
            () => defaultIndex ?? indexes?.[0],
        );
        // 给IndexBarGroup用的上下文，主要是为了兼容jsx的写法
        const contextValue = useMemo(
            () => ({
                sticky,
                getScrollContainer: () => containerRef.current as HTMLDivElement,
            }),
            [sticky],
        );
        // 用户是否正在触碰sidebar, 如果为true的话，禁用handleScroll的处理
        const isTouchingSidebarRef = useRef(false);

        const handleChangeActiveIndex = (
            index: IndexBarIndexType,
            type: IndexBarChangeTrigger,
        ): void => {
            setActiveIndex(index);
            // 和上一次激活的acitveIndex不同，再触发onChange事件
            if (index !== activeIndex) {
                onChange?.(index, type);
            }
        };

        // 要滚动到哪个指定的index
        const handleScrollIntoIndex = (
            index: IndexBarIndexType,
            type: IndexBarChangeTrigger,
            rightNow?: boolean,
        ) => {
            // 不传index默认走第一个index
            const formatIndex = index ?? indexes?.[0];
            const containerDom = containerRef.current;
            if (typeof formatIndex === 'undefined' || !containerDom) {
                return;
            }
            // 寻找Index对应的groupDom
            const groupDom = getGroupDomFromIndex(containerDom, formatIndex);
            if (groupDom) {
                handleChangeActiveIndex(formatIndex, type);
                // 将屏幕滚动到groupDom
                scrollWithAnimation(
                    containerDom.scrollTop,
                    groupDom.offsetTop,
                    top => (containerDom.scrollTop = top),
                    rightNow ? 0 : scrollDuration,
                    scrollBezier,
                );
            }
        };

        useImperativeHandle(ref, () => ({
            dom: domRef.current,
            scrollToIndex(index, rightNow) {
                const formatIndex = index ?? indexes?.[0];
                if (formatIndex) {
                    handleScrollIntoIndex(formatIndex, 'manual', rightNow);
                }
            },
        }));

        const handleScroll = lodashThrottle(() => {
            // 用户正在触碰sidebar也禁用滚动事件的处理
            if (!containerRef.current || isTouchingSidebarRef.current) {
                return;
            }

            // 根据滚动的距离，获取处于屏幕最顶部的group是哪个
            const scrollTop = containerRef.current.scrollTop;
            for (let i = 0; i < containerRef.current.children.length; i++) {
                const child = containerRef.current.children[i] as HTMLDivElement;
                if (!child || !child.dataset || typeof child.dataset.index === 'undefined') {
                    continue;
                }
                if (child.offsetTop + child.clientHeight > scrollTop) {
                    handleChangeActiveIndex(child.dataset.index, 'swipe');
                    break;
                }
            }
        }, 100);

        const renderChildren = () => {
            if (formatChildren.length) {
                return formatChildren;
            }
            return groups?.map(group => (
                <IndexBarGroup
                    index={group.index}
                    key={group.index}
                    list={group.list}
                    onClick={onGroupItemClick}
                    renderGroupItem={renderGroupItem}
                    renderStickyItem={renderStickyItem}
                />
            ));
        };

        return (
            <ContextLayout>
                {({ prefixCls }) => (
                    <IndexBarContext.Provider value={contextValue}>
                        <div
                            className={cls(`${prefixCls}-indexbar`, className)}
                            style={style}
                            ref={domRef}
                        >
                            <div
                                className={`${prefixCls}-indexbar-container`}
                                ref={containerRef}
                                onScroll={handleScroll}
                            >
                                {renderChildren()}
                            </div>
                            {!disableSidebar && (
                                <IndexBarSideBar
                                    tipType={tipType}
                                    activeIndex={activeIndex}
                                    prefixCls={prefixCls}
                                    indexes={indexes}
                                    onClick={newIndex => handleScrollIntoIndex(newIndex, 'sidebar')}
                                    onTouchChange={isTouching =>
                                        (isTouchingSidebarRef.current = isTouching)
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

export default componentWrapper(IndexBar, { Group: IndexBarGroup });
