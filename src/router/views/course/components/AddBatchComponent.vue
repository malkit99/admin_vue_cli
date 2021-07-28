<template>
    <div class="row">
        <b-card title="Create Batch">
            <b-card-body>
                <ValidationObserver ref="batchForm" v-slot="{ passes}">
                            <b-form  @submit.prevent="passes(saveBatch)" @reset="resetForm" >
                                <div class="container">
                                    <div class="row">
                                    <!-- col start -->
                                        <div class="col-md-4">
                                        <ValidationProvider  vid="display_name" rules="" name="Short Course Name" v-slot="{ valid, errors  }">
                                                    <b-form-group id="batchDisplayName" label="Display Name" label-for="batchDisplayName">
                                                        <b-form-input
                                                        id="batchDisplayName"
                                                        v-model="editedItem.display_name"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        type="text"
                                                        placeholder="Display Name"
                                                        ></b-form-input>
                                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                    </b-form-group>
                                        </ValidationProvider>
                                        </div>
                                    <!-- col - end -->


                                    <!-- col start -->
                                        <div class="col-md-4">
                                        <ValidationProvider  vid="batch_name" rules="" name="Batch Name" v-slot="{ valid, errors  }">
                                                    <b-form-group id="batchName" label="Batch Name" label-for="batchName">
                                                        <b-form-input
                                                        id="batchName"
                                                        v-model="editedItem.batch_name"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        type="text"
                                                        placeholder="Batch Name"
                                                        ></b-form-input>
                                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                    </b-form-group>
                                        </ValidationProvider>
                                        </div>
                                    <!-- col - end -->
                                        <div class="col-md-4">
                                        <ValidationProvider  vid="batch_code" rules="" name="Batch Code" v-slot="{ valid, errors  }">
                                                    <b-form-group id="batchCode" label="Batch Code" label-for="batchCode">
                                                        <b-form-input
                                                        id="batchCode"
                                                        v-model="editedItem.batch_code"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        type="text"
                                                        placeholder="Batch Code"
                                                        ></b-form-input>
                                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                    </b-form-group>
                                        </ValidationProvider>
                                        </div>
                                    <!-- col - end -->

                                    <!-- col start -->
                                    <div class="col-md-4">
                                        <ValidationProvider  vid="batch_type" rules="" name="Batch Type" v-slot="{ valid, errors  }">
                                            <b-form-group id="batchType" label="Batch Type" label-for="batchType">
                                                <b-form-select
                                                id="batchType"
                                                :options="batchType"
                                                v-model="editedItem.batch_type"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                type="text"
                                                value-field="id"
                                                text-field="name"
                                                aria-describedby="inputLiveFeedback"
                                                >
                                                <template #first>
                                                <b-form-select-option :value="null" disabled>-- Select Batch Type --</b-form-select-option>
                                                </template>
                                                </b-form-select>
                                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>
                                    </div>
                                    <!-- col end  -->

                                    <!-- col start -->
                                    <div class="col-md-4">
                                        <ValidationProvider  vid="batch_status" rules="" name="Batch Status" v-slot="{ valid, errors  }">
                                            <b-form-group id="batchStatus" label="Batch Status" label-for="batchStatus">
                                                <b-form-select
                                                id="batchStatus"
                                                :options="batchStatus"
                                                v-model="editedItem.batch_status"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                type="text"
                                                value-field="id"
                                                text-field="name"
                                                aria-describedby="inputLiveFeedback"
                                                >
                                                <template #first>
                                                <b-form-select-option :value="null" disabled>-- Select Batch Status --</b-form-select-option>
                                                </template>
                                                </b-form-select>
                                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>
                                    </div>
                                    <!-- col end  -->

                                    <!-- col start -->
                                    <div class="col-md-4">
                                        <ValidationProvider  vid="start_date" rules="" name="Start Date" v-slot="{ valid, errors  }">
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

                                <!-- col start -->
                                    <div class="col-md-4">
                                        <ValidationProvider  vid="end_date" rules="" name="End Date" v-slot="{ valid, errors  }">
                                            <b-form-group label="End Date" label-for="endDate">
                                                <date-picker
                                                    id="endDate" 
                                                    v-model="editedItem.end_date"
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
                                    <div class="col-md-4">
                                        <ValidationProvider  vid="session" rules="" name="Session" v-slot="{ valid, errors  }">
                                            <b-form-group id="session" label="Session" label-for="session">
                                                <b-form-select
                                                id="session"
                                                :options="sessions"
                                                v-model="editedItem.session"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                type="text"
                                                value-field="id"
                                                text-field="name"
                                                aria-describedby="inputLiveFeedback"
                                                >
                                                <template #first>
                                                <b-form-select-option :value="null" disabled>-- Select Session --</b-form-select-option>
                                                </template>
                                                </b-form-select>
                                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>
                                    </div>

                                    <!-- col end -->


                                    <!-- col start  -->
                                    <div class="col-md-4">
                                        <ValidationProvider  vid="standard_id" rules="" name="Standard" v-slot="{ valid, errors  }">
                                            <b-form-group id="standardId" label="Standard" label-for="standardId">
                                                <b-form-select
                                                id="standardId"
                                                :options="standards"
                                                v-model="editedItem.standard_id"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                type="text"
                                                value-field="id"
                                                text-field="standard_name"
                                                @change="getCourseByStandardId"
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
                                            <div class="row mb-2">
                                                <div class="col-lg-12">
                                                    <ValidationProvider  vid="courses" rules="" name="Role Name" v-slot="{ valid, errors  }">
                                                    <label class="typo__label">Select Subjects</label>
                                                        <multiselect 
                                                            :multiple="true"
                                                            v-model="selectedCourses"
                                                            :close-on-select="false" 
                                                            track-by="full_name"
                                                            label="full_name" 
                                                            :state="errors[0] ? false : (valid ? true : null)" 
                                                            :options="activeCourses"
                                                            placeholder="Select Sebjects"
                                                            aria-describedby="inputLiveFeedback"
                                                        >
                                                        <template slot="option" slot-scope="props">
                                                        <div class="option__desc">
                                                        <span class="option__course_name"> 
                                                        {{ props.option.full_name }} - {{ props.option.course_code }}
                                                        </span></div>
                                                        </template>
                                                        </multiselect>
                                                         <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                    </ValidationProvider>
                                                </div>
                                            </div>

                                    <div class="row">
                                        <b-button variant="info" type="submit">{{ buttonLevel }}</b-button>
                                        <b-button class="ml-2" variant="info">Reset</b-button>
                                    </div>                             
                                </div>
                            </b-form>
                </ValidationObserver>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Api from "../../../../apis/api"
import DatePicker from "vue2-datepicker";
import Multiselect from 'vue-multiselect'
export default {
    components: { DatePicker , Multiselect },
    data(){
        return {
            activeCourses:[],
            buttonLevel:"Create Batch",
            editedIndex: false,
            selectedCourses:[],
            editedItem:{
              display_name:"",
              batch_name:"",
              start_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              end_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              session:null,
              batch_code:"",
              batch_type:null,
              batch_status:null,
              standard_id:null,
              courses:[],
            },
            defaultItem:{
              display_name:"",
              batch_name:"",
              start_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              end_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              session:null,
              batch_code:"",
              course_fee:"",
              standard_id:null,
              courses:[],
            },
        }
    },

    mounted(){
        if(this.$route.query.id != "" && this.$route.query.id != undefined && this.$route.query.edit === true){
            this.editedIndex = true ;
            this.buttonLevel = "Update Batch" ;
            return new Promise((resolve , reject) => {
                Api().post(`/batch/${this.$route.query.id}`)
                .then((response) => {
                    this.editedItem = Object.assign({} , response.data.data );
                    if(response){
                        this.getCourseByStandardId();
                    } 
                    this.editedItem.courses = [] ;
                    this.selectedCourses = response.data.courses ;
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                })
            })
        } 
    },
    computed:{
        ...mapGetters({
            sessions:'master/getSessions',
            batchStatus:'master/getBatchStatus',
            batchType:'master/getBatchTypes',
            standards:'course/getActiveStandards',    
        }),

    },

    created(){
        this.getStandards();
    },

    methods:{

    ...mapActions({
        getStandards:'course/getActiveStandards',
    }),

    
    getCourseByStandardId(){
        return new Promise((resolve , reject ) => {
            const id = this.editedItem.standard_id
            Api().post(`/get-course-by-standard-id/${id}`)
            .then((response) => {
                this.activeCourses = response.data.data
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    saveBatch(){
    
      if(this.editedIndex === true){
            this.$refs.batchForm.validate().then((success) => {
              if(!success){
                return ;
              }
                 if(this.selectedCourses.length > 0){
                      const courses = this.selectedCourses ;
                      for (let i = 0; i < courses.length; i++) {
                          const element = courses[i].id;
                          this.editedItem.courses.push(element);
                      }
                  }
              return new Promise((resolve , reject ) => {
                  Api().patch(`/batch/${this.editedItem.id}` , this.editedItem)
                  .then((response) => {
                    const data = response.data.data ;
                    this.$store.commit('course/UPDATE_BATCH' , data);
                    const message = response.data.message ;
                    this.$notify({
                        group: 'foo',
                        title: 'Success',
                        type: 'success',
                        text: message
                      });
                      this.buttonLevel = 'Create Batch' ;
                      this.editedIndex = false ;
                      this.editedItem = Object.assign({} , this.defaultItem);
                      this.$refs.batchForm.reset();
                      this.$router.push({path:'/batch'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.batchForm.setErrors(error.response.data.errors);
                      }
                      reject(error)
                  });

              });
            });
      }
      else{
          this.$refs.batchForm.validate().then((success) => {
              if(!success){
                return ;
              }
                  if(this.selectedCourses.length > 0){
                      const courses = this.selectedCourses ;
                      for (let i = 0; i < courses.length; i++) {
                          const element = courses[i].id;
                          this.editedItem.courses.push(element);
                      }
                  }
              return new Promise((resolve , reject ) => {
                  Api().post('/batch' , this.editedItem)
                  .then((response) => {
                    this.$store.commit('course/ADD_BATCH' , response.data.data);
                    const message = response.data.message ;
                      this.$notify({
                          group: 'foo',
                          title: 'Success',
                          type: 'success',
                          text: message
                        });
                      this.editedItem = Object.assign({} , this.defaultItem);
                      this.$refs.batchForm.reset();
                       this.$router.push({path:'/batch'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.batchForm.setErrors(error.response.data.errors);
                      }
                      reject(error);
                  });

              });
            })
      }
    },

    resetForm(){
        this.$refs.batchForm.reset();
    },

    }
}
</script>

<style>

</style>