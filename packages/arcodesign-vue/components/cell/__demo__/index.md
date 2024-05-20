## 单个单元格 @en{Single Cell}

#### 1

```vue
<template>
    <arco-cell :bordered="false" @click="console.log('click test')">
        <template #label>List Content</template>
    </arco-cell>
</template>
```
