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
    SearchBar: {
        placeholder: string;
        cancelBtn: string;
    };
    Stepper: {
        minusButtonName: string;
        addButtonName: string;
    };
    Keyboard: {
        confirm: string;
    };
    Form: {
        required: string;
        type: {
            email: string;
            url: string;
            string: string;
            number: string;
            array: string;
            object: string;
            boolean: string;
        };
        number: {
            min: string;
            max: string;
            equal: string;
            range: string;
            positive: string;
            negative: string;
        };
        string: {
            max: string;
            min: string;
            len: string;
            match: string;
            uppercase: string;
            lowercase: string;
            whitespace: string;
        };
        array: {
            max: string;
            min: string;
            len: string;
            includes: string;
            deepEqual: string;
        };
        object: {
            deepEqual: string;
            hasKeys: string;
        };
        boolean: {
            equal: string;
        };
    };
}
