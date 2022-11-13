<template>
  <div class="flex w-full items-center justify-center pt-2">
    <div class="flex flex-col">
      <p class="text-center text-medium pb-2">
        Ingeniero en computación <b>José Andrés Solís Sotelo</b>.
      </p>
      <span class=" text-center">
        El motivo de esta aplicación es mostrar los ejercicios solicitados para la vacante antes mencionada.
        <br>
        Para el desarrollo de la misma se utilizó la tecnología de Vue 3 con Vite, Tailwind y Vuetify. 
      </span>
      <p class="text-center text-medium mt-2">
        <span class="font-semibold pb-2">
          Lenguajes manejados:
        </span>
        <ul v-for="lenguaje in lenguajes">
          <li>
            {{lenguaje}}
          </li>
        </ul>
      </p>
      <p class="text-center text-medium pb-2 mt-2">
        <span class="font-semibold">
          Herramientas manejadas:
        </span>
        <br>
        <ul v-for="herramienta in herramientas">
          <li>
            {{herramienta}}
          </li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  const lenguajes = ['Vue js 3', 'Javascript', 'Flutter', 'React Native', 'Angular', 'Laravel'];
  const herramientas = ['Firebase', 'Database', 'MySql', 'Google Geolocation API'];
</script>
