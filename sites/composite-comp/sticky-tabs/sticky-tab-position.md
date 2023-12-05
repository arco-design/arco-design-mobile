## 独立面板效果 @en{Independent panel effect}

```desc
## 当某个 tab 内容较少时隐藏滚动条
```

```js
import { Tabs, Sticky } from '@arco-design/mobile-react';
import './index.less';

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
                    <Sticky
                        // 下面属性为局部滚动时使用，根据不同滚动场景添加
                        portalWhenSticky
                        getPortalContainer={() => document.querySelectorAll('.arcodesign-mobile-demo-content')[2]}
                        stickyStyle='absolute'
                        getScrollContainer={() => document.getElementById('sticky-tabs-wrapper-position')}
                    >
                        {TabBar}
                    </Sticky>
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

```less
#sticky-tabs-wrapper-position {
    height: 500px;
    overflow: scroll;
    .placeholder {
        color: #000;
        .rem(font-size, 20);
        .rem(height, 100);
    }
    .demo-tab-content {
        .rem(font-size, 20);
        .use-var(color, sub-info-font-color);
    }
    .arcodesign-mobile-demo-content {
        position: relative;
    }
}
```
