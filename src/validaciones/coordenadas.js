import { guardarCoordenadas } from '@/consultasBD/guardarCoordenada.js';

export const validacionCoordenadas = async (folio, incidencia, tipoFolio, coordenadas) => {
    if(coordenadas == '' || coordenadas == null){
        return 'Campo requerido';
    }else{
        if (
          /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
            coordenadas
          )
        ) {
        }else{
          return 'Formato de coordenadas no válido';
        }
    }
    let coordSinEspacio = coordenadas.replace(/\s+/g, '');
    await guardarCoordenadas(folio, incidencia, tipoFolio, coordSinEspacio);
    return '';
}

export const validacionCoordenadasCab24 = (coordenada) => {
  let error = false;
  if(coordenada == '' || coordenada == null ){
    // error = true;
    return error;
  }else{
    if (
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
        coordenada
      )
    ) {
    }else{
      error = true;
      return error;
    }
  }
  error = false;
  return error;
}