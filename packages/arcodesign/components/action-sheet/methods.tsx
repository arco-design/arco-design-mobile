import type React from 'react';
import type { OpenBaseProps } from '../masking/methods';
import { open as maskingOpen } from '../masking/methods';

export function open<P extends OpenBaseProps>(Component: React.FunctionComponent<P>) {
    return maskingOpen(Component, 'ARCO_ACTION_SHEET');
}
