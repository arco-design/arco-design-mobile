<script lang="ts" setup>
import { provide } from 'vue';
import { GlobalContextParams } from './type';
import { configProviderInjectionKey, defaultContext } from './utils';

const props = withDefaults(defineProps<GlobalContextParams>(), defaultContext);
provide(configProviderInjectionKey, props);
</script>
<template>
    <slot />
</template>
