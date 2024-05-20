<script lang="ts" setup>
import { inject } from 'vue';
import { getPrefixCls } from '../context-provider';
import { CellEmits, CellProps } from './type';
import { cellGroupInjectionKey } from './utils';
import Arrow from './Arrow.vue';

const props = withDefaults(defineProps<CellProps>(), {
    bordered: true,
});
const emit = defineEmits<CellEmits>();
const prefix = getPrefixCls('cell');
const groupContext = inject(cellGroupInjectionKey, { isFromGroup: false });

function handleClick(e: Event) {
    emit('click', e);
}
</script>

<template>
    <div
        :class="[
            prefix,
            'all-border-box',
            { 'without-group': !groupContext.isFromGroup, 'bordered': props.bordered }
        ]"
        @click="handleClick"
    >
        <slot name="prepend"></slot>
        <div :class="[`${prefix}-inner`, { 'has-desc': $slots.desc }]">
            <div v-if="$slots.icon" :class="`${prefix}-label-icon`">
                <slot name="icon"></slot>
            </div>
            <div v-if="$slots.label || $slots.desc" :class="`${prefix}-label`">
                <div :class="`${prefix}-title`">
                    <slot name="label"></slot>
                </div>
                <div v-if="$slots.desc" :class="`${prefix}-desc`">
                    <slot name="desc"></slot>
                </div>
            </div>
            <div :class="[`${prefix}-content`, { 'has-label': $slots.label || $slots.desc }]">
                <div v-if="props.text" :class="`${prefix}-text`">
                    {{ props.text }}
                </div>
                <slot></slot>
            </div>
            <div v-if="props.showArrow" :class="`${prefix}-arrow-icon`">
                <slot name="arrow">
                    <Arrow />
                </slot>
            </div>
        </div>
        <slot name="append"></slot>
    </div>
  </template>
