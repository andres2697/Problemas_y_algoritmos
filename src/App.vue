<script setup>
import { ref } from 'vue'
import LayoutGeneral from './components/layout/LayoutGeneral.vue';

const nombre = ref("Andrés");
</script>

<template>
   <component :is="LayoutGeneral "> <router-view /> </component>
</template>
