import React, { FunctionComponent } from 'react';
import { RootType, render as copyRender } from './react-dom';
import { GlobalContextParams } from '../context-provider';

export class ReactDOMRender {
    root: RootType | undefined;

    app: FunctionComponent;

    container: Element | DocumentFragment;

    context: GlobalContextParams | undefined;

    constructor(
        app: FunctionComponent,
        container: Element | DocumentFragment,
        context?: GlobalContextParams,
    ) {
        this.app = app;
        this.container = container;
        this.context = context;
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

    unmount = () => {
        this.root?._unmount();
        this.root = undefined;
    };
}
