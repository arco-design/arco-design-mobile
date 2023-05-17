import { Children, isValidElement, ReactElement, ReactNode } from 'react';
import { IndexBarIndexType } from './type';

export function filterValidIndexBarChild(children: ReactNode) {
    const validChildren: ReactElement[] = [];
    Children.forEach(children, child => {
        if (!isValidElement(child)) {
            console.warn('<IndexBar /> only accept <IndexBar.Group /> as the children');
            return;
        }
        validChildren.push(child);
    });
    return validChildren;
}

// index有可能是number或者string，但是绑在data-index的attr上后
// 通过滑动事件得到的都是string，需要处理下
export function getFormatIndex(
    index: IndexBarIndexType,
    activeIndex: IndexBarIndexType | undefined,
) {
    const activeIndexType = typeof activeIndex;
    const indexType = typeof index;
    if (indexType === activeIndexType) {
        return index;
    }
    if (activeIndexType === 'number') {
        return Number(index);
    }
    return index.toString();
}

export function isValidIndex(index: unknown): index is IndexBarIndexType {
    return typeof index === 'number' || typeof index === 'string';
}

export function getGroupDomFromIndex(containerDom: HTMLDivElement, activeIndex: IndexBarIndexType) {
    let targetDom: HTMLDivElement | null = null;

    const containerChildren = containerDom.children;
    for (let i = 0; i < containerChildren.length; i++) {
        const dom = containerChildren[i] as HTMLDivElement;
        const dataset = dom?.dataset;
        if (dataset && dataset.index) {
            const formatIndex = getFormatIndex(dataset.index, activeIndex);
            if (formatIndex === activeIndex) {
                targetDom = dom;
                break;
            }
        }
    }

    return targetDom;
}
