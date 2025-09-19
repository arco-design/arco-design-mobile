import type { ILocale } from './type';

const defaultMessageTemplate = '%s не является типом %s';
const localeConfig: ILocale = {
    locale: 'ru',
    LoadMore: {
        loadMoreText: ' для загрузки еще',
        loadingText: 'Загрузка...',
        noDataText: 'Больше нет данных',
        failLoadText: 'Не удалось загрузить, нажмите для повтора',
        prepareScrollText: 'Потяните вверх',
        prepareClickText: 'Нажмите',
    },
    Picker: {
        okText: 'OK',
        cancelText: 'Отмена',
    },
    Tag: {
        addTag: 'Добавить тег',
    },
    Dialog: {
        okText: 'OK',
        cancelText: 'Отмена',
    },
    SwipeLoad: {
        normalText: 'Еще',
        activeText: 'Отпустите для просмотра',
    },
    PullRefresh: {
        loadingText: 'Загрузка...',
        pullingText: 'Потяните для обновления',
        finishText: 'Обновление завершено',
        loosingText: 'Отпустите для обновления',
    },
    DropdownMenu: {
        select: 'Пожалуйста, выберите',
    },
    Pagination: {
        previousPage: 'Предыдущая',
        nextPage: 'Следующая',
    },
    Image: {
        loadError: 'Повторить',
    },
    ImagePicker: {
        loadError: 'Не удалось загрузить',
    },
    SearchBar: {
        placeholder: 'Пожалуйста, введите содержимое для поиска',
        cancelBtn: 'Отмена',
    },
    Stepper: {
        minusButtonName: 'уменьшить',
        addButtonName: 'увеличить',
    },
    Keyboard: {
        confirm: 'Готово',
    },
    Form: {
        required: '%s обязательно',
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
            min: '`%s` должно быть не менее `%s`',
            max: '`%s` не должно превышать `%s`',
            equal: '`%s` должно быть равно `%s`',
            range: '`%s` должно быть в диапазоне `%s ~ %s`',
            positive: '`%s` не может быть меньше 0',
            negative: '`%s` не может быть больше 0',
        },
        string: {
            max: '%s не может быть длиннее %s символов',
            min: '%s должно быть не менее %s символов',
            len: '%s должно быть точно %s символов',
            equal: '%s должно быть равно `%s`',
            match: '`%s` не соответствует шаблону %s',
            uppercase: '%s должно быть в верхнем регистре',
            lowercase: '%s должно быть в нижнем регистре',
            whitespace: '%s не может быть строкой из пробелов',
        },
        array: {
            max: '%s не может быть больше %s по длине',
            min: '%s не может быть меньше %s по длине',
            len: '%s должно быть точно %s по длине',
            includes: '%s не включает %s',
            deepEqual: '%s не равно глубоко %s',
        },
        object: {
            deepEqual: '%s не равно глубоко %s',
            hasKeys: '%s не содержит обязательные поля %s',
        },
        boolean: {
            equal: '%s должно быть равно `%s`',
        },
        pickerDefaultHint: 'Пожалуйста, выберите',
    },
    NavBar: {
        backBtnAriaLabel: 'Назад',
    },
    Uploader: {
        uploadBtn: 'Загрузить',
        retryUpload: 'Повторить',
    },
};

export default localeConfig;
