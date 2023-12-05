## 自定义内容选项卡 @en{Custom Content}

#### 10

```js
import { Tabs } from '@arco-design/mobile-react';
import './index.less';

const tabData = [
    { title: 'Example' },
    { title: 'Example' },
    { title: 'Example' },
];

export default function TabsDemo() {
    return (
        <Tabs
            tabs={tabData}
            type="tag-divide"
            className="demo-tab-custom-bar"
            tabBarPadding={22}
            tabBarGutter={45}
            renderTabBarItem={(tab, _, { active }) => (
                <div className={`custom-bar-item ${active ? 'active' : ''}`}>
                    <div className="title">{tab.title}</div>
                    <div className="desc">description</div>
                </div>
            )}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```


```less
.demo-tab-custom-bar {
    .@{prefix}-tab-cell-container-wrap {
        .rem(height, 76);
    }
    .custom-bar-item {
        width: 100%;
        background: transparent;
        .title {
            .rem(font-size, 16);
            .rem(line-height, 22);
            &.active {
                .use-var(background, primary-color);
                font-weight: bold;
            }
        }
        .desc {
            .rem(font-size, 14);
            .rem(line-height, 28);
            width: 100%;
            .rem(margin-top, 2);
            .use-var(background, tabs-tab-bar-tag-background);
            .use-var(color, sub-info-font-color);
            .rem(border-radius, 20);
        }
        &.active {
            .title {
                .use-var(color, primary-color);
                font-weight: bold;
            }
            .desc {
                .use-var(background, tabs-tab-bar-tag-active-background);
                .use-var(color, tabs-tab-bar-tag-active-text-color);
            }
        }
    }
}
.demo-tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .rem(font-size, 15);
    .rem(height, 80);
    .use-var(color, sub-info-font-color);
}
```
