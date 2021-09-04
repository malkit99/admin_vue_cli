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
}