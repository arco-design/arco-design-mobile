import type React from 'react';
import { appendElementById, removeElement } from '@arco-design/mobile-utils';
import { ReactDOMRender } from '../_helpers/render';
import type { GlobalContextParams } from '../context-provider';

export interface OpenBaseProps {
    onClose?: () => void;
    close: (e) => void;
    openIndex: number;
    images: any[];
    getContainer?: () => HTMLElement;
}

const activePreviews: Record<string, (() => void) | undefined> = {};

export function open<P extends OpenBaseProps>(Component: React.FunctionComponent<P>) {
    type Config = Omit<P, 'close'>;
    return (config: Config, context?: GlobalContextParams) => {
        const baseProps: Config & { key?: string } = { ...config };
        const id = `_ARCO_IMAGE_PREVIEW_DIV_${baseProps.key || ''}_`;
        // 同 key 重开时先移除旧节点，避免 React 延迟卸载时碰到新实例
        // @en Detach the old mount first: React may defer unmounting its root.
        activePreviews[id]?.();
        const { child: div } = appendElementById(id, baseProps.getContainer);
        const renderer = new ReactDOMRender(Component, div, context);
        let dynamicProps = { ...baseProps, getContainer: () => div, close, openIndex: -1 };
        let openTimer: number | undefined;
        let leaving = false;

        function isCurrent() {
            return activePreviews[id] === cleanup;
        }

        function cleanup() {
            if (!isCurrent()) return;
            delete activePreviews[id];
            clearTimeout(openTimer);
            removeElement(div);
            renderer.unmount();
        }

        function render() {
            const { onClose } = dynamicProps;
            renderer.render({
                ...dynamicProps,
                onClose: () => {
                    try {
                        onClose?.();
                    } finally {
                        cleanup();
                    }
                },
            });
        }

        function update(newConfig: Config) {
            if (!isCurrent()) return;
            dynamicProps = { ...dynamicProps, ...newConfig };
            render();
        }

        function close() {
            if (leaving || !isCurrent()) return;
            leaving = true;
            if (openTimer !== undefined) {
                cleanup();
                return;
            }
            dynamicProps.openIndex = -1;
            render();
        }

        activePreviews[id] = cleanup;
        render();
        openTimer = window.setTimeout(() => {
            openTimer = undefined;
            if (leaving || !isCurrent()) return;
            dynamicProps.openIndex = baseProps.openIndex;
            render();
        }, 20);

        return {
            close,
            update,
        };
    };
}
