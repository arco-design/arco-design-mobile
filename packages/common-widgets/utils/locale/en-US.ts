import { ILocale } from './type';

const localeConfig: ILocale = {
    locale: 'en-US',
    LoadMore: {
        loadMoreText: 'Load more',
        loadingText: 'Loading...',
        prepareText: 'load more',
        noDataText: 'No more data',
        failLoadText: 'Failed to load, click to retry',
        prepareScrollText: 'Pull up to ',
        prepareClickText: 'Click to ',
    },
    Picker: {
        okText: 'OK',
        cancelText: 'Cancel',
    },
    Tag: {
        addTag: 'Add Tag',
    },
    Dialog: {
        okText: 'OK',
        cancelText: 'Cancel',
    },
    SwipeLoad: {
        normalText: 'More',
        activeText: 'Release to view',
    },
    PullRefresh: {
        loadingText: 'Loading...',
        pullingText: 'Pull to refresh',
        finishText: 'Refresh successfully',
        loosingText: 'Release to refresh',
    },
    DropdownMenu: {
        select: 'Please select',
    },
    Pagination: {
        previousPage: 'Previous',
        nextPage: 'Next',
    },
    Image: {
        loadError: 'Retry',
    },
    ImagePicker: {
        loadError: 'Load failed',
    },
};
export default localeConfig;
