import React, { forwardRef, Ref } from 'react';
import { PullRefresh as IOSPullRefresh } from './ios-pull-refresh';
import { PullRefresh as AndroidPullRefresh } from './android-pull-refresh';
import { PullRefreshBasicProps, PullRefreshRef } from './model';
import { useSystem } from '../_helpers';

export type { PullRefreshRef } from './model';

export interface PullRefreshProps extends PullRefreshBasicProps {
    /**
     * 分成两种类型
     * @en Divided into two types
     * @default 跟随系统
     * @default_en follow the system
     */
    type?: 'ios' | 'android';
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
    const { type, children, ...rest } = props;
    const system = useSystem();

    const Container = (type || system) === 'ios' ? IOSPullRefresh : AndroidPullRefresh;
    return <Container {...{ ...rest, ref }}>{children}</Container>;
});

export default PullRefresh;
