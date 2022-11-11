<template>
  <div class="min-h-[400px] w-full bg-[#F8FAFB] py-3 px-28 shadow-md">
    <div class="relative overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Código de producto</th>
            <th scope="col" class="py-3 px-6">Descripción</th>
            <th scope="col" class="py-3 px-6">Entradas</th>
            <th scope="col" class="py-3 px-6">Salidas</th>
            <th scope="col" class="py-3 px-6">Stock</th>
            <th scope="col" class="py-3 px-6">Unidad</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data"
            :key="item.code"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <th
              scope="row"
              class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
            >
              {{ item.code }}
            </th>
            <td class="py-4 px-6">{{ item.descripcion }}</td>
            <td class="py-4 px-6">{{ item.entradas }}</td>
            <td class="py-4 px-6">{{ item.salidas }}</td>
            <td class="py-4 px-6" :class="[item.stock < 5 ? 'text-red-500': '', 'font-semibold']">{{ item.stock }}</td>
            <td class="py-4 px-6">{{ item.unidad.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getDatabase, ref as refDB, get } from "firebase/database";

const db = getDatabase();
const data = ref(await obtenerInventario());

async function obtenerInventario() {
  return get(refDB(db, `almacen/inventario`)).then((snapshot) => {
    let object = [];
    snapshot.forEach((element) => {
      object.push({
        descripcion: element.key,
        code: element.val().code,
        entradas: element.val().entradas,
        salidas: element.val().salidas,
        stock: element.val().stock,
        unidad: element.val().unidad,
      });
    });
    return object;
  });
}
</script>
