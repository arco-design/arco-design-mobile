# FAQ

## onChange/onAfterChange 使用场景

onAfterChange 的调用是发生在动画执行后，很多 state 的更新在这里进行处理可能才会引起状态的变更

## tabs 怎么配合 sticky 组件实现一个复杂的交互页面

可以参考 [sticky-tabs](#/composite-components/sticky-tabs) 复合组件使用

## 将 Tabs 的 autoHeight 属性设置为 true 时，tabPane 的高度不会随着 DOM 高度变化

为保证组件性能，需要用户手动调用 TabPaneRef 中暴露的 setCurrentHeight 方法，手动更新高度
