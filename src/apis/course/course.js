import Api from "../api"

export default {
    getCourses(search){
        return Api().get('/course?page='
        + search.pageNumber
        +'&filter[standard_id]='+search.standard_id
        +'&filter[course_name]='+search.course_name
        )
    },

    getBatches(search){
        return Api().get('/batch?page='+search.pageNumber)
    },

    getActiveBatches(){
        return Api().get('/get-all-active-batches')
    },
    

    getStandards(search){
        return Api().get('/standard?page='+search.pageNumber)
    },

    getActiveStandards(){
        return Api().get('/get-all-active-standard')
    },

    getSubjects(search){
        return Api().get('/subject?page='+search.pageNumber)
    },

}