<script lang="ts" setup>
import { getPrefixCls } from '../context-provider';
import { BadgeProps } from './type';

const props = withDefaults(defineProps<BadgeProps>(), {
    visible: true,
    maxCount: 99,
});
const prefix = getPrefixCls('badge');
</script>

<template>
    <Transition name="badge-scale">
        <div
            v-if="props.visible"
            :class="[
                prefix,
                { [`${prefix}-dot dot`]: props.dot },
                { [`${prefix}-bordered bordered`]: props.bordered },
                { [`${prefix}-absolute absolute`]: props.absolute }
            ]"
        >
            <slot>
                <span :class="`${prefix}-text badge-text`">
                    {{ Number(props.text) && Number(props.text) > props.maxCount ? `${props.maxCount}+` : props.text }}
                </span>
            </slot>
        </div>
    </Transition>
</template>
