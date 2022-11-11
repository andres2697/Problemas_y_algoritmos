<template>
    <div class="flex items-center my-7">
        <div class="h-7 w-7 rounded-full bg-black">
            <ChevronLeftIcon class="text-white cursor-pointer" @click="toggleSidebar" aria-hidden="true"/>
        </div>
        <div class="flex w-[80%] pl-10">
            <img width="90" height="50" src="../../img/SiosApp.svg" alt="Logo SIOSApp">
        </div>
        <div class="flex items-center space-x-4 justify-end">
            <div class="rounded-xl bg-[#F2F2F2] cursor-pointer px-7 py-1">
                <PlusCircleIcon class="w-6 h-6 text-black" aria-hidden="true"/>
            </div>
            <div class="w-5 h-5 bg-[#C4C4C4] rounded-full"></div>
            <div class="w-5 h-5 bg-[#C4C4C4] rounded-full"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ChevronLeftIcon } from '@heroicons/vue/solid';
import { PlusCircleIcon } from '@heroicons/vue/outline';

const i = ref(0);
const objeto = ref({
  nombre: "Tere",
  edad: 20,
});
const arreglo = ref([]);
const auth = getAuth();
const router = useRouter();
const store = useStore();

const toggleSidebar = () => {
    // localStorage.setItem('toggleButton', localStorage.getItem('toggleButton') === 'true' ? false : true)
    store.commit('controlSidebar')
}
</script>