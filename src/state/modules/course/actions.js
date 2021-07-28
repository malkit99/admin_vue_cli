import course from "../../../apis/course/course"
export default {
    getAllBatches({commit} , search ){
        return new Promise((resolve , reject) => {
            course.getBatches(search)
            .then((response) => {
                commit('SET_ALL_BATCHES' , response.data)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
    getAllCourses({commit} , search ){
        return new Promise((resolve , reject) => {
            course.getCourses(search)
            .then((response) => {
                commit('SET_ALL_COURSES' , response.data)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    getAllStandards({commit} , search ){
        return new Promise((resolve , reject) => {
            course.getStandards(search)
            .then((response) => {
                commit('SET_ALL_STANDARDS' , response.data)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    getActiveStandards({commit}){
        return new Promise((resolve , reject) => {
            course.getActiveStandards()
            .then((response) => {
                commit('SET_ALL_ACTIVE_STANDARDS' , response.data.data)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    getAllSubjects({commit} , search ){
        return new Promise((resolve , reject) => {
            course.getSubjects(search)
            .then((response) => {
                commit('SET_ALL_SUBJECTS' , response.data)
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
}