

export default {
    SET_ALL_STUDENTS(state , data){
        state.students = data
    },

    SET_ALL_STUDENTS_META(state , data){
        state.studentsMeta = data
    },

    SET_STUDENT_CURRENT_PAGE(state , payload){
        state.studentsMeta.current_page = payload
    },

    STUDENTS_FEE_LIST(state , data){
        state.studentsFeeList = data
       
    },

    GET_STUDENT_INSTALLMENTS_BY_ID(state , item){
        state.studentDetail = item ;
        state.installments = item.installments 
    },

    STUDENT_FEE_INSTALLMENT_UPDATE(state , item){ 
        const index = state.installments.findIndex(installment => installment.id === item.id);
        if(index !== -1){
            state.installments.splice(index , 1 , item);
        }
    },

    SET_STUDENT_FEE_INSTALLMENT(state , data){
        state.installments = data 
    },

    SHOW_FEE_INSTALLMENT_MODAL(state , payload){
        state.installmentModel = payload ;
    },
    SET_STUDENT_DETAIL(state , item){
        state.studentDetail = item ;  
    },

    STUDENTS_FEE_LIST_META(state , data){
        state.studentsFeeListMeta = data
    },

    SET_STUDENT_FEE_LIST_CURRENT_PAGE(state , payload){
        state.studentsFeeListMeta.current_page = payload
    },

    SHOW_STUDENT_BY_ID(state , data){
        state.student = data.data
        state.courses = data.courses
        state.batches = data.batches
        state.installments = data.installments
    },

    SET_STUDENT_FEE_DETAIL(state , data){
        state.student = data.data
        state.courses = data.data.courses
        state.batches = data.data.batches
        state.installments = data.data.installments
    },

    SET_STUDENT_NOT_FOUND_DETAIL(state){
        state.student = null
        state.courses = null
        state.batches = null
        state.installments = null
    },

    UPDATE_ENROLL_ID_FOR_FEE_PAYMENT(state , item){
        state.enroll_id = item
    },
}