<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconCircleUnchecked' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-circle-unchecked`]" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 19c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-17c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" :fill="props.useCurrentColor ? 'currentColor' : '#000'"/></svg>
</template>
