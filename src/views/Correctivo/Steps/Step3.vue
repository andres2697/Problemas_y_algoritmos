<template>
  <div class="flex w-full flex-col">
    <Horario
      :state="props.estado"
      :incidencia="props.incidencia"
      :folio="props.folio"
      :tipoFolio="props.tipoFolio"
      @validarFecha="validarFecha"
      @validarHora="validarHora"
      @validarMinuto="validarMinuto"
    ></Horario>
    <div
      v-if="error"
      class="mt-2 flex w-[100%] items-center justify-center py-1"
      :class="rebotar"
    >
      <span class="text-xs font-semibold text-red-400">{{
        "Campo(s) requerido(s). Selecciona una fecha y horario válido"
      }}</span>
      <ExclamationCircleIcon class="ml-2 h-4 w-4 text-red-400" />
    </div>
    <div class="mb-3> mt-5 flex w-[100%]">
      <div :class="props.incidencia == 1 ? 'flex flex-col w-[50%]' : 'hidden'" class="justify-center items-center">
        <span class="mb-2 font-semibold">Foto después</span>
        <div :class="errores.fotoDespues ? 'border-2 border-red-400' : ''" class="flex w-[50%] h-36 bg-gray-100 rounded-xl justify-center items-center">
          <label v-if="!fotos.despues.file" for="foto-despues" class="flex justify-around w-full cursor-pointer">
            <div @change="selectFileDespues" class="flex justify-around w-[65%] bg-gray-400 rounded-md py-1 px-4 text-white">
              <input ref="file1" type="file" accept=".png,.jpg,.heic" class="file:border file:border-solid" id="foto-despues" hidden/>
              <UploadIcon class="w-5 h-5 text-lg"></UploadIcon>
              <span>Subir</span>
            </div>
          </label>
          <div v-else class="flex justify-around w-[80%] h-28">
            <img :src="fotos.despues.file64" class="rounded-md">
          </div>
        </div>
        <div v-if="fotos.despues.file"  class="flex w-[70%] items-center bg-gray-200 mt-2 py-2 rounded-md">
          <div class="flex justify-between w-[100%] ml-1 text-sm truncate px-2" :title="fotos.despues.file.name">
            {{ fotos.despues.file.name }}
            <TrashIcon class="w-5 h-5 cursor-pointer mr-1" @click="eliminarImgDespues"></TrashIcon> 
          </div>
        </div>
      </div>
      <div :class="props.incidencia == 1 ? 'flex flex-col w-[50%]' : 'flex w-[100%]'" class="flex w-[100%]">
        <div :class="props.incidencia == 1 ? 'w-full' : 'w-[50%]'" class="flex flex-col">
          <div class="flex pb-2 text-xs text-gris-claro">Justificación/pausa</div>
          <div class="flex w-[90%]">
            <Listbox
              v-model="infoCapturada.justificacion"
              name="justificacion"
              :disabled="
                ( $store.state.a.mostrarJustificacion[0] ||
                $store.state.a.mostrarJustificacion[1] ||
                $store.state.a.mostrarJustificacion[2] )
                  ? true
                  : false
              "
            >
              <div class="relative mt-1 w-full">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span
                    class="block truncate"
                    :class="
                      $store.state.a.mostrarJustificacion[0] ||
                      $store.state.a.mostrarJustificacion[1] ||
                      $store.state.a.mostrarJustificacion[2]
                        ? 'cursor-not-allowed text-gray-500'
                        : ''
                    "
                    >{{ infoCapturada.justificacion }}</span
                  >
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <SelectorIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-20 mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="element in concentradoDatos.justificaciones"
                      :key="element"
                      :value="element"
                      as="template"
                    >
                      <li
                        class="hover:cursor-pointer"
                        :class="[
                          active ? 'bg-[#E9F0FC] text-black' : 'text-black',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ element }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div :class="props.incidencia == 1 ? 'w-full' : 'w-[50%]'" class="flex mt-4">
          <!-- v-if="infoCapturada.justificacion != 'Selecciona una justificación'"  -->
          <div class="flex w-[40%] flex-col">
            <div class="flex pb-1 text-xs text-gris-claro">Tiempo muerto</div>
            <div class="flex w-full items-center">
              <input
                v-model="infoCapturada.tiempoMuerto"
                class="flex w-[60%] rounded-lg border-none border-transparent bg-transparent text-center text-3xl font-medium focus:ring-0"
                @blur="actualizarTiempoMuerto"
                @keypress="isNumber($event)"
                type="number"
                min="0"
                :disabled="
                  infoCapturada.justificacion == 'Selecciona una justificación'
                    ? true
                    : false
                "
              />
              <span class="pt-2">M</span>
            </div>
          </div>
          <div class="flex w-[30%] flex-col pl-2">
            <div class="flex pb-2 text-xs text-gris-claro">ETA</div>
            <div
              class="w-[60%] items-center justify-center rounded-md border-2 bg-white p-1 text-center"
              :class="
                infoCapturada.eta.tiempo == ''
                  ? 'border-gris-claro'
                  : infoCapturada.eta.color
              "
            >
              {{ infoCapturada.eta.tiempo }}
            </div>
          </div>
          <div class="flex w-[30%] flex-col">
            <div class="flex pb-2 text-xs text-gris-claro">SLA</div>
            <div
              class="w-[65%] items-center justify-center rounded-md border-2 bg-white p-1 text-center"
              :class="
                infoCapturada.sla.tiempo == '--:--'
                  ? 'border-gris-claro'
                  : infoCapturada.sla.color
              "
            >
              {{ infoCapturada.sla.tiempo }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 flex w-[100%] items-center">
      <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
    </div>
    <div class="flex w-[100%] flex-col font-semibold">
      Herramientas Técnico
      <div class="mt-4 flex w-[100%] font-normal text-gris-claro">
        <div class="flex w-2/4 flex-col">
          <div class="flex w-full">
            <div class="w-1/2 pl-1 text-xs">
              Potencia inicial
              <input
                v-model="infoCapturada.potenciaInicial"
                @keypress="isNumberOrNegative($event, 0)"
                @change="quitarNegativos(0)"
                class="mt-2 h-9 w-[85%] rounded-lg border-2 border-gris-claro text-black"
                type="number"
                name="potenciaInicial"
                id="potenciaInicial"
                min="-999"
                max="999"
              />
            </div>
            <div class="w-1/2 text-xs">
              Potencia final
              <input
                v-model="infoCapturada.potenciaFinal"
                @keypress="isNumberOrNegative($event, 1)"
                @change="quitarNegativos(1)"
                class="mt-2 h-9 w-[85%] rounded-lg border-2 border-gris-claro text-black"
                type="number"
                name="potenciaFinal"
                id="potenciaFinal"
                min="-999"
                max="999"
              />
            </div>
          </div>
          <div
            v-if="
              (infoCapturada.potenciaInicial != 0 ||
                infoCapturada.potenciaFinal != 0) &&
              (infoCapturada.primeraMedicion.horas == null ||
                infoCapturada.primeraMedicion.minutos == null)
            "
            class="flex pt-2 pl-[5%] text-xs font-normal text-red-400"
          >
            Ingresar hora de primera medición o colocar potencias en valor
            inicial de 0
          </div>
        </div>
        <div class="flex w-2/4 flex-col">
          <div class="mb-2 text-xs">Hora primera medición</div>
          <div class="flex text-black">
            <div class="flex items-center pr-2">
              <input
                v-model="infoCapturada.primeraMedicion.horas"
                class="flex w-[50%] rounded-lg border-transparent border-gris-claro bg-transparent text-center text-3xl font-medium focus:ring-0"
                @blur="actualizarHoraMedicion"
                @keypress="isNumber($event)"
                type="number"
                min="0"
                max="24"
              />
              <span class="pr-2 pl-2">H</span>
            </div>
            <div class="flex items-center px-3">
              <input
                v-model="infoCapturada.primeraMedicion.minutos"
                class="flex w-[50%] rounded-lg border-transparent border-gris-claro bg-transparent text-center text-3xl font-medium focus:ring-0"
                @blur="actualizarMinutoMedicion"
                @keypress="isNumber($event)"
                type="number"
                min="0"
                max="59"
              />
              <span class="pr-2 pl-2">M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 flex w-[100%] items-center">
      <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
    </div>
    <div class="mb-2 flex w-[100] flex-col font-semibold">
      Miscelaneos
      <div class="mt-4 flex w-[100%] font-normal text-gris-claro">
        <div class="w-1/2 text-xs">
          Materiales
          <div class="flex w-[95%] items-start justify-start">
            <Listbox
              v-model="infoCapturada.materiales.miscelaneos.seleccion.elementos"
              name="miscelaneos"
              multiple
            >
              <div class="relative mt-1 w-full">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{
                    infoCapturada.materiales.miscelaneos.default
                  }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <SelectorIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-20 mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="element in concentradoDatos.materiales.miscelaneos"
                      :key="element"
                      :value="element"
                      as="template"
                      @click="cambiarValorMiscelaneos(element)"
                    >
                      <li
                        class="hover:cursor-pointer"
                        :class="[
                          active ? 'bg-[#E9F0FC] text-black' : 'text-black',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ element }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
          <Transition
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            enter-active-class="transition duration-200 ease-in"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
          >
            <div
              v-if="
                (errores.miscelaneo && errores.ttp) ||
                (errores.miscelaneo && !errores.ttp)
              "
              class="flex pt-2 text-xs font-normal text-red-400"
            >
              Selección de material requerida
            </div>
          </Transition>
        </div>
        <div class="flex w-1/2 text-black">
          <table class="w-[90%] table-fixed items-center justify-center">
            <thead>
              <tr class="border-b border-gris-claro/50">
                <th class="w-[60%] text-start text-xs text-gris-claro">Tipo</th>
                <th class="w-[40%] text-center text-xs text-gris-claro">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in infoCapturada.materiales.miscelaneos
                  .seleccion.elementos"
                class="border-b border-gris-claro/50"
              >
                <td class="w-[95%] truncate py-4 pr-2.5 text-sm" :title="item">
                  {{ item }}
                </td>
                <td class="items-center">
                  <input
                    @keypress="isNumber($event)"
                    @blur="actualizarCantidadMiscelaneo(index)"
                    v-model="
                      infoCapturada.materiales.miscelaneos.seleccion.cantidades[
                        index
                      ]
                    "
                    class="my-1 h-8 w-[100%] justify-center rounded-lg border-2 border-gris-claro text-center font-semibold text-black"
                    type="number"
                    :id="index"
                    min="1"
                    max="1000"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="my-3 flex w-[100%] items-center">
      <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
    </div>
    <div class="mb-2 flex w-[100] flex-col font-semibold">
      Material TTP
      <div class="mt-4 flex w-[100%] font-normal text-gris-claro">
        <div class="w-1/2 text-xs">
          Materiales
          <div class="flex w-[95%] items-start justify-start">
            <Listbox
              v-model="infoCapturada.materiales.ttp.seleccion.elementos"
              name="ttp"
              multiple
            >
              <div class="relative mt-1 w-full">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{
                    infoCapturada.materiales.ttp.default
                  }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <SelectorIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-20 mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="element in concentradoDatos.materiales.ttp"
                      :key="element"
                      :value="element"
                      @click="cambiarValorTtp(element)"
                      as="template"
                    >
                      <li
                        class="hover:cursor-pointer"
                        :class="[
                          active ? 'bg-[#E9F0FC] text-black' : 'text-black',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ element }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
          <Transition
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            enter-active-class="transition duration-200 ease-in"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
          >
            <div
              v-if="
                (errores.miscelaneo && errores.ttp) ||
                (!errores.miscelaneo && errores.ttp)
              "
              class="flex pt-2 text-xs font-normal text-red-400"
            >
              Selección de material requerida
            </div>
          </Transition>
        </div>
        <div class="flex w-1/2 text-black">
          <table class="w-[90%] table-fixed items-center justify-center">
            <thead>
              <tr class="border-b border-gris-claro/50">
                <th class="w-[60%] text-start text-xs text-gris-claro">Tipo</th>
                <th class="w-[40%] text-center text-xs text-gris-claro">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in infoCapturada.materiales.ttp.seleccion
                  .elementos"
                class="border-b border-gris-claro/50"
              >
                <td class="w-[95%] truncate py-4 pr-2.5 text-sm" :title="item">
                  {{ item }}
                </td>
                <td class="items-center">
                  <input
                    @keypress="isNumber($event)"
                    @blur="actualizarCantidadTtp(index)"
                    v-model="
                      infoCapturada.materiales.ttp.seleccion.cantidades[index]
                    "
                    class="my-1 h-8 w-[100%] justify-center rounded-lg border-2 border-gris-claro text-center font-semibold text-black"
                    type="number"
                    :id="index"
                    min="1"
                    max="1000"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="my-3 flex w-[100%] items-center">
      <div class="flex w-[95%] border-b-2 border-gris-claro/30"></div>
    </div>
    <div class="mb-2 flex w-[100] flex-col font-semibold">
      <span v-if="props.incidencia != 1">Conceptos</span>
      <div
        v-if="props.incidencia != 1"
        class="mt-4 flex w-[100%] font-normal text-gris-claro"
      >
        <div class="w-1/2 text-xs">
          Conceptos
          <div class="flex w-[95%] flex-col items-start justify-start">
            <Listbox
              v-model="infoCapturada.conceptos.descripcion.seleccion.elementos"
              name="concepto"
              multiple
            >
              <div class="relative mt-1 w-full">
                <ListboxButton
                  class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                  <span class="block truncate">{{
                    infoCapturada.conceptos.descripcion.default
                  }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <SelectorIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute z-20 mt-1 ml-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="element in concentradoDatos.conceptos"
                      :key="element"
                      :value="element"
                      @click="cambiarValorConceptos(element)"
                      as="template"
                    >
                      <li
                        class="hover:cursor-pointer"
                        :class="[
                          active ? 'bg-[#E9F0FC] text-black' : 'text-black',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ element }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <!-- Concepto CAB 24 (Tabla) -->
            <div class="mt-5 flex w-[100%]">
              <table
                class="mt-3 h-fit w-[90%] table-fixed items-center justify-center"
              >
                <thead>
                  <tr class="border-b border-gris-claro/50">
                    <th class="w-[60%] text-start text-xs text-gris-claro">
                      Concepto CAB 24
                    </th>
                    <th class="w-[25%] text-center text-xs text-gris-claro">
                      Editar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      class="mt-2 w-[95%] truncate pr-2.5 text-sm font-semibold text-black"
                      title="CAB 24"
                    >
                      <div class="flex w-full">
                        <ExclamationIcon
                          v-if="mostrarErrorCoordenadas"
                          class="mr-5 h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                        <span> CAB 24 </span>
                      </div>
                    </td>
                    <td class="items-center">
                      <div class="flex w-[100%] items-center justify-center">
                        <PencilAltIcon
                          class="h-5 w-5 cursor-pointer text-center text-black"
                          @click="openModal()"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Modal de Coordenadas -->
            <TransitionRoot appear :show="isOpen" as="template" class="z-50">
              <Dialog as="div" @close="closeModal" class="relative z-50">
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div class="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                  <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                  >
                    <TransitionChild
                      as="template"
                      enter="duration-300 ease-out"
                      enter-from="opacity-0 scale-95"
                      enter-to="opacity-100 scale-100"
                      leave="duration-200 ease-in"
                      leave-from="opacity-100 scale-100"
                      leave-to="opacity-0 scale-95"
                    >
                      <DialogPanel
                        class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                      >
                        <DialogTitle
                          as="div"
                          class="mb-5 flex text-lg font-medium leading-6 text-gray-900"
                        >
                          <div class="flex w-[80%]">
                            <span>CAB-024</span>
                          </div>
                          <div class="flex w-[20%] cursor-pointer justify-end">
                            <XCircleIcon
                              class="h-6 w-6 text-black"
                              aria-hidden="true"
                              @click="closeModal"
                            />
                          </div>
                        </DialogTitle>
                        <div
                          class="flex h-6 w-fit cursor-pointer items-center justify-center"
                          @click="agregarCoordenada"
                        >
                          <PlusSmIcon
                            class="h-5 w-5 text-black hover:text-black"
                            aria-hidden="true"
                          />
                          <span class="pl-2">Agregar</span>
                        </div>
                        <Transition
                          leave-active-class="transition duration-200 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                          enter-active-class="transition duration-200 ease-in"
                          enter-from-class="opacity-0"
                          enter-to-class="opacity-100"
                        >
                          <div
                            v-if="mostrarErrorCoordenadas"
                            class="mt-2 flex w-full justify-center text-xs text-red-400"
                          >
                            Favor de verificar coordenadas ingresadas
                          </div>
                        </Transition>
                        <div
                          v-for="(item, index) in infoCapturada.conceptos.cab24"
                          class="my-3 flex w-[90%] cursor-pointer items-center justify-center space-x-4"
                        >
                          <span class="pl-10">{{ index + 1 }}</span>
                          <input
                            v-model="infoCapturada.conceptos.cab24[index]"
                            class="h-8 w-[80%] rounded-lg border-2 font-semibold text-black"
                            :class="
                              infoCapturada.conceptos.errores[index] == true
                                ? 'border-red-400'
                                : 'border-gris-claro'
                            "
                            type="text"
                            :name="'coordenada' + index"
                            :id="'coordenada' + index"
                            :placeholder="
                              infoCapturada.conceptos.coordenadasDefault
                            "
                            @blur="corroborarCoordenadas(index, item)"
                          />
                          <XCircleIcon
                            class="h-6 w-6 text-black hover:text-black"
                            aria-hidden="true"
                            @click="eliminarCoordenada(index)"
                          />
                        </div>
                        <div class="mt-4 flex justify-center">
                          <button
                            type="button"
                            class="mt-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            @click="closeModal"
                          >
                            Aceptar
                          </button>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </TransitionRoot>
            <!-- Fin del Modal de Coordenadas -->
          </div>
        </div>
        <div class="flex h-fit w-1/2 text-black">
          <table class="w-[90%] table-fixed items-center justify-center">
            <thead>
              <tr class="border-b border-gris-claro/50">
                <th class="w-[60%] text-start text-xs text-gris-claro">Tipo</th>
                <th class="w-[45%] text-center text-xs text-gris-claro">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in infoCapturada.conceptos.descripcion
                  .seleccion.elementos"
                class="border-b border-gris-claro/50"
              >
                <td class="w-[95%] truncate py-4 pr-2.5 text-sm" :title="item">
                  {{ item }}
                </td>
                <td class="items-center">
                  <input
                    @keypress="isNumber($event)"
                    @blur="actualizarCantidadConcepto(index)"
                    v-model="
                      infoCapturada.conceptos.descripcion.seleccion.cantidades[
                        index
                      ]
                    "
                    class="my-1 h-8 w-[100%] justify-center rounded-lg border-2 border-gris-claro text-center font-semibold text-black"
                    type="number"
                    :id="index"
                    min="1"
                    max="1000"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-14 mb-2 flex w-[100%] items-center justify-center">
        <button
          type="button"
          @click="openModalConfirmacion()"
          class="flex w-[20%] items-center justify-center rounded-xl bg-[#F2F2F2] px-10 py-2 font-medium"
          :class="agitar"
        >
          Finalizar
        </button>
        <TransitionRoot
          appear
          :show="modalConfirmacion"
          as="template"
          class="z-50"
        >
          <Dialog
            as="div"
            @close="closeModalConfirmacion"
            class="relative z-40"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25"></div>
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div
                class="flex min-h-full items-center justify-center p-4 text-center"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-xl transform overflow-hidden rounded-xl bg-white pb-6 text-left align-middle shadow-xl transition-all"
                  >
                    <DialogTitle
                      as="div"
                      class="mb-5 flex items-center py-5 text-lg font-medium leading-6"
                    >
                      <span class="flex w-[80%] pl-10"
                        >Confirmar finalización de folio</span
                      >
                      <div class="flex w-[20%] justify-end pr-2">
                        <XCircleIcon
                          @click="closeModalConfirmacion"
                          class="h-5 w-5 cursor-pointer"
                        />
                      </div>
                    </DialogTitle>
                    <div class="mx-10 flex select-none flex-col">
                      <span class="flex w-[100%] justify-center"
                        >¿Desea finalizar el folio trabajado actualmente?</span
                      >
                      <div class="mt-10 flex select-none justify-around">
                        <button
                          type="button"
                          class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                          @click="closeModalConfirmacion"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                          @click="validaryEnviarInfo()"
                        >
                          Finalizar
                        </button>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import {
  CheckIcon,
  SelectorIcon,
  PencilAltIcon,
  PlusSmIcon,
  ExclamationIcon, 
  ExclamationCircleIcon
} from "@heroicons/vue/solid";
import { XCircleIcon, UploadIcon, TrashIcon } from "@heroicons/vue/outline";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import {
  concentradoMaterialConcepto,
  calculoEta,
  calculoSla,
} from "@/consultasBD/consultaMaterialesConcepto.js";
import {
  guardarJustificacion,
  guardarTiempoMuerto,
} from "@/consultasBD/guardarTiempos.js";
import { useStore } from "vuex";
import { getDatabase, ref as refDB, get, set, child, update } from "@firebase/database";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import { validacionCoordenadasCab24 } from "@/validaciones/coordenadas.js";
import { arrayActiveHora, arrayActiveMinuto } from "@/JS/arreglosHorario.js";
import Horario from "@/views/Preventivo/Horario.vue";
import { store } from "@/store";
import { guardarCierre } from "@/consultasBD/guardarCierre.js";
import { useRouter, useRoute } from 'vue-router';

const storeVuex = useStore();
const router = useRouter();
const db = getDatabase();
const storage = getStorage();

const props = defineProps(["incidencia", "folio", "estado", "tipoFolio"]);
const isOpen = ref(false);
const modalConfirmacion = ref(false);
const errorCoord = ref(false);
const cab24 = ref(0);
const validacionHorario = ref([false, false, false]);

const infoCapturada = ref({
  justificacion: "Selecciona una justificación",
  tiempoMuerto: store.state.a.tiempoMuerto,
  eta: await calculoEta(props.folio, props.incidencia, props.tipoFolio), // ETA
  // Calculo realizado mediante la resta de la hora de
  // llegada menos la hora de inicio
  sla: store.state.a.sla, //SLA
  // Calculo realizado mediante la resta de la hora de
  // cierre menos el tiempo muerto introducido por el usuario
  // menos la hora de activacion
  potenciaInicial: 0,
  potenciaFinal: 0,
  primeraMedicion: {
    horas: null,
    minutos: null,
  },
  materiales: {
    miscelaneos: {
      default: "Selecciona un material",
      seleccion: {
        elementos: [],
        cantidades: [],
      },
    },
    ttp: {
      default: "Selecciona un material",
      seleccion: {
        elementos: [],
        cantidades: [],
      },
    },
  },
  conceptos: {
    descripcion: {
      default: "Selecciona un concepto",
      seleccion: {
        elementos: [],
        cantidades: [],
      },
    },
    cab24: [""],
    coordenadasDefault: "00.000000, 00.000000",
    errores: [],
  },
});
const fotos = ref({
  despues: {
    file: null,
    file64: null
  }
});

const errores = ref({
  potencia: false,
  miscelaneo: false,
  ttp: false,
  fotoDespues: false,
});

const error = ref(false);
const fecha = ref();
const hora = ref();
const minuto = ref();
const rebotar = ref("");

const validarTiempoMuerto = ref(false);
const arrayTempMiscelaneos = ref([]);
const arrayTempTtp = ref([]);
const arrayTempConceptos = ref([]);
const mostrarErrorCoordenadas = ref(false);
const agitar = ref("");

const concentradoDatos = ref(concentradoMaterialConcepto());
concentradoDatos.value.justificaciones.sort();

watch(
  () => fotos.value.despues.file,
  () => {
    errores.value.fotoDespues = fotos.value.despues.file ? false : true; 
    // console.log(fotos.value.antes.file ? 'existe foto' : 'no hay foto subida');
  }
);

watch(
  () => infoCapturada.value.justificacion,
  async () => {
    if (infoCapturada.value.justificacion == "Selecciona una justificación") {
      infoCapturada.value.tiempoMuerto = 0;
      store.commit("actualizarTiempoMuerto", infoCapturada.value.tiempoMuerto);
      guardarTiempoMuerto(
        props.folio,
        infoCapturada.value.tiempoMuerto,
        props.incidencia,
        props.tipoFolio
      );
      guardarJustificacion(
        props.folio,
        null,
        props.incidencia,
        props.tipoFolio
      );
      let sla = await calculoSla(
        props.folio,
        props.incidencia,
        props.tipoFolio,
        store.state.a.tiempoMuerto
      );
      store.commit("asignarSla", sla);
      validarTiempoMuerto.value = true;
    } else {
      guardarJustificacion(
        props.folio,
        infoCapturada.value.justificacion,
        props.incidencia,
        props.tipoFolio
      );
    }
  }
);

function closeModal() {
  isOpen.value = false;
}
async function closeModalConfirmacion() {
  modalConfirmacion.value = false;
  return "closing";
}
const openModal = () => {
  let i = 0;
  if (infoCapturada.value.conceptos.cab24.length > 1) {
    while (i <= infoCapturada.value.conceptos.cab24.length) {
      if (i != 0 && infoCapturada.value.conceptos.cab24[i] == "") {
        infoCapturada.value.conceptos.cab24.splice(i, 1);
        infoCapturada.value.conceptos.errores.splice(i, 1);
        i--;
      }
      i++;
    }
  }
  isOpen.value = true;
};

function cambiarError() {
  if (errorCoord.value) {
    errorCoord.value = false;
  }
}

const validarFecha = async (data) => {
  if (data) {
    fecha.value = true;
    validacionHorario.value[0] = true;
    storeVuex.commit("asignarMuestraJustificacion", 1);
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
      let sla = await calculoSla(props.folio, props.incidencia, props.tipoFolio, store.state.a.tiempoMuerto);
      console.log(sla);
      storeVuex.commit("asignarSla", sla); 
      error.value =  await actualizarEstatus(3);
    }
  }
};
const validarHora = async (data) => {
  if (data) {
    hora.value = true;
    validacionHorario.value[1] = true;
    storeVuex.commit("asignarMuestraJustificacion", 2);
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
      let sla = await calculoSla(props.folio, props.incidencia, props.tipoFolio, store.state.a.tiempoMuerto);
      // console.log(sla);
      storeVuex.commit("asignarSla", sla);
      error.value = await actualizarEstatus(3);  
    }else{
      // error.value = true;
    }
  }
};
const validarMinuto = async (data) => {
  if (data) {
    minuto.value = true;
    validacionHorario.value[2] = true;
    storeVuex.commit("asignarMuestraJustificacion", 3);
    if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
      let sla = await calculoSla(props.folio, props.incidencia, props.tipoFolio, store.state.a.tiempoMuerto);
      console.log(sla);
      storeVuex.commit("asignarSla", sla);
      error.value = await actualizarEstatus(3);  
    }else{
      // error.value = true;
    }
  }
};

const actualizarEstatus = async (actualizacion_estatus) => {
    await update(
        child(
        refDB(db), `folios/` + (props.incidencia == 1 ? `preventivos` : `correctivos`) + `/${props.tipoFolio}/${props.folio}`
        ), 
        {
          estatus: actualizacion_estatus,
        }
    );
    return false;
};
const selectFileDespues = async (e) => {
  fotos.value.despues.file = e.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(fotos.value.despues.file);
  reader.onload = (event) =>{
    fotos.value.despues.file64 = reader.result;
  }
  // fotos.value.despues.file64 = URL.createObjectURL(fotos.value.despues.file64)
};
const eliminarImgDespues = () => {
  fotos.value.despues.file = null;
  fotos.value.despues.file64 = null;
};
const actualizarTiempoMuerto = async () => {
  if (infoCapturada.value.tiempoMuerto == "") {
    infoCapturada.value.tiempoMuerto = 0;
  }
  store.commit("actualizarTiempoMuerto", infoCapturada.value.tiempoMuerto);
  guardarTiempoMuerto(
    props.folio,
    infoCapturada.value.tiempoMuerto,
    props.incidencia,
    props.tipoFolio
  );
  let sla = await calculoSla(
    props.folio,
    props.incidencia,
    props.tipoFolio,
    store.state.a.tiempoMuerto
  );
  store.commit("asignarSla", sla);
  validarTiempoMuerto.value = true;
};

const isNumber = ($event) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if (keyCode < 48 || keyCode > 57) {
    $event.preventDefault();
  }
};

const isNumberOrNegative = ($event, potencia) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode != 45) {
    $event.preventDefault();
  }
};
const quitarNegativos = (potencia) => {
  if (potencia == 0 && infoCapturada.value.potenciaInicial == "") {
    infoCapturada.value.potenciaInicial = 0;
  } else if (potencia == 1 && infoCapturada.value.potenciaFinal == "") {
    infoCapturada.value.potenciaFinal = 0;
  }
};

const actualizarHoraMedicion = () => {
  if (infoCapturada.value.primeraMedicion.horas == "") {
    infoCapturada.value.primeraMedicion.horas = 0;
  } else if (infoCapturada.value.primeraMedicion.horas > 24) {
    infoCapturada.value.primeraMedicion.horas = 0;
  }
};

const actualizarMinutoMedicion = () => {
  if (infoCapturada.value.primeraMedicion.minutos == "") {
    infoCapturada.value.primeraMedicion.minutos = 0;
  } else if (infoCapturada.value.primeraMedicion.minutos > 59) {
    infoCapturada.value.primeraMedicion.minutos = 0;
  }
};

const actualizarCantidadMiscelaneo = (index) => {
  if (
    infoCapturada.value.materiales.miscelaneos.seleccion.cantidades[index] == ""
  ) {
    infoCapturada.value.materiales.miscelaneos.seleccion.cantidades[index] = 1;
  }
};

const actualizarCantidadTtp = (index) => {
  if (infoCapturada.value.materiales.ttp.seleccion.cantidades[index] == "") {
    infoCapturada.value.materiales.ttp.seleccion.cantidades[index] = 1;
  }
};

const actualizarCantidadConcepto = (index) => {
  if (
    infoCapturada.value.conceptos.descripcion.seleccion.cantidades[index] == ""
  ) {
    infoCapturada.value.conceptos.descripcion.seleccion.cantidades[index] = 1;
  }
};
const cambiarValorMiscelaneos = (valor) => {
  if (
    infoCapturada.value.materiales.miscelaneos.seleccion.elementos.length >
    infoCapturada.value.materiales.miscelaneos.seleccion.cantidades.length
  ) {
    infoCapturada.value.materiales.miscelaneos.seleccion.cantidades.push(1);
    arrayTempMiscelaneos.value.push(valor);
    errores.value.miscelaneo = false;
    if (infoCapturada.value.materiales.ttp.seleccion.elementos.length == 0) {
      errores.value.ttp = false;
    }
  } else {
    errores.value.miscelaneo = errores.value.ttp ? true : false;
    arrayTempMiscelaneos.value.forEach((element, index) => {
      if (valor == element) {
        infoCapturada.value.materiales.miscelaneos.seleccion.cantidades.splice(
          index,
          1
        );
        arrayTempMiscelaneos.value.splice(index, 1);
      }
    });
  }
};
const cambiarValorTtp = (valor) => {
  if (
    infoCapturada.value.materiales.ttp.seleccion.elementos.length >
    infoCapturada.value.materiales.ttp.seleccion.cantidades.length
  ) {
    infoCapturada.value.materiales.ttp.seleccion.cantidades.push(1);
    arrayTempTtp.value.push(valor);
    errores.value.ttp = false;
    if (
      infoCapturada.value.materiales.miscelaneos.seleccion.elementos.length == 0
    ) {
      errores.value.miscelaneo = false;
    }
  } else {
    errores.value.ttp = errores.value.miscelaneo ? true : false;
    arrayTempTtp.value.forEach((element, index) => {
      if (valor == element) {
        infoCapturada.value.materiales.ttp.seleccion.cantidades.splice(
          index,
          1
        );
        arrayTempTtp.value.splice(index, 1);
      }
    });
  }
};
const cambiarValorConceptos = (valor) => {
  if (
    infoCapturada.value.conceptos.descripcion.seleccion.elementos.length >
    infoCapturada.value.conceptos.descripcion.seleccion.cantidades.length
  ) {
    infoCapturada.value.conceptos.descripcion.seleccion.cantidades.push(1);
    arrayTempConceptos.value.push(valor);
  } else {
    arrayTempConceptos.value.forEach((element, index) => {
      if (valor == element) {
        infoCapturada.value.conceptos.descripcion.seleccion.cantidades.splice(
          index,
          1
        );
        arrayTempConceptos.value.splice(index, 1);
      }
    });
  }
};

const agregarCoordenada = () => {
  infoCapturada.value.conceptos.cab24.push("");
};
const corroborarCoordenadas = (index, item) => {
  mostrarErrorCoordenadas.value = false;
  infoCapturada.value.conceptos.errores[index] =
    validacionCoordenadasCab24(item);
  infoCapturada.value.conceptos.errores.forEach((element, index) => {
    if (element) {
      mostrarErrorCoordenadas.value = true;
    }
  });
};
const eliminarCoordenada = (n) => {
  infoCapturada.value.conceptos.cab24.splice(n, 1);
  infoCapturada.value.conceptos.errores.splice(n, 1);
  mostrarErrorCoordenadas.value = false;
  infoCapturada.value.conceptos.errores.forEach((element) => {
    if (element) {
      mostrarErrorCoordenadas.value = true;
    }
  });
  if (infoCapturada.value.conceptos.cab24.length == 0) {
    agregarCoordenada();
  }
};

const openModalConfirmacion = () => {
  modalConfirmacion.value = true;
};
const validaryEnviarInfo = async () => {
  if (
    infoCapturada.value.materiales.miscelaneos.seleccion.elementos.length ==
      0 &&
    infoCapturada.value.materiales.ttp.seleccion.elementos.length > 0 &&
    errores.value.ttp
  ) {
    errores.value.miscelaneo = true;
  }
  if (
    infoCapturada.value.materiales.ttp.seleccion.elementos.length == 0 &&
    infoCapturada.value.materiales.miscelaneos.seleccion.elementos.length > 0 &&
    errores.value.miscelaneo
  ) {
    errores.value.ttp = true;
  }
  if (
    infoCapturada.value.materiales.ttp.seleccion.elementos.length == 0 &&
    infoCapturada.value.materiales.miscelaneos.seleccion.elementos.length == 0
  ) {
    errores.value.ttp = true;
    errores.value.miscelaneo = true;
  }
  if(!fotos.value.despues.file){
    errores.value.fotoDespues = true;
  }else{
    await uploadBytes(refStorage(storage, `imagenes/preventivos/despues/${props.tipoFolio}/${props.folio}`), fotos.value.despues.file)
      .then(async (snapshot) => {
        await update(child(refDB(db), `folios/preventivos/${props.tipoFolio}/${props.folio}/fotos/despues`), {
          nombre: fotos.value.despues.file.name,
        });
      });
  }

  if (
      validacionHorario.value[0] &&
      validacionHorario.value[1] &&
      validacionHorario.value[2]
    ) {
      error.value = false;
    }else{
      error.value = true;
    }

  let calculoBooleano =
    (((errores.value.miscelaneo && errores.value.ttp) && error.value) || 
    errores.value.potencia) || mostrarErrorCoordenadas.value || errores.value.fotoDespues;

  if (calculoBooleano) {
    let cerrado = await closeModalConfirmacion();
    agitar.value = "animate-shake";
    setTimeout(() => {
      agitar.value = "";
    }, 300);
  } else {
    let siguiente = false;
    siguiente = await guardarCierre(props.estado, props.incidencia, props.folio, props.tipoFolio, infoCapturada.value);
    storeVuex.commit('cerrarModalManejoFolio');
    router.push("/capturar-folio");
    limpiarValores();
  }
};

const limpiarValores = () => {
  arrayActiveHora.forEach((value, index) => {
    arrayActiveHora[index] = "";
  });
  arrayActiveMinuto.forEach((value, index) => {
    arrayActiveMinuto[index] = "";
  });
  fecha.value = null;
  hora.value = null;
  minuto.value = null;
  error.value = false;
  rebotar.value = '';
  validacionHorario.value = [false, false, false];

  // --> Limpiar la muestra de justificacion con el commit
  // --> Limpiar la SLA con el commit
  store.commit('limpiarJustificacion');
  store.commit('limpiarSLA');
};
</script>
