import { nextTick } from '@arco-design/mobile-utils';
import type React from 'react';
import { ReactDOMRender } from '../_helpers/render';
import type { GlobalContextParams } from '../context-provider';

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

        const renderer = new ReactDOMRender(Component, div, context);
        let dynamicProps = {
            ...config,
            close,
            getContainer: () => div,
            visible: false,
        };

        let leaving = false;

        function destroy() {
            const { onClose } = dynamicProps;
            try {
                onClose?.();
            } finally {
                renderer.unmount();
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
            }
        }

        function render() {
            renderer.render({ ...dynamicProps, onClose: destroy });
        }

        function update(newConfig: Config) {
            dynamicProps = {
                ...dynamicProps,
                ...newConfig,
            };
            render();
        }

        function close() {
            leaving = true;
            dynamicProps.visible = false;
            render();
        }
        render();

        nextTick(() => {
            if (leaving) return;
            dynamicProps.visible = true;
            render();
        });

        return {
            update,
            close,
        };
    };
}
