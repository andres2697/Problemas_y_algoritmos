import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";
import Preventivo from "./views/Preventivo/Preventivo.vue";
import Dashboard from "./views/Dashboard.vue";
import CapturarFolio from "./views/CapturarFolio.vue";
import Correctivo from "./views/Correctivo/Correctivo.vue";
import Configuraciones from "./views/Configuraciones.vue";
import ConsultarFolios from "./views/ConsultarFolios.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: "/",
    component: Login,
    name: "login",
    meta: { title: "Login", authorization: false, layout: true },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { title: "Dashboard", authorization: true },
  },
  {
    path: "/capturar-folio",
    component: CapturarFolio,
    meta: { title: "Capturar Folio", authorization: true },
  },
  {
    path: "/capturar-folio/preventivo/:tipoFolio/:id",
    name: "capturarPreventivo",
    component: Preventivo,
    meta: { title: "Folios preventivos", authorization: true },
    props: { control: false }
  },
  {
    path: "/capturar-folio/correctivo/:id",
    name: "capturarCorrectivo",
    component: Correctivo,
    meta: { title: "Folios Correctivos", authorization: true },
    props: { control: false }
  },
  {
    path: "/configuraciones",
    name: "Configuraciones",
    component: Configuraciones,
    meta: { title: "Configuraciones", authorization: true },
  },
  {
    path: "/about",
    meta: { title: "About", authorization: true },
    component: About,
  },
  {
    path: "/consultar-folios",
    name: "consultarFolios",
    component: ConsultarFolios,
    meta: { title: "Consultar Folios", authorization: true },
  },
  { path: "/:path(.*)", component: NotFound, meta: { authorization: true } },
];
