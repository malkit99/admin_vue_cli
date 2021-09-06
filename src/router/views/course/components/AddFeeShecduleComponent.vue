<template>
    <div class="row">
        <b-card title="Create Course">
            <b-card-body>
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
                                        <ValidationProvider  vid="course_code" rules="required" name="Course Code" v-slot="{ valid, errors  }">
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
                                        <ValidationProvider  vid="course_fee" rules="required" name="Course Fee" v-slot="{ valid, errors  }">
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
                                    <div class="col-md-4">
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
                                    <div class="col-md-4">
                                        <ValidationProvider  vid="session" rules="required" name="Session" v-slot="{ valid, errors  }">
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
                                                @change="getSubjectByStandard"
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
                                                    <ValidationProvider  vid="name" rules="required" name="Role Name" v-slot="{ valid, errors  }">
                                                    <label class="typo__label">Select Subjects</label>
                                                        <multiselect 
                                                            :multiple="true"
                                                            v-model="selectedSubjects"
                                                            :close-on-select="false" 
                                                            track-by="full_name"
                                                            label="full_name" 
                                                            :state="errors[0] ? false : (valid ? true : null)" 
                                                            :options="standardsSubjects"
                                                            placeholder="Select Sebjects"
                                                        >
                                                        <template slot="option" slot-scope="props">
                                                        <div class="option__desc">
                                                        <span class="option__semster_id"> 
                                                        {{ props.option.full_name }} - {{ props.option.semster_id }}
                                                        </span></div>
                                                        </template>
                                                        </multiselect>
                                                    </ValidationProvider>
                                                </div>
                                            </div>
                                    <!-- <b-card v-if="standardsSubjects" class="p-2 border border-primary text-primary"  title="Select Subjects" id="nav-scroller" ref="content" style="position:relative; height:200px; overflow-y:scroll;">
                                        <b-card-body >
                                       
                                            <div class="row">
                                                <div class="col-lg-6" v-for="(sub , index ) in standardsSubjects" :key="index">
                                                    <ValidationProvider  vid="name" rules="required" name="Role Name" v-slot="{ valid, errors  }">
                                                        <b-form-checkbox 
                                                        :value="sub.id"
                                                        v-model="editedItem.subjects"          
                                                        class="custom-checkbox custom-control-left mb-2"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        checked
                                                        >
                                                        {{ sub.full_name}}
                                                        </b-form-checkbox>
                                                    </ValidationProvider>
                                                </div> 
                                            </div>
                                        </b-card-body> 
                                    </b-card> -->

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
    name:"AddFeeShecduleComponent",
    components: { DatePicker , Multiselect },
    data(){
        return {
            standardsSubjects:[],
            buttonLevel:"Create Course",
            editedIndex: false,
            selectedSubjects:[],
            editedItem:{
              course_name:"",
              full_name:"",
              start_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              duration:null,
              session:null,
              course_code:"",
              course_fee:"",
              standard_id:null,
              subjects:[],
            },
            defaultItem:{
              course_name:"",
              full_name:"",
              start_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
              duration:null,
              session:null,
              course_code:"",
              course_fee:"",
              standard_id:null,
              subjects:[],
            },
        }
    },

    mounted(){
        if(this.$route.query.id != "" && this.$route.query.id != undefined && this.$route.query.edit === true){
            this.editedIndex = true ;
            this.buttonLevel = "Update Course" ;
            return new Promise((resolve , reject) => {
                Api().post(`/course/${this.$route.query.id}`)
                .then((response) => {
                    this.editedItem = Object.assign({} , response.data.course );
                    if(response){
                        this.getSubjectByStandard();
                    } 
                    this.editedItem.subjects = [] ;
                    this.selectedSubjects = response.data.subjects ;
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
            durations:'master/getDurations',
            sessions:'master/getSessions',
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

    
    getSubjectByStandard(){
        return new Promise((resolve , reject ) => {
            const id = this.editedItem.standard_id
            Api().post(`/standard/${id}`)
            .then((response) => {
                this.standardsSubjects = response.data.data
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    saveCourse(){
    
      if(this.editedIndex === true){
            this.$refs.courseForm.validate().then((success) => {
              if(!success){
                return ;
              }
                if(this.selectedSubjects.length > 0){
                      const subjects = this.selectedSubjects ;
                      for (let i = 0; i < subjects.length; i++) {
                          const element = subjects[i].id;
                          this.editedItem.subjects.push(element);
                      }
                  }
              return new Promise((resolve , reject ) => {
                  Api().patch(`/course/${this.editedItem.id}` , this.editedItem)
                  .then((response) => {
                    const data = response.data.data ;
                    this.$store.commit('course/UPDATE_COURSE' , data);
                    const message = response.data.message ;
                    this.$notify({
                        group: 'foo',
                        title: 'Success',
                        type: 'success',
                        text: message
                      });
                      this.buttonLevel = 'Create Course' ;
                      this.editedIndex = false ;
                      this.editedItem = Object.assign({} , this.defaultItem);
                      this.$refs.courseForm.reset();
                      this.$router.push({path:'/course'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.courseForm.setErrors(error.response.data.errors);
                      }
                      reject(error)
                  });

              });
            });
      }
      else{
          this.$refs.courseForm.validate().then((success) => {
              if(!success){
                return ;
              }
                  if(this.selectedSubjects.length > 0){
                      const subjects = this.selectedSubjects ;
                      for (let i = 0; i < subjects.length; i++) {
                          const element = subjects[i].id;
                          this.editedItem.subjects.push(element);
                      }
                  }
              return new Promise((resolve , reject ) => {
                  Api().post('/course' , this.editedItem)
                  .then((response) => {
                    this.$store.commit('course/ADD_COURSE' , response.data.data);
                    const message = response.data.message ;
                      this.$notify({
                          group: 'foo',
                          title: 'Success',
                          type: 'success',
                          text: message
                        });
                      this.editedItem = Object.assign({} , this.defaultItem);
                      this.$refs.courseForm.reset();
                       this.$router.push({path:'/course'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.courseForm.setErrors(error.response.data.errors);
                      }
                      reject(error);
                  });

              });
            })
      }
    },

    resetForm(){},

    }
}
</script>

<style>

</style>