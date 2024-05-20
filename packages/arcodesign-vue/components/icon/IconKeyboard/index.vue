<script lang="ts" setup>
import { getPrefixCls } from '../../context-provider';

defineOptions({ name: 'IconKeyboard' });
const props = withDefaults(defineProps<{ useCurrentColor?: boolean }>(), {
    useCurrentColor: true,
});
const prefix = getPrefixCls('icon');
</script>
<template>
    <svg :class="[prefix, `${prefix}-keyboard`]" width="1em" height="1em" version="1.1" id="svg_388a56dbb6__图层_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 26 26" xml:space="preserve"><path d="M15.9 21.7l-2.5 2.5c-.2.2-.5.2-.7 0l-2.5-2.5c-.3-.3-.1-.9.4-.9h5C16 20.9 16.2 21.4 15.9 21.7zM23.1 19.5H2.9c-1.1 0-2-.9-2-2V4.8c0-1.1.9-2 2-2h20.1c1.1 0 2 .9 2 2v12.7C25.1 18.6 24.2 19.5 23.1 19.5zM2.9 4.8L2.9 4.8v12.7h20.1V4.8H2.9z" :fill="props.useCurrentColor ? 'currentColor' : '#1d2129'"/><path d="M10.6,6.6H8.2V9h2.4V6.6z M4.5,6.6H7V9H4.5V6.6z M8.8,10.2H6.4v2.4h2.4V10.2z M16,10.2h-2.4v2.4H16V10.2z M10,10.2h2.4v2.4H10V10.2z M19.6,10.2h-2.4v2.4h2.4V10.2z M11.8,6.6h2.4V9h-2.4V6.6z M17.8,6.6h-2.4V9h2.4V6.6z M19,6.6h2.4V9H19	V6.6z M17.8,13.8H8.2v1.8h9.7V13.8z" fill-rule="evenodd" clip-rule="evenodd" :fill="props.useCurrentColor ? 'currentColor' : '#1d2129'"/></svg>
</template>
