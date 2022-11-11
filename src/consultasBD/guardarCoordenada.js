import { getDatabase, ref as refDB, child, update } from "@firebase/database";

export const guardarCoordenadas = async (folio, incidencia, tipoFolio, coordenadas) => {
  const db = getDatabase();

    update(
      child(
        refDB(db),
        `folios/` + (incidencia == 1 ?`preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`
      ),
      {
          coordenada: coordenadas,
      }
    )
    .catch(function (err) {});
};
