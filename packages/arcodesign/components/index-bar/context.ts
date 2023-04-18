import { createContext } from 'react';
import type { IndexBarContext as IndexBarContextType } from './type';

export const IndexBarContext = createContext<IndexBarContextType>({
    sticky: true,
    getScrollContainer: () => null,
    updateRef: () => {},
});
