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
          <div class="col-lg-12">
              <div class="accordion" role="tablist">
                <b-card no-body>
                    <h5 class="text-primary">Installment Detail</h5>
                    <b-card-header header-tag="header"  class="p-1 bg-info" role="tab">
                        <b-link  v-b-toggle.accordion-2  variant="info"><i class="mdi mdi-plus text-light font-size-24"></i></b-link>
                    </b-card-header>
                    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                        <table class="table table-bordered table-info">
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
                    </b-collapse>
                </b-card>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
}
</script>

<style>

</style>