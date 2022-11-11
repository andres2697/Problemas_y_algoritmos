<template>
  <div class="mt-5 flex h-full w-full justify-center space-x-12">
    <div class="flex justify-center">
      <div class="flex flex-col space-y-8">
        <h2 class="text-xl font-semibold">Agregar nuevo folio</h2>
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
        <!-- ETA máximo -->
        <div class="flex flex-col">
          <label class="text-base" for="eta">ETA Máximo</label>
          <input
            v-model="formData.ETAmax"
            class="max-w-sm rounded-xl border-none border-[#C4C4C4] bg-[#F2F2F2] font-semibold placeholder:font-normal focus:ring-0"
            type="number"
            id="eta"
          />
        </div>
        <!-- SLA Máximo -->
        <div class="flex flex-col">
          <label class="text-base" for="sla">SLA Máximo</label>
          <input
            v-model="formData.SLAmax"
            class="max-w-sm rounded-xl border-none border-[#C4C4C4] bg-[#F2F2F2] font-semibold placeholder:font-normal focus:ring-0"
            type="number"
            id="sla"
          />
        </div>
        <!-- tipo de -->
        <Listbox v-model="formData.tipoIncidencia">
          <div class="relative">
            <ListboxButton
              class="shadow- relative w-full max-w-sm cursor-pointer rounded-xl border-none bg-[#F2F2F2] py-3 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ formData.tipoIncidencia }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <SelectorIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-30 mt-1 max-h-60 w-full max-w-sm overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="item in data"
                  :key="item"
                  :value="item"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'text-gray-900',
                      'relative w-full cursor-default select-none py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block w-full truncate',
                      ]"
                      >{{ item }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
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
        <h2 class="text-xl font-semibold">Correctivo</h2>
        <FoliosTable :foliosData="foliosData.correctivo" />
      </div>
      <div class="flex flex-col space-y-6">
        <h2 class="text-xl font-semibold">Preventivo</h2>
        <FoliosTable :foliosData="foliosData.preventivo" />
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
import FoliosTable from "./FoliosTable.vue";

const db = getDatabase();
const data = reactive(["Preventivo", "Correctivo", "Todos"]);
const formData = reactive({
  nombre: null,
  ETAmax: null,
  SLAmax: null,
  tipoIncidencia: data[0],
  descripcion: null,
});

const foliosData = reactive({
  preventivo: [],
  correctivo: [],
});

const rules = computed(() => {
  return {
    nombre: required,
    ETAmax: required,
    SLAmax: required,
    tipoIncidencia: required,
    descripcion: maxLength(255),
  };
});

// Obtener folios desde base de datos
await onChildAdded(refDB(db, `catalogo/tipoFolios/correctivo`), (snapshot) => {
  foliosData.correctivo.push({
    nombre: snapshot.key,
    ETAmax: snapshot.val().ETAmax,
    SLAmax: snapshot.val().SLAmax,
    tipo: "correctivo",
  });
});

// Obtener folios desde base de datos
await onChildAdded(refDB(db, `catalogo/tipoFolios/preventivo`), (snapshot) => {
  foliosData.preventivo.push({
    nombre: snapshot.key,
    ETAmax: snapshot.val().ETAmax,
    SLAmax: snapshot.val().SLAmax,
    tipo: "preventivo",
  });
});

// Eliminar item de array folios si se eliminó desde base de datos
onChildRemoved(refDB(db, `catalogo/tipoFolios/correctivo`), (snapshot) => {
  foliosData.correctivo = foliosData.correctivo.filter((value) => {
    if (value.nombre !== snapshot.key) {
      return value;
    }
  });
});

// Eliminar item de array distrito si se eliminó desde base de datos
onChildRemoved(refDB(db, `catalogo/tipoFolios/preventivo`), (snapshot) => {
  foliosData.preventivo = foliosData.preventivo.filter((value) => {
    if (value.nombre !== snapshot.key) {
      return value;
    }
  });
});

const $v = useVuelidate(rules, formData);

// Guardar valor en base de datos
const guardar = () => {
  let result = $v.value.$validate();
  let object = { correctivo: {}, preventivo: {} };
  if (result) {
    if (formData.tipoIncidencia === "Todos") {
      for (let i = 0; i < data.length - 1; i++) {
        setDB(
          refDB(
            db,
            `/catalogo/tipoFolios/${data[i].toLowerCase()}/${formData.nombre}`
          ),
          { creado: serverTimestamp(), ETAmax: formData.ETAmax, SLAmax: formData.SLAmax }
        ).then((snapshot) => {
          Object.assign(formData, {
            nombre: null,
            ETAmax: null,
            SLAmax: null,
            tipoIncidencia: data[0],
            descripcion: null,
          });
        });
      }
    } else {
      setDB(
        refDB(
          db,
          `catalogo/tipoFolios/${formData.tipoIncidencia.toLowerCase()}/${
            formData.nombre
          }`
        ),
        { creado: serverTimestamp(), ETAmax: formData.ETAmax, SLAmax: formData.SLAmax }
      ).then((snapshot) => {
        Object.assign(formData, {
          nombre: null,
          ETAmax: null,
          SLAmax: null,
          tipoIncidencia: data[0],
          descripcion: null,
        });
      });
    }
  }
};
</script>
