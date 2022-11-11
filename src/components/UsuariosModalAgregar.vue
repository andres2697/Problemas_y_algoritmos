<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="flex w-full max-w-5xl transform flex-col space-y-6 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Registrar nuevo usuario
              </DialogTitle>
              <div>
                <div class="mb-4 max-h-[70px] overflow-y-auto">
                  <ul>
                    <li v-for="error in functionError" class="text-sm text-red-400">{{error}}</li>
                  </ul>
                </div>
                <form
                  @submit.prevent="crearUsuario"
                  class="flex w-full flex-col justify-between"
                >
                  <div class="flex justify-between">
                    <!-- Datos -->
                    <div class="basis-[50%]">
                      <div class="flex flex-col">
                        <h2>Datos</h2>
                        <div class="h-0.5 w-2/3 bg-[#D9D9D9]"></div>
                      </div>
                      <div class="mt-6 flex flex-col space-y-2">
                        <!-- nombre -->
                        <div class="flex flex-col">
                          <label class="text-sm text-[#C4C4C4]" for="name"
                            >Nombre</label
                          >
                          <input
                            v-model="userData.name"
                            class="max-w-sm rounded-md border-2 border-[#C4C4C4] font-semibold placeholder:font-normal focus:ring-0"
                            type="text"
                            id="name"
                            placeholder="Nombre"
                          />
                          <p
                            v-for="error of $v.name.$errors"
                            :key="error.$uid"
                            class="text-sm text-red-400"
                          >
                            {{ error.$message }}
                          </p>
                        </div>
                        <!-- apellido -->
                        <div class="flex flex-col">
                          <label class="text-sm text-[#C4C4C4]" for="lastname"
                            >Apellido</label
                          >
                          <input
                            v-model="userData.lastname"
                            class="max-w-sm rounded-md border-2 border-[#C4C4C4] font-semibold placeholder:font-normal focus:ring-0"
                            type="text"
                            id="lastname"
                            placeholder="Apellido"
                          />
                          <p
                            v-for="error of $v.lastname.$errors"
                            :key="error.$uid"
                            class="text-sm text-red-400"
                          >
                            {{ error.$message }}
                          </p>
                        </div>
                        <!-- correo -->
                        <div class="flex flex-col">
                          <label class="text-sm text-[#C4C4C4]" for="email"
                            >Correo</label
                          >
                          <input
                            v-model="userData.email"
                            class="max-w-sm rounded-md border-2 border-[#C4C4C4] font-semibold placeholder:font-normal focus:ring-0"
                            type="email"
                            id="email"
                            placeholder="Correo"
                          />
                        </div>
                        <!-- contraseña -->
                        <div class="flex flex-col">
                          <label class="text-sm text-[#C4C4C4]" for="password"
                            >Contraseña</label
                          >
                          <input
                            v-model="userData.password"
                            class="max-w-sm rounded-md border-2 border-[#C4C4C4] font-semibold placeholder:font-normal focus:ring-0"
                            type="password"
                            id="password"
                          />
                          <p
                            v-for="error of $v.password.$errors"
                            :key="error.$uid"
                            class="text-sm text-red-400"
                          >
                            {{ error.$message }}
                          </p>
                        </div>
                        <!-- confirmar contraseña -->
                        <div class="flex flex-col">
                          <label
                            class="text-sm text-[#C4C4C4]"
                            for="password_confirm"
                            >Confirmar contraseña</label
                          >
                          <input
                            v-model="userData.password_confirm"
                            class="max-w-sm rounded-md border-2 border-[#C4C4C4] font-semibold placeholder:font-normal focus:ring-0"
                            type="password"
                            id="password_confirm"
                          />
                          <p
                            v-for="error of $v.password_confirm.$errors"
                            :key="error.$uid"
                            class="text-sm text-red-400"
                          >
                            {{ error.$message }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <!-- Rol -->
                    <div class="basis-[50%]">
                      <div class="flex flex-col">
                        <h2>Rol</h2>
                        <div class="h-0.5 w-2/3 bg-[#D9D9D9]"></div>
                      </div>
                      <!-- Rol select -->
                      <div class="mt-6">
                        <label class="text-sm text-[#C4C4C4]" for="rol"
                          >Rol</label
                        >
                        <Listbox v-model="userData.rol">
                          <div class="relative">
                            <ListboxButton
                              class="shadow- relative w-full max-w-sm cursor-pointer rounded-md border-2 border-[#C4C4C4] bg-white py-2 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                            >
                              <span class="block truncate">{{
                                userData.rol.name
                              }}</span>
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
                                  v-for="role in rolData.roles"
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
                                        selected
                                          ? 'font-medium'
                                          : 'font-normal',
                                        'block w-full truncate',
                                      ]"
                                      >{{ role.name }}</span
                                    >
                                    <span
                                      v-if="selected"
                                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                                    >
                                      <CheckIcon
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </li>
                                </ListboxOption>
                              </ListboxOptions>
                            </transition>
                          </div>
                        </Listbox>
                        <p
                          v-for="error of $v.rol.name.$errors"
                          :key="error.$uid"
                          class="text-sm text-red-400"
                        >
                          {{ error.$message }}
                        </p>
                      </div>
                      <!-- relacion supervisor -->
                      <div
                        v-if="userData.rol.name === 'Supervisor'"
                        class="mt-6 flex h-auto w-full justify-between"
                      >
                        <!-- distritos -->
                        <div class="flex basis-[50%] flex-col">
                          <div>
                            <label class="text-sm text-[#C4C4C4]" for="rol"
                              >Distritos</label
                            >
                            <Listbox v-model="userData.distritos" multiple>
                              <div class="relative">
                                <ListboxButton
                                  class="shadow- relative max-w-xs cursor-pointer rounded-md border-2 border-[#C4C4C4] bg-white py-2 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                                >
                                  <span class="block truncate"
                                    >Asignar distrito</span
                                  >
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
                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <ListboxOption
                                      v-slot="{ active, selected }"
                                      v-for="distrito in distritosData"
                                      :key="distrito.name"
                                      :value="distrito"
                                      as="template"
                                    >
                                      <li
                                        :class="[
                                          active
                                            ? 'bg-gray-100'
                                            : 'text-gray-900',
                                          'relative w-full cursor-default select-none py-2 pl-9 pr-4',
                                        ]"
                                      >
                                        <span
                                          :class="[
                                            selected
                                              ? 'font-medium'
                                              : 'font-normal',
                                            'block w-full truncate',
                                          ]"
                                          >{{ distrito.name }}</span
                                        >
                                        <span
                                          v-if="selected"
                                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                                        >
                                          <CheckIcon
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </li>
                                    </ListboxOption>
                                  </ListboxOptions>
                                </transition>
                              </div>
                            </Listbox>
                          </div>
                          <!-- List distritos -->
                          <div
                            class="mt-6 h-[150px] max-h-[150px] overflow-y-auto"
                          >
                            <ul>
                              <div class="text-sm text-[#C4C4C4]">
                                Distritos
                              </div>
                              <div class="h-[1px] w-40 bg-[#C4C4C4]/50"></div>
                              <li
                                v-for="(value, index) in userData.distritos"
                                class="flex items-center space-x-4"
                              >
                                <div @click="eliminarDistrito(index)">
                                  <XCircleIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>{{ value.name }}</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <!-- tecnicos -->
                        <div class="basis-[45%]">
                          <div>
                            <label class="text-sm text-[#C4C4C4]" for="rol"
                              >Técnicos</label
                            >
                            <Listbox v-model="userData.tecnicos" multiple>
                              <div class="relative">
                                <ListboxButton
                                  class="shadow- relative max-w-xs cursor-pointer rounded-md border-2 border-[#C4C4C4] bg-white py-2 pl-3 pr-10 text-left font-semibold focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                                >
                                  <span class="block truncate"
                                    >Asignar técnicos</span
                                  >
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
                                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <ListboxOption
                                      v-slot="{ active, selected }"
                                      v-for="tecnico in tecnicosData"
                                      :key="tecnico.name"
                                      :value="tecnico"
                                      as="template"
                                    >
                                      <li
                                        :class="[
                                          active
                                            ? 'bg-gray-100'
                                            : 'text-gray-900',
                                          'relative w-full cursor-default select-none py-2 pl-9 pr-4',
                                        ]"
                                      >
                                        <span
                                          :class="[
                                            selected
                                              ? 'font-medium'
                                              : 'font-normal',
                                            'block w-full truncate',
                                          ]"
                                          >{{ tecnico.name }}</span
                                        >
                                        <span
                                          v-if="selected"
                                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                                        >
                                          <CheckIcon
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      </li>
                                    </ListboxOption>
                                  </ListboxOptions>
                                </transition>
                              </div>
                            </Listbox>
                          </div>

                          <!-- list tecnicos -->
                          <div
                            class="mt-6 h-[150px] max-h-[150px] overflow-y-auto"
                          >
                            <div class="text-sm text-[#C4C4C4]">Técnicos</div>
                            <div class="h-[1px] w-40 bg-[#C4C4C4]/50"></div>
                            <ul>
                              <li
                                v-for="(value, index) in userData.tecnicos"
                                class="flex items-center space-x-4"
                              >
                                <div @click="eliminarTecnico(index)">
                                  <XCircleIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>{{ value.name }}</div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex w-full justify-end space-x-12 pr-12">
                    <button
                      @click="closeModal()"
                      type="button"
                      class="rounded-lg border-2 border-[#2166E5] bg-white py-2 px-4 font-semibold text-[#2166E5]"
                    >
                      Cancelar
                    </button>
                    <button
                      :class="[
                        'rounded-lg bg-[#2166E5] py-2 px-4 font-semibold text-white',
                      ]"
                      type="submit"
                    >
                      Crear usuario
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { ChevronDownIcon, CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { XCircleIcon } from "@heroicons/vue/outline";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  requiredIf,
  minLength,
  maxLength,
  sameAs,
  not,
} from "@vuelidate/validators";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  getDatabase,
  ref as refDB,
  get,
  query,
  equalTo,
  orderByChild,
  
} from "@firebase/database";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["closeModal"]);
const functions = getFunctions(); //Instancia de firebase function
const addUser = httpsCallable(functions, "addUser"); // Función para crear usuario desde firebase function
const db = getDatabase();
const functionError = ref([]);

// Data Rol
const rolData = ref({
  roles: [
    { name: "Administrador" },
    { name: "Despacho" },
    { name: "Supervisor" },
    { name: "Técnico" },
  ],
});

const tecnicosData = reactive([]);

const distritosData = reactive([
  { name: "D6 Iztapalapa" },
  { name: "D26 Constitución" },
]);

// User Data
const userData = reactive({
  name: null,
  lastname: null,
  email: null,
  password: null,
  password_confirm: null,
  rol: { name: "Rol" },
  distritos: [],
  tecnicos: [],
});


// Validaciones
const rules = computed(() => {
  return {
    name: {
      requiredName: helpers.withMessage("Campo requerido.", required),
      minLengthValue: helpers.withMessage(
        "El campo no puede ser menor a 2 caracteres.",
        minLength(2)
      ),
      maxLengthValue: helpers.withMessage(
        "El campo tiene demasiados caracteres",
        maxLength(20)
      ),
    },
    lastname: {
      requiredLastname: helpers.withMessage("Campo requerido", required),
      minLengthValue: helpers.withMessage(
        "El campo no puede ser menor a 2 caracteres.",
        minLength(2)
      ),
      maxLengthValue: helpers.withMessage(
        "El campo tiene demasiados caracteres",
        maxLength(20)
      ),
    },
    email: { required },
    password: {
      requiredPassword: helpers.withMessage("Campo requerido", required),
      minLengthValue: helpers.withMessage(
        "El campo no puede ser menor a 8 caracteres.",
        minLength(8)
      ),
    },
    password_confirm: {
      sameAsPassword: helpers.withMessage(
        "Las contraseñas no coinciden",
        sameAs(userData.password)
      ),
    },
    rol: {
      name: {
        notSameAs: helpers.withMessage("Selecciona un rol", not(sameAs("Rol"))),
      },
    },
  };
});

const $v = useVuelidate(rules, userData);

// Función para crear usuario
const crearUsuario = async () => {
  let result = await $v.value.$validate();
  if (!result) {
    return;
  }
  addUser(userData)
    .then((result) => {
      alert("Usuario creado correctamente.");
      closeModal();
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.details);
      if(error.details.code === 'auth/email-already-exists') {
        functionError.value.push("El correo ya está en uso.");
      }
    });
};

// Observar si el rol es despacho
watch(
  () => {
    return userData.rol;
  },
  async () => {
    tecnicosData.splice(0);
    userData.distritos.splice(0);
    userData.tecnicos.splice(0);
    const result = query(refDB(db, "usuarios"), orderByChild("rol"), equalTo("Técnico"));
    await get(
      query(refDB(db, "usuarios"), orderByChild("rol"), equalTo("Técnico"))
    ).then((snapshot) => {
      snapshot.forEach((elements) => {
        tecnicosData.push({
          key: elements.key,
          name: elements.val().displayName,
        });
      });
    });
  }
);

// Eliminar técnico de la lista
const eliminarTecnico = (index) => {
    userData.tecnicos.splice(index, 1);
}

// Eliminar distritos de la lista
const eliminarDistrito = (index) => {
    userData.distritos.splice(index, 1);
}

const resetModal = () => {
  delete userData.distritos;
  delete userData.email;
  delete userData.lastname;
  delete userData.name;
  delete userData.password;
  delete userData.password_confirm;
  userData.rol = { name: "Rol" };
  userData.distritos = [];
  userData.tecnicos = [];
  $v.value.$reset();
};

const closeModal = () => {
  resetModal();
  emit("closeModal");
};
</script>
