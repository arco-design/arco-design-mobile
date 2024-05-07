## 组件调用 @en{Called by component}

#### 4

```vue
<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
</script>
<template>
    <arco-cell-group :bordered="false">
        <arco-cell show-arrow @click="show = !show">
            <template #label>Called by component</template>
        </arco-cell>
        <arco-notify type="success" v-model="show" @close="console.log('closed')">
            Called by component
        </arco-notify>
    </arco-cell-group>
</template>
```
