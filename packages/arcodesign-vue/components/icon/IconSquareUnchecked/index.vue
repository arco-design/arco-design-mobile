<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconSquareUnchecked' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-square-unchecked`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M15.6 18H4.4C3.1 18 2 16.9 2 15.6V4.4C2 3.1 3.1 2 4.4 2h11.2C16.9 2 18 3.1 18 4.4v11.2c0 1.3-1.1 2.4-2.4 2.4zM4.4 3C3.6 3 3 3.6 3 4.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V4.4c0-.8-.6-1.4-1.4-1.4H4.4z"/></svg>
</template>
