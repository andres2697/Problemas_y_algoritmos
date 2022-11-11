<template>
    <div>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex w-full justify-center rounded-md p-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>
        </div>
  
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 z-50 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                @click="isOpen = true"
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <PencilIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                  Editar
                </button>
              </MenuItem>
            </div>
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  @click="eliminar"
                  :class="[
                    active ? 'bg-violet-500 text-white' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  <TrashIcon class="mr-2 h-5 w-5" aria-hidden="true" />
                  Eliminar
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <FallasEdit :isOpen="isOpen" :data="props.data" @closeModal="isOpen = false"/>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
  import {
    DotsVerticalIcon,
    PencilIcon,
    TrashIcon,
  } from "@heroicons/vue/outline";
  import { getDatabase, ref as refDB, remove } from "firebase/database";
  import FallasEdit from "./FallasEdit.vue";
  
  const props = defineProps(["data"]);
  const db = getDatabase();
  const isOpen = ref(false);
  
  const eliminar = () => {
    console.log(props.data);
    remove(
      refDB(db, `catalogo/fallas/${props.data.nombre}`)
    );
  };
  </script>
  