<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconSuccessCircle' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-success-circle`]" width="1em" height="1em" :fill="props.useCurrentColor ? 'currentColor' : '#000'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 24C5.4 24 0 18.6 0 12S5.4 0 12 0s12 5.4 12 12-5.4 12-12 12zm0-22.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5z"/><path d="M17.5 8c-.3-.3-.7-.3-1 0l-6.3 6.3-3-3c-.3-.3-.7-.3-1 0-.3.3-.3.7 0 1l3.5 3.5c.1.1.3.2.4.2s.4-.1.5-.2L17.5 9c.2-.3.2-.7 0-1z"/></svg>
</template>
