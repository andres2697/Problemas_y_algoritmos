<template>
  <div class="h-full w-full">
    <div class="flex w-full flex-col space-y-4">
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
                  Entradas
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
                  Histórico
                </button>
              </Tab>
            </div>
          </TabList>
          <TabPanels class="mt-12">
            <TabPanel class="flex w-full justify-center">
              <div v-if="!data.length" class="min-w-[400px] max-w-[500px]">
                <DropZone
                  #default="{ dropZoneActive }"
                  @files-dropped="readFile"
                >
                  <div
                    :class="[
                      'flex justify-center border-2 border-dashed bg-white p-28',
                      dropZoneActive ? 'bg-gray-50' : '',
                    ]"
                  >
                    <div v-if="dropZoneActive">
                      <div>Suelta</div>
                    </div>
                    <div v-else>
                      <div>Soltar tu .xlsx aquí</div>
                    </div>
                  </div>
                </DropZone>
              </div>
              <div v-else class="h-full w-full">
                <EntradasTable
                  :data="data"
                  @cancelar="data = []"
                  @subir="upload"
                />
              </div>
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import DropZone from "./DropZone.vue";
import readXlsxFile from "read-excel-file";
import { getDatabase, ref as refDB, get, update } from "firebase/database";
import EntradasTable from "./EntradasTable.vue";

const db = getDatabase();
const materialesRef = refDB(db, "/almacen/materiales/totalplay");
const storage = getStorage();
const codigosValidos = ref([]);
const data = ref([]);

onMounted(() => {
  get(materialesRef).then((snapshot) => {
    snapshot.forEach((element) => {
      codigosValidos.value.push({
        codigo: element.val().code,
        descripcion: element.key,
        unidad: element.val().unidad,
      });
    });
  });
});

const schema = {
  CODIGO: {
    prop: "codigo",
    type: String,
    required: true,
  },
  CANTIDAD: {
    prop: "cantidad",
    type: Number,
    required: true,
  },
};
function readFile(newFiles) {
  data.value = [];
  readXlsxFile(newFiles[0], { schema }).then(({ rows, errors }) => {
    if (errors.length) {
      return;
    } else {
      let validarCodigo;
      rows.forEach((item) => {
        validarCodigo = codigosValidos.value.find(
          (it) => it.codigo === item.codigo
        );
        console.log(validarCodigo);
        if (validarCodigo) {
          data.value.push({
            codigo: item.codigo,
            descripcion: validarCodigo.descripcion,
            unidad: validarCodigo.unidad,
            cantidad: item.cantidad,
            error: false,
          });
        } else {
          data.value.push({
            codigo: item.codigo,
            descripcion: "No encontrado",
            unidad: "No encontrado",
            cantidad: item.cantidad,
            error: true,
          });
        }
      });
      console.log(data.value);
    }
  });
}

const files = ref();

function upload(validatedData) {
  validatedData.forEach((material) => {
    get(refDB(db, `almacen/inventario/${material.descripcion}`)).then(
      (snapshot) => {
        update(refDB(db, `almacen/inventario/${material.descripcion}`), {
          entradas: snapshot.val().entradas + material.cantidad,
          stock: snapshot.val().stock + material.cantidad,
        });
      }
    );
  });
}

function addFiles(newFiles) {
  let documentRef = refStorage(
    storage,
    `temporal/entradas/${new Date().getTime()}_${newFiles[0].name}`
  );
  if (
    newFiles[0].type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    files.value = newFiles;
    uploadBytes(documentRef, newFiles[0])
      .then((snapshot) => {
        console.log("Archivo subido correctamente");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Formato incorrecto de archivo");
  }
}
</script>
