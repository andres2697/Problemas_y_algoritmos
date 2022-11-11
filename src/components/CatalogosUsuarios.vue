<template>
  <div class="flex h-full w-full flex-col">
    <div class="flex w-full justify-end select-none">
      <button
      @click="isOpen = true"
        class="flex items-center rounded-lg bg-[#2166E5] py-2 px-4 text-white"
      >
        <span class="mr-2"><img src="/img/agregar_ico.png" /></span
        >Agregar usuario
      </button>
    </div>
    <div>
      <TabGroup>
        <TabList>
          <div class="flex w-full border-b border-[#7C8495]">
            <div class="flex w-full justify-start select-none">
              <div>
                <Tab v-slot="{ selected }">
                  <button
                    :class="[
                      selected
                        ? 'border-[##C4C4C4] border-b-4 font-semibold text-black'
                        : 'text-[#7C8495]',
                      '-mb-0.5 px-3',
                    ]"
                  >
                    Usuarios
                  </button></Tab
                >
                <Tab v-slot="{ selected }"
                  ><button
                    :class="[
                      selected
                        ? 'border-[##C4C4C4] border-b-4 font-semibold text-black'
                        : 'text-[#7C8495]',
                      '-mb-0.5 px-3',
                    ]"
                  >
                    Roles
                  </button></Tab
                >
              </div>
            </div>
          </div>
        </TabList>
        <TabPanels class="mt-6">
          <TabPanel class="flex h-full w-full"><Suspense><UsuariosTable /></Suspense></TabPanel>
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <UsuariosModalAgregar :isOpen="isOpen" @closeModal="isOpen = false"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import UsuariosTable from "@/components/UsuariosTable.vue";
import UsuariosModalAgregar from "@/components/UsuariosModalAgregar.vue";

const isOpen = ref(false);
</script>
