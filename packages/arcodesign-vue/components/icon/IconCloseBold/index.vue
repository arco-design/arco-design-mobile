<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconCloseBold' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-close-bold`]" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.92 6.92"><g data-name="图层 2"><path d="M6.16.15l.62.62a.5.5 0 010 .7l-2 2 2 2a.51.51 0 010 .71l-.62.62a.51.51 0 01-.71 0l-2-2-2 2a.5.5 0 01-.7 0l-.6-.64a.5.5 0 010-.71l2-2-2-2a.48.48 0 010-.7l.62-.6a.48.48 0 01.7 0l2 2 2-2a.5.5 0 01.69 0z" :fill="props.useCurrentColor ? 'currentColor' : '#000'" fill-rule="evenodd" data-name="图层 1"/></g></svg>
</template>
