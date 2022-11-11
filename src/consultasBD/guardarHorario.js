import { getDatabase, ref as refDB, get, set, child, update } from "@firebase/database";

export const guardarHorarioInicio = (hora, folio, incidencia, tipoFolio) => {
  const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaInicio`), {
      hora: hora,
    });
};

export const guardarFechaInicio = (fechaScript, fechaSistema, folio, incidencia, tipoFolio) => {
  const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaInicio`), {
      fechaScript: fechaScript,
      fechaSistema: fechaSistema
    });
};

export const guardarHorarioLlegada = (hora, folio, incidencia, tipoFolio) => {
  const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaLlegada`), {
      hora: hora,
    });
};

export const guardarFechaLlegada = (fechaScript, fechaSistema, folio, incidencia, tipoFolio) => {
  const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaLlegada`), {
      fechaScript: fechaScript,
      fechaSistema: fechaSistema
    });
};

export const guardarHorarioActivacion = (hora, folio, incidencia, tipoFolio) => {
  const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaActivacion`), {
      hora: hora,
    });
};

export const guardarFechaActivacion = (fechaScript, fechaSistema, folio, incidencia, tipoFolio) => {
  const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}/horaActivacion`), {
      fechaScript: fechaScript,
      fechaSistema: fechaSistema
    });
};