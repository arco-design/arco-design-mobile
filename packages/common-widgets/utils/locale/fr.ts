import type { ILocale } from './type';

const defaultMessageTemplate = "%s n'est pas de type %s";
const localeConfig: ILocale = {
    locale: 'fr',
    LoadMore: {
        loadMoreText: ' pour charger plus',
        loadingText: 'Chargement...',
        noDataText: 'Aucune donnée supplémentaire',
        failLoadText: 'Échec du chargement, cliquez pour réessayer',
        prepareScrollText: 'Tirez vers le haut',
        prepareClickText: 'Cliquez',
    },
    Picker: {
        okText: 'OK',
        cancelText: 'Annuler',
    },
    Tag: {
        addTag: 'Ajouter une étiquette',
    },
    Dialog: {
        okText: 'OK',
        cancelText: 'Annuler',
    },
    SwipeLoad: {
        normalText: 'Plus',
        activeText: 'Relâchez pour voir',
    },
    PullRefresh: {
        loadingText: 'Chargement...',
        pullingText: 'Tirez pour actualiser',
        finishText: 'Actualisation réussie',
        loosingText: 'Relâchez pour actualiser',
    },
    DropdownMenu: {
        select: 'Veuillez sélectionner',
    },
    Pagination: {
        previousPage: 'Précédent',
        nextPage: 'Suivant',
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
            range: '`%s` doit être dans la plage `%s ~ %s`',
            positive: '`%s` ne peut pas être inférieur à 0',
            negative: '`%s` ne peut pas être supérieur à 0',
        },
        string: {
            max: '%s ne peut pas dépasser %s caractères',
            min: '%s doit avoir au moins %s caractères',
            len: '%s doit avoir exactement %s caractères',
            equal: '%s doit être égal à `%s`',
            match: '`%s` ne correspond pas au motif %s',
            uppercase: '%s doit être entièrement en majuscules',
            lowercase: '%s doit être entièrement en minuscules',
            whitespace: "%s ne peut pas être une chaîne d'espaces",
        },
        array: {
            max: '%s ne peut pas dépasser %s en longueur',
            min: '%s ne peut pas être inférieur à %s en longueur',
            len: '%s doit avoir exactement %s en longueur',
            includes: "%s n'inclut pas %s",
            deepEqual: "%s n'est pas profondément égal à %s",
        },
        object: {
            deepEqual: "%s n'est pas profondément égal à %s",
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
        uploadBtn: 'Télécharger',
        retryUpload: 'Réessayer',
    },
};

export default localeConfig;
