<template>
  <div class="mt-5 flex h-full w-full flex-col">
    <!-- Seleccionar distrito -->
    <div class="flex flex-col space-y-6">
      <p>Elige un distrito para editar</p>
      <div class="w-[20%]">
        <Listbox v-model="selectedDistrito">
          <div class="relative">
            <ListboxLabel>Distrito</ListboxLabel>
            <ListboxButton
              class="shadow- relative w-full max-w-sm cursor-pointer rounded-xl border-none bg-[#F2F2F2] py-3 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ selectedDistrito }}</span>
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
      </div>
      <div class="flex space-x-12">
        <!-- table relacion -->
        <div class="flex w-[50%] space-x-4">
          <draggable
            class="flex max-h-[300px] min-h-[350px] min-w-[250px] select-none flex-col overflow-auto rounded-xl border-none bg-[#D9D9D9]"
            :list="clustersRelacionados"
            group="clusters"
            @change="agregarClusters"
            draggable="false"
            item-key="distrito1"
            :sort="false"
          >
            <template #item="{ element, index }">
              <div class="mt-4 flex h-fit w-full space-x-4 px-4">
                <div class="flex h-full items-center justify-center">
                  <button
                    @click="eliminarClusters(element, index)"
                    type="button"
                  >
                    <XCircleIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div
                  class="w-fit max-w-[150px] items-center truncate rounded-md bg-white px-4"
                  :title="element"
                >
                  {{ element }}
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center rounded-t-xl bg-[#F2F2F2] py-2"
              >
                <h3 class="text-lg">Clusters</h3>
              </div>
            </template>
          </draggable>

          <draggable
            class="flex max-h-[300px] min-h-[350px] min-w-[250px] select-none flex-col overflow-auto rounded-xl border-none bg-[#D9D9D9]"
            :list="supervisoresRelacionados"
            group="supervisores"
            @change="agregarSupervisores"
            draggable="false"
            item-key="supervisores1"
            :sort="false"
          >
            <template #item="{ element, index }">
              <div class="mt-4 flex h-fit w-full space-x-4 px-4">
                <div class="flex h-full items-center justify-center">
                  <button
                    @click="eliminarSupervisores(element, index)"
                    type="button"
                  >
                    <XCircleIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div
                  class="w-fit max-w-[150px] items-center truncate rounded-md bg-white px-4"
                  :title="element.name"
                >
                  {{ element.name }}
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center rounded-t-xl bg-[#F2F2F2] py-2"
              >
                <h3 class="text-lg">Supervisor/es</h3>
              </div>
            </template>
          </draggable>
        </div>
        <!-- Tabla de datos no relacionados -->
        <div class="flex space-x-4">
          <draggable
            class="flex max-h-[300px] min-h-[350px] min-w-[250px] select-none flex-col overflow-auto rounded-xl border-none bg-[#D9D9D9]"
            :list="clustersData"
            group="clusters"
            @change="log"
            item-key="distrito1"
            :sort="false"
          >
            <template #item="{ element }">
              <div class="mt-4 flex h-fit w-full space-x-4 px-4">
                <div
                  class="w-full items-center truncate rounded-md bg-white px-4"
                  :title="element"
                >
                  {{ element }}
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center rounded-t-xl bg-[#F2F2F2] py-2"
              >
                <h3 class="text-lg">Clusters</h3>
              </div>
            </template>
          </draggable>

          <draggable
            class="flex max-h-[300px] min-h-[350px] min-w-[250px] select-none flex-col overflow-auto rounded-xl border-none bg-[#D9D9D9]"
            :list="supervisoresData"
            group="supervisores"
            @change="log"
            item-key="supervisores"
            :sort="false"
          >
            <template #item="{ element }">
              <div class="mt-4 flex h-fit w-full space-x-4 px-4">
                <div
                  class="w-full items-center truncate rounded-md bg-white px-4"
                  :title="element.name"
                >
                  {{ element.name }}
                </div>
              </div>
            </template>
            <template #header>
              <div
                class="flex w-full items-center justify-center rounded-t-xl bg-[#F2F2F2] py-2"
              >
                <h3 class="text-lg">Supervisor/es</h3>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
} from "@headlessui/vue";
import {
  getDatabase,
  ref as refDB,
  get,
  update,
  set,
  remove,
} from "firebase/database";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { XCircleIcon } from "@heroicons/vue/outline";
import Draggable from "vuedraggable";
import cluster from "cluster";

const data = ref([]);
const db = getDatabase();

const clustersRelacionados = ref([]);
const supervisoresRelacionados = ref([]);

const clustersData = ref([]);
const supervisoresData = ref([]);
const controlOnStart = ref(true);
const idGlobal = ref(8);
// Obtener distritos desde base de datos
await get(refDB(db, `catalogo/distritos`)).then((snapshot) => {
  snapshot.forEach((element) => {
    data.value.push(element.key);
  });
});

const selectedDistrito = ref(data.value[0]);

const loadData = async () => {
  clustersRelacionados.value = [];
  supervisoresRelacionados.value = [];
  clustersData.value = []
  supervisoresData.value = [];

  // Obtener clusters ya relacionados
  await get(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/clusters`)
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      console.log(element);
      clustersRelacionados.value.push(element.val());
    });
  });

  // Obtener supervisores ya relacionados
  await get(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/supervisores`)
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      supervisoresRelacionados.value.push({
        key: element.key,
        name: element.val().nombre,
      });
    });
  });

  // Obtener clusters desde base de datos
  await get(refDB(db, `catalogo/clusters`)).then((snapshot) => {
    let exist = false;
    snapshot.forEach((element) => {
      console.log(element.key);
      exist =
        clustersRelacionados.value.findIndex(
          (value) => value === element.key
        ) != -1
          ? true
          : false;
      if (!exist) {
        clustersData.value.push(element.key);
      }
    });
  });

  //Obtener supervisores desde base de datos
  await get(refDB(db, `catalogo/supervisores`)).then((snapshot) => {
    let exist = false;
    snapshot.forEach((element) => {
      exist =
        supervisoresRelacionados.value.findIndex(
          (value) => value.key === element.key
        ) != -1
          ? true
          : false;
      if (!exist) {
        supervisoresData.value.push({
          key: element.key,
          name: element.val().nombre,
        });
      }
    });
  });
};

watch(selectedDistrito, async () => {
  await loadData();
});

await loadData();

const log = (evt) => {
  console.log(evt);
};

const eliminarClusters = (element, item) => {
  clustersRelacionados.value.splice(item, 1);
  clustersData.value.push(element);
  set(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/clusters`),
    clustersRelacionados.value
  );
};
const eliminarSupervisores = (element, item) => {
  remove(
    refDB(
      db,
      `catalogo/distritos/${selectedDistrito.value}/supervisores/${element.key}`
    )
  ).then((snapshot) => {
    supervisoresRelacionados.value.splice(item, 1);
    supervisoresData.value.push(element);
  });
};
const agregarSupervisores = (evt) => {
  console.log(evt.added.element);
  update(
    refDB(
      db,
      `catalogo/distritos/${selectedDistrito.value}/supervisores/${evt.added.element.key}`
    ),
    {
      nombre: evt.added.element.name,
    }
  );
};

const agregarClusters = (evt) => {
  set(
    refDB(db, `catalogo/distritos/${selectedDistrito.value}/clusters`),
    clustersRelacionados.value
  );
};
</script>
