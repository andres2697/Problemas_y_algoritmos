<template>
  <div class="flex w-[100%]">
    <div class="mb-3 flex w-[90%] flex-col items-start justify-start pl-2">
      <Horario
        :state="props.estado"
        :incidencia="props.incidencia"
        :folio="props.folio"
        :tipoFolio="props.tipoFolio"
        @validarFecha="validarFecha"
        @validarHora="validarHora"
        @validarMinuto="validarMinuto"
      ></Horario>
      <TransitionRoot
        :show="solicitud"
        enter="transition-opacity duration-75"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          role="status"
          class="flex h-52 flex-col items-center justify-center"
        >
          <svg
            aria-hidden="true"
            class="mr-2 h-8 w-8 animate-spin fill-blue-800 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="pt-3 text-black">Asignando folio...</span>
        </div>
      </TransitionRoot>
      <div
        v-if="error"
        class="mt-2 flex w-[100%] items-center justify-center py-1"
        :class="rebotar"
      >
        <span class="text-xs font-semibold text-red-400">{{
          "Campo(s) requerido(s). Selecciona una fecha y horario válido"
        }}</span>
        <ExclamationCircleIcon class="ml-2 h-4 w-4 text-red-400" />
      </div>
    </div>
    <div class="flex items-center h-full">
        <ChevronRightIcon
          @click="cambiarEstado()"
          class="h-12 w-12 cursor-pointer rounded-full bg-[#D9D9D9] p-1.5"
        />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import { getDatabase, ref as refDB, get, set, child, update } from "@firebase/database";
import Horario from "@/views/Preventivo/Horario.vue";
import { TransitionRoot } from "@headlessui/vue";
import { ChevronRightIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { useStore } from "vuex";
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";

const auth = getAuth();
const router = useRouter();
const db = getDatabase();
const route = useRoute();
const storeVuex = useStore();
const props = defineProps(["incidencia", "folio", "estado", "tipoFolio"]);

const fecha = ref();
const hora = ref();
const minuto = ref();
const error = ref(false);
const rebotar = ref("");
const validacionHorario = ref([false, false, false]);
const solicitud = ref(false);

const validarFecha = async (data) => {
  if (data) {
    fecha.value = true;
    validacionHorario.value[0] = true;
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
    }else{
    //   error.value = true;
    }
  }
};
const validarHora = async (data) => {
  if (data) {
    hora.value = true;
    validacionHorario.value[1] = true;
    // storeVuex.commit("cambiarEstadoJustificacion", 2);
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
    }else{
    //   error.value = true;
    }
  }
};

const validarMinuto = async (data) => {
  if (data) {
    minuto.value = true;
    validacionHorario.value[2] = true;
    // storeVuex.commit("cambiarEstadoJustificacion", 3);
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
    }else{
    //   error.value = true;
    }
  }
};

const cambiarEstado = async () => {
  if (fecha.value && hora.value && minuto.value) {
    if (props.incidencia == 1) {
      // console.log('si');
      error.value = await actualizarEstado(1, 2);
    } else if (props.incidencia == 2) {
        storeVuex.commit("abrirModalManejoFolio");
    }
  } else {
    error.value = true;
    rebotar.value = "animate-[bounce_200ms_ease-in-out_infinite]";
    setTimeout(() => {
      rebotar.value = "";
    }, 300);
    // return false;
  }
};
const actualizarEstado = async (actualizacion_estatus, actualizacion_estado) => {
  limpiarArreglosHorario();
  let response;
  // console.log(props.folio)
  response = await update(
      child(
      refDB(db), `folios/` + (props.incidencia == 1 ? `preventivos` : `correctivos`) + `/${props.tipoFolio}/${props.folio}`
      ), 
      {
          estatus: actualizacion_estatus,
          estado: actualizacion_estado
      }
  );
  return response;
};
const limpiarArreglosHorario = () => {
  arrayActiveHora.forEach((value, index) => {
    arrayActiveHora[index] = "";
  });
  arrayActiveMinuto.forEach((value, index) => {
    arrayActiveMinuto[index] = "";
  });
}
</script>
