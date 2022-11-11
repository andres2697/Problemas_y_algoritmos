<template>
  <div class="flex w-full flex-col space-y-12 pb-16">
    <div class="flex w-full justify-center">
      <div class="grid w-[50%] grid-flow-col grid-rows-2 gap-4">
        <div v-for="value in options" class="flex w-full space-x-2">
          <button
            @click="cambiarComponente(value.component, value.control)"
            class="flex h-full w-full items-center p-2 font-semibold"
          >
            <span class="mr-4 h-8 w-8 rounded-md bg-[#D9D9D9]"></span
            >{{ value.name }}
          </button>
        </div>
      </div>
    </div>
    <div class="flex h-full w-full pb-12">
      <component :is="componenteSeleccionado.component" :control="componenteSeleccionado.control"></component>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw, reactive } from "vue";
import Usuarios from "@/components/CatalogosUsuarios.vue";
import Distritos from "@/components/CatalogosDistritos.vue";
import Conceptos from "@/components/CatalogosConceptos.vue";
import CatalogosPestanas from "./CatalogosPestanas.vue";

const options = [
  {
    name: "Usuarios",
    component: markRaw(Usuarios),
  },
  {
    name: "Distritos/Clusters",
    component: markRaw(Distritos),
  },
  {
    name: "Fallas",
    component: markRaw(CatalogosPestanas),
    control: 0,
  },
  {
    name: "Conceptos",
    component: markRaw(Conceptos),
  },

  {
    name: "Causas",
    component: markRaw(CatalogosPestanas),
    control: 1,
  },
  {
    name: "Folios",
    component: markRaw(CatalogosPestanas),
    control: 2,
  },
];

const componenteSeleccionado = reactive({
  component: markRaw(Usuarios),
  control: 0,
});

const cambiarComponente = (componente, control) => {
  componenteSeleccionado.component = componente;
  componenteSeleccionado.control = control;
};
</script>
