## 不同类型 @en{Different types}

#### 1

```vue
<script setup lang="ts">
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
                            <svg class="demo-icon" width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
                                <path d="M497.371 826.514L270.63 936.23c-18.286 7.314-40.229 0-47.543-18.286-3.657-3.657-7.315-10.972-3.657-18.286l25.6-248.686c0-10.971-3.658-18.285-7.315-29.257L69.486 435.2c-14.629-14.629-10.972-36.571 3.657-51.2 3.657-3.657 10.971-7.314 14.628-7.314l245.029-51.2c10.971-3.657 18.286-7.315 21.943-18.286l128-219.429C490.057 73.143 512 65.83 530.286 76.8c3.657 3.657 10.971 7.314 14.628 14.629l128 219.428c3.657 7.314 14.629 14.629 21.943 18.286l245.029 51.2c18.285 3.657 32.914 21.943 25.6 43.886 0 7.314-3.657 10.971-7.315 14.628L789.943 621.714c-7.314 7.315-10.972 18.286-7.314 29.257l25.6 248.686c3.657 18.286-10.972 36.572-32.915 40.229-7.314 0-14.628 0-18.285-3.657L530.286 826.514c-10.972-7.314-25.6-7.314-32.915 0z" />
                            </svg>
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
