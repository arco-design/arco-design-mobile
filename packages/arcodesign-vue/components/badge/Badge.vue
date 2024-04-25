<script lang="ts" setup>
import { getPrefixCls } from '../context-provider';

const prefix = getPrefixCls('badge');
</script>

<template>
    <button :class="prefix">按钮</button>
</template>
