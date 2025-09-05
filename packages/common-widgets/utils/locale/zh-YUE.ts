import { ILocale } from './type';

const defaultMessageTemplate = '%s 唔係 %s 類型';
const localeConfig: ILocale = {
    locale: 'zh-YUE',
    LoadMore: {
        loadMoreText: '載入更多',
        loadingText: '努力載緊...',
        noDataText: '冇更多資料喇',
        failLoadText: '載入失敗，撳重試',
        prepareScrollText: '上拉',
        prepareClickText: '撳',
    },
    Picker: {
        okText: '確認',
        cancelText: '取消',
    },
    Tag: {
        addTag: '加標籤',
    },
    Dialog: {
        okText: '確認',
        cancelText: '取消',
    },
    SwipeLoad: {
        normalText: '更多',
        activeText: '放手睇',
    },
    PullRefresh: {
        loadingText: '載緊...',
        pullingText: '向下拉就可以重新整理',
        finishText: '重新整理成功',
        loosingText: '放手就可以重新整理',
    },
    DropdownMenu: {
        select: '請選擇',
    },
    Pagination: {
        previousPage: '上一頁',
        nextPage: '下一頁',
    },
    Image: {
        loadError: '重試',
    },
    ImagePicker: {
        loadError: '載入失敗',
    },
    SearchBar: {
        placeholder: '請輸入要搵嘅內容',
        cancelBtn: '取消',
    },
    Stepper: {
        minusButtonName: '減少',
        addButtonName: '增加',
    },
    Keyboard: {
        confirm: '完成',
    },
    Form: {
        required: '%s 係必填項',
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
            min: '`%s` 唔可以細過 `%s`',
            max: '`%s` 唔可以大過 `%s`',
            equal: '`%s` 應該等於 `%s`',
            range: '`%s` 應該喺 `%s ~ %s` 範圍入面',
            positive: '`%s` 唔可以細過 0',
            negative: '`%s` 唔可以大過 0',
        },
        string: {
            max: '%s 唔可以超過 %s 個字元',
            min: '%s 唔可以少過 %s 個字元',
            len: '%s 字元個數應該等於 %s',
            equal: '%s 應該等於 `%s`',
            match: '`%s` 應該符合 %s 模式',
            uppercase: '%s 需要全部大寫字元',
            lowercase: '%s 需要全部小寫字元',
            whitespace: '%s 唔可以全部係空格',
        },
        array: {
            max: '%s 陣列長度唔可以大過 %s',
            min: '%s 陣列長度唔可以細過 %s',
            len: '%s 陣列長度需要等於 %s',
            includes: '%s 應該包含 %s',
            deepEqual: '%s 應該完全等於 %s',
        },
        object: {
            deepEqual: '%s 應該完全等於 %s',
            hasKeys: '%s 需要包含必要欄位 %s',
        },
        boolean: {
            equal: '%s 應該等於 `%s`',
        },
        pickerDefaultHint: '請選擇',
    },
    NavBar: {
        backBtnAriaLabel: '返回',
    },
    Uploader: {
        uploadBtn: '上載',
        retryUpload: '重試',
    },
};

export default localeConfig;
