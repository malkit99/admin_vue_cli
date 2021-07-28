export default {
    SET_ALL_ENQUIRIES(state , data){
        state.enquiries = data
    },

    SET_ALL_ENQUIRIES_META(state , data){
        state.enquiriesMeta = data
    },

    SET_ENQUIRY_CURRENT_PAGE(state , payload){
        state.enquiriesMeta.current_page = payload
    },


}