## 搜索联想框 @en{Search Association}

#### 8

```js
import { SearchBar } from '@arco-design/mobile-react';
import { useState } from 'react';

export default function SearchBarDemo() {
    const [associationItems, setAssociationItems] = useState([]);

    const handleInputChange = e => {
        const value = e.target.value;
        setTimeout(() => {
            const newAssociationItems = [
                { content: 'Test1' },
                { content: 'Test2' },
                { content: 'Arco' },
                { content: value },
            ];
            setAssociationItems(newAssociationItems);
        }, 200);
    };

    return (
        <SearchBar
            style={{ marginBottom: 200 }}
            appendBtnText="Search"
            enableAssociation
            associationItems={associationItems}
            associationShowType="value"
            highlightMode="prefix"
            onChange={handleInputChange}
        />
    );
}
```
