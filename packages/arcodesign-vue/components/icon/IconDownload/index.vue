<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconDownload' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-download`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.3,8.8V1.7h1.3v7.1l1.9-1.9l0.9,0.9L8,11.3L4.5,7.8l0.9-0.9L7.3,8.8z M3.3,13v-1.3H2v2.7h12v-2.7	h-1.3V13H3.3z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
</template>
