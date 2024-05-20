<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconMinus' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-minus`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><defs/><path d="M115.2 467.2h819.2c6.4 0 6.4 6.4 6.4 6.4V544c0 6.4-6.4 6.4-6.4 6.4H96c-6.4 0-6.4-6.4-6.4-6.4v-64c0-6.4 6.4-6.4 6.4-6.4 6.4-6.4 6.4-6.4 19.2-6.4z"/></svg>
</template>
