import { getDatabase, ref as refDB, get, set, child } from "@firebase/database";

export const obtenerEstadoCreacion = async (folio) => {
  var estado;
  const db = getDatabase();
  await get(child(refDB(db), `folios/correctivos/${folio}/estado`))
    .then((snapshot) => {
      estado = snapshot.exportVal();
    })
    .catch(function (err) {});
  return estado;
};
