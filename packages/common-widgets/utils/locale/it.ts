import type { ILocale } from './type';

const defaultMessageTemplate = '%s non è un tipo %s';

const localeConfig: ILocale = {
    locale: 'it',
    LoadMore: {
        loadMoreText: ' per caricare di più',
        loadingText: 'Caricamento...',
        noDataText: 'Nessun altro dato',
        failLoadText: 'Caricamento fallito, clicca per riprovare',
        prepareScrollText: 'Tira su',
        prepareClickText: 'Clicca',
    },
    Picker: {
        okText: 'OK',
        cancelText: 'Annulla',
    },
    Tag: {
        addTag: 'Aggiungi Tag',
    },
    Dialog: {
        okText: 'OK',
        cancelText: 'Annulla',
    },
    SwipeLoad: {
        normalText: 'Di più',
        activeText: 'Rilascia per visualizzare',
    },
    PullRefresh: {
        loadingText: 'Caricamento...',
        pullingText: 'Tira per aggiornare',
        finishText: 'Aggiornamento riuscito',
        loosingText: 'Rilascia per aggiornare',
    },
    DropdownMenu: {
        select: 'Seleziona',
    },
    Pagination: {
        previousPage: 'Precedente',
        nextPage: 'Successivo',
    },
    Image: {
        loadError: 'Riprova',
    },
    ImagePicker: {
        loadError: 'Caricamento fallito',
    },
    SearchBar: {
        placeholder: 'Inserisci il contenuto da cercare',
        cancelBtn: 'Annulla',
    },
    Stepper: {
        minusButtonName: 'diminuisci',
        addButtonName: 'aumenta',
    },
    Keyboard: {
        confirm: 'Fatto',
    },
    Form: {
        required: '%s è obbligatorio',
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
            min: '`%s` deve essere almeno `%s`',
            max: '`%s` non deve superare `%s`',
            equal: '`%s` deve essere uguale a `%s`',
            range: "`%s` deve essere nell'intervallo `%s ~ %s`",
            positive: '`%s` non può essere minore di 0',
            negative: '`%s` non può essere maggiore di 0',
        },
        string: {
            max: '%s non può essere più lungo di %s caratteri',
            min: '%s deve essere almeno %s caratteri',
            len: '%s deve essere esattamente %s caratteri',
            equal: '%s deve essere uguale a `%s`',
            match: '`%s` non corrisponde al pattern %s',
            uppercase: '%s deve essere tutto maiuscolo',
            lowercase: '%s deve essere tutto minuscolo',
            whitespace: '%s non può essere una stringa di spazi vuoti',
        },
        array: {
            max: '%s non può essere maggiore di %s in lunghezza',
            min: '%s non può essere minore di %s in lunghezza',
            len: '%s deve essere esattamente %s in lunghezza',
            includes: '%s non include %s',
            deepEqual: '%s non è profondamente uguale a %s',
        },
        object: {
            deepEqual: '%s non è profondamente uguale a %s',
            hasKeys: '%s non contiene i campi richiesti %s',
        },
        boolean: {
            equal: '%s deve essere uguale a `%s`',
        },
        pickerDefaultHint: 'Seleziona',
    },
    NavBar: {
        backBtnAriaLabel: 'Indietro',
    },
    Uploader: {
        uploadBtn: 'Carica',
        retryUpload: 'Riprova',
    },
};

export default localeConfig;
