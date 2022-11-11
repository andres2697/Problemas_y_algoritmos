<template>
      <div
        class="h-screen select-none items-center justify-center rounded-tr-3xl rounded-br-3xl bg-[#F2F2F2] pt-10 transition-all ease-in-out duration-500"
        :class="[$store.state.a.openSidebar == true ? 'w-[20%]' : 'w-[5%]']"
      >
        <!-- Tarjeta bienvenido -->
        <div
          class="flex items-center justify-center transition-all duration-1000"
        >
          <div class="h-14 w-14 rounded-full bg-white"></div>
          <TransitionRoot 
            :show="$store.state.a.openSidebar" 
            as="div"
            enter="transition-opacity duration-1000"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-200"
            leave-from="opacity-0"
            leave-to="opacity-100"
          >
            <div class="flex flex-col pl-4">
              <div class="text-sm">Bienvenido(a)</div>
              <div class="text-xl font-semibold">Diana Panfilo</div>
            </div>
          </TransitionRoot>
        </div>
        <!-- Fin tarjeta bienvenido -->
        <!-- Separador -->
        <div class="mt-12 flex w-full items-center justify-center transition-all duration-1000">
          <div class="flex w-[80%] border-b-[3px] border-black"></div>
        </div>
        <!-- Fin separador -->
        <div 
          class="flex mt-8 justify-center"
          :class="[$store.state.a.openSidebar ? 'w-full' : 'w-[100%]']"
        >
          <ul class="flex flex-col space-y-4">
            <li 
              class="flex justify-center cursor-pointer items-center space-x-4 p-2 rounded-md transition-all duration-1000"
              :class="[$route.path == '/dashboard' ? 'bg-[#C4C4C4]/50': '', $store.state.a.openSidebar ? 'w-full' : 'w-18']"
              @click="$router.push('/dashboard')"
            >
              <div class="h-7 w-7 rounded-full bg-white"></div>
              <TransitionRoot 
                :show="$store.state.a.openSidebar" 
                as="div" 
                class="min-w-[65%]"
                enter="transition-all duration-1500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-all duration-100"
                leave-from="opacity-0"
                leave-to="opacity-100"
              >
                Dashboard
              </TransitionRoot>
            </li>
            <li 
              class="flex justify-center cursor-pointer items-center space-x-4 p-2 rounded-md transition-all duration-200"
              :class="[$route.path == '/capturar-folio' ? 'bg-[#C4C4C4]/50': '', $store.state.a.openSidebar ? 'w-full' : 'w-18']"
              @click="$router.push('/capturar-folio')"
            >
              <div class="h-7 w-7 rounded-full bg-white"></div>
              <TransitionRoot 
                :show="$store.state.a.openSidebar" 
                as="div" 
                class="min-w-[65%]"
                enter="transition-opacity duration-1500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity duration-200"
                leave-from="opacity-0"
                leave-to="opacity-100"
              >
                Capturar folio
              </TransitionRoot>
            </li>
            <li 
              class="flex justify-center cursor-pointer items-center space-x-4 p-2 rounded-md"
              :class="[$route.path == '/consultar-folios' ? 'bg-[#C4C4C4]/50': '']"
              @click="$router.push({ name: 'consultarFolios' })"
            >
              <div class="h-7 w-7 rounded-full bg-white"></div>
              <TransitionRoot
                :show="$store.state.a.openSidebar" 
                as="div" 
                class="min-w-[70%]"
                enter="transition-opacity duration-1500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity duration-200"
                leave-from="opacity-0"
                leave-to="opacity-100"
              >
                Consultar folios
              </TransitionRoot>
            </li>
            <li 
              class="flex justify-center cursor-pointer items-center space-x-4 p-2 rounded-md"
              :class="[$route.path == '/reportes' ? 'bg-[#C4C4C4]/50': '']"
            >
              <div class="h-7 w-7 rounded-full bg-white"></div>
              <TransitionRoot 
                :show="$store.state.a.openSidebar" 
                as="div" 
                class="min-w-[70%]"
                enter="transition-opacity duration-1500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity duration-200"
                leave-from="opacity-0"
                leave-to="opacity-100"
              >
                Reportes
              </TransitionRoot>
            </li>
            <li 
              @click="$router.push('/configuraciones')"
              class="flex justify-center cursor-pointer items-center space-x-4 p-2 rounded-md"
              :class="[$route.path == '/configuraciones' ? 'bg-[#C4C4C4]/50': '']"
            >
              <div class="h-7 w-7 rounded-full bg-white"></div>
              <TransitionRoot
                :show="$store.state.a.openSidebar" 
                as="div" 
                class="min-w-[70%]"
                enter="transition-opacity duration-1500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity duration-200"
                leave-from="opacity-0"
                leave-to="opacity-100"
              >
                Configuración
              </TransitionRoot>
            </li>
            <li 
              class="flex justify-center cursor-pointer items-center space-x-4 p-2 rounded-md"
              :class="[$route.path == '/avisos' ? 'bg-[#C4C4C4]/50': '']"
            >
              <div class="h-7 w-7 rounded-full bg-white"></div>
              <TransitionRoot 
                :show="$store.state.a.openSidebar" 
                as="div" 
                class="min-w-[70%]"
                enter="transition-opacity duration-1500"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity duration-200"
                leave-from="opacity-0"
                leave-to="opacity-100"
              >
                Avisos
              </TransitionRoot>
            </li>
          </ul>
        </div>
      </div>
</template>

<script setup>
  import { ref, watch } from "vue";
  import { getAuth, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { TransitionRoot } from '@headlessui/vue'

  const i = ref(0);
  const objeto = ref({
    nombre: "Tere",
    edad: 20,
  });

  const arreglo = ref([]);
  const auth = getAuth();
  const router = useRouter();
</script>
