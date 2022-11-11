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
              class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-xl font-semibold leading-6 text-gray-900"
              >
                Editar material
              </DialogTitle>
              <div class="mt-10">
                <form @submit.prevent="crearMaterial">
                  <div class="mb-6">
                    <label
                      for="name"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Nombre/Descripción</label
                    >
                    <input
                      v-model="formData.name"
                      type="text"
                      id="name"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Nombre del material"
                      required
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="code"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Código</label
                    >
                    <input
                      v-model="formData.code"
                      type="text"
                      id="code"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Código del producto"
                      required
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="tipoMaterial"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Tipo de material</label
                    >
                    <select
                      v-model="formData.tipoMaterial"
                      id="tipoMaterial"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option selected>Selecciona el tipo de material</option>
                      <option v-for="item in tipoMaterialData" :value="item">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-6">
                    <label
                      for="unidadMedida"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Unidad de medida</label
                    >
                    <select
                      v-model="formData.unidadMedida"
                      id="unidadMedida"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                    >
                      <option selected>Selecciona la unidad de medida</option>
                      <option v-for="item in unidadMedidaData" :value="item">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="grid gap-6 md:grid-cols-2">
                    <button
                      @click="emit('closeModal')"
                      type="button"
                      class="w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-primario hover:bg-secundario focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      class="w-full rounded-lg bg-primario px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primario/80 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {
  getDatabase,
  set,
  ref as refDB,
  serverTimestamp,
  get,
  child,
  update,
  remove,
} from "firebase/database";

const props = defineProps(["isOpen", "data"]);
const emit = defineEmits(["closeModal"]);
const db = getDatabase();

const tipoMaterialData = ref([
  { id: "ttp", name: "Totalplay", description: "Material de totalplay" },
  { id: "misc", name: "Miscelaneos", description: "Material miscelaneos" },
]);

const unidadMedidaData = ref([
  { id: "Mts", name: "Metros", description: "" },
  { id: "Km", name: "Kilometros", description: "" },
  { id: "Pz", name: "Pieza", description: "" },
  { id: "Caja", name: "Caja", description: "" },
  { id: "Lt", name: "Litros", description: "" },
  { id: "Ml", name: "Mililitros", description: "" },
]);

const formData = reactive({
  name: null,
  code: null,
  tipoMaterial: "Selecciona el tipo de material",
  unidadMedida: "Selecciona la unidad de medida",
});

watch(
  () => props.data,
  async () => {
    Object.assign(formData, {
      name: props.data.key,
      code: props.data.code,
    });
    await tipoMaterialFunc();
    await unidadMedidaFunc();
  }
);

onMounted(async () => {
  Object.assign(formData, {
    name: props.data.key,
    code: props.data.code,
  });
  await tipoMaterialFunc();
  await unidadMedidaFunc();
});

function tipoMaterialFunc() {
  let indice = tipoMaterialData.value.findIndex(
    (value) => value.name === props.data.tipo
  );
  formData.tipoMaterial = tipoMaterialData.value[indice];
}

function unidadMedidaFunc() {
  let indice = unidadMedidaData.value.findIndex(
    (value) => value.id === props.data.unidad
  );
  formData.unidadMedida = unidadMedidaData.value[indice];
}

const validateSelect = (value) => {
  if (
    value === "Selecciona el tipo de material" ||
    value === "Selecciona la unidad de medida"
  ) {
    return false;
  }
  return true;
};

const rules = computed(() => {
  return {
    name: { required },
    code: { required },
    tipoMaterial: { required, validateSelect },
    unidadMedida: { required, validateSelect },
  };
});

const $v = useVuelidate(rules, formData);

async function crearMaterial() {
  let result = await $v.value.$validate();
  if (!result) {
    return;
  }

  if (formData.name.trim() != props.data.key.trim()) {
    get(
      child(
        refDB(db),
        `inventario/materiales/${props.data.tipo.toLowerCase()}/${
          props.data.key
        }`
      )
    ).then((snapshot) => {
      update(
        refDB(
          db,
          `inventario/materiales/${formData.tipoMaterial.name.toLowerCase()}/${formData.name.trim()}`
        ),
        {
          creado: snapshot.val().creado,
          code: formData.code,
          unidad: formData.unidadMedida.id,
          modificado: serverTimestamp(),
        }
      ).then((snapshotUpdated) => {
        remove(
          refDB(
            db,
            `inventario/materiales/${props.data.tipo.toLowerCase()}/${
              props.data.key
            }`
          )
        );
      });
    });
  } else if (
    formData.name.trim() === props.data.key.trim() &&
    formData.tipoMaterial != props.data.tipo
  ) {
    update(
      refDB(
        db,
        `inventario/materiales/${formData.tipoMaterial.name.toLowerCase()}/${
          props.data.key
        }`
      ),
      {
        code: formData.code,
        unidad: formData.unidadMedida.id,
        modificado: serverTimestamp(),
      }
    ).then((snapshot) => {
      remove(refDB(db, `inventario/materiales/${props.data.tipo.toLowerCase()}/${
          props.data.key
        }`))
    });
  } else {
    update(
      refDB(
        db,
        `inventario/materiales/${formData.tipoMaterial.name.toLowerCase()}/${
          props.data.key
        }`
      ),
      {
        code: formData.code,
        unidad: formData.unidadMedida.id,
        modificado: serverTimestamp(),
      }
    );
  }
  emit("closeModal");
}
</script>
