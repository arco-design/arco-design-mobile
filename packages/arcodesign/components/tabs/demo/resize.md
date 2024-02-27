## font-size 改变需要重新 rerender tab-cell @en{Font-size changes require rerendering tab-cell}

#### 12

```js
import { Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example1' },
    { title: 'Example2' },
    { title: 'Example3' },
    { title: 'Example4' },
    { title: 'Example5' },
    { title: 'Example6' },
    { title: 'Example7' },
];

export default function TabsDemo() {
    const theRef = React.useRef();
    React.useEffect(() => {
        setTimeout(() => {
            if (theRef.current) {
                var divNodes = theRef.current.bar.dom.getElementsByTagName("div");
                for (var i = 0; i < divNodes.length; i++) {
                    divNodes[i].setAttribute("style", "font-size: 32px!important;");
                }
                setTimeout(() => {
                    theRef.current.bar.updateLayout();
                }, 1000)
            }
        }, 1000)
    }, [])
    return (
        <Tabs
            ref={theRef}
            tabs={tabData}
            tabBarPadding={{ left: 22, right: 64 }}
            tabBarGutter={42}
            defaultActiveTab={3}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
            translateZ={false}
            tabBarHasDivider={false}
        >
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
            <div className="demo-tab-content">Content area</div>
        </Tabs>
    );
}
```

```less
.demo-tab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    .rem(font-size, 15);
    .rem(height, 80);
    .use-var(color, sub-info-font-color);
}
```
