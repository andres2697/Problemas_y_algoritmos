<script setup>
import { ref } from 'vue'
import BotonPreventivo from './components/BotonPreventivo.vue';
import LayoutGeneral from './components/layout/LayoutGeneral.vue';
import LayoutLogin from './components/layout/LayoutLogin.vue';

const nombre = ref("Andrés");
</script>

<template>
   <component :is="$route.meta?.layout ? LayoutLogin : LayoutGeneral "> <router-view /> </component>
</template>
