<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconGift' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-gift`]" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.065 11 11"><g data-name="图层 2"><path d="M8.5 2.37c.14-.65.06-1.17-.2-1.32s-1.3.3-1.91 1.32H4.68C4.06 1.37 3.2.85 2.8 1c-.26.15-.34.64-.21 1.25v.07zm-3.5 3H2v4.5h3zm4 0H6v4.5h3zm-4-2H1v1h4zm5 0H6v1h4zm-9.5-1h1.05A2 2 0 012.27.19c1-.58 2.38.23 3.26 1.66C6.42.42 7.81-.39 8.8.19a2 2 0 01.72 2.18h1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H10v5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-5H.5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5z" :fill="props.useCurrentColor ? 'currentColor' : '#000'" data-name="图层 1"/></g></svg>
</template>
