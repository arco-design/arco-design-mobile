import React from 'react';
import { open as maskingOpen, OpenBaseProps } from '../masking/methods';

export function open<P extends OpenBaseProps>(Component: React.FunctionComponent<P>) {
    return maskingOpen(Component, 'ARCO_POPUP_SWIPER');
}
