import type { ILocale } from './type';

const defaultMessageTemplate = "%s n'est pas du type %s";

const localeConfig: ILocale = {
    locale: 'fr',
    LoadMore: {
        loadMoreText: ' pour charger davantage',
        loadingText: 'Chargement...',
        noDataText: 'Aucune autre donnée',
        failLoadText: 'Échec du chargement, cliquez pour réessayer',
        prepareScrollText: 'Tirer vers le haut',
        prepareClickText: 'Cliquez',
    },
    Picker: {
        okText: 'Confirmer',
        cancelText: 'Annuler',
    },
    Tag: {
        addTag: 'Ajouter une étiquette',
    },
    Dialog: {
        okText: 'Confirmer',
        cancelText: 'Annuler',
    },
    SwipeLoad: {
        normalText: 'Voir plus',
        activeText: 'Relâcher pour voir',
    },
    PullRefresh: {
        loadingText: 'Chargement...',
        pullingText: 'Tirer pour actualiser',
        finishText: 'Actualisation réussie',
        loosingText: 'Relâcher pour actualiser',
    },
    DropdownMenu: {
        select: 'Veuillez sélectionner',
    },
    Pagination: {
        previousPage: 'Page précédente',
        nextPage: 'Page suivante',
    },
    Image: {
        loadError: 'Réessayer',
    },
    ImagePicker: {
        loadError: 'Échec du chargement',
    },
    SearchBar: {
        placeholder: 'Veuillez saisir le contenu à rechercher',
        cancelBtn: 'Annuler',
    },
    Stepper: {
        minusButtonName: 'diminuer',
        addButtonName: 'augmenter',
    },
    Keyboard: {
        confirm: 'Terminé',
    },
    Form: {
        required: '%s est requis',
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
            min: '`%s` doit être au moins `%s`',
            max: '`%s` ne doit pas dépasser `%s`',
            equal: '`%s` doit être égal à `%s`',
            range: '`%s` doit être compris entre `%s` et `%s`',
            positive: '`%s` ne peut pas être inférieur à 0',
            negative: '`%s` ne peut pas être supérieur à 0',
        },
        string: {
            max: '%s ne peut pas dépasser %s caractères',
            min: '%s doit comporter au moins %s caractères',
            len: '%s doit comporter exactement %s caractères',
            equal: '%s doit être égal à `%s`',
            match: '`%s` ne correspond pas au format %s',
            uppercase: '%s doit être entièrement en majuscules',
            lowercase: '%s doit être entièrement en minuscules',
            whitespace: "%s ne peut pas être une chaîne d'espaces",
        },
        array: {
            max: 'La longueur de %s ne peut pas dépasser %s',
            min: 'La longueur de %s ne peut pas être inférieure à %s',
            len: 'La longueur de %s doit être exactement %s',
            includes: '%s ne contient pas %s',
            deepEqual: "%s n'est pas strictement égal à %s",
        },
        object: {
            deepEqual: "%s n'est pas strictement égal à %s",
            hasKeys: '%s ne contient pas les champs requis %s',
        },
        boolean: {
            equal: '%s doit être égal à `%s`',
        },
        pickerDefaultHint: 'Veuillez sélectionner',
    },
    NavBar: {
        backBtnAriaLabel: 'Retour',
    },
    Uploader: {
        uploadBtn: 'Téléverser',
        retryUpload: 'Réessayer',
    },
};

export default localeConfig;
