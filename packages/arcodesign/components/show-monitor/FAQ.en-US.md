# FAQ

## onVisibleChange event not triggered?

Please check whether the child element of the ShowMonitor component is a Text Node instead of an HTML element wrapped by a tag, such as:

```jsx
<ShowMonitor onVisibleChange={visible => console.log(visible)}>
  Text
</ShowMonitor>
```

It should be modified to:

```jsx
<ShowMonitor onVisibleChange={visible => console.log(visible)}>
  <span>Text</span>
</ShowMonitor>
```