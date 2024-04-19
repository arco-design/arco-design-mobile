<script setup lang="ts">
import { isFromDesignLab } from '../../utils/designlab';

const hideHeader = isFromDesignLab();
</script>

<template>
    <div class="arcodesign-mobile-home-wrapper" :class="{ 'hide-header': hideHeader }">
        <div class="arcodesign-demo-logo">
            <img src="../assets/arco-logo.svg" class="logo" alt="Arco logo" />
        </div>
        <!-- <div v-for="(type, menuIndex) in actualRoutes" :key="menuIndex" class="arcodesign-demo-menu">
            <div class="menu-wrap-title">{{ type }}</div>
            <div class="menu-item-wrap">
                <div
                    v-for="(route, index) in actualRoutes[type]"
                    :key="index"
                    class="menu-item"
                    @click="handleSubItemClick(type === commonLocaleMap.CompositeComp[language] ? 'composite-components' : 'components', route.key)"
                >
                    {{ route.name }}
                    <Arrow />
                </div>
            </div>
        </div> -->
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
</style>
