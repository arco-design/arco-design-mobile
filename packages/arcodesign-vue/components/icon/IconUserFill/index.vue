<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconUserFill' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-user-fill`]" width="1em" height="1em" viewBox="0 0 20 20" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 10.833c2.301 0 5 1.786 5 5v2.5c0 .46-.373.834-.833.834H3.333a.833.833 0 01-.833-.834v-2.5c0-3.211 2.699-5 5-5h5zM10 1.25a4.167 4.167 0 110 8.333 4.167 4.167 0 010-8.333z"/></svg>
</template>
