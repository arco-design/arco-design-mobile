# FAQ

## onVisibleChange 事件不触发？

请检查 ShowMonitor 组件的子元素是否是 Text Node 而非被标签包裹的 HTML 元素，如：

```jsx
<ShowMonitor onVisibleChange={visible => console.log(visible)}>
  Text
</ShowMonitor>
```

应修改为：

```jsx
<ShowMonitor onVisibleChange={visible => console.log(visible)}>
  <span>Text</span>
</ShowMonitor>
```

