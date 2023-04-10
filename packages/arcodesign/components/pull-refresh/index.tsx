import React, { forwardRef, Ref } from 'react';
import { PullRefresh as IOSPullRefresh } from './ios-pull-refresh';
import { PullRefresh as AndroidPullRefresh } from './android-pull-refresh';
import { PullRefreshBasicProps, PullRefreshRef } from './model';
import { useSystem } from '../_helpers';

export type { PullRefreshRef } from './model';

export interface PullRefreshProps extends PullRefreshBasicProps {
    /**
     * 下拉刷新组件不同的实现方式，android - 常规的外层容器 transform，ios - 利用 ios scrollTop 负值实现下拉及回弹(性能优于transform)，仅ios可用。指定该属性值后优先级高于 useIosOptimize
     * @en Different implementation methods of PullRefresh, android - conventional outer container transform, ios - use ios scrollTop negative value to achieve pull-down and rebound (performance is better than transform), only available for ios. After specifying value, the priority is higher than useIosOptimize
     * @default 跟随系统
     * @default_en Follow the system
     */
    type?: 'ios' | 'android';
    /**
     * 在 ios 上是否使用 scrollTop 负值实现下拉及回弹，而不是 transform，关闭后所有机型都使用 transform 的方式
     * @en Whether to use the negative value of scrollTop on ios to achieve pull-down and rebound instead of transform. After closing, all models use transform
     * @default false
     */
    useIosOptimize?: boolean;
}

/**
 * 下拉刷新数据组件。
 * @en PullRefresh component that pulls down to refresh data.
 * @name 下拉刷新
 * @name_en PullRefresh
 * @type 其他
 * @type_en Others
 */
const PullRefresh = forwardRef((props: PullRefreshProps, ref: Ref<PullRefreshRef>) => {
    const { type, useIosOptimize, children, ...rest } = props;
    const system = useSystem();

    const Container =
        type === 'ios' || (useIosOptimize && (type || system) === 'ios')
            ? IOSPullRefresh
            : AndroidPullRefresh;
    return <Container {...{ ...rest, ref }}>{children}</Container>;
});

export default PullRefresh;
