<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconStarHalf' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-star-half`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M513.8 71.6c-13.4-.9-25.9 5.8-31 16.2l-128 219.4c-3.7 11-11 14.6-21.9 18.3l-245 51.2c-3.7 0-11 3.7-14.6 7.3-14.6 14.6-18.3 36.6-3.7 51.2l168.2 186.5c3.7 11 7.3 18.3 7.3 29.3l-25.6 248.7c-3.7 7.3 0 14.6 3.7 18.3 7.3 18.3 29.3 25.6 47.5 18.3l226.7-109.7c3.9-3.9 10-5.7 16.4-5.4V71.6z"/></svg>
</template>
