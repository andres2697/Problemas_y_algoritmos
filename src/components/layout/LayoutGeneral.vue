<script setup>
import { ref } from "vue";
import Sidebar from "@/views/Sidebar.vue";
import Navbar from "@/views/Navbar.vue";

const nombre = ref("Andrés");
</script>

<template>
  <div class="flex h-screen w-screen">
    <Sidebar />
    <div class="flex h-screen w-full flex-col">
      <Navbar />
      <div class="flex h-screen overflow-auto">
          <router-view />
      </div>
    </div>
  </div>
</template>
