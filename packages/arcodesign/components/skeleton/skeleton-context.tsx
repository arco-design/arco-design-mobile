import React from 'react';
import { SkeletonContextParams } from './type';

export const SkeletonContext = React.createContext<SkeletonContextParams>({
    animation: undefined,
});
