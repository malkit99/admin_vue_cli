import enquiry from "../../../apis/enquiry/enquiry"
export default {

    getAllEnquiries({ commit } , search){
        return new Promise((resolve , reject ) => {
            enquiry.getAllEnquiry(search)
            .then((response) => {
                commit('SET_ALL_ENQUIRIES' , response.data.data )
                commit('SET_ALL_ENQUIRIES_META' , response.data.meta )
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
}