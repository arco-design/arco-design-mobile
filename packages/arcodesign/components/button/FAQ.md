# FAQ

## 通过 className 传入的样式无法覆盖 arco button 中的默认样式（如 color）

arco button 中的样式（如 color）的实现是 .arco-button.arco-button-type-primary 两个类选择器实现的，优先级会比传入的 className 优先级高，可采用提高传入 className 优先级解决。arco 这么实现是因为只有一层优先级时，可能会被业务方的 reset.less 或者浏览器中默认的 button 样式覆盖。
