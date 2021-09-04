<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
     <div class="row">
      <div class="col-lg-12">
        <student-nav></student-nav>
      </div>
    </div>
          <!-- row start -->
        <div class="row">
          <!-- col start -->
          <div class="col-lg-12">
            <div class="accordion" role="tablist">
              <b-card no-body>
                <b-card-header header-tag="header" class="p-1 bg-info rounded-pill" role="tab">
                  <b-link  v-b-toggle.accordion-2  variant="info"><i class="mdi mdi-plus text-light font-size-24"></i></b-link>
                  <i class="mdi mdi-account-search text-light font-size-24"></i>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="row">
                    <div class="col-md-3">
                       <b-form-group id="enquiryName" label="By Name" label-for="enquiryName">
                          <b-form-input
                          id="enquiryName"
                          v-model="search.name"
                          type="text"
                          placeholder="Enter Name"
                          ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                       <b-form-group id="mobile" label="By Phone No." label-for="mobile">
                          <b-form-input
                          id="mobile"
                          v-mask="'##########'"
                          v-model="search.mobile"
                          type="text"
                          placeholder="Enter Mobile"
                          ></b-form-input>
                      </b-form-group>
                    </div>
                      <div class="col-md-3">
                       <b-form-group id="mobile" label="By Enquiry Source" label-for="mobile">
                        <b-form-select 
                          v-model="search.source"  
                          text-field="name" 
                          value-field="id" 
                          :options="sources"
                          >
                          <template #first>
                      <b-form-select-option value="" >-- Select Source --</b-form-select-option>
                    </template>
                    </b-form-select>
                      </b-form-group>
                    </div>

                    <div class="col-md-3">
                       <b-form-group id="mobile" label="By Enquiry Status" label-for="mobile">
                        <b-form-select 
                          v-model="search.follow_status"  
                          text-field="name" 
                          value-field="id" 
                          :options="enquiryStatus"
                          >
                          <template #first>
                      <b-form-select-option value="" >-- Select Source --</b-form-select-option>
                    </template>
                    </b-form-select>
                      </b-form-group>
                    </div>

                    <div class="col-md-3">
                       <b-form-group id="mobile" label="By Counselor" label-for="mobile">
                        <b-form-select 
                          v-model="search.assign_to"  
                          text-field="name" 
                          value-field="id" 
                          :options="counselors"
                          >
                          <template #first>
                      <b-form-select-option value="" >-- Select Standard --</b-form-select-option>
                    </template>
                    </b-form-select>
                      </b-form-group>
                    </div>

                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <b-button @click="doSearch" variant="info">Search</b-button>
                      <b-button @click="resetSearch" class="ml-2" variant="info">Reset</b-button>
                    </div>
                  </div>

                </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
          <!-- col - end -->
        </div>
        <!-- row end -->
        <!-- row start -->
        <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select 
                    v-model="search.follow_status" 
                    @change="doSearch"  
                    text-field="name" 
                    value-field="id" 
                    :options="enquiryStatus"
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
                      v-model="search.name"
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
                    <b-button :to="{path:'/add-student'}" pill class="float-right m-1" variant="primary">Add Student</b-button>
                </div>
              <!-- end button -->
        </div>
        <!-- row end -->
  
        <div class="row">
          <div class="col-lg-12">
            <div class>
              <div class="table-responsive">
                <table class="table project-list-table table-nowrap table-centered table-borderless ">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 100px">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Reg. Date</th>
                      <th scope="col">Success Date</th>
                      <th scope="col">Courses</th>
                      <th scope="col" class="text-center">Batch</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item , index) in students" :key="index" >
                      <td>
                        {{ index+1}}
                      </td>
                        <td>
                          <b-avatar :src="item.user.avatar" size="3rem"></b-avatar>
                        </td>
                        <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.name }}
                        </h5>
                      </td>
                      <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.mobile }}
                        </h5>
                      </td>
                    

                      <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.registration_date ? item.registration_date : "N/A"}}
                        </h5>
                      </td>

                       <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.success_date ? item.success_date : "N/A"}}
                        </h5>
                      </td>

                      <td v-for="(course , index ) in item.courses" :key="index">
                        {{ course.course_name }}
                      </td>

                       <td class="text-center">
                           <div class="container" v-if="item.batches.length > 0">
                            <div class="row">
                              <div class="col-sm-12" v-for="(batch , index ) in item.batches" :key="index">
                                  <b-badge pill variant="primary">{{ batch.display_name }}</b-badge>
                              </div>
                            </div>
                          </div>
                          <h6 v-else>N/A</h6>
                      </td>

                
                      <td>
                        <h5 class="text-truncate font-size-14">
                            {{ item.student_status }}
                        </h5>
                      </td>

    
                      <td>
                        <b-link variant="success" :to="{path: '/student-detail' , query:{id : item.id , show_detail: 'detail' }}" class="ml-1">
                            <i class="mdi mdi-eye font-size-18 text-warning"></i>
                        </b-link>
  
                        <b-link variant="primary" :to="{path:'/add-student' , query:{ id : item.id , edit: true}}">
                            <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </b-link>

                        <b-link  variant="danger"  class="ml-1">
                            <i class="mdi mdi-delete font-size-18 text-danger"></i>
                        </b-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->

        <div class="row">
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-right">
            <ul class="pagination  mb-2">
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
    <!-- end row -->
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { mapActions, mapGetters } from 'vuex';
import StudentNav from './components/StudentNav.vue';

/**
 * Projects-list component
 */
export default {
  name:"StudentHome",
  page: {
    title: "Student Home",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader ,  StudentNav },
  data() {
    return {
      title: "Student Home",
      items: [
        {
          text: "Dashboard",
          href: "/"
        },
        {
          text: "Student Home",
          active: true
        }
      ],
      text:"lorem ipsumm",
      search:{
        follow_type : "",
        follow_status:"",
        name:"",
        mobile:"",
        source:"",
        assign_to:"",
      },

      emptySearch:{
        follow_type : "",
        follow_status:"",
        name:"",
        mobile:"",
        source:"",
        assign_to:"",
      },
    };
  },

  watch: {
      currentPage(newVal) {
          this.doSearch(newVal)
      }
  },

computed:{
        ...mapGetters({
          students:'student/getAllStudents',
          metas:'student/getAllStudentsMeta',
          counselors:'master/getCounselors',
          followTypes:'master/getFollowType',
          enquiryStatus:'master/getEnquiryStatus',
          sources:'master/getSources',
        }),
       currentPage: {
            get() {
              let current = this.$store.state.student.studentsMeta.current_page ? this.$store.state.student.studentsMeta.current_page : 1
                return current ;
            },

            set(value) {
                this.$store.commit('student/SET_STUDENT_CURRENT_PAGE', value)
            }

        },

        per_page(){
          return this.metas.per_page
        },

        rows() {
            return this.metas.total
        }
},

  created(){
    this.getAllList();
  },

  methods:{
    ...mapActions({
      getAllStudents:'student/getAllStudents',
    }),

  getAllList() {
    const pageNumber = 1 ;
    const search = {pageNumber : pageNumber , ...this.search }
    this.getAllStudents(search)
  },

   doSearch() {
      const search = { pageNumber: this.currentPage , ...this.search}
      this.getAllStudents(search)
    },

    resetSearch() {
      this.search = Object.assign({} , this.emptySearch)
      this.getAllList()
    },
}
};
</script>