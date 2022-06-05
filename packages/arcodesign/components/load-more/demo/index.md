## 基础用法 @en{Basic Usage}

#### 1

```js
import { LoadMore, Cell } from '@arco-design/mobile-react';

export default function LoadMoreDemo() {
    const [list, setList] = React.useState(() => Array(3).fill(1));
    const countRef = React.useRef(0);
    function getData(callback) {
        console.log('getData');
        setTimeout(() => {
            countRef.current += 1;
            if (countRef.current < 4) {
                setList(oldList => oldList.concat(Array(5).fill(1)));
                callback('prepare');
            }
            if (countRef.current === 4) {
                callback('retry');
            }
            if (countRef.current === 5) {
                setList(oldList => oldList.concat(Array(5).fill(1)));
                callback('nomore');
            }
        }, 1000);
    }
    return (
        <div>
            <Cell.Group>
                {list.map((_, index) => (
                    <Cell key={index} label="Content" />
                ))}
            </Cell.Group>
            <LoadMore
                style={{ paddingTop: 16, paddingBottom: 44 }}
                getData={getData}
                threshold={0}
                onStatusChange={(st, scene) => console.log('change', st, scene)}
            />
        </div>
    );
}
```
