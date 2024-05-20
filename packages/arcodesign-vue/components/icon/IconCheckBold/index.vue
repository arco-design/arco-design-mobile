<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconCheckBold' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-check-bold`]" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.97 10.07 10.07"><g data-name="图层 2"><path d="M9.22.12a.49.49 0 00-.7.06L3.86 5.69 1.4 3.57a.51.51 0 00-.71.06l-.57.66A.49.49 0 00.17 5L3 7.38v.07l.69.55a.53.53 0 00.71 0l.6-.71a.22.22 0 000-.08l5-5.82a.51.51 0 00-.11-.71z" :fill="props.useCurrentColor ? 'currentColor' : '#000'" fill-rule="evenodd" data-name="图层 1"/></g></svg>
</template>
