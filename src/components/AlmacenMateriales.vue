<template>
  <div class="h-full w-full">
    <div class="flex w-full flex-col space-y-4">
      <!-- Titulo | Nuevo material -->
      <div
        class="flex w-full items-center justify-between rounded-xl bg-[#F8FAFB] py-3 px-20 shadow-md"
      >
        <div class="font-semibold">Catálogo de materiales</div>
        <div>
          <button
            @click="isOpenModal = true"
            type="button"
            class="flex items-center space-x-4 rounded-xl bg-primario px-4 py-3 text-white hover:bg-primario/80"
          >
            <PlusCircleIcon class="h-5 w-5" aria-hidden="false" />
            <span>Agregar material</span>
          </button>
        </div>
      </div>
      <!-- Tabla -->
      <div class="min-h-[400px] w-full bg-[#F8FAFB] py-3 px-28 shadow-md">
        <TabGroup>
          <TabList class="border-b-2">
            <div class="flex w-full space-x-4">
              <!-- materiales -->
              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    'px-14 py-2',
                    selected ? 'font-semibold text-primario' : '',
                  ]"
                >
                  TTP
                </button>
              </Tab>
              <!-- inventario -->
              <Tab v-slot="{ selected }">
                <button
                  :class="[
                    'px-14 py-2',
                    selected ? 'font-semibold text-primario' : '',
                  ]"
                >
                  Miscelaneos
                </button>
              </Tab>
            </div>
          </TabList>
          <TabPanels class="mt-12">
            <TabPanel
              ><Suspense
                ><AlmacenMaterialesTable :data="data.totalplay" /></Suspense
            ></TabPanel>
            <TabPanel
              ><Suspense
                ><AlmacenMaterialesTable :data="data.miscelaneos" /></Suspense
            ></TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
    <AlmacenMaterialesAgregar
      :isOpen="isOpenModal"
      @closeModal="isOpenModal = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { PlusCircleIcon } from "@heroicons/vue/outline";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {
  getDatabase,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  query,
  orderByChild,
  ref as refDB,
} from "firebase/database";
import AlmacenMaterialesTable from "./AlmacenMaterialesTable.vue";
import AlmacenMaterialesAgregar from "./AlmacenMaterialesAgregar.vue";

const isOpenModal = ref(false);

const db = getDatabase();

const data = reactive({
  totalplay: [],
  miscelaneos: [],
});

const eliminarMaterialTotalplay = (material) => {
  let index = data.totalplay.findIndex((element, index) => {
    if (element.key === material.key) {
      return true;
    }
  });
  data.totalplay.splice(index, 1);
  //   re-ordenar arreglo
  data.totalplay = data.totalplay.sort(function (a, b) {
    let fecha1 = new Date(a.creado);
    let fecha2 = new Date(b.creado);
    if (fecha1 > fecha2) return 1;
    if (fecha1 < fecha2) return -1;
    return 0;
  });
};

const eliminarMaterialMiscelaneo = (material) => {
  let index = data.miscelaneos.findIndex((element, index) => {
    if (element.key === material.key) {
      return true;
    }
  });
  data.miscelaneos.splice(index, 1);
  //   re-ordenear arreglo
  data.miscelaneos = data.miscelaneos.sort(function (a, b) {
    let fecha1 = new Date(a.creado);
    let fecha2 = new Date(b.creado);
    if (fecha1 > fecha2) return 1;
    if (fecha1 < fecha2) return -1;
    return 0;
  });
};

const updateTotalplay = (material) => {
  let index = data.totalplay.findIndex((element, index) => {
    if (element.key === material.key) {
      return true;
    }
  });
  data.totalplay[index] = {
    key: material.key,
    code: material.val().code,
    unidad: material.val().unidad,
    tipo: "Totalplay",
    creado: material.val().creado,
  };
};

const updateMiscelaneos = (material) => {
  let index = data.miscelaneos.findIndex((element, index) => {
    if (element.key === material.key) {
      return true;
    }
  });
  data.miscelaneos[index] = {
    key: material.key,
    code: material.val().code,
    unidad: material.val().unidad,
    tipo: "Miscelaneos",
    creado: material.val().creado,
  };
};

// Obtener/Escuchar si se agregan materiales de totalplay
await onChildAdded(
  query(refDB(db, `almacen/materiales/totalplay`), orderByChild("creado")),
  (snapshot) => {
    data.totalplay.push({
      key: snapshot.key,
      code: snapshot.val().code,
      unidad: snapshot.val().unidad,
      tipo: "Totalplay",
      creado: snapshot.val().creado,
    });
  }
);

// Obtener/Escuchar si se agregan materiales miscelaneos
await onChildAdded(
  query(refDB(db, `almacen/materiales/miscelaneos`), orderByChild("creado")),
  (snapshot) => {
    data.miscelaneos.push({
      key: snapshot.key,
      code: snapshot.val().code,
      unidad: snapshot.val().unidad,
      tipo: "Miscelaneos",
      creado: snapshot.val().creado,
    });
  }
);

// Escuchar si se eliminar o se editan materiales
await onChildRemoved(
  refDB(db, `almacen/materiales/totalplay`),
  (snapshot) => {
    const data = snapshot;
    eliminarMaterialTotalplay(data);
  }
);

// Escuchar si se eliminar o se editan materiales
await onChildRemoved(
  refDB(db, `almacen/materiales/miscelaneos`),
  (snapshot) => {
    const data = snapshot;
    eliminarMaterialMiscelaneo(data);
  }
);

onChildChanged(refDB(db, `almacen/materiales/totalplay`), (snapshot) => {
  const data = snapshot;
  updateTotalplay(data);
});

onChildChanged(refDB(db, `almacen/materiales/miscelaneos`), (snapshot) => {
  const data = snapshot;
  updateMiscelaneos(data);
});
</script>
