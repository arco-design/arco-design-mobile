<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconArrowBack' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-arrow-back`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2.1 8l5.4 5.4c.1.1.1.3 0 .5l-.5.5c-.1.1-.3.1-.5 0L.7 8.5c-.3-.3-.3-.7 0-.9l5.9-5.9c.1-.1.3-.1.5 0l.5.5c.1.1.1.3 0 .5L2.1 8z"/></svg>
</template>
