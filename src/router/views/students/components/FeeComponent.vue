<template>
  <div class="container">
      <div class="row">
          <div class="col-lg-12" >
              <table class="table table-bordered table-info ">
                  <thead>
                      <tr>
                          <th>Total Course Fee</th>
                          <th>Discount</th>
                          <th>Commited Fee</th>
                          <th>Total Paid</th>
                          <th>Remaining</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                         <td>{{ student.course_fee ? student.course_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true }) }}</td>
                         <td>{{ student.discount ? student.discount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                         <td>{{ student.commited_fee ? student.commited_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true }) }}</td>
                         <td>12600</td>
                         <td>12600</td>
                      </tr>
                  </tbody>
              </table>
          </div>
       
          <div class="col-12 mb-2">
                <div class="button-items">
                    <b-button class="float-right" @click="addExtraInstallment" variant="primary">Add Installment</b-button>
                </div>
          </div>
          <div class="col-lg-12">
              <div class="accordion" role="tablist">
                <b-card no-body>
                    <b-card-header header-tag="header"  class="p-1 bg-info" role="tab">
                            <b-link  v-b-toggle.accordion-2 class="text-light"  variant="info"><h5 class="text-primary text-light p-2">Installment Detail</h5></b-link>   
                    </b-card-header>
                    <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
                        <table class="table table-bordered table-info" v-if="installments.length > 0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Due Date</th>
                                    <th>Payable Amount</th>
                                    <th>Paid Date</th>
                                    <th>Paid Amount</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="( install , index ) in installments " :key="index">
                                    <td>{{ index + 1}}</td>
                                    <td>{{ install.due_date ? install.due_date : "N/A"}}</td>
                                    <td>{{ install.payable_amount ? install.payable_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                                    <td>{{ install.paid_date ? install.paid_date : "N/A"}}</td>
                                    <td>{{ install.paid_amount ? install.paid_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                                    <td>{{ install.balance_amount ? install.balance_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                                    <td>{{ install.installment_status}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="row" v-else >
                            <div class="col-lg-12">
                                <p class="text-danger text-center">There is no Data to show</p>
                                <p class="text-center"><b-button @click="addInstallment" variant="info">Add Installment</b-button></p>
                            </div>
                        </div>
                    </b-collapse>
                </b-card>
              </div>
          </div>
      </div>
      <!-- add fee installment component start here -->
            <fee-installment-component></fee-installment-component>  
      <!-- add fee installment component end here -->

    <!-- add extra fee installment component start here -->
            <add-extra-fee-installment></add-extra-fee-installment> 
      <!-- add extra fee installment component end here -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddExtraFeeInstallment from './AddExtraFeeInstallment.vue'
import FeeInstallmentComponent from './FeeInstallmentComponent.vue'
export default {
  components: { FeeInstallmentComponent, AddExtraFeeInstallment },
    name:"FeeComponent",
    data(){
        return{}
    },

    computed:{
        ...mapGetters({
            student:'student/getSingleStudent',
            installments:'student/getInstallments',
        }),
    },

    methods:{
        addInstallment(){
            this.$store.commit('student/SET_STUDENT_DETAIL' , this.student);
            this.$store.commit('student/SHOW_FEE_INSTALLMENT_MODAL' , true);
        },

        addExtraInstallment(){
            this.$store.commit('student/SET_STUDENT_DETAIL' , this.student);
            this.$store.commit('student/SHOW_ADD_EXTRA_FEE_INSTALLMENT_MODAL' , true);
        },
    },
}
</script>

<style>

</style>