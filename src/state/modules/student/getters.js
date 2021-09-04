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
    getInstallments(state){
        return state.installments
    },
}