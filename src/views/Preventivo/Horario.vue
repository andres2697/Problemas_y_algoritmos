<template>
  <div class="mt-6 flex h-auto w-[100%] pl-2">
    <div class="flex w-[100%] self-start">
      <!-- Contenedor de fecha -->
      <div class="flex w-1/2 flex-col">
        <div class="flex">
          <div class="flex items-center justify-center pr-10 pb-1">
            <h1 class="select-none font-semibold">Fecha</h1>
          </div>
        </div>
        <div
          class="flex w-[90%] items-center justify-around rounded-lg py-4 shadow-customized"
        >
          <div
            class="flex select-none flex-col items-center justify-center pl-2"
          >
            <input
              v-model="horarioCaptura.dia"
              class="flex w-[52px] rounded-lg border-transparent bg-[#F2F2F2] text-center text-xl font-semibold"
              type="text"
              disabled
            />
            <div
              class="flex select-none items-center justify-center self-center text-center"
            >
              Día
            </div>
          </div>
          <div
            class="mb-5 flex select-none items-center justify-center text-xl font-bold text-gris-claro"
          >
            /
          </div>
          <div class="flex select-none flex-col items-center justify-center">
            <input
              v-model="horarioCaptura.mes"
              class="flex w-[61px] rounded-lg border-transparent bg-[#F2F2F2] text-center text-xl font-semibold"
              type="text"
              disabled
            />
            <div class="flex w-[100%] select-none items-center justify-center">
              Mes
            </div>
          </div>
          <div
            class="mb-5 flex select-none items-center justify-center text-xl font-bold text-gris-claro"
          >
            /
          </div>
          <div class="flex w-20 select-none flex-col">
            <input
              v-model="horarioCaptura.anio"
              class="flex w-20 rounded-lg border-transparent bg-[#F2F2F2] text-center text-xl font-semibold"
              type="text"
              disabled
            />
            <div class="flex select-none items-center justify-center">Año</div>
          </div>

          <div class="flex self-start pt-[2%]">
            <Popover v-slot="{ close }" class="relative z-[200]">
              <PopoverButton
                class="group inline-flex items-center rounded-md bg-transparent px-3 py-2 text-base font-medium text-black"
              >
                <CalendarIcon class="h-6 w-6 self-center" />
              </PopoverButton>
              <PopoverPanel
                class="w-cover absolute z-10 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="w-[250px] rounded-lg bg-white shadow-lg shadow-black/5 ring-1 ring-black ring-opacity-5"
                >
                  <div class="flex">
                    <DatePicker
                      style="border: #000000"
                      class="flex"
                      v-model="horario"
                      @dayclick="imprimir()"
                    />
                  </div>
                  <div class="h-15 flex w-[100%] items-center justify-center">
                    <button
                      as="button"
                      class="z-[100] mb-3 -mt-3 flex rounded-md bg-[#E9F0FC] px-6 py-1"
                      @click="obtenerFechaActual(close)"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        </div>
      </div>
      <!-- Fin Contenedor de fecha -->
      <!-- Contenedor de hora -->
      <div class="flex w-1/2 flex-col">
        <div class="flex">
          <div class="flex items-center justify-center pr-10 pb-1">
            <h1 class="select-none font-semibold">Hora</h1>
          </div>
        </div>
        <div
          class="flex w-[90%] items-center justify-around rounded-lg py-4 shadow-customized"
        >
          <div
            class="flex select-none flex-col items-center justify-center pl-2"
          >
            <input
              v-model="horarioCaptura.hora"
              class="flex w-[65px] rounded-lg border-transparent bg-[#F2F2F2] text-xl text-center font-semibold"
              type="text"
              disabled
            />
            <div class="flex items-center justify-center">Hora</div>
          </div>
          <div
            class="mb-5 flex select-none items-center justify-center text-4xl font-bold text-gris-claro"
          >
            :
          </div>
          <div class="flex select-none flex-col">
            <input
              v-model="horarioCaptura.minuto"
              class="flex w-[65px] rounded-lg border-transparent bg-[#F2F2F2] text-xl text-center font-semibold"
              type="text"
              disabled
            />
            <div class="flex items-center justify-center">Min</div>
          </div>
          <div class="flex select-none self-start pt-[2%] z-[999]">
            <Popover v-slot="{ inputValue, open }" class="relative">
              <PopoverButton
                class="group inline-flex items-center rounded-md bg-transparent px-3 py-2 text-base font-medium text-black"
              >
                <ClockIcon class="h-6 w-6 self-center" />
              </PopoverButton>
              <PopoverPanel
                class="absolute -left-[150%] w-full max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl"
              >
                <div
                  class="z-[200] flex h-72 w-[120px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div class="flex w-full flex-col">
                    <div class="flex h-[85%] w-full pt-4 pb-2">
                      <div
                        class="sin-barra flex w-[50%] appearance-none flex-col items-center overflow-auto border-r-2 border-[#C4C4C4]/30"
                      >
                        <div
                          class="mb-1 flex w-[60%] justify-center border-b-2 border-black font-bold"
                        >
                          H
                        </div>
                        <ul
                          id="horas"
                          class="z-[200] flex flex-col justify-start"
                        >
                          <li
                            v-for="(hr, index) in 25"
                            class="flex justify-center rounded-md px-3 hover:cursor-pointer hover:bg-blue-100"
                            :class="
                              horaMinuto.hora[index] != '' ? 'bg-blue-100' : ''
                            "
                            @click="guardarHora(index)"
                          >
                            {{
                              index < 10
                                ? "0" + index.toString()
                                : index.toString()
                            }}
                          </li>
                        </ul>
                      </div>
                      <div
                        class="sin-barra flex w-[50%] appearance-none flex-col items-center overflow-y-auto"
                      >
                        <div
                          class="mb-1 flex w-[60%] justify-center border-b-2 border-black font-bold"
                        >
                          M
                        </div>
                        <ul
                          id="minutos"
                          class="z-[200] flex flex-col justify-start"
                        >
                          <li
                            v-for="(min, index) in 60"
                            class="flex justify-center rounded-md px-3 hover:cursor-pointer hover:bg-blue-100"
                            :class="
                              horaMinuto.minuto[index] != ''
                                ? 'bg-blue-100'
                                : ''
                            "
                            @click="guardarMinuto(index)"
                          >
                            {{
                              index < 10
                                ? "0" + index.toString()
                                : index.toString()
                            }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="flex h-[15%] w-[100%] justify-center">
                      <PopoverButton
                        class="m-2 flex w-[80%] justify-center rounded-md bg-[#E9F0FC] py-0.5"
                        @click="close()"
                      >
                        Aceptar
                      </PopoverButton>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
        </div>
        
      </div>
      <!-- Fin contenedor de hora -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";
import { getDatabase, ref as refDB, get, set, child } from "@firebase/database";
import { CalendarIcon, ClockIcon } from "@heroicons/vue/outline";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
import {
  guardarHorarioInicio,
  guardarFechaInicio,
  guardarFechaLlegada,
  guardarHorarioLlegada,
  guardarFechaActivacion,
  guardarHorarioActivacion,
} from "@/consultasBD/guardarHorario";
import { useStore } from "vuex";


const auth = getAuth();
const router = useRouter();
const db = getDatabase();
const route = useRoute();
const store = useStore();
const props = defineProps(["state", "incidencia", "folio", "tipoFolio"]);

// store.commit('cerrarModalCorrectivo');
const horario = ref(new Date());
const emit = defineEmits(['validarFecha', 'validarHora', 'validarMinuto']);
const horarioCaptura = ref({
  dia: "dd",
  mes: "mm",
  anio: "yyyy",
  hora: "HH",
  minuto: "MM",
});
const horaMinuto = ref({
  hora: arrayActiveHora,
  minuto: arrayActiveMinuto,
});

onMounted(() => {
  horaMinuto.value.hora = arrayActiveHora;
  horaMinuto.value.minuto = arrayActiveMinuto;
});

const imprimir = () => {
  if (horario.value === null || horario.value === undefined || horario.value == '') {
    horario.value = new Date();
  }
    if(horarioCaptura.value.dia != (horario.value.getDate() < 10 ? ('0' + horario.value.getDate().toString()) : horario.value.getDate().toString())
    || horarioCaptura.value.mes != (horario.value.getMonth() + 1 < 10 ? ('0' + horario.value.getMonth().toString()) : horario.value.getMonth().toString())
    || horarioCaptura.value.anio != horario.value.getFullYear() < 10
  ){
    
    horarioCaptura.value.dia =
      horario.value.getDate() < 10
        ? "0" + horario.value.getDate().toString()
        : horario.value.getDate().toString();
    horarioCaptura.value.mes =
      horario.value.getMonth() + 1 < 10
        ? "0" + (horario.value.getMonth() + 1).toString()
        : (horario.value.getMonth() + 1).toString();
    horarioCaptura.value.anio = horario.value.getFullYear().toString();

    switch (props.state) {
      case 1:
        guardarFechaInicio(
          horarioCaptura.value.dia + "/" + horarioCaptura.value.mes + "/" + horarioCaptura.value.anio,
          horarioCaptura.value.anio + "/" + horarioCaptura.value.mes + "/" + horarioCaptura.value.dia,
          props.folio,
          props.incidencia,
          props.tipoFolio
        );
        break;
      case 2:
        guardarFechaLlegada(
          horarioCaptura.value.dia + "/" + horarioCaptura.value.mes + "/" + horarioCaptura.value.anio,
          horarioCaptura.value.anio + "/" + horarioCaptura.value.mes + "/" + horarioCaptura.value.dia,
          props.folio,
          props.incidencia,
          props.tipoFolio
        );
        break;
      case 3:
        store.commit("asignarMuestraJustificacion", 0);
        guardarFechaActivacion(
          horarioCaptura.value.dia + "/" + horarioCaptura.value.mes + "/" + horarioCaptura.value.anio,
          horarioCaptura.value.anio + "/" + horarioCaptura.value.mes + "/" + horarioCaptura.value.dia,
          props.folio,
          props.incidencia,
          props.tipoFolio
        );
        break;
    }
  }
  emit('validarFecha', [horarioCaptura.value.dia, props.folio, props.incidencia, props.tipoFolio, props.state]);
};

const guardarHora = (hr) => {
  horarioCaptura.value.hora = hr < 10 ? "0" + hr.toString() : hr.toString();
  horaMinuto.value.hora.forEach((valor, index) => {
    if (valor != "" && index != hr) {
      horaMinuto.value.hora[index] = "";
    } else if (index == hr) {
      horaMinuto.value.hora[index] = "bg-blue-100";
    }
  });
  switch (props.state) {
    case 1:
      guardarHorarioInicio(
        horarioCaptura.value.hora.toString() +
          ":" +
          horarioCaptura.value.minuto.toString(),
        props.folio,
        props.incidencia,
        props.tipoFolio
      );
      break;
    case 2:
      guardarHorarioLlegada(
        horarioCaptura.value.hora.toString() +
          ":" +
          horarioCaptura.value.minuto.toString(),
        props.folio,
        props.incidencia,
        props.tipoFolio
      );
      break;
    case 3:
      store.commit("asignarMuestraJustificacion", 1);
      guardarHorarioActivacion(
        horarioCaptura.value.hora.toString() +
          ":" +
          horarioCaptura.value.minuto.toString(),
        props.folio,
        props.incidencia,
        props.tipoFolio
      );
      break;
  }
  emit('validarHora', [horarioCaptura.value.hora, props.folio, props.incidencia, props.tipoFolio, props.state])
};

const guardarMinuto = (min) => {
  horarioCaptura.value.minuto =
    min < 10 ? "0" + min.toString() : min.toString();
  horaMinuto.value.minuto.forEach((valor, index) => {
    if (valor != "" && index != min) {
      horaMinuto.value.minuto[index] = "";
    } else if (index == min) {
      horaMinuto.value.minuto[index] = "bg-blue-100";
    }
  });
  switch (props.state) {
    case 1:
      guardarHorarioInicio(
        horarioCaptura.value.hora.toString() +
          ":" +
          horarioCaptura.value.minuto.toString(),
        props.folio,
        props.incidencia,
        props.tipoFolio
      );
      break;
    case 2:
      guardarHorarioLlegada(
        horarioCaptura.value.hora.toString() +
          ":" +
          horarioCaptura.value.minuto.toString(),
        props.folio,
        props.incidencia,
        props.tipoFolio
      );
      break;
    case 3:
      store.commit("asignarMuestraJustificacion", 2);
      guardarHorarioActivacion(
        horarioCaptura.value.hora.toString() +
          ":" +
          horarioCaptura.value.minuto.toString(),
        props.folio,
        props.incidencia,
        props.tipoFolio
      );
      break;
  }
  emit('validarMinuto', [horarioCaptura.value.minuto, props.folio, props.incidencia, props.tipoFolio, props.state])
};
const obtenerFechaActual = (close) => {
  if(horarioCaptura.value.dia == 'dd' || horarioCaptura.value.mes == 'mm' || horarioCaptura.value.anio == 'yyyy'){
    imprimir();
  }
  close();
};
</script>

<style>
.sin-barra {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}
.sin-barra::-webkit-scrollbar {
  display: none;
}
</style>
