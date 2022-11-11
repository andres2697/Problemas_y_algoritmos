<template>
  <div class="flex h-full w-full flex-col">
    <!-- Filtro -->
    <div class="mt-9 flex pl-20">
      <div class="flex items-end space-x-8">
        <div>
          <label
            for="folio"
            class="mb-2 block text-sm text-[#7C8495] dark:text-gray-300"
            >Folio</label
          >
          <input
            type="text"
            id="folio"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Ingresar folio"
            required
          />
        </div>
        <div>
          <label
            for="tipo"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >Tipo</label
          >
          <select
            id="tipo"
            class="block w-full min-w-[80px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          >
            <option selected>OT</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            class="w-full rounded-lg bg-primario px-8 py-3 text-center text-sm font-medium text-white hover:bg-primario/80 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Buscar
          </button>
        </div>
      </div>
      <!-- Filtro estatus -->
      <div></div>
    </div>
    <!-- Filtro avanzado -->
    <div v-if="filtroAvanzado">filtro avanzado</div>
    <!-- Table -->
    <div class="mt-8">
      <ConsultarFoliosTable />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ConsultarFoliosTable from "@/components/ConsultarFoliosTable.vue";

const filtroAvanzado = ref(false);
</script>
