<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconWarnCircleFill' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-warn-circle-fill`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><defs/><path d="M0 512c0 281.6 230.4 512 512 512s512-230.4 512-512S793.6 0 512 0 0 230.4 0 512zm512 160h32c19.2 0 32 12.8 32 32v32c0 19.2-12.8 32-32 32h-32c-19.2 0-32-12.8-32-32v-32c0-19.2 12.8-32 32-32zm0-416h32c19.2 0 32 12.8 32 32v256c0 19.2-12.8 32-32 32h-32c-19.2 0-32-12.8-32-32V288c0-19.2 12.8-32 32-32z"/></svg>
</template>
