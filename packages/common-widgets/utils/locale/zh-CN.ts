import { ILocale } from './type';

const localeConfig: ILocale = {
    locale: 'zh-CN',
    LoadMore: {
        loadMoreText: '加载更多',
        loadingText: '正在努力加载中...',
        prepareText: '上拉/点击加载更多',
        noDataText: '没有更多数据了',
        failLoadText: '加载失败，点击重试',
        prepareScrollText: '上拉',
        prepareClickText: '点击',
    },
    Picker: {
        okText: '确认',
        cancelText: '取消',
    },
    Tag: {
        addTag: '添加标签',
    },
    Dialog: {
        okText: '确认',
        cancelText: '取消',
    },
    SwipeLoad: {
        normalText: '更多',
        activeText: '释放查看',
    },
    PullRefresh: {
        loadingText: '加载中...',
        pullingText: '下拉即可刷新',
        finishText: '刷新成功',
        loosingText: '释放即可刷新',
    },
    DropdownMenu: {
        select: '请选择',
    },
    Pagination: {
        previousPage: '上一页',
        nextPage: '下一页',
    },
};

export default localeConfig;
