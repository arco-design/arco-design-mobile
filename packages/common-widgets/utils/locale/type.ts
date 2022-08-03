export interface ILocale {
    /**
     * 语言类型
     * @en Language Type
     */
    locale: string;
    LoadMore: {
        loadMoreText: string;
        loadingText: string;
        prepareText: string;
        noDataText: string;
        failLoadText: string;
        prepareScrollText: string;
        prepareClickText: string;
    };
    Picker: {
        okText: string;
        cancelText: string;
    };
    Tag: {
        addTag: string;
    };
    Dialog: {
        okText: string;
        cancelText: string;
    };
    SwipeLoad: {
        normalText: string;
        activeText: string;
    };
    PullRefresh: {
        loadingText: string;
        pullingText: string;
        finishText: string;
        loosingText: string;
    };
    DropdownMenu: {
        select: string;
    };
    Pagination: {
        previousPage: string;
        nextPage: string;
    };
    Image: {
        loadError: string;
    };
    ImagePicker: {
        loadError: string;
    };
}
