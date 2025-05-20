## 在 tab content 中使用 sticky 元素 @en{Use sticky elements in tab content}

#### 4

```js
import { Tabs, Sticky, Portal } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
];

const getTopOffset = () => {
    return document.querySelector('.arcodesign-mobile-demo-nav-inner')?.getBoundingClientRect?.().bottom || 44
}

export default function StickyTabsContentSticky() {
    const [isSticky, setIsSticky] = React.useState(false);

    const [topOffset, setTopOffset] = React.useState(44);

    React.useEffect(() => {
        setTopOffset(getTopOffset())
    }, [])

    return (
        <div id='sticky-tabs-wrapper-content-sticky'>
            <div className='placeholder'>
                placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder
            </div>
            <Tabs
                className='sticky-tabs'
                tabs={tabData}
                renderTabBar={(TabBar) =>
                    <Sticky getContainer={() => document.getElementById('sticky-tabs-wrapper-content-sticky')} topOffset={topOffset}>{TabBar}</Sticky>}
            >
                <div className="demo-tab-content">
                    <p>content 1</p>
                    <Sticky getContainer={() => document.getElementById('sticky-tabs-wrapper-content-sticky')} topOffset={topOffset+44} onStickyStateChange={({isSticky}) => {
                        setIsSticky(isSticky);
                    }}>
                        <div style={{display: isSticky ? 'none' : 'block', fontSize: '20px'}}>
                            sticky content 1
                        </div>
                    </Sticky>
                </div>
                <div className="demo-tab-content"> content 2 </div>
                <div className="demo-tab-content"> content 3 </div>
            </Tabs>
            <div style={{display: isSticky ? 'block' : 'none', position: 'fixed', top: topOffset+44, fontSize: '20px'}}>sticky content 1</div>
        </div>
    );
}
```

```less
#sticky-tabs-wrapper-content-sticky {
    height: 500px;
    overflow: visible;

    .demo-tab-content {
        .rem(font-size, 20);
        .use-var(color, sub-info-font-color);
    }
}
```
