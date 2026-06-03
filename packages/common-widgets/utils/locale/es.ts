import type { ILocale } from './type';

const defaultMessageTemplate = '%s no es del tipo %s';
const localeConfig: ILocale = {
    locale: 'es',
    LoadMore: {
        loadMoreText: ' para cargar más',
        loadingText: 'Cargando...',
        noDataText: 'No hay más datos disponibles',
        failLoadText: 'Error al cargar, haga clic para reintentar',
        prepareScrollText: 'Deslizar hacia arriba',
        prepareClickText: 'Hacer clic',
    },
    Picker: {
        okText: 'Confirmar',
        cancelText: 'Cancelar',
    },
    Tag: {
        addTag: 'Añadir etiqueta',
    },
    Dialog: {
        okText: 'Confirmar',
        cancelText: 'Cancelar',
    },
    SwipeLoad: {
        normalText: 'Más',
        activeText: 'Soltar para ver',
    },
    PullRefresh: {
        loadingText: 'Cargando...',
        pullingText: 'Deslizar para actualizar',
        finishText: 'Actualización exitosa',
        loosingText: 'Soltar para actualizar',
    },
    DropdownMenu: {
        select: 'Por favor seleccione',
    },
    Pagination: {
        previousPage: 'Página anterior',
        nextPage: 'Página siguiente',
    },
    Image: {
        loadError: 'Reintentar',
    },
    ImagePicker: {
        loadError: 'Error al cargar',
    },
    SearchBar: {
        placeholder: 'Ingrese contenido a buscar',
        cancelBtn: 'Cancelar',
    },
    Stepper: {
        minusButtonName: 'Reducir',
        addButtonName: 'Aumentar',
    },
    Keyboard: {
        confirm: 'Confirmar',
    },
    Form: {
        required: 'El campo %s es obligatorio',
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
            min: '`%s` no puede ser menor que `%s`',
            max: '`%s` no puede ser mayor que `%s`',
            equal: '`%s` debe ser igual a `%s`',
            range: '`%s` debe estar entre `%s` y `%s`',
            positive: '`%s` debe ser un número positivo',
            negative: '`%s` debe ser un número negativo',
        },
        string: {
            max: '%s no puede tener más de %s caracteres',
            min: '%s no puede tener menos de %s caracteres',
            len: '%s debe tener exactamente %s caracteres',
            equal: '%s no es igual a `%s`',
            match: '`%s` no coincide con el formato %s',
            uppercase: '%s debe estar en MAYÚSCULAS',
            lowercase: '%s debe estar en minúsculas',
            whitespace: '%s no puede contener solo espacios en blanco',
        },
        array: {
            max: 'La longitud de %s no puede ser mayor que %s',
            min: 'La longitud de %s no puede ser menor que %s',
            len: 'La longitud de %s debe ser %s',
            includes: '%s debe incluir %s',
            deepEqual: '%s debe ser estrictamente igual a %s',
        },
        object: {
            deepEqual: '%s no es completamente igual a %s',
            hasKeys: '%s debe contener los campos obligatorios %s',
        },
        boolean: {
            equal: '%s no es igual a `%s`',
        },
        pickerDefaultHint: 'Selecciona una opción',
    },
    NavBar: {
        backBtnAriaLabel: 'Volver',
    },
    Uploader: {
        uploadBtn: 'Subir',
        retryUpload: 'Reintentar',
    },
};

export default localeConfig;
