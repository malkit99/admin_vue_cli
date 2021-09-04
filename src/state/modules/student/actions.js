import student from "../../../apis/student/student"
export default {
    getAllStudents({ commit } , search){
        return new Promise((resolve , reject ) => {
            student.getAllStudent(search)
            .then((response) => {
                commit('SET_ALL_STUDENTS' , response.data.data )
                commit('SET_ALL_STUDENTS_META' , response.data.meta )
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    getStudentsFeeList({ commit } , search){
        return new Promise((resolve , reject ) => {
            student.getStudentFeeList(search)
            .then((response) => {
                commit('STUDENTS_FEE_LIST' , response.data.data )
                commit('STUDENTS_FEE_LIST_META' , response.data.meta )
                resolve(response);
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
}