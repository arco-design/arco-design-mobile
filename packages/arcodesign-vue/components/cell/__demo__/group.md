## 基础用法 @en{Basic Usage}

#### 2

```vue
<template>
    <arco-cell-group @click="console.log('click group test')">
        <arco-cell show-arrow>
            <template #label>List Content</template>
        </arco-cell>
        <arco-cell show-arrow>
            <template #label>List Content</template>
        </arco-cell>
        <arco-cell show-arrow>
            <template #label>List Content</template>
        </arco-cell>
    </arco-cell-group>
</template>
```
