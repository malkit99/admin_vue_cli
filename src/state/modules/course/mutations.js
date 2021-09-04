export default {

    SET_ALL_BATCHES(state , data ){
        state.batches = data.data
        state.batchMeta = data.meta
    },

    SET_ALL_ACTIVE_BATCHES(state , data ){
        state.activeBatches = data
    },


    UPDATE_BATCH(state , data){
        const index = state.batches.findIndex(batch => batch.id === data.id);
        if(index !== -1){
            state.batches.splice(index , 1 , data);
        }  
    },
    ADD_BATCH(state , data){
        state.batches = state.batches.concat(data)    
    },



    SET_ALL_COURSES(state , data ){
        state.courses = data.data
        state.meta = data.meta
    },


    SET_CURRENT_PAGE(state , value){
        state.meta.current_page = value
    },

    SET_STANDARD_CURRENT_PAGE(state , value){
        state.standardMeta.current_page = value
    },

    SET_ALL_STANDARDS(state , data){
        state.standards = data.data    
        state.standardMeta = data.meta    
    },

    SET_ALL_ACTIVE_STANDARDS(state , data){
        state.ActiveStandards = data  
    },

    UPDATE_STANDARD(state , data){
        const index = state.standards.findIndex(standard => standard.id === data.id);
        if(index !== -1){
            state.standards.splice(index , 1 , data);
        }  
    },
    ADD_STANDARD(state , data){
        state.standards = state.standards.concat(data)    
    },

    SET_ALL_SUBJECTS(state , data){
        state.subjects = data.data    
        state.subjectMeta = data.meta    
    },

    ADD_SUBJECT(state , data){
        state.subjects = state.subjects.concat(data)   
    },

    UPDATE_SUBJECT(state , data){
        const index = state.subjects.findIndex(subject => subject.id === data.id);
        if(index !== -1){
            state.subjects.splice(index , 1 , data);
        }  
    },
}