import { getDatabase, ref as refDB, get, set, child } from "@firebase/database";

export const validarExistencia = async (folio, tipoFolio, incidencia) => {
  const db = getDatabase();
  let existe = false;
  await get(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`))
    .then((snapshot) => {
      if(snapshot.exists()){
          console.log('ruta existente');
          existe = true;
      }else{
          console.log('ruta no existe');
          existe = false;
      }
    })
    .catch(function (err) {});
    return existe;
};

