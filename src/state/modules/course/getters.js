export default {
    getStandards(state){
        return state.standards
    },

    getActiveStandards(state){
        return state.ActiveStandards
    },

    getStandardMeta(state){
        return state.standardMeta
    },

    getSubjects(state){
        return state.subjects
    },

    getSubjectMeta(state){
        return state.subjectMeta
    },

    getCourses(state){
        return state.courses 
    },

    getCourseMeta(state){
        return state.meta
    },

    getCourseLinks(state){
        return state.links 
    },
}