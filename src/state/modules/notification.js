export const state = {
    notification: "",
    loading:false,
};

export const mutations = {
    
    SHOW_LOADER(state , payload){
        state.loading = payload 
    },

    SET_NOTIFICATION(state, payload) {
        state.notification = payload;
    },

    clear(state) {
        state.notification = null;
    }
};

export const getters = {
    getLoader(state){
        return state.loading 
    },
    getNotification(state){
        return state.notification 
    },
}

export const actions = {
    notification({ commit }, payload) {
        return new Promise((resolve) => {
            commit('SET_NOTIFICATION', payload);
            resolve(true)
        })
    },
    clear({ commit }) {
        commit('clear');
    }
};
