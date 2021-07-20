<template>
 <div class="row">   
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
                    <h5 class="card-title mb-4">Standard List </h5>
                        <ValidationObserver ref="standardForm" v-slot="{ passes}">
                            <b-form inline @submit.prevent="passes(saveStandard)" @reset="resetForm" >
                              <ValidationProvider  vid="standard_name" rules="required" name="Standard" v-slot="{ valid, errors  }">
                                  <b-input 
                                  id="standardName"
                                  :state="errors[0] ? false : (valid ? true : null)" 
                                  class="mb-2 mr-sm-3"
                                  v-model="editedItem.standard_name" 
                                  placeholder="Standard Name"
                                  ></b-input>
                                  <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                              </ValidationProvider>
                              <b-form-checkbox v-model="editedItem.status" class="mb-2 mr-sm-3">Is Active </b-form-checkbox>
                              <b-button class="mb-2" type="submit" variant="primary">{{ buttonLevel }}</b-button>
                            </b-form>
                        </ValidationObserver>
            <!-- Transactions table -->
             <b-table 
              sticky-header
              responsive
              :items="standards"
              :fields="fields"
             >
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>

              <template #cell(is_active)="data">
                  <b-badge pill :variant="data.item.status === true ? `success` : `danger` ">{{ data.item.is_active }}</b-badge>
              </template>
              <template #cell(actions)="data">
                <b-link @click="editItem(data.item)"><i class="mdi mdi-pencil text-primary font-size-16"></i></b-link>
                <b-link @click="destroyItem(data.item)"><i class="mdi mdi-delete text-danger font-size-16"></i></b-link>
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
      fields: [
          // A virtual column that doesn't exist in items
          'index',
          // A column that needs custom formatting
          { key: 'standard_name', label: 'Module Name' },
          { key: 'course_count', label: 'Courses' },
          { key: 'subject_count', label: 'Subjects' },
          { key: 'is_active', label: 'Active' },
          { key: 'actions', label: 'Actions' },
        ],
        editedItem:{
          id:null,
          standard_name:"",
          status:true
        },
        defaultItem:{
          id:null,
          standard_name:"",
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
      standards:'course/getStandards',
      metas:'course/getStandardMeta',
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
},

  methods:{
    ...mapActions({
      getStandards:'course/getAllStandards',
    }),

    getAllList(){
      const search = {pageNumber : 1};
      this.getStandards(search);
    },
    saveStandard(){
      if(this.editedIndex > -1){
            this.$refs.standardForm.validate().then((success) => {
              if(!success){
                return ;
              }
              return new Promise((resolve , reject ) => {
                  Api().patch(`/standard/${this.editedItem.id}` , this.editedItem)
                  .then((response) => {
                    const data = response.data.data ;
                    this.$store.commit('course/UPDATE_STANDARD' , data);
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
                      this.$refs.standardForm.reset();
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.standardForm.setErrors(error.response.data.errors);
                      }
                      reject(error)
                  });

              });
            });
      }
      else{
          this.$refs.standardForm.validate().then((success) => {
              if(!success){
                return ;
              }
              return new Promise((resolve , reject ) => {
                  Api().post('/standard' , this.editedItem)
                  .then((response) => {
                    this.$store.commit('course/ADD_STANDARD' , response.data.data);
                    const message = response.data.message ;
                      this.$notify({
                          group: 'foo',
                          title: 'Success',
                          type: 'success',
                          text: message
                        });
                      this.editedItem = Object.assign({} , this.defaultItem);
                      this.$refs.standardForm.reset();
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.standardForm.setErrors(error.response.data.errors);
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
        this.editedIndex = this.standards.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.buttonLevel = 'Update'
      },

    resetForm(){

    },
  },
}
</script>

<style>

</style>