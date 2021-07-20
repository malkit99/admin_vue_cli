<template>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Courses List</h4>
            <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="search.standard_id" @change="doSearch"  text-field="standard_name" value-field="id" :options="standards"></b-form-select>
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-4">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      v-model="search.course_name"
                      type="search"
                      @change="doSearch"
                      placeholder="Search..."
                      class="form-control  ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
              <!-- start button -->
                <div class="col-sm-12 col-md-4">
                    <b-button :to="{path:'/add-course'}" pill class="float-right m-1" variant="primary">Add Courses</b-button>
                </div>
              <!-- end button -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="courses"
                :fields="fields"
                :current-page="currentPage"
                striped
                sticky-header
                responsive="sm"
              >
               <template #cell(index)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(actions)="data">
                    <b-link variant="primary" :to="{path:'/addminstrator/add-role' , query:{ id : data.item.id }}">
                    <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                    </b-link>
                    <b-link variant="danger" @click="confirm(data.item)" class="ml-1">
                    <i class="mdi mdi-delete font-size-18 text-danger"></i>
                    </b-link>
                    <b-link variant="success" @click="showRoleModal(data.item)" class="ml-1">
                    <i class="mdi mdi-eye font-size-18 text-warning"></i>
                    </b-link>
                </template>
              
              </b-table>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-4">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select v-model="search.perPage" @change="doSearch" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                  </label>
                </div>
              </div>
              <div class="col">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination  mb-0">
                    <!-- pagination -->
                    <b-pagination 
                      v-model="currentPage" 
                      :total-rows="rows" 
                      :per-page="per_page"
                      first-text="First"
                      prev-text="Prev"
                      next-text="Next"
                      last-text="Last"
                    >
                    </b-pagination>
          
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- course add modal start here  -->
  <b-modal
  v-model="courseModal"
  centered
  size="lg"
  persistent
  title="Add Course"
  title-class="font-18"
  hide-footer
  >
     <ValidationObserver ref="courseForm" v-slot="{ passes}">
                <b-form  @submit.prevent="passes(saveCourse)" @reset="resetForm" >
                  <div class="container">
                    <div class="row">
                      <!-- col start -->
                        <div class="col-md-5">
                          <ValidationProvider  vid="course_name" rules="required" name="Short Course Name" v-slot="{ valid, errors  }">
                                    <b-form-group id="shortCourseName" label="Short Course Name" label-for="shortCourseName">
                                        <b-form-input
                                        id="shortCourseName"
                                        v-model="editedItem.course_name"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        type="text"
                                        placeholder="Short Course Name"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                          </ValidationProvider>
                        </div>
                      <!-- col - end -->


                      <!-- col start -->
                        <div class="col-md-7">
                          <ValidationProvider  vid="full_name" rules="required" name="Course Name" v-slot="{ valid, errors  }">
                                    <b-form-group id="fullCourseName" label="Course Name" label-for="fullCourseName">
                                        <b-form-input
                                        id="fullCourseName"
                                        v-model="editedItem.full_name"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        type="text"
                                        placeholder="Course Name"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                          </ValidationProvider>
                        </div>
                      <!-- col - end -->
                         <div class="col-md-4">
                          <ValidationProvider  vid="course_code" rules="" name="Course Code" v-slot="{ valid, errors  }">
                                    <b-form-group id="courseCode" label="Course Code" label-for="courseCode">
                                        <b-form-input
                                        id="courseCode"
                                        v-model="editedItem.course_code"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        type="text"
                                        placeholder="Course Code"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                          </ValidationProvider>
                        </div>
                      <!-- col - end -->

                       <!-- col - end -->
                         <div class="col-md-4">
                          <ValidationProvider  vid="course_fee" rules="" name="Course Fee" v-slot="{ valid, errors  }">
                                    <b-form-group id="courseFee" label="Course Fee" label-for="courseFee">
                                        <b-form-input
                                        id="courseFee"
                                        v-model="editedItem.course_fee"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        type="text"
                                        placeholder="Course Fee"
                                        ></b-form-input>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                          </ValidationProvider>
                        </div>
                      <!-- col - end -->

                      <!-- col start -->
                      <div class="col-md-4">
                          <ValidationProvider  vid="duration" rules="required" name="Duration" v-slot="{ valid, errors  }">
                            <b-form-group id="duration" label="Duration" label-for="duration">
                                <b-form-select
                                  id="duration"
                                  :options="durations"
                                  v-model="editedItem.duration"
                                  :state="errors[0] ? false : (valid ? true : null)"
                                  type="text"
                                  value-field="id"
                                  text-field="name"
                                  aria-describedby="inputLiveFeedback"
                                >
                                <template #first>
                                  <b-form-select-option :value="null" disabled>-- Select Duration --</b-form-select-option>
                                </template>
                                </b-form-select>
                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </ValidationProvider>
                      </div>
                      <!-- col end  -->

                      <!-- col start -->
                      <div class="col-md-6">
                          <ValidationProvider  vid="start_date" rules="required" name="Start Date" v-slot="{ valid, errors  }">
                            <b-form-group label="Start Date" label-for="startDate">
                                  <date-picker
                                    id="startDate" 
                                    v-model="editedItem.start_date"
                                    :first-day-of-week="1"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                    lang="en"
                                    format="YYYY-MM-DD"
                                    :editable="false"
                                    value-type="format"
                                    confirm
                                    >
                                    </date-picker>
                                    <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                </b-form-group>
                          </ValidationProvider>
                        </div>
                      <!-- col end  -->

                    <!-- col start  -->
                      <div class="col-md-6">
                          <ValidationProvider  vid="session_id" rules="required" name="Session" v-slot="{ valid, errors  }">
                            <b-form-group id="session" label="Session" label-for="session">
                                <b-form-select
                                  id="session"
                                  :options="sessions"
                                  v-model="editedItem.session_id"
                                  :state="errors[0] ? false : (valid ? true : null)"
                                  type="text"
                                  value-field="id"
                                  text-field="name"
                                  aria-describedby="inputLiveFeedback"
                                >
                                <template #first>
                                  <b-form-select-option :value="null" disabled>-- Select Standard --</b-form-select-option>
                                </template>
                                </b-form-select>
                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </ValidationProvider>
                      </div>

                      <!-- col end -->


                      <!-- col start  -->
                      <div class="col-md-6">
                          <ValidationProvider  vid="standard_id" rules="required" name="Standard" v-slot="{ valid, errors  }">
                            <b-form-group id="standardId" label="Standard" label-for="standardId">
                                <b-form-select
                                  id="standardId"
                                  :options="standards"
                                  v-model="editedItem.standard_id"
                                  :state="errors[0] ? false : (valid ? true : null)"
                                  type="text"
                                  value-field="id"
                                  text-field="standard_name"
                                  aria-describedby="inputLiveFeedback"
                                >
                                <template #first>
                                  <b-form-select-option :value="null" disabled>-- Select Standard --</b-form-select-option>
                                </template>
                                </b-form-select>
                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </ValidationProvider>
                      </div>

                      <!-- col end -->
                    </div>
                  </div>
                </b-form>
              </ValidationObserver>

  </b-modal>
      <!-- course add modal end here -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DatePicker from "vue2-datepicker";
export default {
    components: { DatePicker },
    data(){
        return {
            courseModal: false ,
            pageOptions: [2,10, 25, 50, 100],
            fields: [
                { key: "index", sortable: true },
                { key: "course_name", sortable: true },
                { key: "Actions", sortable: false },
            ],

            search:{
                standard_id : 1 ,
                perPage:10,
                course_name:"",
            },

            emptySearch:{
              standard_id : 1 ,
              perPage:10,
              course_name:"", 
            },

            editedItem:{
              course_name:"",
              full_name:"",
              start_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              duration:null,
              session_id:null,
              course_code:"",
              course_fee:"",
              standard_id:null,
              subjects:[],

            },
            defaultItem:{
              course_name:"",
              full_name:"",
              start_date:"",
              end_date:"",
              duration:null,
              session:"",
              course_code:"",
              course_fee:"",
              standard_id:"",
              subjects:[],
            },
        }
    },

    watch: {
          currentPage(newVal) {
              this.getAllList(newVal)
          }
    },

    computed:{
        ...mapGetters({
            durations:'master/getDurations',
            sessions:'master/getSessions',
            courses:'course/getCourses',
            metas:'course/getCourseMeta',
            standards:'course/getStandards',
            
        }),

        currentPage: {
            get() {
              let current = this.metas.current_page
                return current ;
            },

            set(value) {
                this.$store.commit('course/SET_CURRENT_PAGE', value)
            },
        },

        per_page(){
          return this.metas.per_page
        },

        rows() {
            return this.metas.total
        }
    },

    mounted(){
      this.getAllList();
    },

    created(){
        
    },

    methods:{
        ...mapActions({
            getCourses:'course/getAllCourses',
        }),

        showCourseModal(){
          this.courseModal = true 
        },
        hideCourseModal(){
          this.courseModal = false 
        },

        getAllList(){
          const search = {pageNumber : this.currentPage , ...this.search}
          this.getCourses(search);
        },

        doSearch(){
            const pageNumber = 1 ;
            const search = {pageNumber : pageNumber , ...this.search}
            this.getCourses(search);
        },

        resetSearch(){
            this.search = Object.assign({} , this.emptySearch);
            this.getAllList();
        },

        saveCourse(){},
        resetForm(){},
    }
}
</script>

<style>

</style>