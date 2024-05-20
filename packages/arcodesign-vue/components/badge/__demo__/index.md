## 不同类型 @en{Different types}

#### 1

```vue
<script setup lang="ts">
import IconStarFill from '@arco-design/mobile-vue/esm/icon/IconStarFill/index.vue';
</script>
<template>
    <div>
        <div class="badge-demo-item-wrap">
            <div class="badge-demo-item-inner">
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute dot/>
                    </div>
                    <div class="badge-demo-item-text">Dot badge</div>
                </div>
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute text="12"/>
                    </div>
                    <div class="badge-demo-item-text">Number badge</div>
                </div>
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute text="2"/>
                    </div>
                    <div class="badge-demo-item-text">Odd badge</div>
                </div>
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute text="100"/>
                    </div>
                    <div class="badge-demo-item-text">Maximum display</div>
                </div>
            </div>
        </div>
        <div class="badge-demo-item-wrap">
            <div class="badge-demo-item-inner">
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute text="New"/>
                    </div>
                    <div class="badge-demo-item-text">Text badge</div>
                </div>
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute text="On Sale"/>
                    </div>
                    <div class="badge-demo-item-text">Multiple text</div>
                </div>
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute style="padding: 0; width: 16px; height: 16px">
                            <IconStarFill class="demo-icon" />
                        </arco-badge>
                    </div>
                    <div class="badge-demo-item-text">Icon badge</div>
                </div>
                <div class="badge-demo-item">
                    <div class="badge-demo-rectangle">
                        <arco-badge absolute text="New"/>
                    </div>
                    <div class="badge-demo-item-text">Title text</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.badge-demo-item-wrap {
    .rem(padding, 16, 0);
    .rem(margin-top, 22);
    &:nth-child(1) {
        margin-top: 0;
    }
    .use-var(background, background-color);
}
.badge-demo-item-inner {
    display: flex;
    justify-content: space-around;
    position: relative;
}
.badge-demo-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.badge-demo-rectangle {
    .rem(width, 32);
    .rem(height, 32);
    background: #bedaff;
    border-radius: 2PX;
    position: relative;
}
.badge-demo-item-text {
    .rem(font-size, 14);
    .rem(line-height, 20);
    .rem(margin-top, 8);
    text-align: center;
}
.demo-icon {
    font-size: 16PX;
    padding: 2PX 1.5PX 3PX 2PX;
}
</style>
```
