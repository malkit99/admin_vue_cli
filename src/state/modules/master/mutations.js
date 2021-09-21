export default {
    SET_ACTIVE_COUNTRIES(state , data){
        state.countries = data
    },

    SET_ACTIVE_STATES(state , data){
        state.states = data
    },

    SET_ACTIVE_DISTRICTS(state , data){
        state.districts = data
    },

    SET_ENQUIRY_FORM_DATA(state , data){
        state.sources = data.sources
        state.followPriority = data.followPriorities
        state.followType = data.followTypes
        state.durations = data.durations
        state.followReasons = data.followReasons
        state.genders = data.genders
        state.qualifications = data.qualifications
        state.enquiryStatus = data.enquiryStatuses
    }
}