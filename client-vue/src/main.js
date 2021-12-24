import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/i18n/index';
import installElementPlus from './plugins/element';
// 导入权限控制模块
import './permission';
import './styles/index.scss';

const app = createApp(App);
installElementPlus(app);
app.use(store).use(router).use(i18n).mount('#app');
