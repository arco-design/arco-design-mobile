## 动态编辑标签 @en{Dynamically edit tags}

#### 8

```js
import { Tag } from '@arco-design/mobile-react';

const counts = ['1', '2', '3', '4'];

export default function TagDemo() {
    const [list, setList] = React.useState([1, 1]);
    const colors = [
        { color: '#165DFF', bgColor: '#E8F3FF' },
        { color: '#00B42A', bgColor: '#E8FFEA' },
        { color: '#4E5969', bgColor: '#F2F3F5' },
    ];

    function handleClickAdd() {
        const newList = list.slice();
        newList.push(1);
        setList(newList);
    }

    function handleClickClose(index) {
        const newList = list.slice();
        newList.splice(index, 1);
        setList(newList);
    }

    return (
        <Tag.List
            list={list.map((item, index) => ({
                closeable: true,
                borderStyle: 'none',
                children: `Tag${counts[index]}`,
                ...colors[index % 3],
            }))}
            verticalPadding={10}
            showAddButton={list.length < 4}
            onAdd={handleClickAdd}
            onClose={handleClickClose}
        />
    );
}
```
