import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import { IndexBarGroup } from './group';
import { IndexBarIndexType } from './type';

export function filterValidIndexBarChild(children: ReactNode) {
    const validChildren: ReactElement[] = [];
    Children.forEach(children, child => {
        if (!isValidElement(child) || child.type !== IndexBarGroup) {
            console.warn('<IndexBar /> only accept <IndexBar.Group /> as the children');
            return;
        }
        validChildren.push(child);
    });
    return validChildren;
}

export function getGroupDomFromIndex(containerDom: HTMLDivElement, index: IndexBarIndexType) {
    let targetDom: HTMLDivElement | null = null;

    const containerChildren = containerDom.children;
    for (let i = 0; i < containerChildren.length; i++) {
        const dom = containerChildren[i] as HTMLDivElement;
        const dataset = dom?.dataset;
        if (dataset && dataset.index === index) {
            targetDom = dom;
            break;
        }
    }

    return targetDom;
}
