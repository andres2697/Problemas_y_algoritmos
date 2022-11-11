<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="emit('closeModal')" class="relative z-10">
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
                  as="h3"
                  class="text-xl font-semibold leading-6 text-gray-900"
                >
                  Editar nombre
                </DialogTitle>
                <div class="mt-4 flex flex-col space-y-6">
                  <div class="flex basis-[20%] flex-col">
                    <label class="text-base" for="name">Actual</label>
                    <p class="font-semibold">{{ props.data.nombre }}</p>
                  </div>
                  <div class="flex basis-[20%] flex-col">
                    <label class="text-base" for="name">Nuevo</label>
                    <input
                      v-model="newName"
                      class="rounded-xl border-none border-[#C4C4C4] bg-[#F2F2F2] font-semibold placeholder:font-normal focus:ring-0"
                      type="text"
                      id="name"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    class="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="actualizar()"
                  >
                    Guardar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/vue";
  import {
    getDatabase,
    ref as refDB,
    update,
    get,
    child,
    remove,
  } from "firebase/database";
  
  const db = getDatabase();
  const props = defineProps(["isOpen", "data"]);
  const emit = defineEmits(["closeModal"]);
  const newName = ref(props.data.nombre);
  
  const actualizar = () => {
    console.log(props.data);
    if (newName) {
      get(
        child(
          refDB(db),
          `catalogo/fallas/${props.data.nombre}`
        )
      ).then((snapshot) => {
        update(
          refDB(db, `catalogo/fallas/${newName.value}`), snapshot.val())
              .then((snapshot) => {
                  remove(refDB(db, `catalogo/fallas/${props.data.nombre}`));
                  emit("closeModal");
              });
      });
    }
  };
  </script>
  