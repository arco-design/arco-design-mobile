<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconClose' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-close`]" width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path :fill="props.useCurrentColor ? 'currentColor' : '#000'" d="M509.568 447.083L796.16 160.469a21.333 21.333 0 0130.165 0l30.166 30.166a21.333 21.333 0 010 30.186L569.899 507.435l286.613 286.592a21.333 21.333 0 010 30.165l-30.165 30.165a21.333 21.333 0 01-30.166 0L509.568 567.765 222.933 854.38a21.333 21.333 0 01-30.186 0l-30.166-30.166a21.333 21.333 0 010-30.165l286.614-286.613L162.603 220.8a21.333 21.333 0 010-30.187l30.165-30.165a21.333 21.333 0 0130.187 0l286.613 286.613z"/></svg>
</template>
