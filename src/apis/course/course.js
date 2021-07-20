import Api from "../api"

export default {
    getCourses(search){
        return Api().get('/course?page='
        + search.pageNumber
        +'&page[limit]='+search.perPage
        +'&filter[standard_id]='+search.standard_id
        +'&filter[course_name]='+search.course_name
        )
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