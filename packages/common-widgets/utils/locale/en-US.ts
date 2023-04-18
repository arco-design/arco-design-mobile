import { ILocale } from './type';

const defaultMessageTemplate = '%s is not a %s type';

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
    SearchBar: {
        placeholder: 'Please enter the content to be searched',
        cancelBtn: 'Cancel',
    },
    Stepper: {
        minusButtonName: 'decrease',
        addButtonName: 'increase',
    },
    Keyboard: {
        confirm: 'Done',
    },
    Form: {
        required: '%s is required',
        type: {
            email: defaultMessageTemplate,
            url: defaultMessageTemplate,
            string: defaultMessageTemplate,
            number: defaultMessageTemplate,
            array: defaultMessageTemplate,
            object: defaultMessageTemplate,
            boolean: defaultMessageTemplate,
        },
        number: {
            min: '`%s` is not greater than `%s`',
            max: '`%s` is not less than `%s`',
            equal: '`%s` is not equal to `%s`',
            range: '`%s` is not in range `%s ~ %s` ',
            positive: '`%s` is not a positive number',
            negative: '`%s` is not a negative number',
        },
        string: {
            max: '%s cannot be longer than %s characters',
            min: '%s must be at least %s characters',
            len: '%s must be exactly %s characters',
            match: '`%s` does not match the pattern %s',
            uppercase: '%s must be all uppercased',
            lowercase: '%s must be all lowercased',
            whitespace: '%s cannot be string of whitespace',
        },
        array: {
            max: '%s cannot be greater than %s in length',
            min: '%s cannot be less than %s in length',
            len: '%s must be exactly %s in length',
            includes: '%s does not includes %s',
            deepEqual: '%s is not deep equal with %s',
        },
        object: {
            deepEqual: '%s is not deep equal with %s',
            hasKeys: '%s does not contain required fields %s',
        },
        boolean: {
            equal: '%s is not equal to `%s`',
        },
    },
};
export default localeConfig;
