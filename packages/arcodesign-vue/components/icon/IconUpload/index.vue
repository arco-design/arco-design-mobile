<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconUpload' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-upload`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M7,1.5l3.1,3.1L9.2,5.4L7.6,3.7v5.9H6.4V3.7L4.8,5.4L3.9,4.6L7,1.5z M2.9,11.4v-1.2H1.8v2.3h10.5	v-2.3h-1.2v1.2H2.9z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
</template>
