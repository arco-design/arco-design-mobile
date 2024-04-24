<script setup lang="ts">
import { useRouter } from 'vue-router';
import { isFromDesignLab } from '../../utils/designlab';
import { getMenuOrder } from '../../utils/menu';
import routes from '../pages/components/route';
import Arrow from './Arrow.vue';

const hideHeader = isFromDesignLab();
const actualRoutes = getMenuOrder(routes);
const router = useRouter();

function handleSubItemClick(route) {
    router.push(`/components/${route}`);
}
</script>

<template>
    <div class="arcodesign-mobile-home-wrapper" :class="{ 'hide-header': hideHeader }">
        <div class="arcodesign-demo-logo">
            <img src="../assets/arco-logo.svg" class="logo" alt="Arco logo" />
        </div>
        <div v-for="(type, menuIndex) in Object.keys(actualRoutes)" :key="menuIndex" class="arcodesign-demo-menu">
            <div class="menu-wrap-title">{{ type }}</div>
            <div class="menu-item-wrap">
                <div
                    v-for="(route, index) in actualRoutes[type]"
                    :key="index"
                    class="menu-item"
                    @click="handleSubItemClick(route.key)"
                >
                    {{ route.name }}
                    <Arrow class="arrow" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import '../../../packages/arcodesign-vue/style/mixin.less';

.arcodesign-demo-logo {
    .rem(padding, 52, 16, 40);
    img {
        .rem(width, 200);
        .rem(height, 70);
    }
}

.arcodesign-demo-menu {
    .rem(padding, 0, 16, 28);
    .use-var(color, font-color);
    .menu-wrap-title {
        .rem(font-size, 14);
        .rem(line-height, 20);
        .rem(margin-bottom, 12);
        .rem(padding-left, 16);
        position: relative;
        color: #939aa3;
        &::before {
            content: " ";
            display: inline-block;
            width: 2px;
            .rem(height, 12);
            border-radius: 2px;
            .use-var(background, primary-color);
            .rem(margin, 0, 6, 0, 8);
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .menu-item {
        .rem(padding, 12, 16);
        .rem(font-size, 16);
        .rem(line-height, 22);
        position: relative;
        .use-var(background, card-background-color);
        cursor: pointer;
        .rem(border-radius, 8);
        &:not(:last-child) {
            .rem(margin-bottom, 8);
        }
        .arrow {
            position: absolute;
            .rem(right, 12);
            top: 50%;
            transform: translateY(-50%);
            color: #c9cdd4;
        }
    }
}
</style>
