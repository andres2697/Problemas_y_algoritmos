import { getDatabase, ref as refDB, child, set, update, get } from "@firebase/database";

export const guardarFolio = async (infoConcentradoFolio, incidencia) => {
  const db = getDatabase();

  await update(
    child(
      refDB(db),
      `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${infoConcentradoFolio.tipoFolio}/${infoConcentradoFolio.folio}`
    ),
    {
        causa: infoConcentradoFolio.causa, 
        cluster: infoConcentradoFolio.cluster, 
        distrito: infoConcentradoFolio.distrito, 
        falla: infoConcentradoFolio.falla, 
        olt: infoConcentradoFolio.olt,
        supervisor: infoConcentradoFolio.llave_supervisor, 
        tecnico: infoConcentradoFolio.llave_tecnico, 
        clientesAfectados: infoConcentradoFolio.clientesAfectados,
        estado: 1
    }
  )
  .catch(function (err) {});

  return infoConcentradoFolio.folio;

};

export const actualizarFolioBD = async (infoConcentradoFolio, incidencia, folioPrevio, tipoFolioPrevio) => {
  const db = getDatabase();

  if(folioPrevio == infoConcentradoFolio.folio){
    update(child(refDB(db), 
        `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${infoConcentradoFolio.tipoFolio}/${infoConcentradoFolio.folio}`), 
        {
          causa: infoConcentradoFolio.causa, 
          cluster: infoConcentradoFolio.cluster, 
          distrito: infoConcentradoFolio.distrito, 
          falla: infoConcentradoFolio.falla, 
          olt: infoConcentradoFolio.olt,
          supervisor: infoConcentradoFolio.llave_supervisor, 
          tecnico: infoConcentradoFolio.llave_tecnico, 
          clientesAfectados: infoConcentradoFolio.clientesAfectados,
        }
    )
    .catch(function (err) {});
  }else{
    await get(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolioPrevio}/${folioPrevio}`))
    .then((snapshot) => {
      // console.log(snapshot);
      update(child(refDB(db), 
        `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${infoConcentradoFolio.tipoFolio}/${infoConcentradoFolio.folio}`), 
        snapshot.val())
        .then(()=>{
          update(
            child(
              refDB(db),
              `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${infoConcentradoFolio.tipoFolio}/${infoConcentradoFolio.folio}`
            ),
            {
                causa: infoConcentradoFolio.causa, 
                cluster: infoConcentradoFolio.cluster, 
                distrito: infoConcentradoFolio.distrito, 
                falla: infoConcentradoFolio.falla, 
                olt: infoConcentradoFolio.olt,
                supervisor: infoConcentradoFolio.llave_supervisor, 
                tecnico: infoConcentradoFolio.llave_tecnico, 
                clientesAfectados: infoConcentradoFolio.clientesAfectados,
            }
          )
          .catch(function (err) {});
        });
    })
    .catch(function (err) {});
  }


  return infoConcentradoFolio.folio;

};

export const eliminarFolioPrevio = async (folioPrevio, incidencia, tipoFolio) => {
  const db = getDatabase();
  
  await set(
    child(
      refDB(db),
      `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folioPrevio}`
    ),
    (null)
  )
  .catch(function (err) {});
}
