<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">Código de producto</th>
          <th scope="col" class="py-3 px-6">Descripción</th>
          <th scope="col" class="py-3 px-6">Unidad</th>
          <th scope="col" class="py-3 px-6">Cantidad</th>
          <th scope="col" class="py-3 px-6">Estatus</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          v-for="item in props.data"
          :key="item.codigo"
        >
          <th
            scope="row"
            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          >
            {{ item.codigo }}
          </th>
          <td class="py-4 px-6">{{ item.descripcion }}</td>
          <td class="py-4 px-6">{{ item.unidad }}</td>
          <td class="py-4 px-6">{{ item.cantidad }}</td>
          <td
            class="py-4 px-6"
            :class="[
              item.error ? 'text-red-500' : 'text-green-500',
              'font-semibold',
            ]"
          >
            {{ item.error ? "Error" : "Correcto" }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-12 flex w-full justify-end space-x-12">
      <button
        @click="upload"
        class="min-w-[100px] rounded-lg bg-primario px-4 py-2 text-white hover:bg-primario/80"
      >
        Subir
      </button>
      <button
        @click="emit('cancelar')"
        class="min-w-[100px] rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-500/80"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["data"]);
const emit = defineEmits(["cancelar", "subir"]);
const upload = () => {
  let error = false;
  let confirmUpload = false;
  let validatedData = [];
  error = props.data.some((e) => e.error === true) ? true : false;
  if (error) {
    confirmUpload = confirm(
      "Existen errores, ¿Desea continuar?. Solo se subirán los datos correctos."
    );
    if (confirmUpload) {
      validatedData = props.data.filter((e) => {
        if (e.error != true) return e;
      });
      emit("subir", validatedData);
    }
  } else {
    confirmUpload = confirm("¿Estás seguro de subir los datos?");
    if (confirmUpload) {
      emit("subir", props.data);
    }
  }
};
</script>
