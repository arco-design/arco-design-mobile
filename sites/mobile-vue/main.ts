import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import setRootPixel from '../../packages/arcodesign-vue/tools/flexible';
import ArcoVue from '../../packages/arcodesign-vue/components';
import App from './App.vue';
import Home from './components/Home.vue';
import Demo from './components/Demo.vue';
import '../../packages/arcodesign-vue/components/style';

setRootPixel();

const routes = [
    { path: '/', component: Home },
    { path: '/components/:name', component: Demo },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(App);

app.use(ArcoVue);
app.use(router);
app.mount('#app');
