import Home from "./views/Home.vue";
import Ejercicio1 from "./views/Ejercicio1.vue";
import Ejercicio2 from "./views/Ejercicio2.vue";
import Ejercicio3 from "./views/Ejercicio3.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: { title: "Home" },
  },
  {
    path: "/ejercicio1",
    component: Ejercicio1,
    name: "ejercicio1",
    meta: { title: "Ejercicio1" },
  },
  {
    path: "/ejercicio2",
    component: Ejercicio2,
    name: "ejercicio2",
    meta: { title: "Ejercicio2" },
  },
  {
    path: "/ejercicio3",
    component: Ejercicio3,
    name: "ejercicio3",
    meta: { title: "Ejercicio3" },
  },
  // {
  //   path: "/capturar-folio/correctivo/:id",
  //   name: "capturarCorrectivo",
  //   component: Correctivo,
  //   meta: { title: "Folios Correctivos", authorization: true },
  //   props: { control: false }
  // },
  // { path: "/:path(.*)", component: NotFound, meta: { authorization: true } },
];
