import { getDatabase, ref as refDB, child, update } from "@firebase/database";

export const guardarCierre = async (estado, incidencia, folio, tipoFolio, data ) => {
  const db = getDatabase();
  console.log(estado);
  let objetoMaterialesMiscelaneos = {};
  let objetoMaterialesTp = {};
  let objetoConceptos = {};
  let objetoPotencias = {};

  data.materiales.miscelaneos.seleccion.elementos.forEach((element, index) => {
    objetoMaterialesMiscelaneos[element] = {
      cantidad: data.materiales.miscelaneos.seleccion.cantidades[index],
    };
  });
  data.materiales.ttp.seleccion.elementos.forEach((element, index) => {
    objetoMaterialesTp[element] = {
      cantidad: data.materiales.ttp.seleccion.cantidades[index],
    };
  });
  data.conceptos.descripcion.seleccion.elementos.forEach((element, index) => {
    objetoConceptos[element] = {
      cantidad: data.conceptos.descripcion.seleccion.cantidades[index],
    };
  });

  objetoConceptos["CAB-024"] = data.conceptos.cab24[0] == '' ? null : data.conceptos.cab24;
  objetoPotencias = {
    potenciaInicial: data.potenciaInicial,
    potenciaFinal: data.potenciaFinal,
    horaMedicion:
      (data.primeraMedicion.horas == null
        ? "--"
        : data.primeraMedicion.horas < 10
        ? "0" + data.primeraMedicion.horas.toString()
        : data.primeraMedicion.horas.toString()) +
      ":" +
      (data.primeraMedicion.minutos == null
        ? "--"
        : data.primeraMedicion.minutos < 10
        ? "0" + data.primeraMedicion.minutos.toString()
        : data.primeraMedicion.minutos.toString()),
  };

  await update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`), {
    potencias: objetoPotencias,
    conceptos: objetoConceptos,
    materialesUsados: {
      miscelaneos: objetoMaterialesMiscelaneos,
      TP: objetoMaterialesTp,
    },
  }).catch(function (err) {});
  return true;
};
