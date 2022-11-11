import { getDatabase, ref as refDB, get, set, child } from "@firebase/database";
import { guardarEta, guardarSla } from "./guardarTiempos";

export const concentradoMaterialConcepto = () => {
  const db = getDatabase();
  let concentradoMatConcept = {
    justificaciones: ['Selecciona una justificación'],
    materiales: {
      miscelaneos: [],
      ttp: [],
    },
    conceptos: [],
  };
  let i = 0;
  //----------------------------//
  //-- Consulta de materiales --//
  //----------------------------//

  get(child(refDB(db), `inventario/materiales`))
    .then((snapshot) => {
      snapshot.forEach((element) => {
        switch (element.key) {
          case "TP":
            element.forEach((elemento) => {
              concentradoMatConcept.materiales.ttp.push(elemento.key);
            });
            break;
          case "miscelaneos":
            element.forEach((elemento) => {
              concentradoMatConcept.materiales.miscelaneos.push(elemento.key);
            });
            break;
        }
        //---------------------------//
        //-- Consulta de conceptos --//
        //---------------------------//
        if (i == 0) {
          get(child(refDB(db), `catalogo/conceptos`))
            .then((snapshot) => {
              snapshot.forEach((element) => {
                if (element.val() != "CAB-024") {
                  concentradoMatConcept.conceptos.push(element.key);
                }
              });
              //---------------------------------//
              //-- Consulta de justificaciones --//
              //---------------------------------//
              get(child(refDB(db), `catalogo/justificaciones`))
                .then((snapshot) => {
                  snapshot.forEach((element) => {
                    concentradoMatConcept.justificaciones.push(element.val());
                  });
                })
                .catch(function (err) {});
            })
            .catch(function (err) {});
          i++;
        }
      });
    })
    .catch(function (err) {});
  concentradoMatConcept.conceptos.sort();
  concentradoMatConcept.justificaciones.sort();
  concentradoMatConcept.materiales.miscelaneos.sort();
  concentradoMatConcept.materiales.ttp.sort();
  return concentradoMatConcept;
};

export const calculoEta = async (folio, incidencia, tipoFolio) => {
  const db = getDatabase();
  let calculo = {
    tiempo: "--:--",
    color: ''
  };

 
    let llegada = {};
    let inicio = {};

    llegada = await obtenerHoraLlegada(db, folio, incidencia, tipoFolio);
    inicio = await obtenerHoraInicio(db, folio, incidencia, tipoFolio);

    let diferencia = llegada.newDate.getTime() - inicio.newDate.getTime();
    let minutos = 0;

    while (diferencia >= 60000) {
        minutos = minutos + 1;
        diferencia = diferencia - 60000;
    }
    calculo.tiempo = '00:' + (minutos < 10 ? "0" + minutos.toString() : minutos.toString());
    calculo.color = minutos > 30 ? 'border-red-400' : '';

  guardarEta(folio, calculo.tiempo, incidencia, tipoFolio);
  return calculo;
};

export const calculoSla = async (folio, incidencia, tipoFolio, tiempoMuerto) => {
  const db = getDatabase();

  let calculo = {
    tiempo: "--:--",
    color: ''
  };

  let activacion = {};
  let inicio = {};
  let tolerancia = 0;
  activacion = await obtenerHoraActivacion(db, folio, incidencia, tipoFolio);
  inicio = await obtenerHoraInicio(db, folio, incidencia, tipoFolio);
  tolerancia = await obtenerTolerancia(db, tipoFolio, incidencia);
  let diferencia = ((activacion.newDate.getTime() - (tiempoMuerto * 60000))) - inicio.newDate.getTime();
  let horas = 0;
  let minutos = 0;
  while (diferencia >= 60000) {
    if (diferencia >= 3600000) {
      horas = horas + 1;
      diferencia = diferencia - 3600000;
    } else {
      minutos = minutos + 1;
      diferencia = diferencia - 60000;
    }
  }
  calculo.tiempo =
    (horas < 10 ? "0" + horas.toString() : horas.toString()) +
    ":" +
    (minutos < 10 ? "0" + minutos.toString() : minutos.toString());
/** MODIFICAR LA FORMA DE OBTENCION DEL COLOR DEL BORDE EN calculo.color  **/
    calculo.color = ( horas > 0 || minutos > tolerancia ) ? 'border-red-400' : '';
    guardarSla(folio, calculo.tiempo, incidencia, tipoFolio);
    console.log(calculo.tiempo);
  return calculo;
};

const obtenerHoraLlegada = async (db, folio, incidencia, tipoFolio) => {
  let fLlegada = {};
  await get(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaLlegada`))
    .then((snapshot) => {
      snapshot.forEach((llegada) => {
        if (llegada.key == "fechaSistema") {
          fLlegada.fecha = llegada.exportVal();
        } else if (llegada.key == "hora") {
          fLlegada.hora = llegada.exportVal();
        }
      });
    })
    .catch(function (err) {});
  fLlegada.newDate = new Date(fLlegada.fecha + " " + fLlegada.hora + ":00");
  return fLlegada;
};

const obtenerHoraInicio = async (db, folio, incidencia, tipoFolio) => {
  let fInicio = {};
  await get(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaInicio`))
    .then((snapshot) => {
      snapshot.forEach((inicio) => {
        if (inicio.key == "fechaSistema") {
          fInicio.fecha = inicio.exportVal();
        } else if (inicio.key == "hora") {
          fInicio.hora = inicio.exportVal();
        }
      });
    })
    .catch(function (err) {});
  fInicio.newDate = new Date(fInicio.fecha + " " + fInicio.hora + ":00");
  // console.log(fInicio);
  return fInicio;
};

const obtenerHoraActivacion = async (db, folio, incidencia, tipoFolio) => {
  let fActivacion = {};
  await get(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaActivacion`))
    .then((snapshot) => {
      snapshot.forEach((activacion) => {
        if (activacion.key == "fechaSistema") {
          fActivacion.fecha = activacion.exportVal();
        } else if (activacion.key == "hora") {
          fActivacion.hora = activacion.exportVal();
        }
      });
    })
    .catch(function (err) {});
  fActivacion.newDate = new Date(fActivacion.fecha + " " + fActivacion.hora + ":00");
  // console.log(fActivacion);
  return fActivacion;
};

const obtenerTolerancia = async (db, tipoFolio, incidencia) => {
  let tiempoTolerancia = 0;
  await get(child(refDB(db), `catalogo/tipoFolios/` + (incidencia == 1 ? `preventivo` : `correctivo`) + `/${tipoFolio}`))
    .then((snapshot) => {
      snapshot.forEach((tiempoFolio) => {
        tiempoTolerancia = tiempoFolio.exportVal();
        // console.log(tiempoFolio.val());
      });
    })
    .catch(function (err) {});
  // console.log(tiempoTolerancia);
  return tiempoTolerancia;
};