import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom';

function isObject(obj: any): obj is { [key: string]: any } {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export interface RootType {
    render: (element: ReactElement) => void;
    _unmount: () => void;
}
export interface RootTypeReact extends RootType {
    unmount?: () => void;
}
export type CreateRootFnType = (container: Element | DocumentFragment) => {
    render: (element: ReactElement) => void;
    unmount?: () => void;
};

// Cast ReactDOM to a version that might have createRoot and other properties
const typedReactDOM = ReactDOM as typeof ReactDOM & {
    createRoot?: CreateRootFnType;
    render?: (
        element: ReactElement,
        container: Element | DocumentFragment,
        callback?: () => void,
    ) => any;
    unmountComponentAtNode?: (container: Element | DocumentFragment) => boolean;
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
        usingClientEntryPoint?: boolean;
    };
};

let copyRender: (
    app: ReactElement,
    container: Element | DocumentFragment,
    createRootFunction?: CreateRootFnType,
) => RootType;

const updateUsingClientEntryPoint = (skipWarning?: boolean) => {
    // https://github.com/facebook/react/blob/17806594cc28284fe195f918e8d77de3516848ec/packages/react-dom/npm/client.js#L10
    // Avoid console warning
    const secretInternals = typedReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    if (isObject(secretInternals)) {
        secretInternals.usingClientEntryPoint = skipWarning;
    }
};

const createRootFn = typedReactDOM.createRoot;

const getRender =
    (createRootFunction: CreateRootFnType) =>
    (app: ReactElement, container: Element | DocumentFragment) => {
        updateUsingClientEntryPoint(true);
        const root = createRootFunction!(container);
        updateUsingClientEntryPoint(false);

        root.render(app);

        return {
            render: (elementToRender: ReactElement) => {
                root.render(elementToRender);
            },
            _unmount() {
                setTimeout(() => {
                    if (root && typeof root.unmount === 'function') {
                        root.unmount();
                    }
                });
            },
        };
    };

if (createRootFn) {
    // React 18
    copyRender = getRender(createRootFn);
} else if (
    typeof typedReactDOM.render === 'function' &&
    typeof typedReactDOM.unmountComponentAtNode === 'function'
) {
    // React 16/17
    copyRender = function (app: ReactElement, container: Element | DocumentFragment) {
        typedReactDOM.render!(app, container); // Use non-null assertion
        return {
            render: (elementToRender: ReactElement) => {
                typedReactDOM.render!(elementToRender, container); // Use non-null assertion
            },
            _unmount() {
                typedReactDOM.unmountComponentAtNode!(container); // Use non-null assertion
            },
        };
    };
} else {
    copyRender = (
        app: ReactElement,
        container: Element | DocumentFragment,
        createRootFunction?: CreateRootFnType,
    ) => {
        const defaultCb = () => {
            // Fallback if no rendering method is found
            console.error(
                'ArcoDesign: ReactDOM.createRoot() or ReactDOM.render() not found. ' +
                    'This usually means you are using an unsupported version of React, ' +
                    'or ReactDOM is not properly initialized. ' +
                    'ArcoDesign Mobile React requires React 16, 17, 18, or 19.',
            );
            return { render: (_element: ReactElement) => {}, _unmount: () => {} };
        };
        if (createRootFunction) {
            return getRender(createRootFunction)(app, container);
        }
        return defaultCb();
    };
}

export const render = copyRender;
