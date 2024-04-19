import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import setRootPixel from '../../packages/arcodesign-vue/tools/flexible';
import App from './App.vue';
import Home from './components/Home.vue';
import '../../packages/arcodesign-vue/style/public.less';

setRootPixel();

const routes = [{ path: '/', component: Home }];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(App);

app.use(router);
app.mount('#app');
