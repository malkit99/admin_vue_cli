import Api from "../api"

export default {
    getActiveCountry(){
        return Api().get('/get-active-country')
    },

    getActiveStateById(data){
        return Api().post('/get-active-state-by-id' , data)
    },

    enquiryFormData(){
        return Api().get('/get-enquiry-form-master-data')
    },

    getActiveDistrictsById(data){
        return Api().post('/get-active-district' , data)
    },

}