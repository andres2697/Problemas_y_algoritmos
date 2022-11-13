<script setup>
import { gray } from "tailwindcss/colors";
import { ref } from "vue";
const nombre = ref("Andrés");
</script>

<template>
  <div class="flex flex-col h-screen bg-orange-100">
    <div class="flex flex-col h-[35%] items-center justify-center">
      <div class="flex w-[60%] h-[80%] items-center">
          <span class="text-2xl font-semibold">
            Prueba técnica para la vacante de Desarrollador Web del Grupo ABS
          </span>
      </div>
      <div class="flex w-[40%] h-[20%] justify-around">
        <router-link 
          to="/" 
          class="hover:text-gray-500 text-xl font-medium"
          :class="$route.name == 'home' ? 'text-gray-500' : 'text-black'"
        >
          Inicio
        </router-link>
        <router-link 
          to="/ejercicio1" 
          class="hover:text-gray-500 text-xl font-medium"
          :class="$route.name == 'ejercicio1' ? 'text-gray-500' : 'text-black'"
        >
          Ejercicio 1
        </router-link>
        <router-link 
          to="/ejercicio2" 
          class="hover:text-gray-500 text-xl font-medium"
          :class="$route.name == 'ejercicio2' ? 'text-gray-500' : 'text-black'"
        >
          Ejercicio 2
        </router-link>
        <router-link 
          to="/ejercicio3" 
          class="hover:text-gray-500 text-xl font-medium"
          :class="$route.name == 'ejercicio3' ? 'text-gray-500' : 'text-black'"
        >
          Ejercicio 3
        </router-link>
      </div>
    </div>
    <div class="flex w-full flex-col">
      <div class="flex">
          <router-view />
      </div>
    </div>
  </div>
</template>
