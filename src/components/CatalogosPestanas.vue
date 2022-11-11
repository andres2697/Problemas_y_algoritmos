<template>
  <div class="flex h-full w-full flex-col">
    <TabGroup :selectedIndex="props.control">
      <TabList>
        <div class="flex w-full border-b border-[#7C8495]">
          <div class="flex w-full select-none justify-start">
            <div>
              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    selected
                      ? 'border-[##C4C4C4] border-b-4 font-semibold text-black'
                      : 'text-[#7C8495]',
                    '-mb-0.5 px-8',
                  ]"
                >
                  Fallas
                </button></Tab
              >
              <Tab v-slot="{ selected }"
                ><button
                  :class="[
                    selected
                      ? 'border-[##C4C4C4] border-b-4 font-semibold text-black'
                      : 'text-[#7C8495]',
                    '-mb-0.5 px-8',
                  ]"
                >
                  Causas
                </button></Tab
              >
              <Tab v-slot="{ selected }"
                ><button
                  :class="[
                    selected
                      ? 'border-[##C4C4C4] border-b-4 font-semibold text-black'
                      : 'text-[#7C8495]',
                    '-mb-0.5 px-8',
                  ]"
                >
                  Folios
                </button></Tab
              >
              <Tab v-slot="{ selected }"
                ><button
                  :class="[
                    selected
                      ? 'border-[##C4C4C4] border-b-4 font-semibold text-black'
                      : 'text-[#7C8495]',
                    '-mb-0.5 px-8',
                  ]"
                >
                  Relaciones
                </button></Tab
              >
            </div>
          </div>
        </div>
      </TabList>
      <TabPanels class="mt-6">
        <TabPanel class="flex h-full w-full"
          ><Suspense><CatalogosFallas /></Suspense
        ></TabPanel>
        <TabPanel>
          <Suspense>
            <CatalogosCausas />
          </Suspense>
        </TabPanel>
        <TabPanel><Suspense><CatalogosFolios /></Suspense></TabPanel>
        <TabPanel><Suspense><RelacionFallasCausas /></Suspense></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import {} from "vue";
import CatalogosFallas from "./CatalogosFallas.vue";
import CatalogosCausas from "./CatalogosCausas.vue";
import CatalogosFolios from "./CatalogosFolios.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import RelacionFallasCausas from "./RelacionFallasCausas.vue";

const props = defineProps(["control"]);
</script>
