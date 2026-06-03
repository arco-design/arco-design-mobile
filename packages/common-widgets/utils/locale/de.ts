import type { ILocale } from './type';

const defaultMessageTemplate = '%s ist nicht vom Typ %s';
const localeConfig: ILocale = {
    locale: 'de',
    LoadMore: {
        loadMoreText: ' um mehr zu laden',
        loadingText: 'Wird geladen...',
        noDataText: 'Keine weiteren Daten',
        failLoadText: 'Laden fehlgeschlagen, zum Wiederholen klicken',
        prepareScrollText: 'Hochziehen',
        prepareClickText: 'Klicken',
    },
    Picker: {
        okText: 'Bestätigen',
        cancelText: 'Abbrechen',
    },
    Tag: {
        addTag: 'Tag hinzufügen',
    },
    Dialog: {
        okText: 'Bestätigen',
        cancelText: 'Abbrechen',
    },
    SwipeLoad: {
        normalText: 'Mehr',
        activeText: 'Loslassen zum Anzeigen',
    },
    PullRefresh: {
        loadingText: 'Wird geladen...',
        pullingText: 'Ziehen zum Aktualisieren',
        finishText: 'Aktualisierung erfolgreich',
        loosingText: 'Loslassen zum Aktualisieren',
    },
    DropdownMenu: {
        select: 'Bitte auswählen',
    },
    Pagination: {
        previousPage: 'Vorherige Seite',
        nextPage: 'Nächste Seite',
    },
    Image: {
        loadError: 'Wiederholen',
    },
    ImagePicker: {
        loadError: 'Laden fehlgeschlagen',
    },
    SearchBar: {
        placeholder: 'Suchbegriff eingeben',
        cancelBtn: 'Abbrechen',
    },
    Stepper: {
        minusButtonName: 'Verringern',
        addButtonName: 'Erhöhen',
    },
    Keyboard: {
        confirm: 'Fertig',
    },
    Form: {
        required: '%s ist erforderlich',
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
            min: '`%s` darf nicht kleiner als `%s` sein',
            max: '`%s` darf nicht größer als `%s` sein',
            equal: '`%s` ist nicht gleich `%s`',
            range: '`%s` ist nicht im Bereich `%s ~ %s`',
            positive: '`%s` ist nicht positiv',
            negative: '`%s` ist nicht negativ',
        },
        string: {
            max: '%s darf nicht länger als %s Zeichen sein',
            min: '%s muss mindestens %s Zeichen lang sein',
            len: '%s muss %s Zeichen haben',
            equal: '%s ist nicht gleich `%s`',
            match: '`%s` entspricht nicht dem Muster %s',
            uppercase: '%s muss in Großbuchstaben sein',
            lowercase: '%s muss in Kleinbuchstaben sein',
            whitespace: '%s darf keine Leerzeichen sein',
        },
        array: {
            max: 'Die Länge von `%s` darf `%s` nicht überschreiten',
            min: 'Die Länge von `%s` muss mindestens `%s` sein',
            len: '%s Array-Länge muss %s sein',
            includes: '%s enthält nicht %s',
            deepEqual: '%s ist nicht vollständig gleich %s',
        },
        object: {
            deepEqual: '%s ist nicht vollständig gleich %s',
            hasKeys: '%s enthält nicht die erforderlichen Felder %s',
        },
        boolean: {
            equal: '%s ist nicht gleich `%s`',
        },
        pickerDefaultHint: 'Bitte wählen Sie',
    },
    NavBar: {
        backBtnAriaLabel: 'Zurück',
    },
    Uploader: {
        uploadBtn: 'Hochladen',
        retryUpload: 'Wiederholen',
    },
};

export default localeConfig;
