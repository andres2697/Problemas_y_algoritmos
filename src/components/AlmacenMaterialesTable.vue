<template>
  <div>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-gray-50 text-base font-semibold text-black dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">Código de producto</th>
          <th scope="col" class="py-3 px-6">Descripción</th>
          <th scope="col" class="py-3 px-6">Unidad</th>
          <th scope="col" class="flex justify-center py-3 px-6">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(value, index) in props.data"
          :class="[
            'border-b bg-white transition-colors duration-300 hover:bg-secundario dark:border-gray-700 dark:bg-gray-900',
            index % 2 === 0 ? '' : 'bg-[#E5E6EA]',
          ]"
        >
          <th
            scope="row"
            class="whitespace-nowrap py-4 px-6 font-semibold text-black dark:text-white"
          >
            {{ value.code }}
          </th>
          <td class="py-4 px-6">{{ value.key }}</td>
          <td class="py-4 px-6">{{ value.unidad }}</td>
          <td class="flex justify-around py-4 px-6">
            <div
              @click="openModalData(value)"
              class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-[#101D2D] transition-colors duration-300 hover:bg-blue-200"
            >
              <PencilIcon class="h-5 w-5" aria-hidden="true" />
            </div>
            <div
              @click="EliminarRegistro(value)"
              class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-[#101D2D] transition-colors duration-300 hover:bg-blue-200"
            >
              <TrashIcon class="h-5 w-6" aria-hidden="true" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <AlmacenMaterialesTableEditar
      v-if="valueControl"
      :isOpen="isOpenModal"
      :data="valueControl"
      @closeModal="isOpenModal = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/outline";
import AlmacenMaterialesTableEditar from "./AlmacenMaterialesTableEditar.vue";
import { getDatabase, remove, ref as refDB } from "firebase/database";

const props = defineProps(["data"]);
const isOpenModal = ref(false);
const valueControl = ref();
const db = getDatabase();

const openModalData = (value) => {
  valueControl.value = value;
  isOpenModal.value = true;
};

const EliminarRegistro = (value) => {
  console.log(value);
  let response = confirm("¿Estás seguro que deseas eliminar el material?");
  if (response)
    remove(
      refDB(
        db,
        `almacen/materiales/${value.tipo.toLowerCase()}/${value.key}`
      )
    );
  else return;
};
</script>
