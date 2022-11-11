<template>
  <div id="divToPrint">
    <section class="container" v-show="false">
      <h1>Hola mundo PDF</h1>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, reactive } from "vue";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";

const props = defineProps(["generarPDF"]);
const images = reactive({
  ios: null,
  totalplay: null,
});
watch(
  () => props.generarPDF,
  async () => {
    const pdfTable = document.getElementById("divToPrint");
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = {
      header: {
        columns: [
          {
            image: images.ios,
            width: 80,
            margin: [10, 0, 0, 50],
          },
          {
            text: "ACUSE ENTREGA DE MATERIAL",
            fontSize: 20,
            alignment: "center",
            margin: [0, 10, 0, 0],
          },
          {
            image: images.totalplay,
            width: 150,
            margin: [0, 0, 50, 0],
          },
        ],
        columnGap: 10,
      },
      content: [
        {
          text: "Hola Mundo",
          fontSize: 15,
          margin: [0, 60, 0, 0],
        },
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "auto", 100, "*"],

            body: [
              ["CODIGO", "DESCRIPCIÓN", "MEDIDA", "CANTIDAD"],
              ["Value 1", "Value 2", "Value 3", "Value 4"],
              [{ text: "Bold value", bold: true }, "Val 2", "Val 3", "Val 4"],
            ],
          },
        },
      ],
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  }
);

onMounted(async () => {
  images.ios = await getBase64ImageFromURL("/img/logo_ios.png");
  images.totalplay = await getBase64ImageFromURL("/img/logo_totalplay.png");
  console.log(images);
});

function getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
}
</script>

<style>
.container {
}
</style>
