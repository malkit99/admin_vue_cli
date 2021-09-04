<template>
  <div class="container">
      <div class="row">
          <div class="col-lg-12" >
              <table class="table table-bordered table-info ">
                  <thead>
                      <tr>
                          <th>Sr.No.</th>
                          <th>Course Name</th>
                          <th>Course Full Name</th>
                          <th>Course Code</th>
                          <th>Duration</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(course , index ) in courses " :key="index" >
                          <td>{{ index + 1 }}</td>
                          <td>{{ course.course_name ? course.course_name : "N/A" | uppercase }}</td>
                          <td>{{ course.full_name ? course.full_name : "N/A" | capitalize }}</td>
                          <td>{{ course.course_code ? course.course_code : "N/A" | uppercase }}</td>
                          <td>{{ course.duration ? course.duration : "N/A" }}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:"CourseComponent",
    data(){
        return{}
    },

    computed:{
        ...mapGetters({
            courses:'student/getStudentCourses',
        }),
    },
}
</script>

<style>

</style>