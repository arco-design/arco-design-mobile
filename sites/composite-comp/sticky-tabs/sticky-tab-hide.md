## 无内容时隐藏滚动条效果 @en{Hide scrollbar effect when there is no content}

当某个 tab 内容较少时隐藏滚动条

```js
import { Tabs, Sticky } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
    { title: 'Example 4' },
];

export default function StickyTabsHide() {

    const tabRef = React.useRef();

    const renderList = (num) => {
        const list = new Array(100).fill(num);
        return (
            <ul>
                {list.map((item, index) => {
                    return <li>====={item}====={index}======</li>
                })}
            </ul>
        )
    }

    const setTabPaneHeight = (index) => {
        const children = (tabRef.current?.pane?.dom?.childNodes || []);
        const dom = children[index];
        if (children.length && dom) {
            const maxHeight = Math.ceil(dom.getBoundingClientRect().height);
            dom.style.cssText = `max-height: ${maxHeight}px;`;
            for (let i = 0; i < children.length; i++) {
                const node = children[i];
                if (i === index || !node) {
                    continue;
                }
                node.style.cssText = `max-height: ${maxHeight}px;`;
            }
        }
        dom && (dom.style.cssText = '');
    };

    const onAfterChange = (tab, index) => {
        setTabPaneHeight(index);
    };

    return (
        <div id='sticky-tabs-wrapper-hide'>
            <div className='placeholder'>
                placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder
            </div>
            <Tabs
                className='sticky-tabs'
                tabs={tabData}
                renderTabBar={(TabBar) => (
                    <Sticky getScrollContainer={() => document.getElementById('sticky-tabs-wrapper-hide')} topOffset={0}>{TabBar}</Sticky>
                )}
                ref={tabRef}
                onAfterChange={onAfterChange}
            >
                <div className="demo-tab-content">{renderList(1)}</div>
                <div className="demo-tab-content">very little content here</div>
                <div className="demo-tab-content">{renderList(3)}</div>
                <div className="demo-tab-content">very little content here</div>
                <div className="demo-tab-content">{renderList(5)}</div>
                <div className="demo-tab-content">very little content here</div>
            </Tabs>
        </div>
    );
}
```
