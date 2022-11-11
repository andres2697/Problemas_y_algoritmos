import { validarExistencia } from '@/consultasBD/consultaExistenciaFolio.js';

export const validacionFolio = async (folio, tipoFolio, incidencia) => {
    let existe;
    if(folio == '' || folio == null){
        return 'Campo requerido';
    }else if(folio.length < 7){
        return 'El campo debe ser mayor o igual a 7 dígitos';
    }else{
        existe = await validarExistencia(folio, tipoFolio, incidencia);
        if(existe){
            return 'Folio existente, favor de verificar';
        }else{
            return '';
        }
    }
}

export const validacionOLT = (olt) => {
    if(olt == '' || olt == null){
        return 'Campo requerido';
    }
    return '';
}