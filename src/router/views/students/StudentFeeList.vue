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
                      <th scope="col">Courses</th>
                      <th scope="col">Commited Fee</th>
                      <th scope="col">Remaining Fee</th>
                      <th scope="col">Installment</th>
                      <th scope="col">Next Installment Date</th>
                      <th scope="col" class="text-center">Batch</th>
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
                    



                      <td v-for="(course , index ) in item.courses" :key="index">
                        {{ course.course_name }}
                      </td>

                      <td>
                            {{ item.commited_fee ? item.commited_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}      
                      </td>

                        <td>
                            {{ item.remaining_fee ? item.remaining_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}      
                      </td>
                        <td>
                            {{ item.installment_amount ? item.installment_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}      
                      </td>
                      <td>
                            {{ item.next_installment_date ? item.next_installment_date : "N/A" }}      
                      </td>
                       <td class="text-center">
                           <div class="container" v-if="item.batches.length > 0">
                            <div class="row">
                              <div class="col-sm-12" v-for="batch in item.batches" :key="batch.id">
                                  <b-badge pill variant="primary">{{ batch.display_name }}</b-badge>
                              </div>
                            </div>
                          </div>
                          <h6 v-else>N/A</h6>
                      </td>

           

    
                      <td>
                        <b-link  variant="danger" @click="showFeePaymentModal(item)"  class="mr-1">
                          <i class="fas fa-wallet font-size-18 text-danger"></i>
                        </b-link>
                        <b-link variant="primary" >
                            <i class="mdi mdi-printer font-size-18 text-primary"></i>
                        </b-link>
                        <b-link variant="success" :to="{path: '/student-detail' , query:{id : item.id , show_detail: 'detail' }}" class="ml-1">
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

    <!-- payment modal start here  -->
 <b-modal
      v-model="feePaymentModal"
      centered
      persistent
      size="lg"
      title="Fee Payment"
      title-class="font-18"
      hide-footer
    >
      <div class="container">
        <!-- row start -->
        <h6 class="text-primary">Student Detail</h6>
          <div class="row">
            <div class="col-lg-12">
             <table class="table table-bordered">
               <tbody>
                  <tr>
                   <th>Name : </th>
                   <td>{{studentDetail.name}}</td>
                    <th>Mobile : </th>
                   <td>{{studentDetail.mobile}}</td>
                    <th>Alternate Mobile</th>
                   <td>{{studentDetail.alternate_mobile ? studentDetail.alternate_mobile : "N/A" }}</td>
                 </tr>
                  <tr>
                   <th >Reg. Date</th>
                   <td>{{studentDetail.registration_date ? studentDetail.registration_date : "N/A" }}</td>
                    <th>Success Status</th>
                   <td>{{studentDetail.success_date ? studentDetail.success_date : "N/A" }}</td>
                    <th>Status</th>
                   <td>{{studentDetail.student_status ? studentDetail.student_status : "N/A" }}</td>
                 </tr>
                  <tr>
                   <th >Commited Fee</th>
                   <td>{{ studentDetail.commited_fee ? studentDetail.commited_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                    <th>Paid Amount</th>
                   <td>{{ studentDetail.total_paid_fee ? studentDetail.total_paid_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                    <th>Remaining</th>
                   <td>{{ studentDetail.remaining_fee ? studentDetail.remaining_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                 </tr>
               </tbody>
             </table>
            </div>
          </div>
        <!-- row end -->
        <!-- row start -->
          <div class="row" >
            <div class="col-lg-12">
              <div class="accordion" role="tablist">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button block v-b-toggle.accordion-1 variant="info">Fee Installment Detail</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                      <b-table
                  :items="studentDetail.installments"
                  :fields="fields"
                  stacked="md"
                  show-empty
                  small
                  bordered
                >
                 <template #cell(payable_amount)="row">
                    {{ row.item.payable_amount ? row.item.payable_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}
                  </template>

                 <template #cell(paid_amount)="row">
                    {{ row.item.paid_amount ? row.item.paid_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true }) }}
                  </template>

                  <template #cell(balance_amount)="row">
                    {{ row.item.balance_amount ? row.item.balance_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true }) }}
                  </template>

                  <template #cell(installment_type)="row">
                    {{ row.item.installment_type ? row.item.installment_type : "N/A" | capitalize }}
                  </template>

                  <template #cell(actions)="row">
                    <b-button variant="primary" size="sm" @click="payInstallment(row.item)">
                      Pay
                    </b-button>
                     <b-button variant="warning" class="ml-2" size="sm">
                       Print
                    </b-button>
                  </template>
                </b-table>
                    </b-collapse>
                  </b-card>
              </div>
            </div>
          </div>
        <!-- row end -->
          <div class="row">
            <b-card>
              <b-card-body>
                  <ValidationObserver ref="feePaymentForm" v-slot="{ passes}">
                  <b-form  @submit.prevent="passes(saveFeePayment)" @reset="resetForm" >
                      <!-- row start -->
                      <h6 class="text-primary">Fee Payment</h6>
                      <div class="row">
                        <!-- col start -->
                        <div class="col-md-4">
                          <ValidationProvider  vid="payable_amount" rules="required" name="Payable" v-slot="{ valid, errors  }">
                          <b-form-group id="payableAmount" label="Payable" label-for="payableAmount">
                              <b-form-input
                              id="payableAmount"
                              v-model="feeEditedItem.payable_amount"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Payable"
                              disabled
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->
                        <!-- col start -->
                        <div class="col-md-4">
                          <ValidationProvider  vid="paid_amount" rules="" name="Paid Amount" v-slot="{ valid, errors  }">
                          <b-form-group id="paidAmount" label="Paid Amount" label-for="paidAmount">
                              <b-form-input
                              id="paidAmount"
                              v-model="feeEditedItem.paid_amount"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Paid Amount"
                              @change="calculatePaidFee"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->
                      <!-- col start -->
                        <div class="col-md-4">
                          <ValidationProvider  vid="balance_amount" rules="" name="Balance Amount" v-slot="{ valid, errors  }">
                          <b-form-group id="balanceAmount" label="Balance Amount" label-for="balanceAmount">
                              <b-form-input
                              id="balanceAmount"
                              v-model="feeEditedItem.balance_amount"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Balance Amount"
                              disabled
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->
                        <!-- col-start -->
                        <div class="col-md-4">
                                <ValidationProvider  vid="paid_date" rules="" name="Follow Date" v-slot="{ valid, errors  }">
                                  <b-form-group label="Paid Date" label-for="paidDate">
                                        <date-picker
                                          id="paidDate" 
                                          v-model="feeEditedItem.paid_date"
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

      

                        <!-- col start -->
                        <div class="col-lg-4">
                          <ValidationProvider  vid="commited_date" rules="" name="Commited Date" v-slot="{ valid, errors  }">
                            <b-form-group id="commitedDate" label="Commited Date" label-for="commitedDate">
                                  <date-picker
                                    id="commitedDate" 
                                    v-model="feeEditedItem.commited_date"
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
                          <div class="col-lg-4">
                          <ValidationProvider  vid="transaction_type" rules="" name="Payment Mode" v-slot="{ valid, errors  }">
                            <b-form-group id="transaction" label="Payment Mode" label-for="transaction">
                                <b-form-select
                                  id="transaction"
                                  :options="transactionTypes"
                                  v-model="feeEditedItem.transaction_type"
                                  :state="errors[0] ? false : (valid ? true : null)"
                                  type="text"
                                  value-field="value"
                                  text-field="type"
                                  aria-describedby="inputLiveFeedback"
                                  @change="changePaymentMode"
                                >
                                <template #first>
                                  <b-form-select-option :value="null" disabled>-- Payment Type --</b-form-select-option>
                                </template>
                                </b-form-select>
                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                          </div>
                        <!-- col start -->

                        <!-- col-start -->
                        <div class="col-md-4" v-if="onlineFieldStatus" >
                          <ValidationProvider  vid="transaction_id" rules="" name="Transaction Id" v-slot="{ valid, errors  }">
                          <b-form-group id="transactionId" label="Transaction Id" label-for="transactionId">
                              <b-form-input
                              id="transactionId"
                              v-model="onlineTransactionDetail.transaction_id"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Transaction Id"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->

                      </div>
                      <!-- row end -->
                

                      <!-- row start -->
                      <div class="row" v-if="chequeFieldStatus">

                        <!-- col-start -->
                          <div class="col-lg-6">
                          <ValidationProvider  vid="bank_name" rules="" name="Bank Name" v-slot="{ valid, errors  }">
                            <b-form-group id="bankName" label="Bank Name" label-for="bankName">
                                <b-form-select
                                  id="bankName"
                                  :options="banks"
                                  v-model="chequeDetail.bank_name"
                                  :state="errors[0] ? false : (valid ? true : null)"
                                  type="text"
                                  value-field="name"
                                  text-field="name"
                                  aria-describedby="inputLiveFeedback"
                                >
                                <template #first>
                                  <b-form-select-option :value="null" disabled>-- Select Bank--</b-form-select-option>
                                </template>
                                </b-form-select>
                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            </b-form-group>
                          </ValidationProvider>
                          </div>
                        <!-- col start -->

                        <!-- col-start -->
                        <div class="col-md-6">
                          <ValidationProvider  vid="branch_name" rules="" name="Branch Name" v-slot="{ valid, errors  }">
                          <b-form-group id="branchName" label="Branch Name" label-for="branchName">
                              <b-form-input
                              id="branchName"
                              v-model="chequeDetail.branch_name"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Branch Name"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->

                        <!-- col-start -->
                        <div class="col-md-4">
                          <ValidationProvider  vid="ifsc_code" rules="" name="Ifsc Code" v-slot="{ valid, errors  }">
                          <b-form-group id="ifscCode" label="Ifsc Code" label-for="ifscCode">
                              <b-form-input
                              id="ifscCode"
                              v-model="chequeDetail.ifsc_code"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Ifsc Code"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->

                            <!-- col-start -->
                        <div class="col-md-4">
                          <ValidationProvider  vid="bank_city" rules="" name="City" v-slot="{ valid, errors  }">
                          <b-form-group id="bankCity" label="City" label-for="bankCity">
                              <b-form-input
                              id="bankCity"
                              v-model="chequeDetail.bank_city"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="City"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->
                      <!-- col-start -->
                        <div class="col-md-4">
                          <ValidationProvider  vid="cheque_no" rules="" name="Cheque No." v-slot="{ valid, errors  }">
                          <b-form-group id="chequeNo" label="Cheque No." label-for="chequeNo">
                              <b-form-input
                              id="chequeNo"
                              v-model="chequeDetail.cheque_no"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Cheque No."
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->
                        <!-- col-start -->
                        <div class="col-md-4">
                          <ValidationProvider  vid="cheque_amount" rules="" name="Cheque Amount" v-slot="{ valid, errors  }">
                          <b-form-group id="chequeAmount" label="Cheque Amount" label-for="chequeAmount">
                              <b-form-input
                              id="chequeAmount"
                              v-model="chequeDetail.cheque_amount"
                              :state="errors[0] ? false : (valid ? true : null)"
                              type="text"
                              placeholder="Cheque Amount"
                              ></b-form-input>
                              <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                          </b-form-group>
                          </ValidationProvider>
                        </div>
                        <!-- col end -->

                        <!-- col-start -->
                        <div class="col-md-4">
                                <ValidationProvider  vid="cheque_date" rules="" name="Cheque Date" v-slot="{ valid, errors  }">
                                  <b-form-group label="Cheque Date" label-for="chequeDate">
                                        <date-picker
                                          id="chequeDate" 
                                          v-model="chequeDetail.cheque_date"
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

                      </div>
                      <!-- row end -->


                      <!-- row start -->
                      <div class="row">
                        <!-- col start -->
                          <div class="col-lg-12">
                              <b-button class="ml-2 float-right " type="submit" variant="info">Save</b-button>
                              <b-button class="ml-2 float-right " @click="resetFeePaymentForm" variant="info">Reset</b-button>
                              <b-button class="ml-2 float-right " @click="hideFeePaymentModal" variant="info">Close</b-button>
                          </div>
                        <!-- col end -->
                      </div>
                      <!-- row end --> 
                  </b-form>
                  </ValidationObserver>
              </b-card-body>
            </b-card>
          </div>
        <!-- row start -->
     
      </div>
    </b-modal>
    <!-- payment modal end here -->
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import DatePicker from "vue2-datepicker";
import { mapActions, mapGetters } from 'vuex';
import StudentNav from './components/StudentNav.vue';
import Api from "../../../apis/api";

/**
 * Projects-list component
 */
export default {
    name:"StudentFeeList",
  page: {
    title: "Student Fee List",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , DatePicker ,  StudentNav },
  data() {
    return {
      title: "Student Fee List",
      items: [
        {
          text: "Student Home",
          href: "/student"
        },
        {
          text: "Student Fee List",
          active: true
        }
      ],

      fields: [
        { key: 'due_date', label: 'Due Date' },
        { key: 'payable_amount', label: 'Payable Fee'},
        { key: 'paid_amount', label: 'Paid'},
        { key: 'balance_amount', label: 'Balance'},
        { key: 'installment_status', label: 'Status'},
        { key: 'installment_type', label: 'Type'},
        { key: 'actions', label: 'Actions' }
      ],

      text:"lorem ipsumm",
      feePaymentModal:false,
      onlineFieldStatus:false,
      chequeFieldStatus:false,
      studentDetail:{},
      chequeDetail:{
        bank_name:null,
        branch_name:"",
        ifsc_code:"",
        cheque_date:"",
        cheque_no:"",
        cheque_amount:"",
        bank_city:"",
      },
       emptyChequeDetail:{
        bank_name:null,
        branch_name:"",
        ifsc_code:"",
        cheque_date:"",
        cheque_no:"",
        cheque_amount:"",
        bank_city:"",
      },
      onlineTransactionDetail:{
        transaction_id:""
      },
      emptyOnlineTransactionDetail:{
        transaction_id:""
      },
      feeEditedItem:{
          installment_id:"",
          fee_category:"",
          student_id : "",
          payable_amount: "",
          transaction_id:"",
          transaction_type: "cash",
          paid_amount: "",
          balance_amount: "",
          commited_date: "",
          paid_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
      feeDefaultItem:{
          installment_id:"",
          fee_category:"",
          student_id : "",
          payable_amount: "",
          transaction_id:"",
          transaction_type: "cash",
          paid_amount: "",
          balance_amount: "",
          commited_date: "",
          paid_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
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
          students:'student/getStudentsFeeList',
          metas:'student/getStudentsFeeListMeta',
          counselors:'master/getCounselors',
          followTypes:'master/getFollowType',
          enquiryStatus:'master/getEnquiryStatus',
          sources:'master/getSources',
          transactionTypes:'master/getTransactionTypes',
          banks:'master/getBanks', 
        }),
       currentPage: {
            get() {
              let current = this.$store.state.student.studentsFeeListMeta.current_page ? this.$store.state.student.studentsFeeListMeta.current_page : 1
                return current ;
            },

            set(value) {
                this.$store.commit('student/SET_STUDENT_FEE_LIST_CURRENT_PAGE', value)
            }

        },

        per_page(){
          return this.metas.per_page
        },

        rows() {
            return this.metas.total
        },
},

  created(){
    this.getAllList();
  },

  methods:{
    ...mapActions({
      getAllStudents:'student/getStudentsFeeList',
    }),
changePaymentMode(){
  if(this.feeEditedItem.transaction_type == "online"){
    this.onlineFieldStatus = true;
    this.chequeDetail = Object.assign({} , this.emptyChequeDetail);
    this.chequeFieldStatus = false;
  }
  else if (this.feeEditedItem.transaction_type == "cheque"){
    this.chequeFieldStatus = true;
    this.onlineTransactionDetail = Object.assign({} , this.emptyOnlineTransactionDetail);
    this.onlineFieldStatus = false;
  }
  else{
    this.onlineTransactionDetail = Object.assign({} , this.emptyOnlineTransactionDetail);
    this.chequeDetail = Object.assign({} , this.emptyChequeDetail);
    this.chequeFieldStatus = false;
    this.onlineFieldStatus = false;
  }
},
payInstallment(item){
  this.feeEditedItem.payable_amount = parseInt(item.balance_amount) ;
  this.feeEditedItem.installment_id = item.id ;
  this.feeEditedItem.fee_category = item.installment_type ;
  this.feeEditedItem.due_date = item.due_date ;
  this.feeEditedItem.student_id = this.studentDetail.id ;
},

calculatePaidFee(){
  if(parseInt(this.feeEditedItem.paid_amount) > parseInt(this.feeEditedItem.payable_amount)){
    this.$notify({
      group: 'foo',
          title: 'Invalid Data',
          type: 'error',
          text: "Paid Amount Less Then Or Equal Payable Amount"
        });
          this.feeEditedItem.paid_amount = ""
          this.feeEditedItem.balance_amount = "" 
    }
    else if (this.feeEditedItem.paid_amount == 0 ){
      this.$notify({
        group: 'foo',
          title: 'Invalid Data',
          type: 'error',
          text: "Paid Amount Field is Required"
        });
       this.feeEditedItem.paid_amount = ""
        this.feeEditedItem.balance_amount = "" 
    }

     else if (this.feeEditedItem.paid_amount == null ){
      this.$notify({
        group: 'foo',
          title: 'Invalid Data',
          type: 'error',
          text: "Paid Amount Field Required Valid Amount"
        });
        this.feeEditedItem.paid_amount = "" 
        this.feeEditedItem.balance_amount = "" 
    }
    else{
      this.feeEditedItem.balance_amount = parseInt(this.feeEditedItem.payable_amount) - parseInt(this.feeEditedItem.paid_amount)
    }
},
  

  showFeePaymentModal(item){
    this.studentDetail = item ;
    this.feePaymentModal= true ;
  },

  hideFeePaymentModal(){
    this.onlineTransactionDetail = Object.assign({} , this.emptyOnlineTransactionDetail);
    this.chequeDetail = Object.assign({} , this.emptyChequeDetail);
    this.feeEditedItem = Object.assign({} , this.feeDefaultItem);
    this.feePaymentModal= false ;
  },

  resetFeePaymentForm(){},

  resetForm(){},

  saveFeePayment(){
    this.$refs.feePaymentForm.validate().then((success) => {
      if(!success){
        return ;
      }
      return new Promise((resolve , reject) => {
        const data = { ...this.feeEditedItem , ...this.chequeDetail , ...this.onlineTransactionDetail}
        Api().post('/student-fee-payment' , data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
              if(error){
                  this.$refs.feePaymentForm.setErrors(error.response.data.errors);
                }
                reject(error)
        })
      })
    })
  },

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