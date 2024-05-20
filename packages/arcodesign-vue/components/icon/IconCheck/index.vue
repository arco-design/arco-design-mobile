<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconCheck' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-check`]" width="1em" height="1em" viewBox="0 0 20 20" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.702 4.47a.5.5 0 00-.705.06L8.33 13.596 3.82 9.724a.5.5 0 00-.705.054l-.652.758a.5.5 0 00.054.706L7.361 15.4a.5.5 0 00.054.053l.526.445.22.188a.5.5 0 00.722-.047l8.641-10.218a.5.5 0 00-.059-.705l-.763-.645z"/></svg>
</template>
