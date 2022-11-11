<template>
  <div class="h-full w-full px-16 py-12">
    <TabGroup>
      <TabList>
        <div class="flex w-full justify-center space-x-4">
          <!-- materiales -->
          <Tab v-slot="{ selected }">
            <button
              @mouseover="hover.materiales = true"
              @mouseleave="hover.materiales = false"
              :class="[
                selected ? 'border-none  font-semibold text-primario' : '',
                'flex min-w-[120px] flex-col rounded-lg py-2 px-4 transition-all duration-300 ease-linear hover:bg-secundario hover:text-primario',
              ]"
            >
              <span class="mb-4 flex w-full justify-center">
                <div
                  :class="[
                    'rounded-lg bg-secundario p-4 transition-all duration-300',
                    !selected ? 'shadow-lg' : '',
                    hover.materiales
                      ? 'translate-y-0.5 bg-white'
                      : 'bg-secundario',
                  ]"
                >
                  <MaterialesIcono
                    :color="
                      selected || hover.materiales ? '#2166E5' : '#101D2D'
                    "
                  />
                </div>
              </span>
              <div class="flex w-full justify-center">
                <span class="text-lg font-semibold">Materiales</span>
              </div>
            </button>
          </Tab>
          <!-- inventario -->
          <Tab v-slot="{ selected }">
            <button
              @mouseover="hover.inventario = true"
              @mouseleave="hover.inventario = false"
              :class="[
                selected ? 'border-none  font-semibold text-primario' : '',
                'flex min-w-[120px] flex-col rounded-lg py-2 px-4 transition-all duration-300 ease-linear hover:bg-secundario hover:text-primario',
              ]"
            >
              <span class="mb-4 flex w-full justify-center">
                <div
                  :class="[
                    'rounded-lg p-4 transition-all duration-300',
                    !selected ? 'shadow-lg' : '',
                    hover.inventario
                      ? 'translate-y-0.5 bg-white'
                      : 'bg-secundario',
                  ]"
                >
                  <InventarioIcono
                    :color="
                      selected || hover.inventario ? '#2166E5' : '#101D2D'
                    "
                  />
                </div>
              </span>
              <div class="flex w-full justify-center">
                <span class="text-lg font-semibold">Inventario</span>
              </div>
            </button>
          </Tab>
          <!-- entradas -->
          <Tab v-slot="{ selected }">
            <button
              @mouseover="hover.entradas = true"
              @mouseleave="hover.entradas = false"
              :class="[
                selected ? 'border-none  font-semibold text-primario' : '',
                'flex min-w-[120px] flex-col rounded-lg py-2 px-4 transition-all duration-300 ease-linear hover:bg-secundario hover:text-primario',
              ]"
            >
              <span class="mb-4 flex w-full justify-center">
                <div
                  :class="[
                    'rounded-lg bg-secundario p-4 transition-all duration-300',
                    !selected ? 'shadow-lg' : '',
                    hover.entradas
                      ? 'translate-y-0.5 bg-white'
                      : 'bg-secundario',
                  ]"
                >
                  <EntradasIcono
                    :color="selected || hover.entradas ? '#2166E5' : '#101D2D'"
                  />
                </div>
              </span>
              <div class="flex w-full justify-center">
                <span class="text-lg font-semibold">Entradas</span>
              </div>
            </button>
          </Tab>
          <!-- salidas -->
          <Tab v-slot="{ selected }">
            <button
              @mouseover="hover.salidas = true"
              @mouseleave="hover.salidas = false"
              :class="[
                selected ? 'border-none  font-semibold text-primario' : '',
                'flex min-w-[120px] flex-col rounded-lg py-2 px-4 transition-all duration-300 ease-linear hover:bg-secundario hover:text-primario',
              ]"
            >
              <span class="mb-4 flex w-full justify-center">
                <div
                  :class="[
                    'rounded-lg bg-secundario p-4 transition-all duration-300',
                    !selected ? 'shadow-lg' : '',
                    hover.salidas
                      ? 'translate-y-0.5 bg-white'
                      : 'bg-secundario',
                  ]"
                >
                  <SalidasIcono
                    :color="selected || hover.salidas ? '#2166E5' : '#101D2D'"
                  />
                </div>
              </span>
              <div class="flex w-full justify-center">
                <span class="text-lg font-semibold">Salidas</span>
              </div>
            </button>
          </Tab>
        </div>
      </TabList>
      <TabPanels class="mt-12">
        <TabPanel
          ><Suspense><AlmacenMateriales /></Suspense
        ></TabPanel>
        <TabPanel
          ><Suspense><AlmacenInventario /></Suspense
        ></TabPanel>
        <TabPanel><AlmacenEntradas /></TabPanel>
        <TabPanel><AlmacenSalidas /></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import MaterialesIcono from "./iconos/MaterialesIcono.vue";
import InventarioIcono from "./iconos/InventarioIcono.vue";
import EntradasIcono from "./iconos/EntradasIcono.vue";
import SalidasIcono from "./iconos/SalidasIcono.vue";
import AlmacenMateriales from "./AlmacenMateriales.vue";
import AlmacenEntradas from "./AlmacenEntradas.vue";
import AlmacenInventario from "./AlmacenInventario.vue";
import AlmacenSalidas from "./AlmacenSalidas.vue";

const hover = reactive({
  materiales: false,
  inventario: false,
  entradas: false,
  salidas: false,
});
</script>
