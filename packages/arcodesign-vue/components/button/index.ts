import { App as Application } from 'vue';
import Button from './Button.vue';

// 定义组件的 install 方法，该方法将用于 Vue.use() 时的全局注册
const install = (app: Application): void => {
    app.component(Button.name, Button);
};

// 创建一个可以导出的对象
export default {
    install,
};

// 单独导出 Button 组件，以便能在局部注册
export { Button };
