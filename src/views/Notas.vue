<template>
  <div class="flex w-full">
    <div class="flex w-[90%] select-none flex-col space-y-3">
      <div
        class="mt-12 mb-4 flex w-[100%] cursor-pointer items-center"
        @click="abrirModalNotas(null)"
      >
        <div class="flex w-[80%]">
          <span class="text-sm">Notas de seguimiento</span>
        </div>
        <div class="flex w-[20%] justify-end">
          <PlusCircleIcon class="h-5 w-5"></PlusCircleIcon>
        </div>
      </div>
      <div class="max-h-48 w-full space-y-2 overflow-y-auto">
        <div
          v-for="(nota, index) in notas"
          class="flex h-10 w-[95%] cursor-pointer"
          @click="abrirModalNotas(nota.llave)"
        >
          <div
            class="flex h-full w-[10%] rounded-l-md px-3"
            :class="nota.color_lateral"
          ></div>
          <div
            class="flex h-full w-[90%] items-center rounded-r-md"
            :class="nota.color"
          >
            <span
              class="max-w-[100%] truncate pl-2 pr-4 text-sm"
              :title="nota.texto"
            >
              {{ nota.texto }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <TransitionRoot appear :show="modalNotas" as="template" class="z-50">
      <Dialog as="div" @close="closeModal" class="relative z-40">
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
                  class="mb-5 flex items-center py-3 text-lg font-medium leading-6"
                  :class="color.color"
                >
                  <div class="flex w-[100%] justify-end pr-2">
                    <XCircleIcon
                      @click="closeModal"
                      class="h-5 w-5 cursor-pointer"
                    />
                  </div>
                </DialogTitle>
                <div class="mx-10 flex select-none flex-col">
                  <div class="flex w-full flex-col">
                    <span class="font-semibold">Nota de seguimiento</span>
                  </div>
                  <div class="flex flex-col">
                    <div
                      class="mt-2 flex h-0.5 w-full"
                      :class="color.lateral"
                    ></div>
                    <div class="mt-5 flex w-[100%] self-start text-center">
                      <textarea
                        class="max-h-36 min-h-[80px] w-full border-none ring-transparent focus:border-transparent focus:ring-transparent"
                        v-model="mensaje"
                        placeholder="Ingresar nota"
                      ></textarea>
                    </div>
                    <div class="flex w-full">
                      <Popover v-slot="{ open }" class="relative">
                        <PopoverButton
                          class="group inline-flex items-center rounded-md bg-slate-200 px-3 py-2 font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          <div
                            class="flex h-4 w-4 rounded-full"
                            :class="color.lateral"
                          ></div>
                          <ChevronDownIcon
                            class="ml-1 h-5 w-5 fill-white stroke-white stroke-1 transition duration-150 ease-in-out"
                            aria-hidden="true"
                          />
                        </PopoverButton>
                        <PopoverPanel
                          class="absolute left-1/4 z-50 mt-2 ml-2 w-40 -translate-x-1/4 transform sm:px-0 lg:max-w-3xl"
                        >
                          <div
                            class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                          >
                            <div
                              class="relative flex justify-around bg-white p-2"
                            >
                              <div
                                v-for="custom_color in opciones_color"
                                class="flex h-5 w-5 cursor-pointer rounded-sm"
                                :class="custom_color.lateral"
                                @click="
                                  cambiarColor(
                                    custom_color.lateral,
                                    custom_color.color
                                  )
                                "
                              ></div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </div>
                  <div class="mt-8 flex justify-around">
                    <div
                      class="flex w-[100%] items-center justify-end space-x-10"
                    >
                      <TrashIcon
                        v-if="!creacion"
                        class="h-6 w-6 cursor-pointer"
                        @click="eliminarNota()"
                      ></TrashIcon>
                      <button
                        type="button"
                        class="flex justify-center rounded-md border-2 border-[#E5E5E5] px-4 py-2 text-sm font-medium text-black hover:border-transparent hover:bg-[#E9F0FC] hover:text-[#2166E5] focus-visible:ring-blue-500"
                        @click="
                          agregarNota(mensaje, color.color, color.lateral)
                        "
                      >
                        Guardar
                      </button>
                    </div>
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  guardarNuevaNota,
  actualizarNota,
  eliminarNotaBD,
} from "@/consultasBD/administrarNotas.js";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { PlusCircleIcon, XCircleIcon, TrashIcon } from "@heroicons/vue/outline";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";

const props = defineProps(["folio", "incidencia", "tipoFolio"]);
const notas = ref([]);
const modalNotas = ref(false);
const creacion = ref(true);
const mensaje = ref("");
const color = ref({ lateral: "bg-gray-400", color: "bg-gray-100" });
const opciones_color = ref([
  { lateral: "bg-red-400", color: "bg-red-100" },
  { lateral: "bg-blue-400", color: "bg-blue-100" },
  { lateral: "bg-green-400", color: "bg-green-100" },
  { lateral: "bg-fuchsia-400", color: "bg-fuchsia-100" },
  { lateral: "bg-gray-400", color: "bg-gray-100" },
]);
const numero_de_nota = ref(null);

const agregarNota = async (msg, color_nuevo, lateral_nuevo) => {
  modalNotas.value = false;
  if (msg != "") {
    if (numero_de_nota.value == null) {
      let llave = await guardarNuevaNota(
        props.folio,
        props.incidencia,
        props.tipoFolio,
        msg,
        lateral_nuevo,
        color_nuevo
      );
      notas.value.push({
        llave: llave,
        texto: msg,
        color_lateral: lateral_nuevo,
        color: color_nuevo,
      });
    } else {
      notas.value.forEach((nota) => {
        if (nota.llave == numero_de_nota.value) {
          nota.texto = msg;
          nota.color = color_nuevo;
          nota.color_lateral = lateral_nuevo;
        }
      });
      console.log(notas.value);
      await actualizarNota(
        props.folio,
        props.incidencia,
        props.tipoFolio,
        msg,
        lateral_nuevo,
        color_nuevo,
        numero_de_nota.value
      );
    }
  }
  color.value.color = "bg-gray-100";
  color.value.lateral = "bg-gray-400";
  mensaje.value = "";
};
const eliminarNota = () => {
  if (numero_de_nota.value != null) {
    let index_nota = notas.value.findIndex(
      (nota) => nota.llave == numero_de_nota.value
    );
    // console.log(index_nota);
    notas.value.splice(index_nota, 1);
    color.value.color = "bg-gray-100";
    color.value.lateral = "bg-gray-400";
    mensaje.value = "";
    eliminarNotaBD(props.folio, 2, props.tipoFolio, numero_de_nota.value);
  }
  closeModal();
};
const cambiarColor = (lateral_nuevo, color_nuevo) => {
  color.value.color = color_nuevo;
  color.value.lateral = lateral_nuevo;
};
const abrirModalNotas = (indice) => {
  if (indice == null) {
    creacion.value = true;
    numero_de_nota.value = null;
    color.value.color = "bg-gray-100";
    color.value.lateral = "bg-gray-400";
    mensaje.value = "";
  } else {
    creacion.value = false;
    let valores_nota = notas.value.filter((nota) => nota.llave == indice);
    mensaje.value = valores_nota[0].texto;
    color.value.lateral = valores_nota[0].color_lateral;
    color.value.color = valores_nota[0].color;
    numero_de_nota.value = indice;
  }
  modalNotas.value = true;
};
function closeModal() {
  modalNotas.value = false;
}
</script>