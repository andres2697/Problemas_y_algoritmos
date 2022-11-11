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
      <div class="flex w-[100%] mt-5">
        <div class="flex flex-col w-[50%] mt-5">
          <div class="flex w-[100%] pb-1 font-semibold">Coordenadas</div>
          <div
            class="flex w-[95%] flex-col items-center justify-around rounded-lg py-4 shadow-customized"
          >
            <div class="flex w-[90%] items-center">
              <div class="flex w-[90%] justify-center">
                <input
                  v-model="coordenadas"
                  id="coord"
                  placeholder="00.000000, -00.000000"
                  class="flex w-[90%] rounded-lg text-left border-[#C4C4C4] border-transparent text-sm font-semibold"
                  type="text"
                  @blur="validarCoordenadas()"
                  @focus="vaciarErrores()"
                />
              </div>
              <div class="flex w-[10%] items-start justify-start">
                <label for="coord">
                  <LocationMarkerIcon class="flex h-5 w-5 hover:cursor-pointer" />
                </label>
              </div>
            </div>
          </div>
          <div class="flex w-[90%] justify-start ml-[10%] mt-2">
            <span v-if="store.state.a.errores.coordenadas != ''" class="text-red-400 text-xs font-semibold">{{
              store.state.a.errores.coordenadas
            }}</span>
          </div>
        </div>
        <div v-if="props.incidencia == 1" class="flex w-[50%] mt-5 mr-10 ml-10">
          <div class="flex flex-col w-full h-auto mr-5 items-center">
            <span class="mb-2 font-semibold">Foto antes</span>
            <div :class="errores.fotoAntes ? 'border-2 border-red-400' : ''" class="flex w-full h-36 bg-gray-100 rounded-xl justify-center items-center">
              <label v-if="!fotos.antes.file" for="foto-antes" class="flex justify-around w-full cursor-pointer">
                <div @change="selectFileAntes" class="flex justify-around w-[65%] bg-gray-400 rounded-md py-1 px-4 text-white">
                  <input ref="file1" type="file" accept=".png,.jpg,.heic" class="file:border file:border-solid" id="foto-antes" hidden/>
                  <UploadIcon class="w-5 h-5 text-lg"></UploadIcon>
                  <span>Subir</span>
                </div>
              </label>
              <div v-else class="flex justify-around w-[80%] h-28">
                <img :src="fotos.antes.file64" class="rounded-md">
              </div>
            </div>
            <div v-if="fotos.antes.file"  class="flex w-full items-center bg-gray-200 mt-2 py-2 rounded-md">
              <div class="flex justify-between w-[100%] ml-1 text-sm truncate px-2" :title="fotos.antes.file.name">
                {{ fotos.antes.file.name }}
                <TrashIcon class="w-5 h-5 cursor-pointer mr-1" @click="eliminarImgAntes"></TrashIcon> 
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full h-auto ml-5 items-center">
            <span class="mb-2 font-semibold">Foto durante</span>
            <div :class="errores.fotoDurante ? 'border-2 border-red-400' : ''" class="flex w-full h-36 bg-gray-100 rounded-xl justify-center items-center">
              <label v-if="!fotos.durante.file" for="foto-durante" class="flex justify-around w-full cursor-pointer">
                <div @change="selectFileDurante" class="flex justify-around w-[65%] bg-gray-400 rounded-md py-1 px-4 text-white">
                  <input ref="file2" type="file" accept=".png,.jpg,.heic" class="file:border file:border-solid" id="foto-durante" hidden/>
                  <UploadIcon class="w-5 h-5 text-lg"></UploadIcon>
                  <span>Subir</span>
                </div>
              </label>
              <div v-else class="flex justify-around w-[80%] h-28">
                <img :src="fotos.durante.file64" class="rounded-md">
              </div>
            </div>
            <div v-if="fotos.durante.file" class="flex w-full items-center bg-gray-200 mt-2 py-2 rounded-md">
              <div class="flex justify-between w-[100%] ml-1 text-sm truncate px-2" :title="fotos.durante.file.name">
                {{ fotos.durante.file.name }}
                <TrashIcon class="w-5 h-5 cursor-pointer mr-1" @click="eliminarImgDurante"></TrashIcon> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex h-full items-center">
      <ChevronRightIcon
        @click="cambiarEstado(null)"
        class="h-12 w-12 cursor-pointer rounded-full bg-[#D9D9D9] p-1.5"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import { getDatabase, ref as refDB, get, set, child, update } from "@firebase/database";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import { LocationMarkerIcon, TrashIcon, UploadIcon } from "@heroicons/vue/outline";
import Horario from "@/views/Preventivo/Horario.vue"
import { ChevronRightIcon, ExclamationCircleIcon } from "@heroicons/vue/solid";
import { validacionCoordenadas } from '@/validaciones/coordenadas.js';
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
import { useStore } from "vuex";
import { store } from "@/store";

const auth = getAuth();
const router = useRouter();
const db = getDatabase();
const route = useRoute();
const storeVuex = useStore();
const storage = getStorage();
const props = defineProps(["incidencia", "folio", "estado", "tipoFolio"]);
const emit = defineEmits(['validarCoordenadasReturn']);
// storeVuex.commit('cerrarModalCorrectivo');

const coordenadas = ref("");
const errores = ref({ coordenadas: '', fotoAntes: false, fotoDurante: false });
const fecha = ref();
const hora = ref();
const minuto = ref();
const error = ref(false);
const rebotar = ref("");
const validacionHorario = ref([false, false, false]);
const coordenada = ref();
const fotos = ref({
  antes: {
    file: null,
    file64: null
  },
  durante: {
    file: null,
    file64: null
  }
});

watch(
  () => fotos.value.antes.file,
  () => {
    errores.value.fotoAntes = fotos.value.antes.file ? false : true; 
    // console.log(fotos.value.antes.file ? 'existe foto' : 'no hay foto subida');
  }
);

watch(
  () => fotos.value.durante.file,
  () => {
    errores.value.fotoDurante = fotos.value.durante.file ? false : true; 
  }
);

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
      // error.value = true;
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
      // error.value = true;
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
      // error.value = true;
    }
  }
};

const validarCoordenadas = async () => {
  errores.value.coordenadas = await validacionCoordenadas(props.folio, props.incidencia, props.tipoFolio, coordenadas.value);
  store.commit('agregarErroresCoord', errores.value.coordenadas);
  if(store.state.a.errores.coordenadas == ''){
    coordenada.value = true;
  }
};

const selectFileAntes = async (e) => {
  fotos.value.antes.file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(fotos.value.antes.file);
  reader.onload = (event) =>{
    fotos.value.antes.file64 = reader.result;
  }
  // console.log(fotos.value.antes.file.name);
};
const selectFileDurante = async (e) => {
  fotos.value.durante.file = e.target.files[0];
  let reader = new FileReader();
  // fotos.value.durante.file64 = URL.createObjectURL(fotos.value.durante.file)
  reader.readAsDataURL(fotos.value.durante.file);
  reader.onload = (event) =>{
    fotos.value.durante.file64 = reader.result;
  }
};
const eliminarImgAntes = () => {
  fotos.value.antes.file = null;
  fotos.value.antes.file64 = null;
};
const eliminarImgDurante = () => {
  fotos.value.durante.file = null;
  fotos.value.durante.file64 = null;
};

const vaciarErrores = () => {
  errores.value.coordenadas = '';
  store.commit('agregarErroresCoord');
}

const cambiarEstado = async () => {
  if (fecha.value && hora.value && minuto.value && coordenada.value && props.incidencia == 1 ? (fotos.value.antes.file && fotos.value.durante.file) : true) {
      error.value = await actualizarEstado(2, 3);
      //Almacenamiento en base de datos del nombre de la imágen "Antes"
      //Almacenamiento en storage de la imágen "Antes"

      await uploadBytes(refStorage(storage, `imagenes/preventivos/antes/${props.tipoFolio}/${props.folio}`), fotos.value.antes.file)
      .then(async (snapshot) => {
        await update(child(refDB(db), `folios/preventivos/${props.tipoFolio}/${props.folio}/fotos/antes`), {
          nombre: fotos.value.antes.file.name,
        });
      });
      //Almacenamiento en base de datos del nombre de la imágen "Durante"
      //Almacenamiento en storage de la imágen "Durante"
      await uploadBytes(refStorage(storage, `imagenes/preventivos/durante/${props.tipoFolio}/${props.folio}`), fotos.value.durante.file)
      .then(async (snapshot) => {
        await update(child(refDB(db), `folios/preventivos/${props.tipoFolio}/${props.folio}/fotos/durante`), {
          nombre: fotos.value.durante.file.name,
        });
      });
      limpiarValores();
  } else {
    if (!fecha.value || !hora.value || !minuto.value) {
      error.value = true;
      if(!coordenada.value){
        storeVuex.commit('agregarErroresCoord', 'Campo requerido');
      }
      rebotar.value = "animate-[bounce_200ms_ease-in-out_infinite]";
      setTimeout(() => {
        rebotar.value = "";
      }, 300);
    }
    if(!coordenada.value){
      storeVuex.commit('agregarErroresCoord', 'Campo requerido');
    }
    if(!fotos.value.antes.file || !fotos.value.durante.file){
      console.log('Aquí se asignan los errores de las fotos');
      errores.value.fotoAntes = fotos.value.antes.file ? false : true;
      errores.value.fotoDurante = fotos.value.durante.file ? false : true;
    }
  }
};

const actualizarEstado = async (actualizacion_estatus, actualizacion_estado) => {
    await update(
        child(
        refDB(db), `folios/` + (props.incidencia == 1 ? `preventivos` : `correctivos`) + `/${props.tipoFolio}/${props.folio}`
        ), 
        {
          estatus: actualizacion_estatus,
          estado: actualizacion_estado
        }
    );
    return false;
};

const limpiarValores = () => {
  arrayActiveHora.forEach((value, index) => {
    arrayActiveHora[index] = "";
  });
  arrayActiveMinuto.forEach((value, index) => {
    arrayActiveMinuto[index] = "";
  });
  fecha.value = null;
  hora.value = null;
  minuto.value = null;
  coordenada.value = null;
  error.value = false;
  rebotar.value = '';
  validacionHorario.value = [false, false, false];
};
</script>