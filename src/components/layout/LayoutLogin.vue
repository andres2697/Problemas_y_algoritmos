<template>
  <div class="flex h-screen w-screen items-center justify-center min-h-screen">
    <div class="flex h-[70%] w-[70%] bg-red-200 min-h-[500px]">
      <div
        class="flex h-[100%] w-[50%] border-r-2 border-black bg-green-200"
      ></div>
      <div class="flex h-[100%] w-[50%] flex-col items-center bg-orange-200">
        <div class="mt-10 mb-10 flex w-full justify-center">
          <span class="text-3xl font-semibold tracking-wide">Iniciar Sesión</span>
        </div>
        <div v-if="errorMessage" class="flex w-[80%] items-center place-content-around bg-red-400 rounded-md mb-10">
            <ExclamationIcon class="h-5 w-5 text-white" aria-hidden="true"/>
            <span class="text-center text-white text-sm py-0.5">{{errorMessage}}</span>
            <XIcon class="h-5 w-5 text-white hover:cursor-pointer" @click="vaciarErrores" aria-hidden="true"/>
        </div>
        <div class="flex w-full flex-col items-center justify-center space-y-14">
            <form @submit.prevent="login" class="flex flex-col items-center justify-center space-y-14" method="post" autocomplete="on">
                <input
                  class="font-bold text-black"
                  type="text"
                  id="correo"
                  v-model="correo"
                  placeholder="Correo"
                  required
                />
                <input
                  class="font-bold text-black"
                  type="password"
                  id="pass"
                  v-model="pass"
                  placeholder="Contraseña"
                  required
                  minlength="6"
                />
                <span class="font-bold text-black text-sm">Olvidé mi contraseña</span>
                <button type="submit" class="bg-[#C4C4C4] hover:bg-[#C4C4C4]/80 px-20 py-2">Entrar</button>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { validacion } from "@/validaciones/login.js";
import { ExclamationIcon, XIcon } from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';

const correo = ref("");
const pass = ref("");
const auth = getAuth();
const errorMessage = ref("");
const router = useRouter();

const login = () =>{
    signInWithEmailAndPassword(auth, correo.value, pass.value).then((userCredential)=>{
        console.log(userCredential);
        // localStorage.setItem('toggleButton', true);
        router.push('/dashboard');
    }).catch((error)=>{
        errorMessage.value = validacion(error);
    });
}
const vaciarErrores = () => {
    errorMessage.value = '';
}
</script>
