<script lang="ts" setup>
import { getPrefixCls } from '../context-provider';
import { TransitionProps } from './type';

const props = withDefaults(defineProps<TransitionProps>(), {
    type: 'fade',
});
const prefix = getPrefixCls('transition');
const transitionName = `${prefix}-${props.type}`;
</script>

<template>
    <Transition :name="transitionName">
        <slot></slot>
    </Transition>
</template>
