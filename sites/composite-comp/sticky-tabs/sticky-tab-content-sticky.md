## 在 tab content 中使用 sticky 元素 @en{Use sticky elements in tab content}

#### 4

```js
import { Tabs, Sticky, Portal } from '@arco-design/mobile-react';
import { getActualPixel } from '@arco-design/mobile-utils';

const tabData = [{ title: 'Example 1' }, { title: 'Example 2' }, { title: 'Example 3' }];

const defaultNavBarHeight = 44;
const defaultTabBarHeight = 44;

const getTopOffset = () => {
    return (
        document.querySelector('.arcodesign-mobile-demo-nav-inner')?.getBoundingClientRect?.()
            .bottom || defaultNavBarHeight
    );
};

export default function StickyTabsContentSticky() {
    const [topOffset, setTopOffset] = React.useState(defaultNavBarHeight);

    React.useEffect(() => {
        setTopOffset(getTopOffset());
    }, []);

    return (
        <div id="sticky-tabs-wrapper-content-sticky">
            <div className="placeholder">
                placeholder placeholder placeholder placeholder placeholder placeholder placeholder
                placeholder placeholder placeholder placeholder placeholder
            </div>
            <Tabs
                className="sticky-tabs"
                tabs={tabData}
                renderTabBar={TabBar => (
                    <Sticky
                        getContainer={() =>
                            document.getElementById('sticky-tabs-wrapper-content-sticky')
                        }
                        topOffset={topOffset}
                    >
                        {TabBar}
                    </Sticky>
                )}
            >
                <div className="demo-tab-content">
                    <p>content 1</p>
                    <Sticky
                        stickyStyle='absolute'
                        getContainer={() =>
                            document.getElementById('sticky-tabs-wrapper-content-sticky')
                        }
                        topOffset={topOffset + getActualPixel(defaultTabBarHeight, 50)}
                    >
                        <div>
                            sticky content 1
                        </div>
                    </Sticky>
                </div>
                <div className="demo-tab-content"> content 2 </div>
                <div className="demo-tab-content"> content 3 </div>
            </Tabs>
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
        min-height: 200px;
    }
}
```
