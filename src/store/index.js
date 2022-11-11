import { createStore } from 'vuex'

const controlEstados = {
    state: () => ({
        openSidebar: localStorage.getItem('sidebarEstado') === 'true' ? true : false,
        modalCorrectivo: false,
        modalPreventivo: false,
        modalManejoFolio: false,
        modalEdicionFolioCorrectivo: false,
        validandoHorario: [false, false, false],
        errores: {coordenadas: ''},
        mostrarJustificacion: [true, true, true],
        sla: {tiempo: "--:--", color: ''},
        tiempoMuerto: 0
    }),
    mutations: {
        controlSidebar(state){
            state.openSidebar = state.openSidebar ? false : true;
            localStorage.setItem('sidebarEstado', state.openSidebar);
        },
        abrirModalCorrectivo(state){
            state.modalCorrectivo = true;
        },
        cerrarModalCorrectivo(state){
            state.modalCorrectivo = false;
        },
        abrirModalPreventivo(state){
            state.modalPreventivo = true;
        },
        cerrarModalPreventivo(state){
            state.modalPreventivo = false;
        },
        abrirModalManejoFolio(state){
            state.modalManejoFolio = true;
        },
        cerrarModalManejoFolio(state){
            state.modalManejoFolio = false;
        },
        abrirModalEdicionCorrectivo(state){
            state.modalEdicionFolioCorrectivo = true;
        },
        cerrarModalEdicionCorrectivo(state){
            state.modalEdicionFolioCorrectivo = false;
        },
        horarioFechaAceptada(state){
            state.validandoHorario[0] = true;
        }, 
        horarioHoraAceptada(state){
            state.validandoHorario[1] = true;
        },
        horarioMinutoAceptada(state){
            state.validandoHorario[2] = true;
        },
        agregarErroresCoord(state, erroresC){
            if(erroresC == ''){
                state.errores.coordenadas = '';
            }else if(erroresC == undefined || erroresC == null){
                state.errores.coordenadas = ''
            }else if(erroresC == 'Campo requerido'){
                state.errores.coordenadas = erroresC;
            }
            else{
                state.errores.coordenadas = 'Formato de coordenadas no válido'
            }
        },  
        asignarMuestraJustificacion(state, i){
            switch(i){
                case 0:
                    state.mostrarJustificacion[0] = false;
                    break;
                case 1:
                    state.mostrarJustificacion[1] = false;
                    break;
                case 2:
                    state.mostrarJustificacion[2] = false;
                    break;
            }
        },
        limpiarJustificacion(state){
            state.mostrarJustificacion[0] = true;
            state.mostrarJustificacion[1] = true;
            state.mostrarJustificacion[2] = true;
        },
        limpiarSLA(state){
            state.sla.tiempo = "--:--";
            state.sla.color = '';
        },
        asignarSla(state, data){
            state.sla.tiempo = data.tiempo;
            state.sla.color = data.color;
        },
        actualizarTiempoMuerto(state, data){
            state.tiempoMuerto = data;
        }
    }
}

export const store = createStore({
    modules: {
        a: controlEstados,
    }
})