import React, { FunctionComponent } from 'react';
import { RootType, render as copyRender } from './react-dom';

export class ReactDOMRender {
    root: RootType | undefined;

    app: FunctionComponent;

    container: Element | DocumentFragment;

    constructor(app: FunctionComponent, container: Element | DocumentFragment) {
        this.app = app;
        this.container = container;
    }

    render = props => {
        const CustomApp = this.app;
        if (this.root) {
            this.root.render(<CustomApp {...props} />);
        } else {
            this.root = copyRender(<CustomApp {...props} />, this.container);
        }
    };

    unmount = () => {
        this.root?._unmount();
        this.root = undefined;
    };
}
