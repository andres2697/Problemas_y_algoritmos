import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store/index.js";
import 'v-calendar/dist/style.css';
import 'flowbite';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(store);
app.use(router);
app.mount("#app");
