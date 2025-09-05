import type { ILocale } from './type';

const defaultMessageTemplate = '%s 不是 %s 類型';
const localeConfig: ILocale = {
    locale: 'zh-TW',
    LoadMore: {
        loadMoreText: '載入更多',
        loadingText: '正在努力載入中...',
        noDataText: '沒有更多資料了',
        failLoadText: '載入失敗，點擊重試',
        prepareScrollText: '上拉',
        prepareClickText: '點擊',
    },
    Picker: {
        okText: '確認',
        cancelText: '取消',
    },
    Tag: {
        addTag: '新增標籤',
    },
    Dialog: {
        okText: '確認',
        cancelText: '取消',
    },
    SwipeLoad: {
        normalText: '更多',
        activeText: '釋放檢視',
    },
    PullRefresh: {
        loadingText: '載入中...',
        pullingText: '下拉即可重新整理',
        finishText: '重新整理成功',
        loosingText: '釋放即可重新整理',
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
        placeholder: '請輸入要查詢的內容',
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
        required: '%s 為必填項',
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
            min: '`%s` 不可小於 `%s`',
            max: '`%s` 不可大於 `%s`',
            equal: '`%s` 應該等於 `%s`',
            range: '`%s` 應該在 `%s ~ %s` 範圍中',
            positive: '`%s` 不可小於 0',
            negative: '`%s` 不可大於 0',
        },
        string: {
            max: '%s 不可超過 %s 個字元',
            min: '%s 不可少於 %s 個字元',
            len: '%s 字元個數應等於 %s',
            equal: '%s 應該等於 `%s`',
            match: '`%s` 應匹配 %s 模式',
            uppercase: '%s 需全為大寫字元',
            lowercase: '%s 需全為小寫字元',
            whitespace: '%s 不可全為空格',
        },
        array: {
            max: '%s 陣列長度不可大於 %s',
            min: '%s 陣列長度不可小於 %s',
            len: '%s 陣列長度需等於 %s',
            includes: '%s 應該包含 %s',
            deepEqual: '%s 應該完全等於 %s',
        },
        object: {
            deepEqual: '%s 應該完全等於 %s',
            hasKeys: '%s 需包含必要欄位 %s',
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
        uploadBtn: '上傳',
        retryUpload: '重試',
    },
};

export default localeConfig;
