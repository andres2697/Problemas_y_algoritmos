<template>
  <div class="h-full w-full">
    <div class="flex w-full flex-col space-y-4">
      <!-- Tabla -->
      <div class="min-h-[400px] w-full bg-[#F8FAFB] py-3 px-28 shadow-md">
        <TabGroup>
          <TabList class="border-b-2">
            <div class="flex w-full space-x-4">
              <!-- materiales -->
              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    'px-14 py-2',
                    selected ? 'font-semibold text-primario' : '',
                  ]"
                >
                  Entradas
                </button>
              </Tab>
              <!-- inventario -->
              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    'px-14 py-2',
                    selected ? 'font-semibold text-primario' : '',
                  ]"
                >
                  Histórico
                </button>
              </Tab>
            </div>
          </TabList>
          <TabPanels class="mt-12">
            <TabPanel class="flex w-full"><Salidas /></TabPanel>
            <TabPanel>Historico</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import Salidas from "./Salidas.vue";
</script>
