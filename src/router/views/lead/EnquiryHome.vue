<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
     <div class="row">
      <div class="col-lg-12">
        <enquiry-nav></enquiry-nav>
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
                    <b-button :to="{path:'/add-enquiry'}" pill class="float-right m-1" variant="primary">Add Enquiry</b-button>
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
                      <th scope="col">Name</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Enq Source</th>
                      <th scope="col">Enquiry Status</th>
                      <th scope="col">Status</th>
                      <th scope="col">Assign To</th>
                      <th scope="col">Follow Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item , index) in enquiries" :key="index" >
                      <td>
                        {{ index+1}}
                      </td>
                        <td>
                        <h5 class="text-truncate font-size-14">
                          <b-link @click="followEnquiryModel(item)">{{ item.name }}</b-link>
                        </h5>
                      </td>
                      <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.mobile }}
                        </h5>
                      </td>
                    

                      <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.source }}
                        </h5>
                      </td>

                      <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.enquiry_status }}
                        </h5>
                      </td>

                      <td>
                        <h5 class="text-truncate font-size-14">
                        <b-badge pill :variant="item.reg_status === 'Cpmpleted' ? `success` : `danger` ">{{ item.reg_status }}</b-badge>
                        </h5>
                      </td> 
                      <td>
                        <h5 class="text-truncate font-size-14">
                        {{ item.assign_to }}
                        </h5>
                      </td>

                      <td>
                        <h5 class="text-truncate font-size-14">
                          {{ item.follow_date }}
                          <span class="text-danger">{{ item.follow_time ? item.follow_time : ""}} </span>
                        </h5>
                      </td>
                      <td>
                        <b-link variant="primary" :to="{path:'/add-student' , query:{ id : item.id , enquiryAddmission: true}}">
                            <i class="mdi mdi-account-plus font-size-18 text-success"></i>
                        </b-link>
                        <b-link variant="primary" :to="{path:'/add-enquiry' , query:{ id : item.id , edit: true}}">
                            <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </b-link>
                        <b-link  variant="danger"  class="ml-1">
                            <i class="mdi mdi-delete font-size-18 text-danger"></i>
                        </b-link>
                        <b-link variant="success" :to="{path: '/show-enquiry' , query:{id : item.id }}" class="ml-1">
                            <i class="mdi mdi-eye font-size-18 text-warning"></i>
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

    <!-- enquiry follow-up model start heree -->

    <b-modal
      v-model="enquiryFollowUp"
      centered
      persistent
      size="lg"
      title="Follow-up Detail"
      title-class="font-18"
      hide-footer
    >
      <div class="container">
        <!-- row start -->
        <h6 class="text-primary">Enquiry Detail</h6>
          <div class="row">
            <div class="col-lg-12">
             <table class="table table-bordered">
               <tbody>
                  <tr>
                   <th>Name : </th>
                   <td>{{followDetail.name}}</td>
                    <th>Mobile : </th>
                   <td>{{followDetail.mobile}}</td>
                    <th>Alternate Mobile</th>
                   <td>{{followDetail.alternate_mobile ? followDetail.alternate_mobile : "N/A" }}</td>
                 </tr>
                  <tr>
                   <th >Total Follow-Ups</th>
                   <td>{{followDetail.total_follow_ups}}</td>
                    <th>Reg. Status</th>
                   <td>{{followDetail.reg_status ? followDetail.reg_status : "N/A"}}</td>
                    <th>Follow Status</th>
                   <td>{{followDetail.enquiry_status ? followDetail.enquiry_status : "N/A" }}</td>
                 </tr>
               </tbody>
             </table>
            </div>
          </div>
        <!-- row end -->

        <!-- row start -->
          <div class="row" >
            <!-- col start -->
              <div class="col-lg-12">
                <div class="accordion" role="tablist">
                  <b-card no-body>
                    <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.accordion-1 variant="info">Feedback Detail</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                    <b-card-body id="nav-scroller" ref="content" style="position:relative; height:100px; overflow-y:scroll;" >
                        <div v-for="(follow , index ) in followDetail.follows" :key="index">
                          {{ index+1}}.
                            <b-badge pill variant="danger"><span></span>Created-at -: {{ follow.recorded }}</b-badge>
                            <b-badge pill variant="light" class="ml-2">Follow Date  -: {{ follow.follow_date }} <span class="text-danger" >by: {{follow.feedback_by}}</span></b-badge>
                            <b-badge pill variant="light" class="ml-2">Follow-Status -: {{ follow.follow_status }} <span class="text-danger" >Follow-Type: {{follow.follow_type}}</span></b-badge>
                            <b-badge pill variant="primary" class="ml-2">Reason -: {{ follow.follow_reason ? follow.follow_reason : "N/A" }}</b-badge>
                            <p class="text-primary ml-4">{{ follow.feedback}}</p>
                        </div>
                    </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
              </div>
            <!-- col end -->
          </div>

        <!-- row end -->

          <ValidationObserver ref="followForm" v-slot="{ passes}">
              <b-form  @submit.prevent="passes(saveFollow)" @reset="resetForm" >
                  <!-- row start -->
                    <h6 class="text-primary">Next Follow Detail </h6>
                  <div class="row">
                    <!-- col-start -->
                  <div class="col-md-6">
                          <ValidationProvider  vid="follow_date" rules="" name="Follow Date" v-slot="{ valid, errors  }">
                            <b-form-group label="Follow Date" label-for="follow_date">
                                  <date-picker
                                    id="follow_date" 
                                    v-model="follow.follow_date"
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
                    <!-- col end -->
                    <!-- col-start -->
                    <div class="col-md-6">
                    <ValidationProvider  vid="follow_status" rules="" name="enquiry status" v-slot="{ valid, errors  }">
                        <b-form-group id="enquiryStatus" label="Enquiry Status" label-for="enquiryStatus">
                            <b-form-select
                              id="enquiryStatus"
                              :options="enquiryStatus"
                              v-model="follow.follow_status"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              value-field="id"
                              text-field="name"
                              aria-describedby="inputLiveFeedback"
                            >
                            <template #first>
                              <b-form-select-option :value="null" disabled>-- Select Status --</b-form-select-option>
                            </template>
                            </b-form-select>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                    </div>
                    <!-- col end -->

            

                    <!-- col start -->
                    <div class="col-lg-6">
                      <ValidationProvider  vid="next_follow_date" rules="" name="Next Follow" v-slot="{ valid, errors  }">
                        <b-form-group id="nextFollowDate" label="Next Follow Date" label-for="nextFollowDate">
                              <date-picker
                                id="nextFollowDate" 
                                v-model="follow.next_follow_date"
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
                    <!-- col end -->
                    <!-- col-start -->
                        <div class="col-lg-6">
                              <ValidationProvider  vid="next_follow_time" rules="" name="Follow Time" v-slot="{  errors  }">
                                <b-form-group id="nextFollowTime" label="Follow Time" label-for="nextFollowTime">
                                    <date-picker
                                      id="nextFollowTime" 
                                      v-model="follow.next_follow_time" 
                                      type="time"
                                      format="hh:mm a"
                                      value-type="format"
                                      :time-picker-options="{ start: '07:00', step: '00:30',end: '20:00',}"
                                      placeholder="Select time"
                                      ></date-picker>
                                    <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                    </b-form-group>
                              </ValidationProvider>
                        </div>
                    <!-- col end -->
                          <!-- col start  -->
                    <div class="col-md-6">
                      <ValidationProvider  vid="follow_type" rules="" name="Follow type" v-slot="{ valid, errors  }">
                        <b-form-group id="followType" label="Follow Type" label-for="followType">
                            <b-form-select
                              id="followType"
                              :options="followTypes"
                              v-model="follow.follow_type"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              value-field="id"
                              text-field="name"
                              aria-describedby="inputLiveFeedback"
                            >
                            <template #first>
                              <b-form-select-option :value="null" disabled>-- Select Type --</b-form-select-option>
                            </template>
                            </b-form-select>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <!-- col end  -->

                          <!-- col start  -->
                    <div class="col-md-6">
                      <ValidationProvider  vid="follow_reason" rules="" name="Reason" v-slot="{ valid, errors  }">
                        <b-form-group id="Reason" label="Reason" label-for="Reason">
                            <b-form-select
                              id="Reason"
                              :options="followReasons"
                              v-model="follow.follow_reason"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              value-field="id"
                              text-field="name"
                              aria-describedby="inputLiveFeedback"
                            >
                            <template #first>
                              <b-form-select-option :value="null" disabled>-- Select Reason --</b-form-select-option>
                            </template>
                            </b-form-select>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <!-- col end  -->
                    <!-- col start  -->
                    <div class="col-lg-6">
                      <ValidationProvider  vid="feedback_by" rules="" name="Feedback By" v-slot="{ valid, errors  }">
                        <b-form-group id="counselor" label="Feedback By" label-for="counselor">
                            <b-form-select
                              id="counselor"
                              :options="counselors"
                              v-model="follow.feedback_by"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              value-field="id"
                              text-field="name"
                              aria-describedby="inputLiveFeedback"
                            >
                            <template #first>
                              <b-form-select-option :value="null" disabled>-- Select Priority --</b-form-select-option>
                            </template>
                            </b-form-select>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                      </ValidationProvider>
                    </div>
                    <!-- col end -->

                    <!-- col start -->
                    
                    <div class="col-md-12">
                        <ValidationProvider  vid="feedback" rules="" name="Feedback" v-slot="{ valid, errors  }">
                            <b-form-group id="feedback" label="Feedback" label-for="feedback">
                              <textarea
                                id="feedback"
                                v-model="follow.feedback"
                                class="form-control"
                                :maxlength="225"
                                :state="errors[0] ? false : (valid ? true : null)"
                                rows="3"
                              ></textarea>
                              <p class="text-danger small mt-1">{{ errors[0] }}</p>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                        </ValidationProvider>
                  </div>
                    <!-- col end -->
                  </div>
                  <!-- row end -->

                  <!-- row start -->
                  <div class="row">
                    <!-- col start -->
                    <div class="col-lg-12">
                        <b-button class="ml-2" type="submit" variant="info">Add Feedback</b-button>
                        <b-button class="ml-2" @click="resetForm" variant="info">Reset</b-button>
                        <b-button class="ml-2" @click="hideFollowEnquiryModel" variant="info">Close</b-button>
                    </div>
                    <!-- col end -->
                  </div>
                  <!-- row end -->

          
              </b-form>
          </ValidationObserver>
    
      </div>

    
    </b-modal>
    <!-- enquiry follow-up model end here -->
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import DatePicker from "vue2-datepicker";
import { mapActions, mapGetters } from 'vuex';
import EnquiryNav from './components/EnquiryNav.vue';
import Api from "../../../apis/api"

/**
 * Projects-list component
 */
export default {
  page: {
    title: "Projects List",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , EnquiryNav , DatePicker },
  data() {
    return {
      title: "Projects List",
      items: [
        {
          text: "Projects",
          href: "/"
        },
        {
          text: "Projects List",
          active: true
        }
      ],
      text:"lorem ipsumm",
      enquiryFollowUp:false,
      followDetail:{},
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
      follow:{
        id:"",
        follow_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        follow_status:null,
        follow_type:null,
        next_follow_time:"",
        feedback:"",
        follow_reason:null,
        next_follow_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },

      defaultFollow:{
        id:"",
        follow_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        follow_status:null,
        follow_type:null,
        next_follow_time:"",
        feedback:"",
        feedback_by:"",
        follow_reason:null,
        next_follow_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
          enquiries:'enquiry/getAllEnquiries',
          metas:'enquiry/getAllEnquiriesMeta',
          counselors:'master/getCounselors',
          followTypes:'master/getFollowType',
          enquiryStatus:'master/getEnquiryStatus',
          sources:'master/getSources',
          followReasons:'master/getFollowReasons'
        }),
       currentPage: {
            get() {
              let current = this.$store.state.enquiry.enquiriesMeta.current_page ? this.$store.state.enquiry.enquiriesMeta.current_page : 1
                return current ;
            },

            set(value) {
                this.$store.commit('enquiry/SET_ENQUIRY_CURRENT_PAGE', value)
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
    this.getEnquiryFormData();
  },

  methods:{
    ...mapActions({
      getAllEnquiries:'enquiry/getAllEnquiries',
      getEnquiryFormData:'master/getEnquiryFormData'
    }),

    getFollows(){
      alert('aok');
    },

    followEnquiryModel(item){
      this.followDetail = Object.assign({} , item );
      this.follow.id = item.id ;
      this.follow.feedback_by = item.assign_to ? item.assign_to : null ;
      this.enquiryFollowUp = true;
    },

    hideFollowEnquiryModel(){
      this.enquiryFollowUp = false;
      this.follow = Object.assign({} , this.defaultFollow );
      this.$refs.followForm.reset();
    },
  saveFollow(){
    this.$refs.followForm.validate().then((success)=>{
      if(!success){
        return ;
      }
      return new Promise((resolve , reject ) => {
        Api().post('/follow' , this.follow)
        .then((response) => {
          if(response.status === 201){
          const message = response.data.message ;
               this.$notify({
                  group: 'foo',
                  title: 'Success',
                  type: 'success',
                  text: message
                });
              this.hideFollowEnquiryModel();
              this.getAllList();
          }
          resolve(response);
        })
        .catch((error) => {
          if(error){
            this.$refs.followForm.setErrors(error.response.data.errors);
          }
          reject(error);
        })
      })
    })
  },

  resetForm(){
      this.$refs.followForm.reset();
  },
  getAllList() {
    const pageNumber = 1 ;
    const search = {pageNumber : pageNumber , ...this.search }
    this.getAllEnquiries(search)
  },

   doSearch() {
      const search = { pageNumber: this.currentPage , ...this.search}
      this.getAllEnquiries(search)
    },

    resetSearch() {
      this.search = Object.assign({} , this.emptySearch)
      this.getAllList()
    },
}
};
</script>