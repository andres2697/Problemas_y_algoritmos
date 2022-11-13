import { createStore } from 'vuex'

const controlEstados = {
    state: () => ({
        
    }),
    mutations: {
        // controlSidebar(state){
        //     state.openSidebar = state.openSidebar ? false : true;
        //     localStorage.setItem('sidebarEstado', state.openSidebar);
        // },
    }
}

export const store = createStore({
    modules: {
        a: controlEstados,
    }
})