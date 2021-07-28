import Api from "../api"

export default {
    getAllEnquiry(search){
        return Api().get('/enquiry?page='
        + search.pageNumber
        +'&filter[standard_id]='+search.standard_id
        +'&filter[name]='+search.name
        )
    },

}