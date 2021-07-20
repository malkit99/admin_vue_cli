import master from "../../../apis/master/master"
export default {
    getActiveCountry({ commit }){
        return new Promise((resolve , reject ) => {
            master.getActiveCountry()
            .then((response) => {
                commit('SET_ACTIVE_COUNTRIES' , response.data.data )
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    getActiveStatesById({ commit } , data){
        return new Promise((resolve , reject ) => {
            master.getActiveStateById(data)
            .then((response) => {
                commit('SET_ACTIVE_STATES' , response.data.data )
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    getActiveDistrictById({ commit } , data){
        return new Promise((resolve , reject ) => {
            master.getActiveDistrictsById(data)
            .then((response) => {
                commit('SET_ACTIVE_DISTRICTS' , response.data.data )
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

}