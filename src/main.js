import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { store } from "./store/index.js";
import { auth } from "../src/firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import 'v-calendar/dist/style.css';
import 'flowbite';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  // console.log(to.meta.authorization, localStorage.getItem('user'));
  if (to.meta.authorization && localStorage.getItem("user") === "false") {
    return { path: "/" };
  }
  if (to.name == 'login' && localStorage.getItem("user") === "true") {
    return { path: "/dashboard" };
  }
  if (to.name == 'capturarCorrectivo'  && to.params.control == undefined) {
    return { path: "/capturar-folio" };
  }
});

onAuthStateChanged(auth, (user) => {
  // console.log('cambió usuario', user);
  if (user) {
    localStorage.setItem("user", true);
  } else localStorage.setItem("user", false);
});

app.use(store);
app.use(router);
app.mount("#app");
