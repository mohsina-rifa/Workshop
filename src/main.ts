import { createApp } from "vue";
import { createPinia } from 'pinia'; 

import "./style.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.vue";
import router from './router/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast);

app.mount('#app');
