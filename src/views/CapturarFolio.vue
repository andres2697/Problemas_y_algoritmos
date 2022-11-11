<template>
  <div class="m-12 flex w-full flex-col">
    <div class="flex w-[100%]">
      <div class="flex w-[15%]">
        <h1 class="text-2xl font-semibold">Capturar nuevo folio</h1>
      </div>
      <div class="ml-24 mt-12 flex w-[88%] space-x-10">
        <div
          class="flex cursor-pointer items-center space-x-5"
          @click="toggleModalPreventivo"
        >
          <div class="h-12 w-12 rounded-xl bg-[#D9D9D9]"></div>
          <div>Folio Preventivo</div>
          <Suspense>
            <ModalDatosPreventivo
            ></ModalDatosPreventivo>
          </Suspense>
        </div>
        <div
          class="flex cursor-pointer items-center space-x-5"
          @click="toggleModalCorrectivo"
        >
          <div class="h-12 w-12 rounded-xl bg-[#D9D9D9]"></div>
          <div>Folio Correctivo</div>
          <Suspense>
            <ModalDatosCorrectivo
            ></ModalDatosCorrectivo>
          </Suspense>
        </div>
      </div>
    </div>
    <div class="flex">
      <button type="button" @click="logout">Cerrar Sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ModalDatosCorrectivo from '@/views/Correctivo/ModalDatosCorrectivo.vue';
import ModalDatosPreventivo from "@/views/Preventivo/ModalDatosPreventivo.vue";

const i = ref(0);
const arreglo = ref([]);
const auth = getAuth();
const router = useRouter();
const store = useStore();
const isOpen = ref(false);

const folio = ref('');
const tipoFolio = ref(0);
const control = ref(true);

store.commit('cerrarModalCorrectivo');

const logout = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
function toggleModalCorrectivo() {
  store.commit('abrirModalCorrectivo');
};
function toggleModalPreventivo() {
  store.commit('abrirModalPreventivo');
};
</script>
