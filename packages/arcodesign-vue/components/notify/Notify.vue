<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { getPrefixCls } from '../context-provider';
import { NotifyEmits, NotifyProps } from './type';

const props = withDefaults(defineProps<NotifyProps>(), {
    type: 'info',
    transitionDuration: 300,
    duration: 3000,
});
const emit = defineEmits<NotifyEmits>();
const visible = defineModel<boolean>();
const prefix = getPrefixCls('notify');
const hasTrans = ref(Boolean(visible.value));
const innerHeight = ref(0);
const closeTimer = ref<number>();
const emitCloseTimer = ref<number>();
const innerDom = ref<HTMLDivElement>();

function updateLayout() {
    if (innerDom.value) {
        const { height } = innerDom.value.getBoundingClientRect();
        innerHeight.value = height;
    }
}

function startCloseTimer(duration: number) {
    if (duration) {
        clearTimeout(closeTimer.value);
        closeTimer.value = window.setTimeout(() => {
            visible.value = false;
        }, duration);
    }
}

function handleAfterVisible(duration: number) {
    nextTick(() => {
        updateLayout();
        startCloseTimer(duration);
    });
}

onMounted(() => {
    hasTrans.value = true;
    visible.value && handleAfterVisible(props.duration);
});

onUnmounted(() => {
    clearTimeout(emitCloseTimer.value);
    clearTimeout(closeTimer.value);
});

watch(visible, (newVisible) => {
    if (!newVisible) {
        emitCloseTimer.value = window.setTimeout(() => {
            emit('close');
        }, props.transitionDuration);
    }
});

watch([visible, () => props.duration], ([newVisible, newDuration], [oldVisible]) => {
    oldVisible && clearTimeout(closeTimer.value);
    newVisible && handleAfterVisible(newDuration);
});
</script>

<template>
    <Teleport :disabled="!props.container" :to="props.container" >
        <div
            :class="[prefix, `${prefix}-${props.type}`]"
            :style="{
                ...(hasTrans
                    ? { transitionDuration: `${props.transitionDuration}ms` }
                    : {}),
                height: visible ? `${innerHeight}px` : '0px',
            }"
        >
            <div
                v-if="$slots.default"
                :class="[
                    `${prefix}-content`,
                    visible
                        ? `${prefix}-content-transition-Y0`
                        : `${prefix}-content-transition-Y100`
                ]"
                :style="{
                    ...(hasTrans
                    ? { transitionDuration: `${props.transitionDuration}ms` }
                    : {}),
                }"
                ref="innerDom"
            >
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>
