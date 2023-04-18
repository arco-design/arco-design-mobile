import React from 'react';
import { appendElementById, removeElement, nextTick } from '@arco-design/mobile-utils';
import { ReactDOMRender } from '../_helpers/render';
import { GlobalContextParams } from '../context-provider';

export interface OpenBaseProps {
    // 从config继承的属性
    unmountOnExit?: boolean;
    getContainer?: () => HTMLElement;
    onClose?: (scene?: string) => void;
    // 强制定义的属性
    visible: boolean;
    close: (e) => void;
}

export function getOpenMethod<T extends { key?: string }, P extends OpenBaseProps>(
    Component: React.FunctionComponent<P>,
    containerId?: string,
    normalize: (config: T) => P = config => config as any,
) {
    return (config: T, context?: GlobalContextParams) => {
        const baseProps: P = {
            unmountOnExit: true,
            ...normalize(config),
            visible: false,
            close: () => {},
        };

        let dynamicProps = { ...baseProps };

        // 不同的key用不同的容器挂载
        const id = `_${containerId || 'ARCO_MASKING'}_DIV_${config.key || ''}_`;
        const { child: div } = appendElementById(id, baseProps.getContainer);
        let leaving = false;
        const { render } = new ReactDOMRender(Component, div, context);

        function update(newConfig: T) {
            dynamicProps = {
                ...dynamicProps,
                ...normalize(newConfig),
            };
            render(dynamicProps);
        }

        function close() {
            leaving = true;
            dynamicProps.visible = false;
            render(dynamicProps);
        }

        dynamicProps.close = close;
        dynamicProps.onClose = scene => {
            baseProps.onClose && baseProps.onClose(scene);
            if (baseProps.unmountOnExit) {
                removeElement(div);
            }
        };
        render(dynamicProps);
        nextTick(() => {
            if (leaving) return;
            dynamicProps.visible = true;
            render(dynamicProps);
        });

        return {
            close,
            update,
        };
    };
}

export function open<P extends OpenBaseProps>(
    Component: React.FunctionComponent<P>,
    containerId?: string,
) {
    type Config = Omit<P, 'visible' | 'close'> & { key?: string };
    return getOpenMethod<Config, P>(Component, containerId);
}
