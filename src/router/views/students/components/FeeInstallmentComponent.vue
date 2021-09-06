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
    <h5>Define Fee Installment</h5>
    <ValidationObserver ref="installmentForm" v-slot="{ passes}">
      <b-form class="p-2" @submit.prevent="passes(saveInstallment)" @reset="resetForm">
        <div class="container">
          <!-- row start -->
          <div class="row">
            <!-- col-start -->
              <div class="col-md-3">
                    <ValidationProvider  vid="commited_fee" rules="" name="Commited Fee" v-slot="{ valid, errors  }">
                        <b-form-group id="commited" label="Commited Fee" label-for="commited">
                            <b-form-input
                            id="commited"
                            v-model="commited_fee"
                            :state="errors[0] ? false : (valid ? true : null)"
                            type="text"
                            placeholder="Commited Fee"
                            disabled
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                </div>
              <!-- col-end -->

              <!-- col start -->
              <div class="col-md-3">
                      <ValidationProvider vid="start_from" rules="" name="Start Date" v-slot="{ valid, errors  }">
                        <b-form-group id="startFrom" label="Start From" label-for="startFrom">
                              <date-picker
                                id="startFrom" 
                                v-model="start_from"
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
                  <div class="col-md-3">
                    <ValidationProvider  vid="repeat_months" rules="" name="Repeat Month" v-slot="{ valid, errors  }">
                        <b-form-group id="MonthRepeat" label="Repeat Month" label-for="MonthRepeat">
                            <b-form-input
                            id="MonthRepeat"
                            v-model="repeat_months"
                            :state="errors[0] ? false : (valid ? true : null)"
                            type="number"
                            min="1"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </ValidationProvider>
                </div>
              <!-- col-end -->
               <!-- col-start -->
              <div class="col-md-3">
                    <ValidationProvider vid="no_of_installment"  rules="" name="Installment" v-slot="{ valid, errors  }">
                        <b-form-group id="installment" label="installment Amount" label-for="installment">
                            <b-form-input
                            id="installment"
                            v-model="installment_amount"
                            :state="errors[0] ? false : (valid ? true : null)"
                            type="number"
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
          <div class="row">
            <div class="col-md-12">
                <b-button @click="calculateInstallment" class="float-right" variant="info">Create</b-button>
                <b-button class="float-right mr-2" @click="resetInstallment" variant="info">Reset</b-button>
            </div>
          </div>
          <!-- row end -->
          <!-- row start -->
          <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                  <thead>
                    <th>No.</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                  </thead>
                  <tbody>
                    <tr v-for="(installment , index) in feeInstallment" :key="index">
                    <td>{{ index+1}}</td>
                    <td>{{ installment.payable_date}}</td> 
                    <td>{{ installment.amount}}</td> 
                    </tr>
                  </tbody>
                </table>
            </div>
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
import moment from 'moment';
import Api from "../../../../apis/api";
export default {
components: { DatePicker },
    data(){
        return{
            feeInstallment: [],     
            no_of_installment:"",
            start_from:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            repeat_months:"",
            installment_amount :"",

        };
    },



    computed:{
        ...mapGetters({
            installmentModel:'student/getShowInstallmentModal',
            studentDetail:'student/getStudentDetail',
        }),

        commited_fee(){
          var commitedFee =  this.studentDetail.remaining_fee ;
          return commitedFee ;
        },
    },

    methods:{
        saveInstallment(){
            this.$refs.installmentForm.validate().then((success) => {
                if(!success){
                    return ;
                }
                return new Promise((resolve , reject ) => {
                    const data = { id : this.studentDetail.id , commited_fee : this.commited_fee , repeat_months : this.repeat_months , no_of_installment : this.no_of_installment , start_from : this.start_from , installment_amount : this.installment_amount , installments: this.feeInstallment };
                    Api().post('/save-fee-installment' , data)
                    .then((response) => {
                      this.$store.commit('student/SET_STUDENT_FEE_INSTALLMENT' , response.data.data)
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
            this.no_of_installment = "";
            this.repeat_months = "";
            this.$store.commit('student/SHOW_FEE_INSTALLMENT_MODAL' , false);
        },

        resetForm(){
            this.$refs.installmentForm.reset();
        },

  calculateInstallment(){
    if(this.commited_fee != "" && this.commited_fee != 0 && this.start_from != "" && this.installment_amount != "" ){
      var commitedFee = parseInt(this.commited_fee) ;
      var repeatDays = parseInt(this.repeat_months);
      var imstallmentAmount = parseInt(this.installment_amount) ;
      var applyDate = moment(this.start_from);
      this.feeInstallment = [];
      let no_of_installment = Math.ceil(commitedFee/imstallmentAmount) ;
      var amount = imstallmentAmount ;
      var balance = 0 ;
      var newdate = this.start_from ;
      for (let index = 0; index < no_of_installment  ; index++) { 
          var balanceAmount = commitedFee -  balance ;
          if(balanceAmount >= imstallmentAmount){
            this.feeInstallment.push({'payable_date': newdate , 'amount' : amount });
          }
          else if (balanceAmount < imstallmentAmount) {
            this.feeInstallment.push({'payable_date': newdate , 'amount' : balanceAmount });
          }
        balance = parseInt(balance) + imstallmentAmount
        newdate = applyDate.add(repeatDays, 'M').format("yyyy-MM-DD"); 
      }
      this.no_of_installment = no_of_installment ;
    }
  },

  resetInstallment(){
    this.feeInstallment = [];
    this.installment_amount = "";
    this.repeat_months = "";
  },

    },

}
</script>

<style>

</style>