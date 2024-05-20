<template>
  <router-view />
</template>
<style lang="less">
@import '../../packages/arcodesign-vue/style/mixin.less';

* {
    box-sizing: border-box;
}

body {
    background-color: @card-background-color;
    font-family: -apple-system, PingFang SC, Helvetica Neue;
    &.white-body {
        background-color: @background-color;
    }
    &.arco-theme-dark {
        background-color: #141414;
        &.white-body {
            background-color: @dark-background-color;
        }
    }
}

body,
.arcodesign-mobile-home-wrapper,
.arcodesign-mobile-demo-wrapper {
    &::-webkit-scrollbar {
        display: none;
    }
}

.arcodesign-mobile-home-wrapper,
.arcodesign-mobile-demo-wrapper {
    width: 100%;
    font-size: 0;
    &.hide-header {
        .arcodesign-mobile-demo-nav-inner,
        .arcodesign-demo-logo img {
            display: none;
        }
    }
    .demo-content {
        box-sizing: border-box;
    }
    .status-bar {
        height: 20px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 11;
        & + .demo-content {
            .arcodesign-mobile-demo-nav {
                height: 64px;
            }
            .arcodesign-mobile-demo-nav-inner {
                padding-top: 20px;
            }
        }
    }
}
.arcodesign-mobile-demo-nav {
    height: 44px;
    width: 100%;
    &-inner {
        position: fixed !important;
        top: 0;
        left: 0;
        z-index: 10;
        .use-var(background-color, background-color);
        .use-var(color, font-color);
        width: inherit;
        height: inherit;
        text-align: center;
        font-weight: bold;
        font-size: 17px;
        line-height: 44px;
        .onepx-border-var(bottom, line-color);
    }
}

.arcodesign-mobile-title {
    .rem(padding, 32, 16, 8);
    .rem(font-size, 14);
    .use-var(color, sub-info-font-color);
    font-weight: normal;
    .arcodesign-mobile-demo-nav + & {
        .rem(padding-top, 8);
    }
}

.arcodesign-mobile-demo-content {
    .rem(padding, 16);
    .use-var(background-color, container-background-color);
}

.demo-content {
    padding-bottom: 24px;
}

.arrow-back {
    .rem(width, 44);
    .rem(height, 44);
    position: fixed;
    left: 0;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    .use-var(color, font-color);
    .rem(font-size, 20);
    cursor: pointer;

    &-icon {
        transform: rotateY(180deg);
    }
}
</style>
