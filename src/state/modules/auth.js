import { getFirebaseBackend } from '../../authUtils.js'
import auth from "../../apis/auth/auth"

export const state = {
    currentUser: sessionStorage.getItem('authUser'),
    token:null,
}

export const mutations = {
 
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
        saveState('auth.currentUser', newValue)
    },
    SET_TOKEN(state , token){
        state.token = token 
    }
}

export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        return !!state.currentUser
    },

    user(state){
       return state.currentUser.user
    },

    getToken(state){
        return state.token
    }
}

export const actions = {
 
  

    // Logs in the current user.
    logIn({dispatch } , creadential) {
        return new Promise((resolve , reject ) => {
            auth.signUp(creadential)
            .then((response) => {
            const token = response.data.token
               dispatch('getLoadUser' , token)
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

   async getLoadUser({commit} , token){
        if(token){
            commit('SET_TOKEN' , token)
        }
        if(!token){
            return ;
        }

        try {
            let response =  await auth.getAuthencticatedUser()
            const user = response.data
            commit('SET_CURRENT_USER', user) 
        } catch (error) {
            commit('SET_CURRENT_USER', null)
            commit('SET_TOKEN' , null)
        }
      
    },

    // Logs out the current user.
    logOut({commit}) {
        return new Promise((resolve, reject) => {
            auth.logout().then((response) => {
                localStorage.removeItem('token')
                commit('SET_CURRENT_USER', null)
                commit('SET_TOKEN' , null)
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        });
    },

    // register the user
    register({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return getFirebaseBackend().registerUser(email, password).then((response) => {
            const user = response
            commit('SET_CURRENT_USER', user)
            return user
        });
    },



}

// ===
// Private helpers
// ===

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}



