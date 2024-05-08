<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconUser' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-user`]" width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path :fill="props.useCurrentColor ? 'currentColor' : '#000'" d="M512 192a106.688 106.688 0 000 213.333A106.688 106.688 0 00512 192zM320 298.667a192 192 0 11384 0 192 192 0 01-384 0zM398.293 640C320.64 640 256 703.936 256 785.067v68.266h512v-68.266C768 703.936 703.36 640 625.707 640H398.293zM170.667 785.067c0-127.254 101.973-230.4 227.626-230.4h227.414c125.653 0 227.626 103.146 227.626 230.4v115.2c0 21.205-17.066 38.4-37.973 38.4H208.64c-20.907 0-37.973-17.195-37.973-38.4v-115.2z"/></svg>
</template>
