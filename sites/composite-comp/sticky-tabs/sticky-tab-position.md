## 独立面板效果 @en{Independent panel effect}

每个 tab 面板都有自己的定位逻辑

```js
import { Tabs, Sticky } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
    { title: 'Example 4' },
];

// 这里如果整个页面都是 sticky-tabs ，node 的传参可以忽略
function getWindowScrollTop(node) {
    return node.scrollTop || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}

function setWindowScrollTop(top, node) {
    if ((node || window).scrollTo) {
        (node || window).scrollTo(0, top);
    } else {
        (node || document.body).scrollTop = top;
        (node || document.documentElement).scrollTop = top;
    }
}

export default function StickyTabsPosition() {

    const fixedLimitRef = React.useRef(0);
    const positionRef = React.useRef({});
    const activeRef = React.useRef(0);

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

    const onChange = (tab, index) => {
        const scrollTop = getWindowScrollTop(document.getElementById('sticky-tabs-wrapper-position'));
        positionRef.current[activeRef.current] = scrollTop;
        activeRef.current = index;
    };

    const onAfterChange = (tab, index) => {
        const scrollY = positionRef.current[index];
        const windowScrollTop = Math.ceil(getWindowScrollTop(document.getElementById('sticky-tabs-wrapper-position')));
        if (windowScrollTop >= fixedLimitRef.current) {
            const newScrollY = Math.max(scrollY, fixedLimitRef.current + 1);
            setWindowScrollTop(newScrollY, document.getElementById('sticky-tabs-wrapper-position'));
        }
    };

    return (
        <div id='sticky-tabs-wrapper-position'>
            <div className='placeholder'>
                placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder
            </div>
            <Tabs
                className='sticky-tabs'
                tabs={tabData}
                renderTabBar={(TabBar) => (
                    <Sticky getScrollContainer={() => document.getElementById('sticky-tabs-wrapper-position')} topOffset={0}>{TabBar}</Sticky>
                )}
                onChange={onChange}
                onAfterChange={onAfterChange}
            >
                <div className="demo-tab-content">{renderList(1)}</div>
                <div className="demo-tab-content">{renderList(2)}</div>
                <div className="demo-tab-content">{renderList(3)}</div>
                <div className="demo-tab-content">{renderList(4)}</div>
                <div className="demo-tab-content">{renderList(5)}</div>
                <div className="demo-tab-content">{renderList(6)}</div>
            </Tabs>
        </div>
    );
}
```
