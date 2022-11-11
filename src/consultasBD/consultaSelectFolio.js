import { getDatabase, ref as refDB, get, set, child } from "@firebase/database";

export const infoSelectFolio = async (incidencia) => {
  const db = getDatabase();
  let concentradoInfoSelect = {
    tiposFolio: [],
    distritos: [],
    fallas: [],
    causas: [],
    conceptos: [],
    tecnicos: {},
  };
  // let prueba

  let creacion = await get(child(refDB(db), `catalogo`))
    .then((snapshot) => {
      // console.log(snapshot.val());
      snapshot.forEach((element) => {
        switch (element.key) {
          case "tipoFolios":
            element.forEach((elemento) => {
              if (incidencia == 1 && elemento.key == "preventivo") {
                concentradoInfoSelect.tiposFolio.push(elemento.val());
              } else if (incidencia == 2 && elemento.key == "correctivo") {
                concentradoInfoSelect.tiposFolio.push(elemento.val());
              }
            });
            break;
          case "distritos":
            let i = 0;
            element.forEach((elemento) => {
              let llave_supervisores = Object.keys(
                elemento.val()["supervisores"]
              );
              let valor_supervisores = Object.values(
                elemento.val()["supervisores"]
              );

              concentradoInfoSelect.distritos.push({
                distrito: elemento.key,
                clusters: elemento.val()["clusters"],
                supervisores: [],
              });
              // let j = 0;
              llave_supervisores.forEach((llave, index) => {
                concentradoInfoSelect.distritos[i].supervisores[index] = {
                  key: llave,
                  nombre: valor_supervisores[index].nombre,
                };
                // j++;
              });
              i++;
            });
            break;
          case "fallas":
            element.forEach((elemento) => {
              console.log(elemento);
              concentradoInfoSelect.fallas.push(elemento.key);
            });
            break;
          case "causas":
            element.forEach((elemento) => {
              concentradoInfoSelect.causas.push(elemento.key);
            }); 
            break;
          case "conceptos":
            element.forEach((elemento) => {
              concentradoInfoSelect.conceptos.push(elemento.key);
            });
            break;
          case "supervisores":
            element.forEach((supervisor) => {
              // console.log(supervisor.val());
              let objeto = Object.keys(supervisor.val().tecnicos);
              let tecnicos = {};
              objeto.forEach((item) => {
                // console.log(item);
                tecnicos[item] = {
                  nombre: supervisor.val().tecnicos[item].nombre,
                };
              });
              concentradoInfoSelect.tecnicos[supervisor.key] = tecnicos;
              // console.log(concentradoInfoSelect);
            });
            break;
        }
      });
    })
    .catch(function (err) {});

  return concentradoInfoSelect;
};

export const infoCapturadaEditable = async (folio, incidencia, tipoFolio) => {
  const db = getDatabase();
  let concentradoInfoSelect = {
    folio: "",
    tipoFolio: "",
    distrito: "",
    cluster: "",
    supervisor: "",
    llave_supervisor: "",
    tecnico: "",
    llave_tecnico: "",
    olt: "",
    falla: "",
    causa: "",
    clientesAfectados: 1,
  };

  concentradoInfoSelect.folio = folio;
  concentradoInfoSelect.tipoFolio = tipoFolio;
  await get(
    child(
      refDB(db),
      `folios/` +
        (incidencia == 1 ? `preventivos` : `correctivos`) +
        `/${tipoFolio}/${folio}`
    )
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      switch (element.key) {
        case "distrito":
          concentradoInfoSelect.distrito = element.val();
          break;
        case "cluster":
          concentradoInfoSelect.cluster = element.val();
          break;
        case "supervisor":
          concentradoInfoSelect.llave_supervisor = element.val();
          break;
        case "tecnico":
          concentradoInfoSelect.llave_tecnico = element.val();
          break;
        case "falla":
          concentradoInfoSelect.falla = element.val();
          break;
        case "causa":
          concentradoInfoSelect.causa = element.val();
          break;
        case "clientesAfectados":
          concentradoInfoSelect.clientesAfectados = element.val();
          break;
        case "olt":
          concentradoInfoSelect.olt = element.val();
          break;
      }
    });
  });

  await get(
    child(
      refDB(db),
      `catalogo/distritos/${concentradoInfoSelect.distrito}/supervisores/${concentradoInfoSelect.llave_supervisor}`
    )
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      concentradoInfoSelect.supervisor = element.val();
    });
  });

  await get(
    child(refDB(db), `catalogo/tecnicos/${concentradoInfoSelect.llave_tecnico}`)
  ).then((snapshot) => {
    snapshot.forEach((element) => {
      concentradoInfoSelect.tecnico = element.val();
    });
  });
  return concentradoInfoSelect;
};

export const infoCapturadaModal = async (folio, incidencia, tipoFolio) => {
  const db = getDatabase();
  let infoData = new Object();
  await get(
    child(
      refDB(db),
      `folios/` +
        (incidencia === 1 ? `preventivos` : `correctivos`) +
        `/${tipoFolio}/${folio}`
    )
  ).then((snapshot) => {
    snapshot.forEach((dato) => {
      infoData[dato.key] = dato.val();
    });
  });

  infoData["folio"] = folio;
  infoData["tipo"] = tipoFolio;
  return infoData;
};
