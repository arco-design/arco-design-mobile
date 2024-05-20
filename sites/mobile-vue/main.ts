import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import setRootPixel from '../../packages/arcodesign-vue/tools/flexible';
import ArcoVue from '../../packages/arcodesign-vue/components';
import App from './App.vue';
import Home from './components/Home.vue';
import Demo from './components/Demo.vue';
import docs from './pages/components';
import enDocs from './pages/components/index-en-US';
import { LanguageSupport } from '../utils/language';
import '../../packages/arcodesign-vue/components/style';
import '../../packages/arcodesign-vue/tools/touch2mouse';

setRootPixel();

const routes = [
    { path: '/', component: Home, props: { language: LanguageSupport.CH } },
    { path: '/en-US', component: Home, props: { language: LanguageSupport.EN } },
    {
        path: '/components/:name',
        component: Demo,
        props: route => ({
            name: route.params.name,
            doc: docs[route.params.name],
        }),
    },
    {
        path: '/en-US/components/:name',
        component: Demo,
        props: route => ({
            name: route.params.name,
            doc: enDocs[route.params.name],
        }),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(App);

app.use(ArcoVue);
app.use(router);
app.mount('#app');
