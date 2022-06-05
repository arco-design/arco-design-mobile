## 全选/反选 @en{Select All/Deselect}

#### 6

```js
import { Checkbox, Button } from '@arco-design/mobile-react';

export default function CheckboxDemo() {
  const defaultValue=[2,4];
  const allValue=[1,2,3,4];
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);
  const [selectAll, setSelectAll] = React.useState(false);

  return (
    <>
      <Checkbox.Group
          layout='block'
          defaultValue={defaultValue}
          value={selectedValue}
          onChange={value => {
            setSelectedValue(value);
            setSelectAll(value.length === allValue.length);
          }}
      >
          <Checkbox value={1} style={{height: 42}}>Option content 1</Checkbox>
          <Checkbox value={2} style={{height: 42}}>Option content 2</Checkbox>
          <Checkbox value={3} style={{height: 42}}>Option content 3</Checkbox>
          <Checkbox value={4} style={{height: 42}}>Option content 4</Checkbox>
      </Checkbox.Group>
      <Button inline size="medium" style={{margin: '16px 16px 0 0'}} onClick={() => {
        setSelectedValue(selectAll ? [] : allValue);
        setSelectAll(!selectAll);
      }}>{selectAll ? 'Deselect all' : 'Select all'}</Button>
      <Button inline size="medium" type="default" onClick={() => {
        const tempValue = allValue.filter(v => !selectedValue.includes(v));
        setSelectedValue(tempValue);
        setSelectAll(tempValue.length === allValue.length);
      }}>Reversely select</Button>
    </>
  );
}
```
