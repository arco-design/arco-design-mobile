## 多个 loadmore 用法 @en{Multiple loadmore usage}

#### 2

```js
import { LoadMore, Cell } from '@arco-design/mobile-react';

export default function LoadMoreDemo() {
    const [list, setList] = React.useState(() => Array(10).fill(1));
    const [list2, setList2] = React.useState(() => Array(3).fill(2));
    const [list3, setList3] = React.useState(() => Array(3).fill(2));
    const countRef = React.useRef(0);
    const countRef2 = React.useRef(0);
    const countRef3 = React.useRef(0);
    function getData(callback) {
        setTimeout(() => {
            countRef.current += 1;
            if (countRef.current < 4) {
                setList(oldList => oldList.concat(Array(10).fill(1)));
                callback('prepare');
            }
            if (countRef.current >= 4 && countRef.current < 7) {
                setList(oldList => oldList.concat(Array(10).fill(2)));
                callback('prepare');
            }
            if (countRef.current === 7) {
                setList(oldList => oldList.concat(Array(10).fill(3)));
                callback('nomore');
            }
        }, 1000);
    }
    function getData2(callback) {
        setTimeout(() => {
            countRef2.current += 1;
            if (countRef2.current < 4) {
                setList2(oldList => oldList.concat(Array(10).fill(4)));
                callback('prepare');
            }
            if (countRef2.current >= 4 && countRef2.current < 7) {
                setList2(oldList => oldList.concat(Array(10).fill(5)));
                callback('prepare');
            }
            if (countRef2.current === 7) {
                setList(oldList => oldList.concat(Array(10).fill(6)));
                callback('nomore');
            }
        }, 1000);
    }
    function getData3(callback) {
        setTimeout(() => {
            countRef3.current += 1;
            if (countRef3.current < 4) {
                setList3(oldList => oldList.concat(Array(10).fill(7)));
                callback('prepare');
            }
            if (countRef3.current >= 4) {
                setList3(oldList => oldList.concat(Array(10).fill(8)));
                callback('prepare');
            }
        }, 1000);
    }

    const domRef = React.useRef();
    const domRef2 = React.useRef();
    const domRef3 = React.useRef();
    return (
        <div>
            <div ref={domRef}>
                {list.map((item, index) => (
                    <Cell key={index} label="Content" >{item}</Cell>
                ))}
            </div>
            <LoadMore
                getMoreScrollContainer={() => domRef.current}
                style={{ paddingTop: 16, paddingBottom: 44 }}
                getData={getData}
                threshold={0}
            />
            <div ref={domRef2}>
                {list2.map((item, index) => (
                    <Cell key={`test2${index}`} label="Content 2" >{item}</Cell>
                ))}
            </div>
            <LoadMore
                getMoreScrollContainer={() => domRef2.current}
                style={{ paddingTop: 16, paddingBottom: 44 }}
                getData={getData2}
                threshold={0}
            />
            <div>
                {list3.map((item, index) => (
                    <Cell key={`test3${index}`} label="Content 3" >{item}</Cell>
                ))}
            </div>
            <LoadMore
                style={{ paddingTop: 16, paddingBottom: 44 }}
                getData={getData3}
                threshold={0}
            />
        </div>
    );
}
```
