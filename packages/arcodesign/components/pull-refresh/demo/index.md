## 基础用法 @en{Basic usage}

#### 1

```js
import { PullRefresh, Toast, Loading, Tabs } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Basic' },
    { title: 'Disabled' },
    { title: 'iOS' },
    { title: 'Customize' },
];

export default function PullRefreshDemo() {
    return (
        <Tabs
            tabs={tabData}
            type="line-divide"
            defaultActiveTab={0}
            tabBarHasDivider={false}
            onAfterChange={(tab, index) => {
                console.log('[tabs]', tab, index);
            }}
        >
            <PullRefresh>Try to pull down</PullRefresh>
            <PullRefresh disabled>Disabled modal, unable to pull down (Android) or pull down to trigger system bounce (iOS)</PullRefresh>
            <PullRefresh useIosOptimize finishText={null} >Try to pull down (using implementation after performance optimization on iOS and traditional transform implementation on Android)</PullRefresh>

            <PullRefresh
                onRefresh={async () => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            Toast.info({
                                content: 'Refresh successfully',
                                duration: 1000,
                            });
                            resolve();
                        }, 800);
                    });
                }}
                finishText={<p className="pull-refresh-custom-success">Refresh successfully</p>}
                loadingText={
                    <div className="pull-refresh-custom-loading">
                        <Loading type="dot" radius={8} />
                    </div>
                }
                finishDelay={1000}
            >Try to pull down</PullRefresh>
        </Tabs>
    );
}
```
