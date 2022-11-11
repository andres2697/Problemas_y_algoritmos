import { getDatabase, ref as refDB, get, set, child } from "@firebase/database";

export const infoSelectCaptura = () => {
  const db = getDatabase();
  let concentradoInfoSelect = {
    justificaPausa: [],
    materiales: [],
    conceptos: []
  };
  // let prueba

  get(child(refDB(db), `catalogo`))
    .then((snapshot) => {
      snapshot.forEach((element) => {
        switch(element.key){
          case 'tipoFolios':
            element.forEach((elemento) => {
              if(elemento.key == 'correctivo'){
                concentradoInfoSelect.tiposFolio.push( elemento.val() );
              }else if(elemento.key == 'preventivo'){
                concentradoInfoSelect.tiposFolio.push( elemento.val() );
              }
            });
            break;
          case 'distritos':
            element.forEach((elemento) => {
              concentradoInfoSelect.distritos.push({
                distrito: elemento.key, 
                clusters: elemento.val()['clusters'],
                supervisores: elemento.val()['supervisores'],
              });
            });
            break;
          case 'incidencias':
            element.forEach((elemento) => {
              if(elemento.key == 'correctivo'){
                concentradoInfoSelect.fallas.push( elemento.val()['fallas'] );
                concentradoInfoSelect.causas.push( elemento.val()['causas'] );
              }else if(elemento.key == 'preventivo'){
                concentradoInfoSelect.fallas.push( elemento.val()['fallas'] );
                concentradoInfoSelect.causas.push( elemento.val()['causas'] );
              }
            });
            break;
          case 'conceptos':
            element.forEach((elemento) => {
              concentradoInfoSelect.conceptos.push( elemento.key );
            });
            break;
          case 'supervisores':
            element.forEach((elemento) => {
              concentradoInfoSelect.supervisores.push({
                supervisor: elemento.key, 
                tecnicos: elemento.val()['tecnicos'],
              });
            });
            break;
        }
      });
    })
    .catch(function (err) {});

    // console.log(concentradoInfoSelect);

  return concentradoInfoSelect;
};

