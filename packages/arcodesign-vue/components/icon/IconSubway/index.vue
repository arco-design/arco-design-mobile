<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconSubway' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-subway`]" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="-0.98 0 10.96 10.96"><g data-name="图层 2"><path d="M.82 10.9a.24.24 0 01-.35 0l-.31-.39a.24.24 0 010-.35l2.1-1.66H.5A.5.5 0 010 8V.5A.5.5 0 01.5 0h8a.5.5 0 01.5.5V8a.5.5 0 01-.5.5H6.82l2.06 1.62a.26.26 0 010 .35l-.31.39a.24.24 0 01-.35 0L5.2 8.5H3.88zM8 5.5H1v2h7zM3 6v1H2V6zm4 0v1H6V6zm1-5H1v3.5h7z" :fill="props.useCurrentColor ? 'currentColor' : '#000'" data-name="图层 1"/></g></svg>
</template>
