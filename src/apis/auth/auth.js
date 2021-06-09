import Api from "../api"

export default {
    signUp(creadential){
        return Api().post('/login' , creadential)
    },

    getAuthencticatedUser(){
        return Api().get('/user')
    },

    logout(){
        return Api().get('/logout')
    },
}