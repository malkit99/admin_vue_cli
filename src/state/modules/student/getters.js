export default {
    getAllStudents(state){
        return state.students
    },

    getAllStudentsMeta(state){
        return state.studentsMeta
    },

    getStudentsFeeList(state){
        return state.studentsFeeList
    },

    getStudentsFeeListMeta(state){
        return state.studentsFeeListMeta
    },

    getSingleStudent(state){
        return state.student
    },

    getStudentCourses(state){
        return state.courses
    },

    getStudentFeeInstallments(state){
        return state.installments
    },

    getStudentDetail(state){
        return state.studentDetail
    },

    getShowInstallmentModal(state){
        return state.installmentModel
    },

    getInstallments(state){
        return state.installments
    },

    getStudentBatches(state){
        return state.batches
    },

    getEnrollIdForFeePayment(state){
        return state.enroll_id ;
    },
}