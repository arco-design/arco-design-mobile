import React from 'react';
import { ILocale } from '@arco-design/mobile-utils';
import { getOpenMethod, open as maskingOpen, OpenBaseProps } from '../masking/methods';

export function normalizeAlert<AlertOptions, P>(config: AlertOptions): P {
    const { onOk, okText, ...restConfig } = config || ({} as any);
    return {
        footer: [
            {
                content: okText || ((locale: ILocale) => locale.Dialog.okText),
                className: 'confirm',
                onClick: onOk,
            },
        ],
        ...restConfig,
    };
}

export function normalizeConfirm<ConfirmOptions, P>(config: ConfirmOptions): P {
    const { onOk, okText, onCancel, cancelText, ...restConfig } = config || ({} as any);
    return {
        footer: [
            {
                content: cancelText || ((locale: ILocale) => locale.Dialog.cancelText),
                className: 'cancel',
                onClick: onCancel,
            },
            {
                content: okText || ((locale: ILocale) => locale.Dialog.okText),
                className: 'confirm',
                onClick: onOk,
            },
        ],
        ...restConfig,
    };
}

const dialogId = 'ARCO_DIALOG';

export function alert<AlertOptions, P extends OpenBaseProps>(
    Component: React.FunctionComponent<P>,
    normalize?: <T, Props>(config: T) => Props,
) {
    return getOpenMethod<AlertOptions, P>(Component, dialogId, normalize || normalizeAlert);
}

export function confirm<ConfirmOptions, P extends OpenBaseProps>(
    Component: React.FunctionComponent<P>,
    normalize?: <T, Props>(config: T) => Props,
) {
    return getOpenMethod<ConfirmOptions, P>(Component, dialogId, normalize || normalizeConfirm);
}

export function open<P extends OpenBaseProps>(Component: React.FunctionComponent<P>) {
    return maskingOpen(Component, dialogId);
}
