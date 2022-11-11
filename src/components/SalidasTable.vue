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
          <th scope="col" class="py-3 px-6">Stock</th>
          <th scope="col" class="py-3 px-6">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          v-for="(item, index) in formModel"
          :key="item.code"
        >
          <th
            scope="row"
            class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
          >
            {{ item.codigo }}
          </th>
          <td class="py-4 px-6">{{ item.descripcion }}</td>
          <td class="py-4 px-6">{{ item.unidad }}</td>
          <td class="py-4 px-6">{{ item.stock }}</td>
          <td :class="['py-4 px-6']">
            <input
              v-model="item.cantidad"
              @change="validarInput(index)"
              class="max-w-[100px] rounded-lg border-[#7C8495]"
              type="number"
              min="1"
              :max="item.stock"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-12 flex w-full justify-end space-x-12">
      <button
        @click="cancelar"
        class="min-w-[100px] rounded-lg bg-primario px-4 py-2 text-white hover:bg-primario/80"
      >
        Cancelar
      </button>
      <button
        @click="generar"
        class="min-w-[100px] rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-500/80"
      >
        Generar reporte
      </button>
      <SalidasPDF :generarPDF="generarPDF" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, toRaw } from "vue";
import SalidasPDF from "./reportes/SalidasPDF.vue";
import { getDatabase, ref as refDB, update } from "firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const salidaInventario = httpsCallable(functions, "salidaInventario");
const formModel = ref([]);
const props = defineProps(["data", "supervisor", "distrito"]);
const emits = defineEmits(["cancelar"]);
const generarPDF = ref(false);

const cancelar = () => {
  formModel.value = [];
  emits("cancelar");
};

watch(
  () => props.data,
  (newValue, oldValue) => {
    let exist;
    if (newValue.length > oldValue.length) {
      for (var i = 0; i < newValue.length; i++) {
        exist = formModel.value.find(
          (item) => item.codigo === newValue[i].codigo
        );
        if (!exist) {
          formModel.value.push({
            codigo: newValue[i].codigo,
            descripcion: newValue[i].descripcion,
            unidad: newValue[i].unidad,
            stock: newValue[i].stock,
            cantidad: 1,
          });
        }
      }
    } else {
      for (var i = 0; i < formModel.value.length; i++) {
        exist = newValue.find(
          (item) => formModel.value[i].codigo === item.codigo
        );
        if (!exist) {
          formModel.value.splice(i, 1);
        }
      }
    }
  }
);

props.data.forEach((e) => {
  formModel.value.push({
    codigo: e.codigo,
    descripcion: e.descripcion,
    unidad: e.unidad,
    stock: e.stock,
    cantidad: 1,
  });
});

const validarInput = (index) => {
  if (
    formModel.value[index].cantidad <= 0 ||
    formModel.value[index].cantidad === null
  ) {
    formModel.value[index].cantidad = 1;
  }
  if (formModel.value[index].cantidad > formModel.value[index].stock) {
    formModel.value[index].cantidad = formModel.value[index].stock;
  }
};

const generar = async () => {
  let confirmar = confirm(
    "Por favor verifica el movimiento, ¿Estás seguro en continuar?"
  );
  if (confirmar) {
    await salidaInventario({ data: formModel.value, supervisor: props.supervisor, distrito: props.distrito })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    generarPDF.value = true;
  }
};
</script>
