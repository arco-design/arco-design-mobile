import { nextTick } from '@arco-design/mobile-utils';
import React from 'react';
import { ReactDOMRender } from '../_helpers/render';
import { GlobalContextParams } from '../context-provider';

export interface NotifyBaseProps {
    getContainer?: () => HTMLElement;
    onClose?: (scene?: string) => void;
    content?: React.ReactNode;
    visible?: boolean;
    close?: (e) => void;
    type?: string;
}

export function notify<P extends NotifyBaseProps>(Component: React.FC<P>, type?: string) {
    type Config = Omit<P, 'visible' | 'close'>;
    return (originConfig: string | Config, context?: GlobalContextParams) => {
        const config =
            typeof originConfig === 'string'
                ? ({
                      content: originConfig,
                      type: 'info',
                  } as Config)
                : originConfig;
        if (type !== void 0) {
            config.type = type;
        }
        const div = document.createElement('div');
        const { getContainer } = config;
        if (getContainer) {
            getContainer().appendChild(div);
        } else {
            document.body.appendChild(div);
        }

        const { render, unmount } = new ReactDOMRender(Component, div, context);

        function destroy() {
            const { onClose } = config;
            onClose && onClose();
            unmount();
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }

        let dynamicProps = {
            ...config,
            close,
            onClose: destroy,
            getContainer: () => div,
            visible: false,
        };

        let leaving = false;

        function update(newConfig: Config) {
            dynamicProps = {
                ...dynamicProps,
                ...newConfig,
            };
            render(dynamicProps);
        }

        function close() {
            leaving = true;
            dynamicProps.visible = false;
            render(dynamicProps);
        }
        render(dynamicProps);

        nextTick(() => {
            if (leaving) return;
            dynamicProps.visible = true;
            render(dynamicProps);
        });

        return {
            update,
            close,
        };
    };
}
