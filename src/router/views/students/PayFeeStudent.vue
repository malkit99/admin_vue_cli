<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <student-nav></student-nav>
        <div class="row">
            <b-card-body>
                <ValidationObserver ref="searchStudentForm" v-slot="{ passes}">
                    <b-form class="p-2" @submit.prevent="passes(searchStudent)" @reset="resetForm">
                    <div class="row">
                        <div class="col-md-3">
                            <ValidationProvider  vid="enroll_id" rules="required" name="Enroll No" v-slot="{ valid, errors  }">
                            <b-form-input
                            v-model.trim="search.enroll_id"
                            :state="errors[0] ? false : (valid ? true : null)"
                            type="text"
                            placeholder="Enroll No"
                            ></b-form-input>
                            <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                            </ValidationProvider>
                        </div>
                        <div class="col-md-3">
                        <b-button  variant="info" type="submit">Search</b-button>
                        <b-button @click="resetSearch" class="ml-2" variant="info">Reset</b-button>
                        </div>
                    </div>
                    </b-form>
                </ValidationObserver>
                    </b-card-body>
        </div>
        <div class="row" v-if="studentStatus">
            <div class="col-lg-3">
                <div class="row">
                    <div class="col-lg-12" >
                        <b-card
                        no-body
                    >
                        <b-card-header class="bg-white">
                            <b-avatar :src="student.user.avatar" square size="6rem"></b-avatar>
                        </b-card-header>
                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Name</span>
                                {{ student.name ? student.name : 'N/A'| capitalize({ onlyFirstLetter: true }) }}
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Status</span>
                                {{ student.student_status ? student.student_status : 'N/A'| capitalize({ onlyFirstLetter: true }) }}
                            </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <span>Email</span>
                                {{ student.email ? student.email : 'N/A' }}
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <span>Enroll Id</span>
                                {{ student.enroll_id ? student.enroll_id : 'N/A' }}
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <span>Mobile</span>
                                {{ student.mobile ? student.mobile : 'N/A' }}
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <span>Mobile</span>
                                {{ student.alternate_mobile ? student.alternate_mobile : 'N/A' }}
                            </b-list-group-item>

                        </b-list-group>
                        <b-card-body>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                        </b-card-body>
                    </b-card>
                    </div>
                </div>
            </div>
        <div class="col-md-9">
        <!-- row start -->
            <b-card no-body>
                <b-card-body>
                    <p class="text-primary">Student Fee Detail</p>
                <div class="row">
                    <div class="col-lg-12">
                    <table class="table table-bordered table-info">
                    <tbody>
                        <tr>
                        <th >Reg. Date</th>
                        <td>{{student.registration_date ? student.registration_date : "N/A" }}</td>
                            <th>Success Status</th>
                        <td>{{student.success_date ? student.success_date : "N/A" }}</td>
                            <th>Status</th>
                        <td>{{student.student_status ? student.student_status : "N/A" }}</td>
                        </tr>
                        <tr>
                        <th >Commited Fee</th>
                        <td>{{ student.commited_fee ? student.commited_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                            <th>Paid Amount</th>
                        <td>{{ student.total_paid_fee ? student.total_paid_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                            <th>Remaining</th>
                        <td>{{ student.remaining_fee ? student.remaining_fee : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                        </tr>

                        <tr>
                        <th >Additional Amount</th>
                        <td>{{ student.total_additional_amount ? student.total_additional_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                            <th>Paid Add. Amount</th>
                        <td>{{ student.paid_additional_amount ? student.paid_additional_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                            <th>Remaining Add. Amount</th>
                        <td>{{ student.balance_additional_amount ? student.balance_additional_amount : 0 | currency( '₹ ', 0 , { spaceBetweenAmountAndSymbol: true })}}</td>
                        </tr>

                        <tr v-for="batch in batches " :key="batch.id">
                        <th >Batch</th>
                        <td colspan="5">{{ batch.batch_name ? batch.batch_name : "N/A"}}</td>
                        </tr>
                        <tr v-for="course in courses " :key="course.id">
                        <th >Courses</th>
                            <td colspan="5">{{ course.course_name ? course.course_name : "N/A"}}</td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>

                <p class="text-primary">Fee Installments Detail</p>
                <div class="row" >
                    <div class="col-12">
                             <b-table
                                :items="installments"
                                :fields="fields"
                                stacked="md"
                                head-variant="light"
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
                                    <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
                                    Fee Receipt
                                    </b-button>
                                    <b-button variant="primary" class="ml-2" :disabled="row.item.btn_status" size="sm" @click="showFeePaymentModal(row.item)">
                                    {{ row.item.status }}
                                    </b-button>

                                    <b-button variant="danger" class="ml-2" :disabled="row.item.btn_status" v-if="row.item.feeInstallmentStatus === true " size="sm" @click="showFeePaymentModal(row.item)">
                                        Delete
                                    </b-button>
                                </template>
                                <template slot="empty">
                                    <p class="text-danger text-center">There are no records to show</p>
                                    <p class="text-danger text-center"><b-button @click="addInstallment" variant="info">Add Installment</b-button></p>
                                </template>
                                    </b-table>
                    </div>
                </div>

                </b-card-body>
            </b-card>
        <!-- row end -->
        </div>
        </div>
        <div class="row" v-else>
            <div class="col-lg-12">
                <b-card>
                    <b-card-body>
                        <p class="text-danger text-center">Data Not Foud For This Query Try Again</p>
                    </b-card-body>
                </b-card>
            </div>
        </div>
        <!-- fee installment component start here -->
        <fee-installment-component></fee-installment-component>
        <!-- fee installment component end here -->
        <!-- fee payment modal start  -->
            <b-modal
                v-model="feePaymentModal"
                centered
                persistent
                size="lg"
                title="Fee Payment"
                title-class="font-18"
                hide-footer
                >
                <div class="row">
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
                </div>
            </b-modal>    

        <!-- fee payment modal end -->

        <!-- Info modal -->
            <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
                <table class="table table-info table-bordered small" v-if="feeReceipts.length > 0 ">
                <thead>
                    <tr>
                    <th>Sr. No.</th>
                    <th>Receipt No.</th>
                    <th>Paid Date</th>
                    <th>Amount</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(receipt , index ) in feeReceipts" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ receipt.receipt_no}}</td>
                    <td>{{ receipt.paid_date}}</td>
                    <td>{{ receipt.paid_amount}}</td>
                    <td>
                        <b-link variant="primary">
                            <i class="mdi mdi-printer font-size-18 text-primary"></i>
                        </b-link>
                        <b-link variant="primary">
                            <i class="mdi mdi-delete font-size-18 text-danger"></i>
                        </b-link>
                    </td>
                    </tr>
                </tbody>
                </table>
                <p v-else class="text-danger text-center ">There is no record for show</p>
            </b-modal>
        <!-- info modal end here  -->
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import StudentNav from './components/StudentNav.vue';
import DatePicker from "vue2-datepicker";
import Api from "../../../apis/api";
import { mapGetters } from 'vuex';
import FeeInstallmentComponent from './components/FeeInstallmentComponent.vue';
export default {
    name:"FeePayment",
  page: {
    title: "Fee Payment",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , DatePicker , StudentNav, FeeInstallmentComponent },
  data() {
    return {
      title: "Fee Payment",
      items: [
        {
          text: "Student Home",
          href: "/student"
        },
        {
          text: "Fee Payment",
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
        studentStatus:false,
      search:{
          enroll_id : "",
      },
      feePaymentModal:false,
      onlineFieldStatus:false,
      chequeFieldStatus:false,
      feeReceipts:[],
      // studentDetail:{},
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

    infoModal: {
        id: 'info-modal',
        title: '',
    }
    };
  },

  mounted(){
      if(this.$route.query.enroll_id != null && this.$route.query.enroll_id != "" , this.$route.query.feeListStudent == 'feeListStudent'){
          this.search.enroll_id  = this.$route.query.enroll_id ;
            return new Promise((resolve , reject ) => {
                Api().get(`/get-student-by-enroll-id/${this.$route.query.enroll_id}` )
                .then((response) => {
                    if(response.status == 200 ){
                        this.studentStatus = true ;
                        this.$store.commit('student/SET_STUDENT_FEE_DETAIL' , response.data )
                        resolve(response)
                    }
                })
                .catch((error) => {
                if(error.response.status == 404){
                    this.studentStatus = false ;
                    this.$notify({
                        group: 'foo',
                            title: 'Invalid Data',
                            type: 'error',
                            text: error.response.data.message
                        });
                    }
                    reject(error)
                })
            }); 
      }
  },

  computed:{
      ...mapGetters({
          courses : 'student/getStudentCourses',
          installments : 'student/getStudentFeeInstallments',
          batches : 'student/getStudentBatches',
          student : 'student/getSingleStudent',
          transactionTypes:'master/getTransactionTypes',
          banks:'master/getBanks',
          enrollId : 'student/getEnrollIdForFeePayment',
      }),
  },

  methods:{

      searchStudent(){
          this.$refs.searchStudentForm.validate().then((success) => {
              if(!success){
                  return ;
              }
             return new Promise((resolve , reject ) => {
                 Api().get(`/get-student-by-enroll-id/${this.search.enroll_id}` )
                 .then((response) => {
                    if(response.status == 200 ){
                        this.studentStatus = true ;
                        this.$store.commit('student/SET_STUDENT_FEE_DETAIL' , response.data )
                        resolve(response)
                    }
                 })
                 .catch((error) => {
                if(error.response.status == 404){
                    this.studentStatus = false ;
                    this.$notify({
                        group: 'foo',
                            title: 'Invalid Data',
                            type: 'error',
                            text: error.response.data.message
                        });
                     }
                     reject(error)
                 })
             }); 
          })
      },

      resetSearch(){

      },
      resetForm(){
          this.$refs.searchStudentForm.reset();
      },
    addInstallment(){
      this.$store.commit('student/SET_STUDENT_DETAIL' , this.student);
      this.$store.commit('student/SHOW_FEE_INSTALLMENT_MODAL' , true);
    },

    info(item, index, button) {
        this.infoModal.title = 'Fee Rceipt'
        this.$root.$emit('bv::show::modal', this.infoModal.id, button);
        return new Promise((resolve , reject) => {
          Api().get(`/get-fee-receipt-by-installment-id/${item.id}`)
          .then((response) => {
            this.feeReceipts = response.data.data ;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
        })
      },
      resetInfoModal() {
        this.infoModal.title = ''
      },
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
            this.feeEditedItem.payable_amount = parseInt(item.balance_amount) ;
            this.feeEditedItem.installment_id = item.id ;
            this.feeEditedItem.fee_category = item.installment_type ;
            this.feeEditedItem.due_date = item.due_date ;
            this.feeEditedItem.student_id = this.student.id ;
            this.feePaymentModal= true ;
        },

    hideFeePaymentModal(){
            this.onlineTransactionDetail = Object.assign({} , this.emptyOnlineTransactionDetail);
            this.chequeDetail = Object.assign({} , this.emptyChequeDetail);
            this.feeEditedItem = Object.assign({} , this.feeDefaultItem);
            this.feePaymentModal= false ;
    },

    resetFeePaymentForm(){
            this.$refs.feePaymentForm.reset();
    },

saveFeePayment(){
    this.$refs.feePaymentForm.validate().then((success) => {
      if(!success){
        return ;
      }
      return new Promise((resolve , reject) => {
        const data = { ...this.feeEditedItem , ...this.chequeDetail , ...this.onlineTransactionDetail}
        Api().post('/student-fee-payment' , data)
        .then((response) => {
          this.$store.commit('student/STUDENT_FEE_INSTALLMENT_UPDATE' , response.data.data );
           const message = response.data.message ;
            this.feeEditedItem = Object.assign({} , this.feeDefaultItem);
            this.$notify({
              group: 'foo',
                  title: 'Invalid Data',
                  type: 'success',
                  text: message
                });
                this.hideFeePaymentModal();
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


  },
};
</script>
