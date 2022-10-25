## 配置型写法

#### 1

```js
import { IndexBar, Radio } from '@arco-design/mobile-react';
import { useState, useRef } from 'react';

const seeds = ['Apple', 'Bubble', 'Charles', 'Daf', 'Echo', 'Frank', 'George', 'Hurry'];
const tipTypeOptions = [
   "sweat",
   "toast",
   "none"
].map(key => ({ label: key, value: key }))

const groups = seeds.map(seed => {
    const index = seed.charAt(0);

    return {
        index,
        list: new Array(5).fill(0).map((_, i) => ({
            content: `${seed}${i}`,
        })),
    };
});

export default function IndexBarDemo() {
    const [tipType, setTipType] = useState("toast")
    const ref = useRef(null)

    return <div>
        <Radio.Group options={tipTypeOptions} value={tipType} onChange={setTipType} />
        <div onClick={() => ref.current && ref.current.scrollToIndex("C")}>click me to scroll into [C]</div>
        <IndexBar style={{ height: 500 }} groups={groups} tipType={tipType} ref={ref} />
    </div>
}
```
