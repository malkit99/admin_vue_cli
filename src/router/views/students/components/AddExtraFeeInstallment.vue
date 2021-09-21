<template>
      <b-modal
      id="croper"
      v-model="installmentModel"
      size="lg"
      title="Add Installment"
      title-class="font-18"
      hide-footer
      hide-header
      :no-close-on-backdrop="true"
    >
    <h5>Add Fee Installment <span class="text-primary">{{ studentDetail.name }}</span></h5>
    <ValidationObserver ref="installmentForm" v-slot="{ passes}">
      <b-form class="p-2" @submit.prevent="passes(saveInstallment)" @reset="resetForm">
        <div class="container">
          <!-- row start -->
          <div class="row">
            <!-- col start -->
                <div class="col-md-4">
                    <ValidationProvider  vid="standard_id" rules="required" name="standard" v-slot="{ valid, errors  }">
                        <b-form-group id="InstallmmentType">
                            <label  for="InstallmmentType" >Installmment Type<span class="text-danger"> * </span></label>
                            <b-form-select
                                id="InstallmmentType"
                                :options="installmentsTypes"
                                v-model="installment_type"
                                :state="errors[0] ? false : (valid ? true : null)"
                                type="text"
                                value-field="value"
                                text-field="type"
                            >
                            <template #first>
                                <b-form-select-option :value="null" disabled>-- Installment Type --</b-form-select-option>
                            </template>
                            </b-form-select>
                                <p class="text-danger small mt-1">{{ errors[0] }}</p>
                        </b-form-group>
                    </ValidationProvider>
                </div>
              <!-- col start -->
              <div class="col-md-4">
                      <ValidationProvider vid="due_date" rules="" name="Due Date" v-slot="{ valid, errors  }">
                        <b-form-group id="startDate">
                          <label  for="startDate" >Due Date<span class="text-danger"> * </span></label>
                              <date-picker
                                id="startDate" 
                                v-model="due_date"
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
              <div class="col-md-4">
                    <ValidationProvider vid="installment_amount"  rules="" name="Installment" v-slot="{ valid, errors  }">
                        <b-form-group id="installment" >
                          <label  for="startDate" >Installment Amount<span class="text-danger"> * </span></label>
                            <b-form-input
                            id="installment"
                            v-model="installment_amount"
                            :state="errors[0] ? false : (valid ? true : null)"
                            type="number"
                            placeholder="Amount"
                            min="1"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                </div>
              <!-- col-end -->
          </div>
          <!-- row end -->
          <!-- row start -->
          <div class="row mt-2">
              <div class="col-md-12">  
              <b-button class="mr-2 mb-2 float-right" type="submit"  variant="info">Save</b-button>
              <b-button class="mr-2 mb-2 float-right " variant="info">Reset</b-button>
              <b-button @click="hideFeeInstallmentModel" class="mr-2 mb-2 float-right " variant="info">Close</b-button>
              </div>
          </div>
          <!-- row end -->
        </div>
      </b-form>
    </ValidationObserver>

    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import DatePicker from "vue2-datepicker";
import Api from "../../../../apis/api";
export default {
components: { DatePicker },
    data(){
        return{ 
            due_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            installment_amount :"",
            installment_type:null,

        };
    },



    computed:{
        ...mapGetters({
            installmentModel:'student/getShowExtraInstallmentModal',
            installmentsTypes:'master/getInstallmentTypes',
            studentDetail:'student/getStudentDetail',
        }),
    },

    methods:{
        saveInstallment(){
            this.$refs.installmentForm.validate().then((success) => {
                if(!success){
                    return ;
                }
                return new Promise((resolve , reject ) => {
                    const data = { id : this.studentDetail.id ,  due_date : this.due_date , installment_type : this.installment_type , installment_amount : this.installment_amount };
                    Api().post('/add-extra-installment' , data)
                    .then((response) => {
                      this.$store.commit('student/ADD_STUDENT_FEE_INSTALLMENT' , response.data.data)
                      const message = response.data.message ;
                       this.$notify({
                        group: 'foo',
                        title: 'Success',
                        type: 'success',
                        text: message
                      });
                      this.hideFeeInstallmentModel();
                      resolve(response);
                    })
                    .catch((error) => {
                      if(error){
                        this.$refs.installmentForm.setErrors(error.response.data.errors);
                      }
                      reject(error)
                    })
                })
            })
        },

        hideFeeInstallmentModel(){
            this.due_date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.installment_amount = "";
            this.installment_type = null;
            this.$store.commit('student/SHOW_ADD_EXTRA_FEE_INSTALLMENT_MODAL' , false);
        },

        resetForm(){
            this.$refs.installmentForm.reset();
        },

 



    },

}
</script>

<style>

</style>