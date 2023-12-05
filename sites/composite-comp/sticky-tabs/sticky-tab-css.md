## 使用 position: sticky 替换 Sticky @en{Replace Sticky with position: sticky}

```desc
## 当使用 sticky tabs 复合组件时，安卓机型经常会出现 tabBar 闪动的情况，可以通过 css 实现 sticky 的方式去优化性能

## 注意：sticky css 属性兼容性有待考证；arco 已验证安卓5.1.1 vivoX7 支持；iPhone6plus ios 11.2.5不支持
```


```js
import { Tabs, Sticky, Portal } from '@arco-design/mobile-react';
import './index.less';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
];

export default function StickyTabsCss() {
    const tabBarRef = React.useRef(null);

    const supportsCSS = (attribute, value) => {
        if (window && window.CSS) {
            if (typeof value === 'undefined') {
                return window.CSS.supports(attribute);
            }
            return window.CSS.supports(attribute, value);
        }

        const elem = document.createElement('div');
        if (attribute in elem.style) {
            elem.style[attribute] = value;
            return elem.style[attribute] === value;
        }
        return false;
    };

    return (
        <div id='sticky-tabs-wrapper-css'>
            <div className='placeholder'>
                placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder
            </div>
            <div className="sticky-tabs-wrapper-css-nav-bar" ref={tabBarRef}/>
            <Tabs
                className='sticky-tabs'
                tabs={tabData}
                renderTabBar={(TabBar) =>
                    supportsCSS('position', 'sticky') ? (
                        <Portal getContainer={() => tabBarRef.current}>{TabBar}</Portal>
                    ) : (
                        <Sticky getScrollContainer={() => document.getElementById('sticky-tabs-wrapper-css')} topOffset={0}>{TabBar}</Sticky>
                    )}
            >
                <div className="demo-tab-content"> content 1</div>
                <div className="demo-tab-content"> content 2 </div>
                <div className="demo-tab-content"> content 3 </div>
            </Tabs>
        </div>
    );
}
```

```less
#sticky-tabs-wrapper-css {
    height: 500px;
    overflow: visible;

    .placeholder {
        color: #000;
        .rem(font-size, 20);
        .rem(height, 100);
    }

    .demo-tab-content {
        .rem(font-size, 20);
        .use-var(color, sub-info-font-color);
    }

    .sticky-tabs-wrapper-css-nav-bar {
        position: sticky;
        background: #fff;
        top: 44px;
    }
}
```
