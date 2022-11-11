<template>
  <div>
    <TransitionRoot
      appear
      :show="$store.state.a.modalEdicionFolioCorrectivo"
      as="template"
      class="z-50"
    >
      <Dialog as="div" @close="closeModal" class="relative z-[300]">
        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
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
                class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="div"
                  class="mb-5 flex items-center text-lg font-medium leading-6 text-gray-900"
                >
                  <div class="flex w-[80%] text-2xl font-bold">
                    <h3 v-if="props.incidencia == 1">Folio Preventivo</h3>
                    <h3 v-if="props.incidencia == 2">Folio Correctivo</h3>
                  </div>
                  <div class="flex w-[20%] justify-end">
                    <XCircleIcon
                      @click="closeModal"
                      class="h-6 w-6 cursor-pointer"
                    />
                  </div>
                </DialogTitle>
                <Suspense>
                  <div class="flex w-[100%] flex-col items-center justify-center">
                    <div class="my-2 flex w-[100%] items-center justify-center">
                      <div
                        class="flex w-2/3 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Ingresar folio
                          <input
                            v-model="infoFolioCaptuado.folio"
                            @blur="validaciones(0)"
                            @focus="ocultarError(0)"
                            :placeholder="holder"
                            class="mt-1 h-10 w-[95%] rounded-lg border-2 border-[#E5E5E5] bg-white text-black"
                            :class="[errores.folio != '' ? 'border-red-400' : '']"
                            type="text"
                            name="folio"
                            id="folio"
                          />
                        <Transition
                            leave-active-class="transition duration-200 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                            enter-active-class="transition duration-200 ease-in"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                        >
                          <span v-if="errores.folio != ''" class="text-red-400">
                          {{ errores.folio }}</span>
                        </Transition>
                      </div>
                      <div
                        class="flex w-1/3 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Tipo
                        <div class="flex w-[100%]">
                          <Listbox v-model="infoFolioCaptuado.tipoFolio">
                            <div class="relative mt-1 w-full">
                              <ListboxButton
                                class="relative w-full rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left cursor-pointer text-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                              >
                                <span class="block truncate">{{
                                  infoFolioCaptuado.tipoFolio
                                }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <SelectorIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxButton>
  
                              <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                              >
                                <ListboxOptions
                                  class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  <ListboxOption
                                    v-slot="{ active, selected }"
                                    v-for="element in Object.keys(
                                      datosSelect.tiposFolio[0]
                                    )"
                                    :key="element"
                                    :value="element"
                                    as="template"
                                  >
                                    <li
                                      @click="validacionTipoFolio(element)"
                                      :class="[
                                        active
                                          ? 'bg-[#E9F0FC] text-black'
                                          : 'text-black',
                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                      ]"
                                    >
                                      <span
                                        :class="[
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                          'block truncate',
                                        ]"
                                        >{{ element }}</span
                                      >
                                      <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                                      >
                                        <CheckIcon
                                          class="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4 flex w-[100%] items-center justify-between">
                      <div
                        class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Distrito
                        <div class="flex w-[100%]">
                          <Listbox v-model="infoFolioCaptuado.distrito">
                            <div class="relative mt-1 w-full">
                              <ListboxButton
                                class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                              >
                                <span class="block truncate">{{
                                  infoFolioCaptuado.distrito
                                }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <SelectorIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxButton>
  
                              <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                              >
                                <ListboxOptions
                                  class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  <ListboxOption
                                    v-slot="{ active, selected }"
                                    v-for="element in datosSelect.distritos"
                                    :key="element.distrito"
                                    :value="element.distrito"
                                    as="template"
                                  >
                                    <li
                                      class="hover:cursor-pointer"
                                      :class="[
                                        active
                                          ? 'bg-[#E9F0FC] text-black'
                                          : 'text-black',
                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                      ]"
                                    >
                                      <span
                                        :class="[
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                          'block truncate',
                                        ]"
                                        >{{ element.distrito }}</span
                                      >
                                      <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                                      >
                                        <CheckIcon
                                          class="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                      <div
                        class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Cluster
                        <div class="flex w-[100%]">
                          <Listbox v-model="infoFolioCaptuado.cluster">
                            <div class="relative mt-1 w-full">
                              <ListboxButton
                                :disabled="
                                  infoFolioCaptuado.distrito ==
                                  'Selecciona un distrito'
                                    ? true
                                    : false
                                "
                                class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-black/50 sm:text-sm"
                              >
                                <span class="block truncate">{{
                                  infoFolioCaptuado.cluster
                                }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <SelectorIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxButton>
  
                              <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                              >
                                <ListboxOptions
                                  class="absolute z-20 mt-1 max-h-40 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  <ListboxOption
                                    v-slot="{ active, selected }"
                                    v-for="element in clusters"
                                    :key="element"
                                    :value="element"
                                    as="template"
                                  >
                                    <li
                                      class="hover:cursor-pointer"
                                      :class="[
                                        active
                                          ? 'bg-[#E9F0FC] text-black'
                                          : 'text-black',
                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                      ]"
                                    >
                                      <span
                                        :class="[
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                          'block truncate',
                                        ]"
                                        >{{ element }}</span
                                      >
                                      <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                                      >
                                        <CheckIcon
                                          class="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4 flex w-[100%] items-center justify-between">
                      <div
                        class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Supervisor
                        <div class="flex w-[100%]">
                          <Listbox v-model="infoFolioCaptuado.supervisor">
                            <div class="relative mt-1 w-full">
                              <ListboxButton
                                class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-black/50 sm:text-sm"
                              >
                                <span class="block truncate">{{
                                  infoFolioCaptuado.supervisor
                                }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <SelectorIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxButton>
  
                              <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                              >
                                <ListboxOptions
                                  class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  <ListboxOption
                                    v-slot="{ active, selected }"
                                    v-for="(supervisor, key) in supervisores"
                                    :key="supervisor.key"
                                    :value="supervisor.nombre"
                                    as="template"
                                  >
                                    <li
                                      @click="llenarLlaveSupervisor(supervisor.key)"
                                      class="hover:cursor-pointer"
                                      :class="[
                                        active
                                          ? 'bg-[#E9F0FC] text-black'
                                          : 'text-black',
                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                      ]"
                                    >
                                      <span
                                        :class="[
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                          'block truncate',
                                        ]"
                                        >{{ supervisor.nombre }}</span
                                      >
                                      <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                                      >
                                        <CheckIcon
                                          class="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                      <div
                        class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Técnico
                        <div class="flex w-[100%]">
                          <Listbox v-model="infoFolioCaptuado.tecnico">
                            <div class="relative mt-1 w-full">
                              <ListboxButton
                                :disabled="
                                  infoFolioCaptuado.supervisor ==
                                  'Selecciona un supervisor'
                                    ? true
                                    : false
                                "
                                class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-black/50 sm:text-sm"
                              >
                                <span class="block truncate">{{
                                  infoFolioCaptuado.tecnico
                                }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <SelectorIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxButton>
  
                              <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                              >
                                <ListboxOptions
                                  class="absolute z-20 mt-1 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  <ListboxOption
                                    v-slot="{ active, selected }"
                                    v-for="(tecnico, key) in tecnicos"
                                    :key="tecnico.llave"
                                    :value="tecnico.nombre"
                                    as="template"
                                  >
                                    <li
                                      @click="llenarLlaveTecnico(tecnico.llave)"
                                      class="hover:cursor-pointer"
                                      :class="[
                                        active
                                          ? 'bg-[#E9F0FC] text-black'
                                          : 'text-black',
                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                      ]"
                                    >
                                      <span
                                        :class="[
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                          'block truncate',
                                        ]"
                                        >{{ tecnico.nombre }}</span
                                      >
                                      <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                                      >
                                        <CheckIcon
                                          class="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4 flex w-[80%] items-center self-start">
                      <div
                        class="mr-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Ingresar OLT
                        <input
                          v-model="infoFolioCaptuado.olt"
                          @blur="validaciones(1)"
                          @focus="ocultarError(1)"
                          :placeholder="holder"
                          class="mt-1 h-10 w-[100%] rounded-lg border-2 border-[#E5E5E5] text-black"
                          :class="[errores.olt != '' ? 'border-red-400' : '']"
                          type="text"
                          name="folio"
                          id="folio"
                        />
                        <Transition
                          leave-active-class="transition duration-200 ease-in"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                          enter-active-class="transition duration-200 ease-in"
                          enter-from-class="opacity-0"
                          enter-to-class="opacity-100"
                        >
                          <span v-if="errores.olt != ''" class="text-red-400">
                          {{ errores.olt }}</span>
                        </Transition>
                      </div>
                      <div
                        class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Falla
                        <div class="flex w-[100%]">
                          <Listbox v-model="infoFolioCaptuado.falla">
                            <div class="relative mt-1 w-full">
                              <ListboxButton
                                class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                              >
                                <span class="block truncate">{{
                                  infoFolioCaptuado.falla
                                }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <SelectorIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxButton>
  
                              <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                              >
                                <ListboxOptions
                                  class="absolute z-20 max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  <ListboxOption
                                    v-slot="{ active, selected }"
                                    v-for="element in datosSelect.fallas[0]"
                                    :key="element"
                                    :value="element"
                                    as="template"
                                  >
                                    <li
                                      class="hover:cursor-pointer"
                                      :class="[
                                        active
                                          ? 'bg-[#E9F0FC] text-black'
                                          : 'text-black',
                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                      ]"
                                    >
                                      <span
                                        :class="[
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                          'block truncate',
                                        ]"
                                        >{{ element }}</span
                                      >
                                      <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                                      >
                                        <CheckIcon
                                          class="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                    </div>
                    <div class="mb-4 flex w-[80%] items-center self-start">
                      <div
                        class="mr-1.5 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Causa
                        <div class="flex w-[100%]">
                          <Listbox v-model="infoFolioCaptuado.causa">
                            <div class="relative mt-1 w-full">
                              <ListboxButton
                                class="relative w-full cursor-default rounded-lg border-2 border-[#E5E5E5] bg-white py-2 pl-3 pr-10 text-left text-black hover:cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                              >
                                <span class="block truncate">{{
                                  infoFolioCaptuado.causa
                                }}</span>
                                <span
                                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                >
                                  <SelectorIcon
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              </ListboxButton>
  
                              <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                              >
                                <ListboxOptions
                                  class="absolute z-20 -mt-[205px] max-h-40 w-[100%] overflow-auto rounded-md bg-white py-1 text-base shadow-customized ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  <ListboxOption
                                    v-slot="{ active, selected }"
                                    v-for="element in datosSelect.causas[0]"
                                    :key="element"
                                    :value="element"
                                    as="template"
                                  >
                                    <li
                                      class="hover:cursor-pointer"
                                      :class="[
                                        active
                                          ? 'bg-[#E9F0FC] text-black'
                                          : 'text-black',
                                        'relative cursor-default select-none py-2 pl-10 pr-4',
                                      ]"
                                    >
                                      <span
                                        :class="[
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal',
                                          'block truncate',
                                        ]"
                                        >{{ element }}</span
                                      >
                                      <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-black"
                                      >
                                        <CheckIcon
                                          class="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                      <div
                        class="ml-2 flex w-1/2 flex-col text-xs font-normal text-[#C4C4C4]"
                      >
                        Clientes afectados
                        <input
                          v-model="infoFolioCaptuado.clientesAfectados"
                          @blur="
                            actualizarClientesAfectados(
                              infoFolioCaptuado.clientesAfectados
                            )
                          "
                          class="mt-1 h-10 w-[100%] rounded-lg border-2 border-[#E5E5E5] text-black"
                          type="number"
                          name="folio"
                          id="folio"
                          min="0"
                          max="9999"
                        />
                      </div>
                    </div>
                  </div>
                </Suspense>
                <div class="mt-4 flex justify-around">
                  <div class="flex w-1/2 justify-center">
                    <button
                      type="button"
                      class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                      @click="closeModal"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div class="flex w-1/2 justify-center">
                    <button
                      v-if="
                        mostrarBoton[0] &&
                        infoFolioCaptuado.distrito !=
                          'Selecciona un distrito' &&
                        infoFolioCaptuado.cluster != 'Selecciona un cluster' &&
                        infoFolioCaptuado.supervisor !=
                          'Selecciona un supervisor' &&
                        infoFolioCaptuado.tecnico != 'Selecciona un técnico' &&
                        mostrarBoton[1] &&
                        infoFolioCaptuado.falla != 'Selecciona una falla' &&
                        infoFolioCaptuado.causa != 'Selecciona una causa'
                      "
                      type="button"
                      class="flex justify-center rounded-md border border-transparent bg-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                      @click="actualizarFolio()"
                    >
                      Actualizar
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
</template>

<script setup>
import { ref, watch } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { XCircleIcon } from "@heroicons/vue/outline";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { infoSelectFolio, infoCapturadaEditable } from "@/consultasBD/consultaSelectFolio.js";
import {
  validacionFolio,
  validacionOLT,
} from "@/validaciones/modalCorrectivo.js";

import { guardarFolio, actualizarFolioBD } from '@/consultasBD/guardarFolio.js'

const i = ref(0);
const router = useRouter();
const store = useStore();
const props = defineProps(["folio", "incidencia", "tipoFolio"]);
const emit = defineEmits(['actualizarFolio']);
// Funcion para llenar la info que fue capturada en
// la base de datos 
const infoFolioCaptuado = ref(await infoCapturadaEditable(props.folio, props.incidencia, props.tipoFolio));
const folioPrevio = ref(props.folio);
const tipoFolioPrevio = ref(props.tipoFolio);
const olt = ref(infoFolioCaptuado.value.olt);
// Función de consulta a la base de datos para
// obtener información para la captura de folios
const datosSelect = ref(await infoSelectFolio(props.incidencia));
const holder = ref("000");
const mostrarBoton = ref([true, true]);
const errores = ref({ folio: "", olt: "" });

const llenarSupervisores = async () => {
  let temp_supervisores = [];
  datosSelect.value.distritos.forEach((distritos) => {
    if (distritos.distrito == infoFolioCaptuado.value.distrito) {
        distritos.supervisores.forEach((supervisor)=>{
          temp_supervisores.push({key: supervisor.key, nombre: supervisor.nombre});
        });
    }
  });
  return temp_supervisores;
};

const llenarTecnicos = async () => {
  let temp_tecnicos = [];
  Object.entries(datosSelect.value.tecnicos).forEach(([key, tecnicosArray]) => {
      if(key == infoFolioCaptuado.value.llave_supervisor){
        Object.entries(tecnicosArray).forEach(([key, tecnico]) => {
          temp_tecnicos.push({llave: key, nombre: tecnico})
        });
      }
    });
  return temp_tecnicos;
};

const llenarClusters = async () => {
  let temp_clusters = [];
  datosSelect.value.distritos.forEach((element) => {
    if (element.distrito == infoFolioCaptuado.value.distrito) {
      element.clusters.forEach((elemento) => {
        temp_clusters.push(elemento);
      });
    }
  });
  temp_clusters.sort();
  return temp_clusters;
};

const clusters = ref(await llenarClusters());
const supervisores = ref(await llenarSupervisores());
const tecnicos = ref(await llenarTecnicos());

watch(
  () => infoFolioCaptuado.value.distrito,
  () => {
    clusters.value = [];
    infoFolioCaptuado.value.cluster = "Selecciona un cluster";
    supervisores.value = [];
    infoFolioCaptuado.value.supervisor = "Selecciona un supervisor";
    llenarClusters().then((respuesta)=>{
      clusters.value = respuesta;
    });
    llenarSupervisores().then((respuesta)=>{
      supervisores.value = respuesta;
    });
  }
);

watch(
  () => infoFolioCaptuado.value.supervisor,
  () => {
    tecnicos.value = [];
    infoFolioCaptuado.value.tecnico = "Selecciona un técnico";
    llenarTecnicos().then((respuesta)=>{
      tecnicos.value = respuesta;
    });
  }
);

watch(
  () => infoFolioCaptuado.value.tipoFolio,
  () => {
    validaciones(0);
  }
);

const cambiarCorrectivo = () => {
  router.push("/correctivo");
};
function closeModal() {
  store.commit("cerrarModalEdicionCorrectivo");
}
const actualizarClientesAfectados = (clientesAfectados) => {
  if (
    clientesAfectados == "" ||
    clientesAfectados == null ||
    clientesAfectados < 0
  ) {
    infoFolioCaptuado.value.clientesAfectados = 1;
  }
};
const llenarLlaveSupervisor = (llave) => {
  infoFolioCaptuado.value.llave_supervisor = llave;
}
const llenarLlaveTecnico = (llave) => {
  infoFolioCaptuado.value.llave_tecnico = llave;
}
const validaciones = async (validacion, seleccion) => {
  let respuesta = false;
  switch (validacion) {
    case 0:
      errores.value.folio = "";
      if(infoFolioCaptuado.value.folio != props.folio){
        if(infoFolioCaptuado.value.folio == ''){
          infoFolioCaptuado.value.folio = props.folio;
        }else{
          errores.value.folio = await validacionFolio(
            infoFolioCaptuado.value.folio,
            infoFolioCaptuado.value.tipoFolio,
            props.incidencia
          );
        }
      }

      if (errores.value.folio == "") {
        mostrarBoton.value[0] = true;
      } else if (errores.value.folio == "Folio existente, favor de verificar" && infoFolioCaptuado.value.folio == props.folio){
          errores.value.folio = '';
          mostrarBoton.value[0] = true;
      } else {
        mostrarBoton.value[0] = false;
      }
      break;
    case 1:
      errores.value.olt = "";
      if(infoFolioCaptuado.value.olt == ''){
        infoFolioCaptuado.value.olt = olt.value;
      }else{
        errores.value.olt = validacionOLT(infoFolioCaptuado.value.olt);
      }
      if (errores.value.olt == "") {
        mostrarBoton.value[1] = true;
      } else if (errores.value.folio == "Folio existente, favor de verificar" && infoFolioCaptuado.value.folio == props.folio){
          errores.value.folio = '';
          mostrarBoton.value[1] = true;
      }else{
        mostrarBoton.value[1] = false;
      }
      break;
  }
};

const validacionTipoFolio = async (tipoFolio) => {
  errores.value.folio = "";
  infoFolioCaptuado.value.tipoFolio = tipoFolio;
  errores.value.folio = await validacionFolio(
    infoFolioCaptuado.value.folio,
    infoFolioCaptuado.value.tipoFolio,
    props.incidencia
  );

  if (errores.value.folio == "") {
    mostrarBoton.value[0] = true;
  } else if (errores.value.folio == "Folio existente, favor de verificar" && 
            infoFolioCaptuado.value.tipoFolio == tipoFolioPrevio.value){
    errores.value.folio = "";
    mostrarBoton.value[0] = true;
  }else{
    mostrarBoton.value[0] = false;
  }
};

const ocultarError = (numError) => {
  if (numError == 0) {
    errores.value.folio = '';
  } else {
    errores.value.olt = '';
  }
};
const actualizarFolio = async () => {
  // let llave;
  // await eliminarFolioPrevio(props.folio, props.incidencia, props.tipoFolio);
  // llave = await actualizarFolioBD(infoFolioCaptuado.value, props.incidencia);
  // await infoCapturadaEditable(props.folio, props.incidencia, props.tipoFolio)

  store.commit("cerrarModalEdicionCorrectivo");
  let response = await limpiarValores();

  emit('actualizarFolio', [infoFolioCaptuado.value]);
};
const limpiarValores = async() => {
  errores.value.olt = '';
  errores.value.folio = '';
  mostrarBoton.value[0] = true;
  mostrarBoton.value[1] = true;
  return 'ok;'
}
</script>
