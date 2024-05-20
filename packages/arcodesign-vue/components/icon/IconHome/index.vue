<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconHome' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-home`]" width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path :fill="props.useCurrentColor ? 'currentColor' : '#000'" d="M128 938.667A42.667 42.667 0 0185.333 896V384a42.667 42.667 0 0118.987-35.477l383.21-256a42.667 42.667 0 0147.34-.043l384.767 256a42.667 42.667 0 0119.03 35.52v512A42.667 42.667 0 01896 938.667H128zm341.333-21.334a21.333 21.333 0 01-20.97 21.334l127.274-.022-2.133-.128a21.333 21.333 0 01-18.837-21.184v-64h-85.334v64zm0-64.021l-21.333.021h21.333v-.021zm106.667.021l-21.333-.021v.021H576zm-64.725-674.048l-340.608 227.52v446.528H384v-256a42.667 42.667 0 0142.667-42.666h170.666A42.667 42.667 0 01640 597.333v256h213.333V406.87L511.275 179.285zM554.667 640h-85.334v213.312h85.334V640z"/></svg>
</template>
