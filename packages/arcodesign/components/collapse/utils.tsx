import React, { Context } from 'react';
import { GroupContextParams } from './type';

export const defaultContextKey = '__COLLAPSE_CONTEXT__';
export const allContexts: Record<string, Context<GroupContextParams>> = {};

export function getCollapseContext(key: string) {
    if (!allContexts[key]) {
        allContexts[key] = React.createContext<GroupContextParams>({
            isGroup: false,
            value: [],
            onCollapse: () => {},
        });
    }
    return allContexts[key];
}

export const CollapseKeyContext = React.createContext<{ key: string }>({
    key: defaultContextKey,
});
