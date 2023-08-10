import React from 'react';
import { SkeletonContextParams, SkeletonProps } from './type';

export const SkeletonContext = React.createContext<SkeletonContextParams>({
    showAnimation: true,
    animation: 'gradient' as SkeletonProps['animation'],
});
