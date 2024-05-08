<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconCircleDisabled' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-circle-disabled`]" width="1em" height="1em" viewBox="0 0 20 20" :fill="props.useCurrentColor ? 'currentColor' : '#F7F8FA'" xmlns="http://www.w3.org/2000/svg"><path d="M18.375 10a8.375 8.375 0 11-16.75 0 8.375 8.375 0 0116.75 0z" stroke="#E5E6EB" stroke-width="1.25"/></svg>
</template>
