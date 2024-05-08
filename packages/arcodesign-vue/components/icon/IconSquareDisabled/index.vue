<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconSquareDisabled' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-square-disabled`]" width="1em" height="1em" viewBox="0 0 20 20" :fill="props.useCurrentColor ? 'currentColor' : '#F7F8FA'"><path stroke="#E5E6EB" d="M15.6 2.5H4.4c-1 0-1.9.8-1.9 1.9v11.2c0 1 .8 1.9 1.9 1.9h11.2c1 0 1.9-.8 1.9-1.9V4.4c0-1.1-.8-1.9-1.9-1.9z"/></svg>
</template>
