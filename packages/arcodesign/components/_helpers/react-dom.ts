import { ReactElement } from 'react';
import * as ReactDOM from 'react-dom';

function isObject(obj: any): obj is { [key: string]: any } {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

export interface RootType {
    render: (container: ReactElement) => void;
    _unmount: () => void;
}
export interface RootTypeReact extends RootType {
    unmount?: () => void;
}
export type CreateRootFnType = (container: Element | DocumentFragment) => RootTypeReact;

const CopyReactDOM = {
    ...ReactDOM,
} as typeof ReactDOM & {
    createRoot: CreateRootFnType;
    // https://github.com/facebook/react/blob/4ff5f5719b348d9d8db14aaa49a48532defb4ab7/packages/react-dom/src/client/ReactDOM.js#L181
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
        usingClientEntryPoint?: boolean;
    };
};

let copyRender: (
    app: ReactElement,
    container: Element | DocumentFragment,
) => {
    render: (container: ReactElement) => void;
    _unmount: () => void;
};

const { version, render: reactRender, unmountComponentAtNode } = CopyReactDOM;

const isReact18 = Number((version || '').split('.')[0]) > 17;

const updateUsingClientEntryPoint = (skipWarning?: boolean) => {
    // https://github.com/facebook/react/blob/17806594cc28284fe195f918e8d77de3516848ec/packages/react-dom/npm/client.js#L10
    // Avoid console warning
    const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = CopyReactDOM;
    if (isObject(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)) {
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skipWarning;
    }
};

let createRoot: CreateRootFnType | undefined;
try {
    ({ createRoot } = CopyReactDOM);
} catch (_) {}

if (isReact18 && createRoot) {
    copyRender = (app: ReactElement, container: Element | DocumentFragment) => {
        updateUsingClientEntryPoint(true);
        const root = (createRoot as CreateRootFnType)(container);
        updateUsingClientEntryPoint(false);

        root.render(app);

        root._unmount = function () {
            setTimeout(() => {
                root?.unmount?.();
            });
        };
        return root;
    };
} else {
    copyRender = function (app: ReactElement, container: Element | DocumentFragment) {
        reactRender(app, container);

        return {
            render: (comment: ReactElement) => {
                reactRender(comment, container);
            },
            _unmount() {
                unmountComponentAtNode(container);
            },
        };
    };
}

export const render = copyRender;
