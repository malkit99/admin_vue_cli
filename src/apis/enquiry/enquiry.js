import Api from "../api"

export default {
    getAllEnquiry(search){
        return Api().get('/enquiry?page='
        + search.pageNumber +
        '&include=follows'
        +'&filter[enquiry_status]='+search.follow_status
        +'&filter[unregistered_enquiry]=0'
        +'&filter[mobile]='+search.mobile
        +'&filter[source]='+search.source
        +'&filter[assign_to]='+search.assign_to
        +'&filter[name]='+search.name
        )
    },

}