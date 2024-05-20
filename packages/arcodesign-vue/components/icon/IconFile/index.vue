<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconFile' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-file`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2.3,2.7c0-0.7,0.6-1.3,1.3-1.3h7.3l2.7,2.7v9.3c0,0.7-0.6,1.3-1.3,1.3H3.7c-0.7,0-1.3-0.6-1.3-1.3	V2.7z M10.4,2.7H3.7v10.7h8.7V4.6L10.4,2.7z M10.7,7.7H5.3V6.3h5.3V7.7z M8.7,10.3H5.3V9h3.3V10.3z" fill-rule="evenodd" clip-rule="evenodd"/></svg>
</template>
