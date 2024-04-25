## 基础用法 @en{Basic Usage}

#### 1

```vue
<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
</script>
<template>
    <div>
        <span @click="show = true" class="demo-open-text">Open custom mask</span>
        <arco-transition>
            <div v-if="show" class="demo-transition-mask" @click="show = false"></div>
        </arco-transition>
    </div>
</template>
<style lang="less">
.demo-open-text {
    .rem(font-size, 14);
}
.demo-transition-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
</style>
```