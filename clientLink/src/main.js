import { createApp } from 'vue';
// @ts-ignore
import App from './App.vue';
import { plugin, defaultConfig } from '@formkit/vue'
import { createAutoAnimatePlugin } from '@formkit/addons'

import router from './router'
import ToastPlugin from 'vue-toast-notification';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import './assets/main.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const app = createApp(App);

app.use(router);
app.use(plugin, defaultConfig({
    plugins: [createAutoAnimatePlugin()]
}));
app.use(ToastPlugin);
app.mount('#app');

const $toast = useToast();
let instance = $toast;
export default instance;