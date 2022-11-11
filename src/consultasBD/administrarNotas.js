import { getDatabase, ref as refDB, child, update, set, push, remove } from "@firebase/database";

export const guardarNuevaNota = async (folio, incidencia, tipoFolio,  msg, color_lateral, color_nuevo) => {
  const db = getDatabase();
  const notasRef = refDB(db, `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/notas`);
  const nuevaNotaRef = push(notasRef);

    update(nuevaNotaRef, {
      texto: msg,
      color: color_nuevo,
      colorLateral: color_lateral,
    })
    return nuevaNotaRef.key;
};

export const actualizarNota = async (folio, incidencia, tipoFolio, msg, lateral_nuevo, color_nuevo,  id_mensaje) => {
    const db = getDatabase();
      update(
        child(
          refDB(db),
          (`folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/notas/${id_mensaje}`)
        ),
        {
          texto: msg,
          color: color_nuevo,
          colorLateral: lateral_nuevo,
        }
      )
      .catch(function (err) {});
  };

  export const eliminarNotaBD = async (folio, incidencia, tipoFolio, id_nota) => {
    const db = getDatabase(); 
      set(
        child(
          refDB(db),
          (`folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/notas/${id_nota}`)
        ),
        (null)
      )
  };