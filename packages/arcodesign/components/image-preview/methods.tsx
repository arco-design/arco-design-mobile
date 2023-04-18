import React from 'react';
import { appendElementById, removeElement } from '@arco-design/mobile-utils';
import { ReactDOMRender } from '../_helpers/render';
import { GlobalContextParams } from '../context-provider';

export interface OpenBaseProps {
    onClose?: () => void;
    close: (e) => void;
    openIndex: number;
    images: any[];
}

export function open<P extends OpenBaseProps>(Component: React.FunctionComponent<P>) {
    type Config = Omit<P, 'close'>;
    return (config: Config, context?: GlobalContextParams) => {
        const baseProps: Config & {
            // 从config继承的属性
            // @en Properties inherited from config
            unmountOnExit?: boolean;
            getContainer?: () => HTMLElement;
            key?: string;
            openIndex: P['openIndex'];
            // 强制定义的属性
            // @en Mandatory properties
            onClose?: P['onClose'];
            close: P['close'];
        } = {
            unmountOnExit: true,
            ...(config || {}),
            close: () => {},
        };

        let dynamicProps = { ...baseProps } as P;

        // 不同的key用不同的容器挂载
        // @en Different keys are mounted in different containers
        const id = `_ARCO_IMAGE_PREVIEW_DIV_${baseProps.key || ''}_`;
        const { child: div } = appendElementById(id, baseProps.getContainer);
        let leaving = false;
        const { render } = new ReactDOMRender(Component, div, context);

        function update(newConfig: Config) {
            dynamicProps = {
                ...dynamicProps,
                ...(newConfig || {}),
            };
            render(dynamicProps);
        }

        function close() {
            leaving = true;
            dynamicProps.openIndex = -1;
            render(dynamicProps);
        }

        dynamicProps.close = close;
        dynamicProps.onClose = () => {
            baseProps.onClose && baseProps.onClose();
            if (baseProps.unmountOnExit) {
                removeElement(div);
            }
        };
        dynamicProps.openIndex = -1;
        render(dynamicProps);
        setTimeout(() => {
            if (leaving) return;
            dynamicProps.openIndex = baseProps.openIndex;
            render(dynamicProps);
        }, 20);

        return {
            close,
            update,
        };
    };
}
