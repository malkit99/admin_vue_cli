import Api from "../api"

export default {
    getAllStudent(search){
        return Api().get('/student?page='
        + search.pageNumber +
        '&include=user,courses,batches'
        +'&filter[registered_student]=1'
        +'&filter[mobile]='+search.mobile
        +'&filter[name]='+search.name
        )
    },

    getStudentFeeList(search){
        var newDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        return Api().get('/get-student-fee-list?page='
        + search.pageNumber +
        '&include=user,courses,batches,installments'
        +'&filter[registered_student]=1'
        +'&filter[remaining_balance_student]=0'
        +'&filter[before_date]='+newDate
        +'&filter[mobile]='+search.mobile
        +'&filter[name]='+search.name
        +'&filter[enroll_id]='+search.enroll_id
        +'&filter[batches.id]='+search.batch_id
        +'&filter[courses.id]='+search.course_id
        )
    }

}