import { getDatabase, ref as refDB, child, update } from "@firebase/database";

export const eliminarCapturaStep2 = async (folio, tipoFolio, incidencia ) => {
  const db = getDatabase();
  await update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`), {
    horaLlegada: null,
    coordenada: null
  }).catch(function (err) {});
}