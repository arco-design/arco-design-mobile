## 搜索联想框

#### 5

```js
import { SearchBar } from '@arco-design/mobile-react';
import { useState } from 'react';

export default function SearchBarDemo() {
    const [associationItems, setAssociationItems] = useState([]);

    const handleInputChange = e => {
        const value = e.target.value;
        setTimeout(() => {
            const newAssociationItems = [
                { content: '测试1' },
                { content: '测试2' },
                { content: 'Arco' },
                { content: value },
            ];
            setAssociationItems(newAssociationItems);
        }, 200);
    };

    return (
        <SearchBar
            appendBtnText="搜索"
            showSearchAssociation
            searchAssociationItems={associationItems}
            searchAssociationShowType="value"
            highlightMode="prefix"
            onChange={handleInputChange}
        />
    );
}
```
