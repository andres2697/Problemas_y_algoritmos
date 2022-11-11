<template>
  <div>
    <button type="button" class="bg-blue-200 p-2" @click="irPreventivo">
      Preventivo
    </button>
    <button type="button" class="bg-red-200 p-2" @click="$store.commit('cambiarNombre', 'Manuel')">Cambiar nombre</button>
    Hola {{  $store.state.a.nombre }}
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["nombreData"]);

const irPreventivo = () => {
  router.push("/preventivo");
};
</script>
