<template>
  <div class="h-full w-full">
    <form>
      <div class="flex w-full space-x-6">
        <div class="mb-6 w-[250px]">
          <label
            for="distrito"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >Distrito</label
          >
          <select
            v-model="formModel.distrito"
            id="distrito"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Selecciona un distrito</option>
            <option v-for="distrito in formData.distritos" :key="distrito">
              {{ distrito }}
            </option>
          </select>
        </div>
        <div class="mb-6 w-[250px]">
          <label
            for="supervisor"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >Solicita</label
          >
          <select
            v-model="formModel.supervisor"
            id="supervisor"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Supervisor</option>
            <option v-for="supervisor in formData.supervisor" :key="supervisor">
              {{ supervisor }}
            </option>
          </select>
        </div>
        <div class="mb-6 w-[250px]">
          <Combobox v-model="formModel.materiales" multiple>
            <div class="relative mt-1">
              <ComboboxLabel
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >Selecciona los materiales</ComboboxLabel
              >
              <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
              >
                <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  @change="query = $event.target.value"
                />
                <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <ChevronDownIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </ComboboxButton>
              </div>
              <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
              >
                <ComboboxOptions
                  class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <div
                    v-if="filteredPeople.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                    v-for="material in formData.materiales"
                    as="template"
                    :key="material.id"
                    :value="material"
                    v-slot="{ selected, active }"
                  >
                    <li
                      class="relative cursor-default select-none py-2 pl-10 pr-4"
                      :class="{
                        'bg-teal-600 text-white': active,
                        'text-gray-900': !active,
                      }"
                    >
                      <span
                        class="block truncate"
                        :class="{
                          'font-medium': selected,
                          'font-normal': !selected,
                        }"
                      >
                        {{ material.descripcion }}
                      </span>
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{
                          'text-white': active,
                          'text-teal-600': !active,
                        }"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
      </div>
    </form>
    <SalidasTable
      :data="formModel.materiales"
      :supervisor="formModel.supervisor"
      :distrito="formModel.distrito"
      @cancelar="cancelar"
      v-if="
        formModel.distrito != 'Selecciona un distrito' &&
        formModel.supervisor != 'Supervisor'
      "
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import { getDatabase, ref as refDB, get } from "firebase/database";
import SalidasTable from "./SalidasTable.vue";

const db = getDatabase();
const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const formData = reactive({
  distritos: [],
  supervisor: [],
  materiales: [],
});
const tipoMaterial = ref(["Totalplay", "Miscelaneos"]);

const formModel = reactive({
  distrito: "Selecciona un distrito",
  supervisor: "Supervisor",
  materiales: [],
});

function cargarFiltro() {
  let key = "";
  get(refDB(db, "catalogo/distritos")).then((snapshot) => {
    snapshot.forEach((element) => {
      formData.distritos.push(element.key);
    });
  });
  get(refDB(db, "catalogo/supervisores")).then((snapshot) => {
    snapshot.forEach((element) => {
      formData.supervisor.push(element.val().nombre);
      key = snapshot.key;
    });
  });
  get(refDB(db, "almacen/materiales/totalplay")).then((snapshot) => {
    get(refDB(db, "almacen/inventario")).then((snapshot2) => {
      snapshot.forEach((element) => {
        if (snapshot2.val()[element.key].stock > 0) {
          formData.materiales.push({
            codigo: element.val().code,
            descripcion: element.key,
            stock: snapshot2.val()[element.key].stock,
            unidad: snapshot2.val()[element.key].unidad.id,
          });
        }
      });
    });
  });
}

cargarFiltro();

let selected = ref([people[0]]);
let query = ref("");

let filteredPeople = computed(() =>
  query.value === ""
    ? people
    : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const cancelar = () => {
  Object.assign(formModel, {
    distrito: "Selecciona un distrito",
    supervisor: "Supervisor",
    materiales: [],
  });
};
</script>
