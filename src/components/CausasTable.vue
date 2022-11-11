<template>
    <div class="flex flex-col space-y-6">
      <!-- Buscador -->
      <div class="flex items-center justify-center">
        <input
          v-model="query"
          class="max-w-sm rounded-xl border-none border-[#C4C4C4] bg-[#F2F2F2] font-semibold placeholder:font-normal focus:ring-0"
          type="text"
          id="name"
          placeholder="Buscar"
        />
        <span>
          <SearchIcon class="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <div class="flex flex-col">
        <ul
          class="flex max-h-[220px] min-h-[220px] flex-col overflow-y-auto bg-[#D9D9D9] p-2"
        >
          <li
            v-for="(item, index) in filteredData"
            :key="item.nombre"
            :class="[
              'flex w-full p-2',
              index % 2 === 0 ? 'bg-transparent' : 'bg-[#F2F2F2]',
            ]"
          >
            <div class="flex basis-full items-center">
              {{ item.nombre }}
            </div>
            <div class="basis-auto p-1">
              <CausasDropdownMenu :data="item" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, reactive } from "vue";
  import { SearchIcon, DotsVerticalIcon } from "@heroicons/vue/outline";
  import CausasDropdownMenu from "./CausasDropdownMenu.vue";
  
  const query = ref("");
  const props = defineProps(["causasData"]);
  
  // Filtrar datos
  const filteredData = computed(() =>
    query.value === ""
      ? props.causasData
      : props.causasData.filter((item) =>
          item.nombre
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.value.toLowerCase())
        )
  );
  </script>
  