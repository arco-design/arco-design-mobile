## JSX型写法

#### 2

```js
import { IndexBar } from '@arco-design/mobile-react';

const seeds = ['Apple', 'Bubble', 'Charles', 'Daf', 'Echo', 'Frank', 'George', 'Hurry'];


const getListFromSeed = (seed) => new Array(5).fill(0).map((_, i) => ({
    content: `${seed}${i}`,
}))

const Group = IndexBar.Group

export default function IndexBarDemo() {
    return <IndexBar style={{ height: 500 }}>
        {
            seeds.map(seed => {
                return <Group index={seed} key={seed} list={getListFromSeed(seed)} />
            })
        }
    </IndexBar>;
}
```
