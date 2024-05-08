<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconPicture' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-picture`]" width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path :fill="props.useCurrentColor ? 'currentColor' : '#000'" d="M896 85.333a42.667 42.667 0 0142.56 39.467l.107 3.2v768a42.667 42.667 0 01-39.467 42.56l-3.2.107H128A42.667 42.667 0 0185.44 899.2l-.107-3.2V128A42.667 42.667 0 01124.8 85.44l3.2-.107h768zm-42.667 85.334H170.667v682.666h682.666V170.667zm-90.325 263.808A17.067 17.067 0 01768 446.528V755.2a12.8 12.8 0 01-12.8 12.8H436.245a12.8 12.8 0 01-3.456-.47l-182.528-.469a12.8 12.8 0 01-9.002-21.845l176.32-176.341a17.067 17.067 0 0124.128 0l81.365 81.365 215.787-215.765a17.067 17.067 0 0124.149 0zM384 256v128H256V256h128z"/></svg>
</template>
