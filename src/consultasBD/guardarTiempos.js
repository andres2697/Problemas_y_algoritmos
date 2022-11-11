import { getDatabase, ref as refDB, get, set, child, update } from "@firebase/database";

export const guardarEta = (folio, eta, incidencia, tipoFolio) => {
    const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`), {
      eta: eta,
    });
};

export const guardarSla = (folio, sla, incidencia, tipoFolio) => {
    const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`), {
      sla: sla,
    });
};

export const guardarTiempoMuerto = (folio, tiempoMuerto, incidencia, tipoFolio) => {
    const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`), {
      tiempoMuerto: tiempoMuerto,
    });
};

export const guardarJustificacion = (folio, justificacion, incidencia, tipoFolio) => {
    const db = getDatabase();
    update(child(refDB(db), `folios/` + (incidencia == 1 ? `preventivos` : `correctivos`) + `/${tipoFolio}/${folio}`), {
      justificacion: justificacion,
    });
};


