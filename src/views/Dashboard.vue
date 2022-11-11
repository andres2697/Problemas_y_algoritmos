<template>
<div class="flex w-[100%] flex-col w-full m-12">
    <h1>Hola desde Dashboard</h1>
    <button type="button" @click="logout">Cerrar Sesión</button>
</div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const i = ref(0);
const arreglo = ref([]);
const auth = getAuth();
const router = useRouter();

const logout = () =>{
  signOut(auth).then(() => {
    router.push('/');
  });
}
</script>
