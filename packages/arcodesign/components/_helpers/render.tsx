import React, { FunctionComponent } from 'react';
import { RootType, render as copyRender } from './react-dom';
import { GlobalContextParams } from '../context-provider';

export const renderRootCache: Record<string, RootType | undefined> = {};

export class ReactDOMRender {
    root: RootType | undefined;

    app: FunctionComponent;

    container: Element | DocumentFragment;

    context: GlobalContextParams | undefined;

    rootCacheId: string | undefined;

    constructor(
        app: FunctionComponent,
        container: Element | DocumentFragment,
        context?: GlobalContextParams,
        rootCacheId?: string, // root id in cache
        root?: RootType, // use root in cache
    ) {
        this.app = app;
        this.container = container;
        this.context = context;
        this.rootCacheId = rootCacheId;
        this.root = root;
    }

    render = props => {
        const CustomApp = this.app;
        const propsWithContext = { ...props, context: this.context };
        if (this.root) {
            this.root.render(<CustomApp {...propsWithContext} />);
        } else {
            this.root = copyRender(<CustomApp {...propsWithContext} />, this.container);
        }
    };

    setRootCache = () => {
        if (this.rootCacheId) {
            renderRootCache[this.rootCacheId] = this.root;
        }
    };

    clearRootCache = () => {
        if (this.rootCacheId) {
            delete renderRootCache[this.rootCacheId];
        }
    };

    unmount = () => {
        this.root?._unmount();
        this.root = undefined;
        this.clearRootCache();
    };
}
