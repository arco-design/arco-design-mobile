<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconTriUp' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-tri-up`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><defs/><path d="M195.456 682.667h633.088a21.333 21.333 0 0016.235-35.158L528.256 275.115a21.333 21.333 0 00-32.512 0L179.221 647.509a21.333 21.333 0 0016.235 35.158z"/></svg>
</template>
