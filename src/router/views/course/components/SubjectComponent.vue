<template>
 <div class="row">   
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                     <h4 class="card-title">Subject List</h4>
            <div class="row mt-4">
            <div class="col-sm-12 col-md-4">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select   text-field="standard_name" value-field="id" :options="[]"></b-form-select>
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-4">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    Search:
                    <b-form-input
                      type="search"
                      placeholder="Search..."
                      class="form-control  ml-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
              <!-- start button -->
                <div class="col-sm-12 col-md-4">
                    <b-button @click="showSubjectModal" pill class="float-right m-1" variant="primary">Add Subject</b-button>
                </div>
              <!-- end button -->
            </div>
                  <!-- Transactions table -->
                  <b-table 
                    sticky-header
                    responsive
                    :items="subjects"
                    :fields="fields"
                  >
                    <template #cell(index)="data">
                      {{ data.index + 1 }}
                    </template>

                    <template #cell(is_active)="data">
                        <b-badge pill :variant="data.item.status === true ? `success` : `danger` ">{{ data.item.is_active }}</b-badge>
                    </template>
                    <template #cell(actions)="data">
                      <b-link @click="editItem(data.item)"><i class="mdi mdi-pencil text-primary font-size-18"></i></b-link>
                      <b-link @click="destroyItem(data.item)"><i class="mdi mdi-delete text-danger font-size-18"></i></b-link>
                    </template>
                  </b-table>
                  <div class="row">
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
      <!-- end col -->

      <!-- model start here -->

  <b-modal
  v-model="subjectModal"
  centered
  persistent
  title="Add Subject"
  title-class="font-18"
  hide-footer
  >
      <ValidationObserver ref="subjectForm" v-slot="{ passes}">
                    <b-form  @submit.prevent="passes(saveSubject)" @reset="resetForm" >
                      <ValidationProvider  vid="standard_id" rules="required" name="Standard" v-slot="{ valid, errors  }">
                          <b-form-select
                              id="standard"
                              :options="standards"
                              v-model="editedItem.standard_id"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              value-field="id"
                              text-field="standard_name"
                              class="mb-2 mr-2"
                              aria-describedby="inputLiveFeedback"
                            >
                            <template #first>
                              <b-form-select-option :value="null" disabled>-- Select Standard --</b-form-select-option>
                            </template>
                            </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </ValidationProvider>

                      <ValidationProvider  vid="faculty" rules="required" name="faculty" v-slot="{ valid, errors  }">
                          <b-form-select
                              id="faculty"
                              :options="faculties"
                              v-model="editedItem.faculty_id"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              value-field="id"
                              text-field="name"
                              class="mb-2 mr-2"
                              aria-describedby="inputLiveFeedback"
                            >
                            <template #first>
                              <b-form-select-option :value="null" disabled>-- Select Faculty --</b-form-select-option>
                            </template>
                            </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </ValidationProvider>

                      <ValidationProvider  vid="semster_id" rules="required" name="semster" v-slot="{ valid, errors  }">
                          <b-form-select
                              id="semsterId"
                              :options="semsters"
                              v-model="editedItem.semster_id"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              value-field="id"
                              text-field="name"
                              class="mb-2 mr-2"
                              aria-describedby="inputLiveFeedback"
                            >
                            <template #first>
                              <b-form-select-option :value="null" disabled>-- Select Semster --</b-form-select-option>
                            </template>
                            </b-form-select>
                          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </ValidationProvider>


                      <ValidationProvider  vid="subject_name" rules="required" name="Subject Name" v-slot="{ valid, errors  }">
                          <b-input 
                          id="subjectName"
                          :state="errors[0] ? false : (valid ? true : null)" 
                          class="mb-2 mr-sm-3"
                          v-model="editedItem.subject_name" 
                          placeholder="Subject Name"
                          ></b-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </ValidationProvider>

                      <ValidationProvider  vid="full_name" rules="required" name="Subject Full Name" v-slot="{ valid, errors  }">
                          <b-input 
                          id="subjectFullName"
                          :state="errors[0] ? false : (valid ? true : null)" 
                          class="mb-2 mr-sm-3"
                          v-model="editedItem.full_name" 
                          placeholder="Subject Full Name"
                          ></b-input>
                          <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </ValidationProvider>
                      
                      <b-form-checkbox v-model="editedItem.status" class="mb-2 mr-sm-3">Is Active </b-form-checkbox>
                      <b-button size="sm" type="submit" variant="primary">{{ buttonLevel }}</b-button>
                      <b-button size="sm" class="ml-2" @click="hideSubjectModal" variant="primary">Close</b-button>
                      <b-button size="sm" class="ml-2" @click="hideSubjectModal" variant="primary">Reset</b-button>
                    </b-form>
      </ValidationObserver>
  </b-modal>
      <!-- model end here -->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Api from '../../../../apis/api'
export default {
  data(){
    return{
      editedIndex:-1,
      buttonLevel:'Add',
      subjectModal:false,
      fields: [
          // A virtual column that doesn't exist in items
          'index',
          // A column that needs custom formatting
          { key: 'id', label: 'Subject Id' },
          { key: 'subject_name', label: 'Subject Name' },
          { key: 'subject_code', label: 'Code' },
          { key: 'faculty_id', label: 'Faculty' },
          { key: 'semster_id', label: 'Semster' },
          { key: 'standard_name', label: 'Standard' },
          { key: 'is_active', label: 'Active' },
          { key: 'actions', label: 'Actions' },
        ],
        editedItem:{
          id:null,
          standard_id:null,
          subject_name:"",
          full_name:"",
          semster_id:null,
          faculty_id:null,
          status:true
        },
        defaultItem:{
          id:null,
          standard_id:null,
          subject_name:"",
          full_name:"",
          semster_id:null,
          faculty_id:null,
          status:true
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
      standards:'course/getActiveStandards',
      subjects:'course/getSubjects',
      faculties:'master/getFaculties',
      semsters:'master/getSemsters',
      metas:'course/getSubjectMeta',
    }),

      currentPage: {
            get() {
              let current = this.metas.current_page
                return current ;
            },

            set(value) {
                this.$store.commit('course/SET_STANDARD_CURRENT_PAGE', value)
            },
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
  this.getActiveStandards();
},

  methods:{
    ...mapActions({
      getAllSubjects:'course/getAllSubjects',
      getActiveStandards:'course/getActiveStandards',
    }),

    showSubjectModal(){
      this.subjectModal = true 
    },

    hideSubjectModal(){
      this.editedItem = Object.assign({} , this.defaultItem)
      this.buttonLevel = "Add"
      this.subjectModal = false 
    },

    getAllList(){
      const search = {pageNumber : 1};
      this.getAllSubjects(search);
    },
    saveSubject(){
      if(this.editedIndex > -1){
            this.$refs.subjectForm.validate().then((success) => {
              if(!success){
                return ;
              }
              return new Promise((resolve , reject ) => {
                  Api().patch(`/subject/${this.editedItem.id}` , this.editedItem)
                  .then((response) => {
                    const data = response.data.data ;
                    this.$store.commit('course/UPDATE_SUBJECT' , data);
                    const message = response.data.message ;
                    this.$notify({
                        group: 'foo',
                        title: 'Success',
                        type: 'success',
                        text: message
                      });
                      this.buttonLevel = 'Add' ;
                      this.editedIndex = -1 ;
                      this.editedItem = Object.assign({} , this.defaultItem);
                      this.$refs.subjectForm.reset();
                      this.hideSubjectModal();
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.subjectForm.setErrors(error.response.data.errors);
                      }
                      reject(error)
                  });

              });
            });
      }
      else{
          this.$refs.subjectForm.validate().then((success) => {
              if(!success){
                return ;
              }
              return new Promise((resolve , reject ) => {
                  Api().post('/subject' , this.editedItem)
                  .then((response) => {
                    this.$store.commit('course/ADD_SUBJECT' , response.data.data);
                    const message = response.data.message ;
                      this.$notify({
                          group: 'foo',
                          title: 'Success',
                          type: 'success',
                          text: message
                        });
                      this.$refs.subjectForm.reset();
                      this.hideSubjectModal();
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.subjectForm.setErrors(error.response.data.errors);
                      }
                      reject(error);
                  });

              });
            })
      }
    },

    destroyItem(item){
            this.$swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this! " + item.country_name ,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.value) {        
                Api().delete(`/country/${item.id}`)
                .then((response) => {
                  this.$store.commit('master/SET_DESTROY_COUNTRY' , item )
                  this.$swal(
                    response.data.message
                  )
                })
                .catch(() => {
                  this.$swal(
                    'Country Not deleted',
                  )
                })
              }
            });
        },

    editItem (item) {
        this.editedIndex = this.subjects.indexOf(item)
        this.editedItem.id = item.id
        this.editedItem.standard_id = item.standard_id
        this.editedItem.subject_name = item.subject_name
        this.editedItem.full_name = item.full_name
        this.editedItem.status = item.status
        this.editedItem.semster_id = item.semster_id
        this.editedItem.faculty_id = item.faculty_id
        this.buttonLevel = 'Update'
        this.subjectModal = true 
      },

    resetForm(){

    },
  },
}
</script>

<style>

</style>