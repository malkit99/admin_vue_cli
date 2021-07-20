import Api from "../api"

export default {
    signUp(creadential){
        return Api().post('/login' , creadential)
    },

}