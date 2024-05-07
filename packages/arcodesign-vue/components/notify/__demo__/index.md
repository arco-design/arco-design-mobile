## 基础用法 @en{Basic usage}

#### 1

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Notify } from '@arco-design/mobile-vue';

const dom = ref();

function handleClick() {
    if (!!window.NotifyInstance) {
        window.NotifyInstance.close();
    }
    window.NotifyInstance = Notify.success({
        content: 'Basic usage',
        getContainer: () => dom.value,
    });
}

onMounted(() => {
    const div = document.createElement('div');
    dom.value = div;
    const demo = document.querySelector('.arcodesign-mobile-demo');
    const title = document.querySelector('.arcodesign-mobile-title');
    demo.insertBefore(div, title);
});
</script>
<template>
    <arco-cell-group :bordered="false">
        <arco-cell show-arrow @click="handleClick">
            <template #label>Basic usage</template>
        </arco-cell>
    </arco-cell-group>
</template>
```
