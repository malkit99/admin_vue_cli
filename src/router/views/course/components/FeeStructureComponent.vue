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
                    <b-form-select 
                    v-model="search.standard_id" 
                    @change="doSearch"  
                    text-field="standard_name" 
                    value-field="id" 
                    :options="standards"
                    >
                     <template #first>
                          <b-form-select-option value="" disabled>-- Select Standard --</b-form-select-option>
                          </template>
                    </b-form-select>
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
                    <b-button :to="{path:'/add-fee-shecdule'}" pill class="float-right m-1" variant="primary">Add Fee Shecdule</b-button>
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
                    <b-link variant="primary" :to="{path:'/add-course' , query:{ id : data.item.id , edit: true}}">
                    <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                    </b-link>
                    <b-link variant="danger" @click="confirm(data.item)" class="ml-1">
                    <i class="mdi mdi-delete font-size-18 text-danger"></i>
                    </b-link>
                    <b-link variant="success"  class="ml-1">
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


    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name:"AddFeeShecdule",
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
                standard_id : "",
                perPage:10,
                course_name:"",
            },

            emptySearch:{
              standard_id : "" ,
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
            standards:'course/getActiveStandards',
            
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
        this.getStandards();
    },

    methods:{
        ...mapActions({
            getCourses:'course/getAllCourses',
            getStandards:'course/getActiveStandards',
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