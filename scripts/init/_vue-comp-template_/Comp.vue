<script lang="ts" setup>
import { getPrefixCls } from '../context-provider';
import { $COMP$Props } from './type';

const props = withDefaults(defineProps<$COMP$Props>(), {});
const prefix = getPrefixCls('$comp$');
</script>

<template>
    <div :class="prefix"></div>
</template>
