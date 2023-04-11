/**
 * context should be created in separated filed to fix vite hot reload crash error
 * https://github.com/vitejs/vite/issues/3301
 */

import { createContext } from 'react';

export const HistoryContext = createContext<any>(null);
