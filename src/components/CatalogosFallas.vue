<template>
  <div class="mt-5 flex h-full w-full justify-center space-x-12">
    <div class="flex justify-center">
      <div class="flex flex-col space-y-8">
        <h2 class="text-xl font-semibold">Agregar nuevo Fallo</h2>
        <!-- Nombre -->
        <div class="flex flex-col">
          <label class="text-base" for="name">Nombre</label>
          <input
            v-model="formData.nombre"
            class="max-w-sm rounded-xl border-none border-[#C4C4C4] bg-[#F2F2F2] font-semibold placeholder:font-normal focus:ring-0"
            type="text"
            id="name"
          />
        </div>
        <div class="flex flex-col">
          <label class="text-base" for="descripcion">Descripción</label>
          <textarea
            v-model="formData.descripcion"
            id="descripcion"
            class="max-w-sm rounded-xl border-none border-[#C4C4C4] bg-[#F2F2F2] font-semibold placeholder:font-normal focus:ring-0"
          ></textarea>
        </div>
        <div class="flex w-full justify-center">
          <button
            @click="guardar"
            type="button"
            class="rounded-xl bg-[#F2F2F2] py-2 px-4"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
    <div class="flex space-x-12">
      <div class="flex flex-col space-y-6">
        <h2 class="text-xl font-semibold">Fallas</h2>
        <FallasTable :fallasData="fallasData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import {
  getDatabase,
  ref as refDB,
  get,
  child,
  set as setDB,
  serverTimestamp,
  onChildRemoved,
  onChildAdded,
} from "firebase/database";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import FallasTable from "./FallasTable.vue";

const db = getDatabase();
const formData = reactive({
  nombre: null,
  descripcion: null,
});

const fallasData = ref([]);

const rules = computed(() => {
  return {
    nombre: required,
    descripcion: maxLength(255),
  };
});

// Obtener fallas desde base de datos
await onChildAdded(refDB(db, `catalogo/fallas`), (snapshot) => {
  fallasData.value.push({
    nombre: snapshot.key,
  });
});

// Eliminar item de array cluster si se eliminó desde base de datos
onChildRemoved(refDB(db, `catalogo/fallas`), (snapshot) => {
  fallasData.value = fallasData.value.filter((value) => {
    if (value.nombre !== snapshot.key) {
      return value;
    }
  });
});

const $v = useVuelidate(rules, formData);

// Guardar valor en base de datos
const guardar = () => {
  let result = $v.value.$validate();
  if (result) {
    setDB(refDB(db, `catalogo/fallas/${formData.nombre}`), {
      creado: serverTimestamp(),
      descripcion: formData.descripcion,
    }).then((snapshot) => {
      Object.assign(formData, {
        nombre: null,
        descripcion: null,
      });
    });
  }
};
</script>
