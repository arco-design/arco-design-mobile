<script lang="ts" setup>
import { provide } from 'vue';
import { getPrefixCls } from '../context-provider';
import { CellGroupEmits, CellGroupProps } from './type';
import { cellGroupInjectionKey } from './utils';

provide(cellGroupInjectionKey, {
    isFromGroup: true,
});

const props = withDefaults(defineProps<CellGroupProps>(), {
    bordered: true,
});
const emit = defineEmits<CellGroupEmits>();
const prefix = getPrefixCls('cell-group');

function handleClick(e: Event) {
    emit('click', e);
}
</script>
<template>
    <div
        :class="[prefix, 'all-border-box']"
        @click="handleClick"
    >
        <div v-if="$slots.header" :class="`${prefix}-header`">
            <slot name="header"></slot>
        </div>
        <div :class="[`${prefix}-body`, { bordered: props.bordered }]">
            <slot></slot>
        </div>
        <div v-if="$slots.footer" :class="`${prefix}-footer`">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
