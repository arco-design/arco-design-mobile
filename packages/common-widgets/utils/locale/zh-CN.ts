import { ILocale } from './type';

const defaultMessageTemplate = '%s 不是 %s 类型';
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
    Image: {
        loadError: '重试',
    },
    ImagePicker: {
        loadError: '加载失败',
    },
    SearchBar: {
        placeholder: '请输入要查询的内容',
        cancelBtn: '取消',
    },
    Stepper: {
        minusButtonName: '减少',
        addButtonName: '增加',
    },
    Keyboard: {
        confirm: '完成',
    },
    Form: {
        required: '%s 为必填项',
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
            min: '`%s` 小于 `%s`',
            max: '`%s` 大于 `%s`',
            equal: '`%s` 不等于 `%s`',
            range: '`%s` 不在 `%s ~ %s` 范围中 ',
            positive: '`%s` 不是正数',
            negative: '`%s`不是负数',
        },
        string: {
            max: '%s 超过 %s 个字符',
            min: '%s 少于 %s 个字符',
            len: '%s 字符个数应为 %s',
            match: '`%s` 不匹配 %s 模式',
            uppercase: '%s 需全为大写字符',
            lowercase: '%s 需全为小写字符',
            whitespace: '%s 不能为连续空格',
        },
        array: {
            max: '%s 数组长度大于 %s',
            min: '%s 数组长度小于 %s',
            len: '%s 数组长度需为 %s',
            includes: '%s 不包含 %s',
            deepEqual: '%s 不完全等于 %s',
        },
        object: {
            deepEqual: '%s 不完全等于 %s',
            hasKeys: '%s 不包含必要字段 %s',
        },
        boolean: {
            equal: '%s 不等于 `%s`',
        },
    },
};

export default localeConfig;
