<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconPlay' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-play`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><defs/><path d="M236.416 92.16l597.333 383.957a42.667 42.667 0 010 71.766L236.416 931.819c-28.416 18.261-65.75-2.112-65.75-35.883V128.064c0-33.77 37.334-54.144 65.75-35.904zM256 206.23v611.583L731.755 512 256 206.208z"/></svg>
</template>
