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

    getAllStanderedCourses(state){
        return state.standeredCourses 
    },

    getCourseMeta(state){
        return state.meta
    },

    getBatches(state){
        return state.batches 
    },

    getActiveBatches(state){
        return state.activeBatches 
    },

    getBatchMeta(state){
        return state.batchMeta
    },

    getCourseLinks(state){
        return state.links 
    },
}