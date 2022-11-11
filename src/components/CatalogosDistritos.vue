<template>
  <div class="flex h-full w-full flex-col">
    <div>
      <TabGroup>
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
                      '-mb-0.5 px-3',
                    ]"
                  >
                    Distritos/Clusters
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
                    Relaciones
                  </button></Tab
                >
              </div>
            </div>
          </div>
        </TabList>
        <TabPanels class="mt-6">
          <TabPanel class="flex h-full w-full"
            ><Suspense><DistritosClusters /></Suspense
          ></TabPanel>
          <TabPanel><Suspense><RelacionDistritosClusters/></Suspense></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import DistritosClusters from "./DistritosClusters.vue";
import RelacionDistritosClusters from "./RelacionDistritosClusters.vue";
</script>
