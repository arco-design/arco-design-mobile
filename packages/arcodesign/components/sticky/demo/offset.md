## topOffset

#### 2

```js
import { Sticky, Button } from '@arco-design/mobile-react';

export default function StickyDemo2() {
    return (
        <>
            <div id="container">
                <Sticky
                    topOffset={100}
                    getContainer={() => '#container'}
                    onTopChange={(contentTop) => console.log('top', contentTop)}
                >
                    <Button>100px to the top, follows when the container leaves the viewport</Button>
                </Sticky>
                <div className="demo-sticky-container">Bottom of container</div>
            </div>
        </>
    );
}
```
