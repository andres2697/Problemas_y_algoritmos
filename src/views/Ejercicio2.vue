<template>
    <div class="flex flex-col w-full items-center justify-center pt-2">
        <span class="text-xl font-semibold">Ejercicio 2</span>
        <p class="w-[70%] mt-4 mb-10">
            Escribir una función que formatee una duración, dada como una cantidad de segundos,
            de una manera amigable para los humanos.
            La función debe aceptar un entero no negativo. Si es cero, simplemente devuelve "ahora". 
            En caso contrario, la duración se expresa como una combinación de 
            años, días, horas, minutos y segundos.
        </p>
        <div class="flex w-[40%] justify-around">
            <div class="flex flex-col">
                <input
                  v-model="entradaSegundos"
                  class="font-medium text-black"
                  type="text"
                  id="entradaSegundos"
                  placeholder="Ingresa un número entero"
                  @keypress="filterKey"
                />
            </div>
            <div class="flex">
                <button 
                    class="w-36 h-10 bg-green-600 text-white rounded-xl tracking-wide hover:bg-green-500"
                    @click="formatEntry(entradaSegundos)"
                >
                    Dar formato
                </button>
            </div>
        </div>
        <div class="flex w-[50%] h-16  mt-14 justify-center">
            <span :class="emptyInput ? 'text-red-500' : 'text-black'">{{message}}</span>
        </div>
    </div>
</template>

<script setup>
  import { ref } from "vue";
  const entradaSegundos = ref('');
  const year = ref(0);
  const day = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  const message = ref('');
  const emptyInput = ref(false);
  const splitMessage = ref([]);

  function filterKey(e) { // Función que exculye cualquier caracter que no sea un número
    // Si el caracter introducido es menor que 48 ASCII (0) o mayor que 57 ASCII (9)
    if(e.keyCode < 48 || e.keyCode > 57) {
        // No se agrega
        e.preventDefault();
    }
  }

  const formatEntry = (entradaSeg) => { // Función para dar formato a los segundos
                                        // recibiendo como parámetro el número introducido en el input
    year.value = 0;
    day.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    emptyInput.value = false;
    message.value = '';
    splitMessage.value = [];

    if(entradaSeg == ''){ // Validar si la cadena está vacía
        emptyInput.value = true;
        message.value = 'Favor de introducir un valor al input.'
    }else{
        emptyInput.value = false;
        message.value = '';
        let aux = parseInt(entradaSeg, 10);
        let stringAux = '';

        if(aux === 0){ // Validar si el valor introducido es igual a 0
            message.value = 'Ahora';
        }else{
            while(aux >= 60){ // Realiza las restas correspondientes mientras los segundos puedan
                              // acompletar al menos un minuto (60 segundos).
                if(aux >= 31557600){
                    //Si se entra en esta validación, los segundos pueden acompletar un año
                    // y se incrementa en uno su respectivo contador.
                    year.value++;
                    aux = aux - 31557600; //Resta equivalente de un año en segundos
                }else if(aux >= 86400){
                    //Si se entra en esta validación, los segundos pueden acompletar un día
                    // y se incrementa en uno su respectivo contador.
                    day.value++;
                    aux = aux - 86400; //Resta equivalente de un día en segundos
                }else if(aux >= 3600){
                    //Si se entra en esta validación, los segundos pueden acompletar una hora
                    // y se incrementa en uno su respectivo contador.
                    hours.value++;
                    aux = aux - 3600; //Resta equivalente de una hora en segundos
                }else if(aux >= 60){
                    //Si se entra en esta validación, los segundos pueden acompletar un minuto
                    // y se incrementa en uno su respectivo contador.
                    minutes.value++;
                    aux = aux - 60; //Resta equivalente de un minuto en segundos
                } 
            }
            seconds.value = aux; //El sobrante es agregado a los segundos

            //------------------------------------------------------------------//
            //----- Bloque de asignación de texto al arreglo splitMessage ------//
            //------------------------------------------------------------------//
            if(year.value > 0){
                if(year.value == 1){
                    splitMessage.value.push(year.value.toString() + ' año');
                }else{
                    splitMessage.value.push(year.value.toString() + ' años');
                }
            }
            if(day.value > 0){
                if(day.value == 1){
                    splitMessage.value.push(day.value.toString() + ' día');
                }else{
                    splitMessage.value.push(day.value.toString() + ' días');
                }
            }
            if(hours.value > 0){
                if(hours.value == 1){
                    splitMessage.value.push(hours.value.toString() + ' hora');
                }else{
                    splitMessage.value.push(hours.value.toString() + ' horas');
                }
            }
            if(minutes.value > 0){
                if(minutes.value == 1){
                    splitMessage.value.push(minutes.value.toString() + ' minuto');
                }else{
                    splitMessage.value.push(minutes.value.toString() + ' minutos');
                }
            }
            if(seconds.value > 0){
                if(seconds.value == 1){
                    splitMessage.value.push(seconds.value.toString() + ' segundo');
                }else{
                    splitMessage.value.push(seconds.value.toString() + ' segundos');
                }
            }
            //---------------------------------------

            //------------------------------------------------------------------//
            //-------------- Recorrido del arreglo splitMessage ----------------//
            //------------------------------------------------------------------//
            let i = 0;
            splitMessage.value.forEach((message)=>{
                if(i == 0){ // Si es el primer elemento no se añade el conector 'y' o ','
                    stringAux = stringAux + message;
                }else if(i == splitMessage.value.length - 1){ // Si es el ultimo elemento, se añade el 
                                                              // conector 'y' a la cadena concatenada.
                    stringAux = stringAux + ' y ' + message;
                }else{
                    stringAux = stringAux + ', ' + message; // Si el elemento es intermedio, se añade una ','
                                                            // a la cadena concatenada 
                }
                i++;
            });
            message.value = stringAux; // Impresión en DOM de variable.
        }
    }
  }
</script>