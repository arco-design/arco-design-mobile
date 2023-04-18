## 基础用法 @en{Basic Usage}

#### 1

```js
import { IndexBar, Radio, Tabs, Toast } from '@arco-design/mobile-react';
import { useState, useRef } from 'react';

const locationData = {
    A: ['鞍山', '安庆', '安阳', '安康'],
    B: ['北京', '保定', '包头', '蚌埠'],
    C: ['成都', '重庆', '朝阳', '长春'],
    D: ['大成', '大拟', '丹东', '定边'],
    E: ['鄂尔多斯', '二道湾', '二龙', '峨眉'],
    F: ['福州', '奉化', '福海', '肥东'],
    G: ['广州', '贵阳', '广安', '广州南'],
};

const formatLocationData = Object.entries(locationData).map(([key, values]) => {
    return {
        index: key,
        list: values.map(value => ({ content: value })),
    };
});

const jsxData = new Array(15).fill(0).map((_, index) => {
    return {
        index: index + 1,
        list: new Array(4).fill(0).map(() => ({ content: '文本' })),
    };
});

export default function IndexBarDemo() {
    const tabData = [{ title: '基础样式' }, { title: '自定义' }];

    // 如果IndexBar组件开启了sticky选项，在与Tabs组件配合时
    // 切换tab后会导致Sticky组件的位置发生突变，而Sticky难以感知
    const customIndexBarRef = useRef();
    // 该例子中，初始化时【自定义】tab下的IndexBar的Sticky组件位置在屏幕外
    // 当我们从【基础样式】切换到【自定义时】IndexBar的位置发生了改变
    // 需要我们手动重新调整下Sticky的位置
    // 该问题一般发生在组件挂载时，因此我们调用一次即可
    const hasIndexBarStickyRecaculated = useRef(false);
    const handleAfterChange = () => {
        if (
            !hasIndexBarStickyRecaculated.current &&
            customIndexBarRef.current &&
            customIndexBarRef.current.recalculatePosition
        ) {
            customIndexBarRef.current.recalculatePosition();
            hasIndexBarStickyRecaculated.current = true;
        }
    };

    // 使用IndexBar的普通写法
    const renderIndexBarWithGroups = () => {
        return (
            <IndexBar
                className="custom-index-bar-height"
                groups={formatLocationData}
                tipType="toast"
                onGroupItemClick={(index, itemData) => Toast.toast(itemData.content)}
            />
        );
    };

    // 使用IndexBar的jsx写法
    const renderIndexBarWithJsx = () => {
        return (
            <IndexBar className="custom-index-bar-height" tipType="sweat" ref={customIndexBarRef}>
                {jsxData.map(item => {
                    return (
                        <IndexBar.Group
                            index={item.index}
                            list={item.list}
                            key={item.index}
                            onGroupItemClick={(index, itemData) => Toast.toast(itemData.content)}
                        />
                    );
                })}
            </IndexBar>
        );
    };

    return (
        <Tabs tabs={tabData} stopPropagation={false} onAfterChange={handleAfterChange}>
            {renderIndexBarWithGroups()}
            {renderIndexBarWithJsx()}
        </Tabs>
    );
}
```
