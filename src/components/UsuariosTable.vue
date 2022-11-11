<template>
  <div class="flex h-full w-full">
    <div class="relative w-full overflow-x-auto py-6 shadow-md sm:rounded-lg">
      <div
        class="flex items-center justify-between bg-white pb-4 dark:bg-gray-900"
      >
        <Menu as="div" class="relative ml-12 inline-block text-left">
          <div>
            <MenuButton
              class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Acciones
              <ChevronDownIcon
                class="ml-2 -mr-1 h-5 w-5 text-gray-500 hover:text-gray-400"
                aria-hidden="true"
              />
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
              class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? '' : '',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100',
                    ]"
                  >
                    Desactivar
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? '' : '',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100',
                    ]"
                  >
                    Eliminar
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div class="flex basis-1/2 justify-between px-6 pr-28">
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <svg
                class="h-5 w-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Buscar usuario"
            />
          </div>
          <div>
            <Listbox v-model="roleSearch" multiple>
              <div class="relative">
                <ListboxButton
                  class="shadow- relative w-full cursor-pointer rounded-lg border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">Roles</span>
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
                    class="absolute mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="role in roles"
                      :key="role.name"
                      :value="role"
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
                          >{{ role.name }}</span
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
        </div>
      </div>
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="p-4">
              <!-- Primer columna -->
            </th>
            <th scope="col" class="py-3 px-6">Nombre</th>
            <th scope="col" class="py-3 px-6">Rol</th>
            <th scope="col" class="py-3 px-6">Estatus</th>
            <th scope="col" class="py-3 px-6">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="usuario in handlePagination().paginatedData.value"
            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label for="checkbox-table-search-1" class="sr-only"
                  >checkbox</label
                >
              </div>
            </td>
            <th
              scope="row"
              class="flex items-center whitespace-nowrap py-4 px-6 text-gray-900 dark:text-white"
            >
              <div class="pl-3">
                <div class="text-base font-semibold">{{ usuario.name }}</div>
                <div class="font-normal text-gray-500">
                  {{ usuario.email }}
                </div>
              </div>
            </th>
            <td class="py-4 px-6">{{ usuario.rol }}</td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                <div
                  :class="[
                    'mr-2 h-2.5 w-2.5 rounded-full',
                    usuario.disabled ? 'bg-red-400' : 'bg-green-400',
                  ]"
                ></div>
                {{ usuario.disabled ? "Deshabilitado" : "Activo" }}
              </div>
            </td>
            <td class="py-4 px-6">
              <a
                href="#"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >Edit user</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex w-full justify-end pr-10">
        <button
          @click="handlePagination().backPage"
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
        >
          Prev
        </button>
        <button
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
          v-for="item in Math.ceil(usuarios.length / perPage)"
          :key="item"
          @click="() => handlePagination().goToPage(item)"
        >
          {{ item }}
        </button>
        <button
          @click="handlePagination().nextPage"
          class="border bg-gray-100 py-1 px-3 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import {
  getDatabase,
  ref as refDB,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
  limitToFirst,
  limitToLast,
  get,
  query,
  child,
  onValue,
} from "firebase/database";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon, CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

const db = getDatabase();
const usuariosDB = refDB(db, "usuarios");
const roleSearch = ref([]);
const roles = ref([
  { name: "Administrador" },
  { name: "Despacho" },
  { name: "Supervisor" },
  { name: "Técnico" },
]);
const usuarios = ref([]);
const page = ref(1);
const perPage = 10;

// Actualizar información de usuario
const updateTable = (data) => {
  let index = usuarios.value.findIndex((element, index) => {
    if (element.key === data.key) {
      return true;
    }
  });
  usuarios.value[index] = {
    key: data.key,
    name: data.val().displayName,
    email: data.val().email,
    disabled: data.val().disabled,
    rol: data.val().rol,
  };
};

// crear tabla y observar si se agrega un nuevo usuario
const updateTableNewUser = async (data) => {
  let objectDataSnapshot = new Object();
  let exist =
    usuarios.value.findIndex((element) => element.key === data.key) != -1
      ? true
      : false;

  if (!exist) {
    objectDataSnapshot = {
      key: data.key,
      name: data.val().displayName,
      email: data.val().email,
      disabled: data.val().disabled,
      rol: data.val().rol,
    };
    usuarios.value.push(objectDataSnapshot);
    await handlePagination();
  }
};

// Actualizar tabla cuando se borra un usuario
const deleteUser = (data) => {
  let index = usuarios.value.findIndex((element, index) => {
    if (element.key === data.key) {
      return true;
    }
  });
  usuarios.value.splice(index, 1);
};

// observador de datos de usaurios (tiempo real)
onChildChanged(usuariosDB, (snapshot) => {
  const data = snapshot;
  updateTable(data);
});

// observador si se crea un nuevo usuario (tiempo real)
await onChildAdded(usuariosDB, (snapshot) => {
  const data = snapshot;
  // console.log(snapshot.val())
  updateTableNewUser(data);
});

// Observador si se elimina un usuario (tiempo real)
onChildRemoved(usuariosDB, (snapshot) => {
  const data = snapshot;
  deleteUser(data);
});

// control paginación

function handlePagination() {
  const paginatedData = computed(() =>
    usuarios.value.slice((page.value - 1) * perPage, page.value * perPage)
  );

  const nextPage = () => {
    if (page.value !== Math.ceil(usuarios.value.length / perPage)) {
      page.value += 1;
    }
  };

  const backPage = () => {
    if (page.value !== 1) {
      page.value -= 1;
    }
  };

  const goToPage = (numPage) => {
    page.value = numPage;
  };

  return {
    paginatedData,
    perPage,
    page,
    nextPage,
    backPage,
    goToPage,
  };
}

const dropdownAction = ref(false);
</script>
