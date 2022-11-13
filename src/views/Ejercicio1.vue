<template>
    <div class="flex flex-col w-full items-center justify-center pt-2">
        <span class="text-xl font-semibold">Ejercicio 1</span>
        <p class="w-[70%] mt-4 mb-10">
            Escribe una función que tome una cadena de paréntesis y determine 
            si el orden de los paréntesis es válido. La función debe retorar true
            si la cadena es válida y false si no lo es.
        </p>
        <div class="flex w-[40%] justify-around">
            <div class="flex flex-col">
                <input
                  v-model="strParentheses"
                  class="font-medium text-black mb-1"
                  type="text"
                  id="strParentheses"
                  placeholder="Ingresa la cadena a verificar"
                  @focus="cleanMessage()"
                />
                <span 
                    v-if="mensaje != ''" 
                    class="text-xs"
                    :class="validacion ? 'text-green-600' : 'text-red-600'"
                >{{mensaje}}</span>
            </div>
            <div class="flex">
                <button 
                    class="w-20 h-10 bg-green-600 text-white rounded-xl tracking-wide hover:bg-green-500"
                    @click="showMessage"
                >
                    Validar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
  import { ref } from "vue";
  import { validarParentesis } from "@/validaciones/validarParentesis.js";

  const isOpen = ref(true)
  const strParentheses = ref("");
  const validacion = ref(false);
  const mensaje = ref("");

  const showMessage = () => {
    validacion.value = validarParentesis(strParentheses.value); // Función exportada desde la carpeta src/validaciones/validarParentesis
    if(validacion.value){
        mensaje.value = 'La cadena introducida es válida.'
    }else{
        mensaje.value = 'La cadena introducida no cumple con las condiciones.'
    }
  }

  const cleanMessage = () => {
    mensaje.value = '';
  }
</script>