<template>
    <button
        :class="[
            prefixCls,
            `${prefixCls}-size-${size}`,
            `${prefixCls}-${type}`,
            `${prefixCls}-shape-${shape}`,
            {
                'is-inline': inline,
                'is-loading': loading,
                'is-disabled': disabled || (disableWhenLoading && loading),
                'is-active': isActive,
            },
            ...customClass,
        ]"
        :style="buttonStyle"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchEnd"
        @click="handleClick"
    >
        <span v-if="icon" :class="`${prefixCls}-icon`">
            <slot name="icon">{{ icon }}</slot>
        </span>
        <span v-if="!loading || showTextWhenLoading" :class="`${prefixCls}-text`">
            <slot>{{ children }}</slot>
        </span>
        <!-- Display the loading icon if loading is true -->
        <loading v-if="loading" :class="`${prefixCls}-loading-icon`" />
    </button>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from 'vue';
import { ButtonProps, buttonProps } from './type';
import useButtonClass from './hooks';
import Loading from '@/loading';

export default defineComponent({
    name: 'ArcButton',
    components: { Loading },
    props: buttonProps,
    emits: ['click'],
    setup(props: ButtonProps, { emit, slots }) {
        const prefixCls = 'arc-button';
        const isActive = ref(false);

        const handleTouchStart = () => {
            if (props.needActive && !props.disabled) {
                isActive.value = true;
            }
        };

        const handleTouchEnd = () => {
            isActive.value = false;
        };

        const handleClick = (event: Event) => {
            if (props.disabled) {
                props.onClickDisabled?.(event);
                return;
            }
            if (!props.loading || !props.disableWhenLoading) {
                props.onClick?.(event);
            }
        };

        const { buttonClass, buttonStyle } = useButtonClass(props);

        watch(
            () => props.loading,
            newLoading => {
                if (!newLoading) {
                    isActive.value = false;
                }
            },
        );

        onMounted(() => {
            // Handle additional lifecycle logic if needed
        });

        return {
            prefixCls,
            buttonClass,
            buttonStyle,
            isActive,
            handleTouchStart,
            handleTouchEnd,
            handleClick,
        };
    },
});
</script>
