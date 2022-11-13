<template>
    <div class="flex flex-col w-full items-center justify-center pt-2">
        <span class="text-xl font-semibold">Ejercicio 3</span>
        <p class="w-[70%] mt-4 mb-10">
           A mi amigo John le gusta ir al cinema.Puede escoger entre dos sistemas, A y B.
           John quiere saber cuantas veces él debe ir al cinema para que el resultado final del sistema B, 
           cuando se redondea al siguiente dolar, va a ser más barato que el sistema A.  
        </p>
        <div class="flex flex-col w-[60%] items-center">
            <div class="flex justify-around w-full mb-3">
                <div class="flex flex-col">
                    <input
                      v-model="card"
                      class="font-medium text-black"
                      type="text"
                      id="card"
                      placeholder="Ingresa costo de la tarjeta"
                      @keypress="filterKey"
                      @focus="()=>{errors[0] = false}"
                    />
                    <div class="flex h-3 w-full">
                        <span v-if="errors[0]" class="text-red-700 text-xs">Campo requerido</span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <input
                        v-model="ticket"
                        class="font-medium text-black"
                        type="text"
                        id="ticket"
                        placeholder="Ingresa costo del boleto"
                        @keypress="filterKey"
                        @focus="()=>{errors[1] = false}"
                    />
                    <div class="flex h-3 w-full">
                        <span v-if="errors[1]" class="text-red-700 text-xs">Campo requerido</span>
                    </div>
                </div>
                <div class="flex flex-col">
                    <input
                        v-model="perc"
                        class="font-medium text-black"
                        type="text"
                        id="perc"
                        placeholder="Ingresa el costo del perc"
                        @keypress="filterKeyDot"
                        @focus="()=>{errors[2] = false}"
                    />
                    <div class="flex h-3 w-full">
                        <span v-if="errors[2]" class="text-red-700 text-xs">Campo requerido</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-around w-full">
                <div class="flex flex-col items-center">
                    <span class="mt-6 text-sm mb-1">Precio total con tarjeta:</span>
                    <input
                      v-model="totalPriceCard"
                      class="font-medium text-black w-[80%]"
                      type="text"
                      id="n"
                      placeholder=""
                      disabled
                    />
                </div>
                <div class="flex flex-col">
                    <span class="mt-6 text-sm mb-1">Precio total con tickets:</span>
                    <input
                        v-model="totalPriceTicket"
                        class="font-medium text-black w-[80%]"
                        type="text"
                        id="n"
                        placeholder=""
                        disabled
                    />
                </div>            
                <div class="flex flex-col">
                    <span class="mt-6 text-sm mb-1">Valor de "n":</span>
                    <input
                    v-model="n"
                    class="font-medium text-black w-[80%]"
                    type="text"
                    id="n"
                    placeholder=""
                    disabled
                    />
                </div>
            </div>
            <div class="flex mt-10">
                <button 
                    class="w-36 h-10 bg-green-600 text-white rounded-xl tracking-wide hover:bg-green-500"
                    @click="calculateValues()"
                >
                    Calcular
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
  import { ceil } from "lodash";
import { ref } from "vue";
  const card = ref('');
  const ticket = ref('');
  const perc = ref('');
  const n = ref('');
  const errors = ref([false, false, false]);
  const totalPriceCard = ref('');
  const totalPriceTicket = ref('');

  const calculateValues = () => {
    //--------------------------------------------------------------------------------//
    //------- Muestra de errores si sus inputs correspondientes están vacíos ---------//
    //--------------------------------------------------------------------------------//
    if(card.value == ''){ errors.value[0] = true; }else{ errors.value[0] = false; }
    if(ticket.value == ''){ errors.value[1] = true; }else{ errors.value[1] = false; }
    if(perc.value == ''){ errors.value[2] = true; }else{ errors.value[2] = false; }
    //---------------------------------

    // Llamado y retorno de la función mathCalcs con los parametros (card, ticket, perc)
    n.value = mathCalcs(parseInt(card.value, 10), parseInt(ticket.value, 10), perc.value); 
  }

  const mathCalcs = (tarjeta, boleto, comision) => { // Función para cálculo de veces necesarias para
                                                     // que el sistema B tenga el mismo rendimiento que 
                                                     //el sistema A.
    let sysB = parseFloat(tarjeta);
    let sysA = 0;
    let result = 0;
    let retorno;

    console.log(comision);

    while(ceil(sysB) > sysA){
        sysB = sysB + (boleto * Math.pow(comision, ++result)); // Incremento del porcentaje proporcional
                                                               // del ticket anterior. 
        sysA = sysA + boleto; //Incremento por el valor directo de un ticket
    }
    retorno = parseInt(result, 10);
    totalPriceCard.value = parseInt(sysB).toString();
    totalPriceTicket.value = sysA.toString();
    return retorno.toString(); // Retorno de veces necesarias.
  }

  function filterKey(e) { // Función que exculye cualquier caracter que no sea un número
    // Si el caracter introducido es menor que 48 ASCII (0) o mayor que 57 ASCII (9)
    if(e.keyCode < 48 || e.keyCode > 57) {
        // No se agrega
        e.preventDefault();
    }
  }
  function filterKeyDot(e) { // Función que exculye cualquier caracter que no sea un número
    // Si el caracter introducido es menor que 48 ASCII (0) o mayor que 57 ASCII (9)
    if(e.keyCode < 48 || e.keyCode > 57) {
        // No se agrega al menos que sea un punto
        if(e.keyCode != 46){
            e.preventDefault();
        }
    }
  }
</script>