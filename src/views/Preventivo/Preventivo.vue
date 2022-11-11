<template>
  <div class="flex w-full">
    <Suspense>
      <template #default>
        <div class="mt-6 flex h-auto w-[100%] flex-col items-center px-10">
          <div class="flex h-[70%] w-full">
            <div class="flex w-[20%] flex-col space-y-3">
              <div class="flex w-[100%] select-none items-center">
                <div class="flex w-[60%]">
                  <h1 class="select-none font-semibold">Folio Preventivo</h1>
                </div>
                <div class="flex w-[40%]">
                  <div class="flex">
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          <CogIcon class="h-5 w-5 cursor-pointer text-black" />
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
                          class="absolute left-0 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }">
                              <button
                                @click="openEdicion()"
                                class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-100"
                              >
                                <PencilAltIcon
                                  class="mr-2 h-5 w-5 text-black"
                                  aria-hidden="true"
                                />
                                Editar folio
                              </button>
                            </MenuItem>
                            <MenuItem
                              v-slot="{ active }"
                              v-if="infoData.estado == 1"
                            >
                              <button
                                @click="openManejoFolio()"
                                class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-blue-100"
                              >
                                <ClipboardCheckIcon
                                  class="mr-2 h-5 w-5 text-black"
                                  aria-hidden="true"
                                />
                                Asignar folio a técnico
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                </div>
              </div>
              <div class="flex flex-col space-y-1">
                <div class="flex w-[90%] select-none">
                  Tipo:
                  <Suspense>
                    <span class="pl-5 font-semibold">
                      {{ infoData.tipo }}
                    </span>
                  </Suspense>
                </div>
                <div class="flex w-[90%] flex-col">
                  <span class="select-none">Número de folio:</span>
                  <div
                    class="mt-2 flex w-[70%] items-center justify-center rounded-lg bg-[#F2F2F2] py-2 font-semibold tracking-wider"
                  >
                    {{ infoData.folio }}
                  </div>
                </div>
                <Notas
                  :folio="infoData.folio"
                  :incidencia="1"
                  :tipoFolio="infoData.tipo"
                ></Notas>
              </div>
              <div class="flex h-full w-full items-center justify-center">
                <button type="button" @click="logout">Cerrar Sesión</button>
              </div>
            </div>
            <Suspense>
              <div class="flex max-h-[95%] w-[80%] overflow-y-scroll">
                <Step1
                  v-if="infoData.estado == 1"
                  :incidencia="1"
                  :folio="infoData.folio"
                  :estado="infoData.estado"
                  :tipoFolio="infoData.tipo"
                ></Step1>
                <Step2
                  v-if="infoData.estado == 2"
                  :incidencia="1"
                  :folio="infoData.folio"
                  :estado="infoData.estado"
                  :tipoFolio="infoData.tipo"
                ></Step2>
                <Step3
                  v-if="infoData.estado == 3"
                  :incidencia="1"
                  :folio="infoData.folio"
                  :estado="infoData.estado"
                  :tipoFolio="infoData.tipo"
                ></Step3>
              </div>
            </Suspense>
          </div>

          <Timeline :state="infoData.estado"></Timeline>

          <Suspense>
            <ModalManejoFolio
              :botonCapturar="infoData.estado === 1 ? false : true"
              :permitirCierre="true"
              @asignarFolio="asignarFolio"
              @capturarFolio="capturarFolio"
            >
              <template v-slot:mensaje>
                <span v-html="mensajeAsignacion"></span>
              </template>
            </ModalManejoFolio>
          </Suspense>
          <Suspense>
            <ModalEdicionFolio
              :folio="infoData.folio"
              :incidencia="1"
              :tipoFolio="infoData.tipo"
              @actualizarFolio="actualizarFolio"
            ></ModalEdicionFolio>
          </Suspense>
        </div>
      </template>
      <template #fallback>
        <span>Cargando...</span>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onBeforeMount } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import Timeline from "@/views/Preventivo/Timeline.vue";
import ModalEdicionFolio from "@/views/Correctivo/ModalEdicionFolio.vue";
import ModalManejoFolio from "@/views/Correctivo/ModalManejoFolio.vue";
import { useStore } from "vuex";
import {
  getDatabase,
  ref as refDB,
  update,
  get,
  set,
  child,
  runTransaction,
  onChildChanged,
  onChildRemoved,
  off,
} from "@firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";
import { infoCapturadaModal } from "@/consultasBD/consultaSelectFolio.js";
import { eliminarCapturaStep2 } from "@/consultasBD/eliminarHorarios.js";
import { PencilAltIcon } from "@heroicons/vue/solid";
import { CogIcon, ClipboardCheckIcon } from "@heroicons/vue/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import Notas from "@/views/Notas.vue";
import Step1 from "@/views/Correctivo/Steps/Step1.vue";
import Step2 from "@/views/Correctivo/Steps/Step2.vue";
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
import Step3 from "@/views/Correctivo/Steps/Step3.vue";
import {
  actualizarFolioBD,
  eliminarFolioPrevio,
} from "@/consultasBD/guardarFolio.js";

const auth = getAuth();
const router = useRouter();
const db = getDatabase();
const route = useRoute();
const functions = getFunctions();
const storeVuex = useStore();
const infoData = ref({
  folio: route.params.id,
  tipo: route.params.tipoFolio,
  estado: 1,
});

// Función que se encarga de escuchar el nodo del folio creado previamente
const escucharFolio = () => {
  onChildChanged(
    refDB(
      db,
      `folios/preventivos/${infoData.value.tipo}/${infoData.value.folio}`
    ),
    (snapshot) => {
      infoData.value[snapshot.key] = snapshot.val();
    }
  );
};

const inicializarFolioEscucha = async () => {
  await get(
    child(
      refDB(db),
      `folios/preventivos` + `/${route.params.tipoFolio}/${route.params.id}`
    )
  ).then((snapshot) => {
    snapshot.forEach((dato) => {
      infoData.value[dato.key] = dato.exportVal();
    });
    escucharFolio();
  });
};

inicializarFolioEscucha();
const asignarFolioCloud = httpsCallable(functions, "colaFoliosPreventivos");


onMounted(() => {
  infoData.value.folio =
    infoData.value.folio == undefined ? route.params.id : infoData.value.folio;
  infoData.value.tipo =
    infoData.value.tipo == undefined
      ? route.params.tipoFolio
      : infoData.value.tipo;
});

// const id_tecnico = ref(route.params.tecnico);

const mensajeAsignacion = computed(() => {
  return infoData.value.estado === 2
    ? "Esta acción <b>eliminará la hora de llegada</b> en caso de haberla capturado previamente."
    : "";
});

const logout = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
const openEdicion = () => {
  storeVuex.commit("abrirModalEdicionCorrectivo");
};
const openManejoFolio = () => {
  storeVuex.commit("abrirModalManejoFolio");
  // console.log('Se abrió en Correctivo');
};

// Función para colocar un nuevo escucha al folio editado
const actualizarFolio = async (data) => {
  let llave = infoData.value.folio;
  let tipoFolio = infoData.value.tipo;

  off(
    refDB(db, `folios/preventivos/${tipoFolio}/${llave}`),
    "child_changed",
    (snapshot) => {
      console.log("se dejó de escuchar", snapshot.val());
    }
  );

  infoData.value.folio = data[0].folio;

  await actualizarFolioBD(data[0], 1, llave, tipoFolio);

  escucharFolio();

  // console.log(data);
  if (llave != infoData.value.folio) {
    await eliminarFolioPrevio(llave, 1, tipoFolio);
  }
};

// Función para asignar folio al técnico
const asignarFolio = async () => {
  await asignarFolioCloud({
    folio: infoData.value.folio,
    tecnico: infoData.value.llave_tecnico,
    estado: 1,
    estatus: 1,
    incidencia: 1,
    tipoFolio: infoData.value.tipo
  })
    .then(async (result) => {
      // solicitud.value = false;
      limpiarArreglosHorario();
      if (infoData.value.estado == 2) {
        await eliminarCapturaStep2(
          infoData.value.folio,
          infoData.value.tipo,
          1
        );
      }
      router.push("/capturar-folio");
    })
    .catch((error) => {
      console.log(error.code, error.message, error.details);
      console.log(`Error: ${error}`);
    });
};

// Función para capturar el folio por despacho
const capturarFolio = async () => {
  let estado_nuevo = infoData.value.estado + 1;
  let estatus_nuevo = infoData.value.estatus + 1;
  await update(
    child(
      refDB(db),
      `folios/preventivos/${infoData.value.tipo}/${infoData.value.folio}`
    ),
    {
      estado: estado_nuevo,
      estatus: infoData.value.estatus == null ? 1 : estatus_nuevo,
    }
  ).catch(function (err) {});

  limpiarArreglosHorario();
};

const limpiarArreglosHorario = () => {
  arrayActiveHora.forEach((value, index) => {
    arrayActiveHora[index] = "";
  });
  arrayActiveMinuto.forEach((value, index) => {
    arrayActiveMinuto[index] = "";
  });
};
</script>
