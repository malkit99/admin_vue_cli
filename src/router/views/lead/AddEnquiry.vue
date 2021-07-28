<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <enquiry-nav></enquiry-nav>
      </div>
    </div>
    <b-card no-body class="p-4">
       <ValidationObserver ref="enquiryForm" v-slot="{ passes}">
                <b-form class="p-2" @submit.prevent="passes(saveEnquiry)" @reset="resetForm">
                  <div class="container">
                    <div class="row">
                      <!-- column 8 start here -->
                      <div class="col-lg-8"> 
                          <div class="accordion" role="tablist">
                            <b-card no-body class="mb-1" >
                              <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.accordion-1 variant="info">Basic Detail</b-button>
                              </b-card-header>
                              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                <b-card-body id="nav-scroller" ref="content" style="position:relative; height:600px; overflow-y:scroll;">
                                    <div class="row">
                                      <div class="col-md-6">
                                          <ValidationProvider  vid="source" rules="required" name="source" v-slot="{ valid, errors  }">
                                              <b-form-group id="source" label="Enquiry Source" label-for="source">
                                                  <b-form-select
                                                    id="source"
                                                    :options="sources"
                                                    v-model="editedItem.source"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    type="text"
                                                    value-field="id"
                                                    text-field="name"
                                                    aria-describedby="inputLiveFeedback"
                                                  >
                                                  <template #first>
                                                    <b-form-select-option :value="null" disabled>-- Select Source --</b-form-select-option>
                                                  </template>
                                                  </b-form-select>
                                                  <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                              </b-form-group>
                                          </ValidationProvider>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-6">
                                        <ValidationProvider  vid="name" rules="required|min:3|max:50" name="name" v-slot="{ valid, errors  }">
                                                  <b-form-group id="name" label="Name" label-for="name">
                                                      <b-form-input
                                                      id="name"
                                                      v-model="editedItem.name"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Enter Name"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-md-6">
                                        <ValidationProvider  vid="mobile" rules="required|digits:10|numeric" name="mobile" v-slot="{ valid, errors  }">
                                                  <b-form-group id="mobile" label="Phone No." label-for="mobile">
                                                      <b-form-input
                                                      id="mobile"
                                                       v-mask="'##########'"
                                                      v-model="editedItem.mobile"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Enter Mobile"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-md-6">
                                        <ValidationProvider  vid="alternate_mobile" rules="digits:10|numeric" name="alternate mobile" v-slot="{ valid, errors  }">
                                                  <b-form-group id="alternate_mobile" label="Alternate Phone No." label-for="alternate_mobile">
                                                      <b-form-input
                                                      id="alternate_mobile"
                                                      v-mask="'##########'"
                                                      v-model="editedItem.alternate_mobile"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Enter Mobile"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-md-6">
                                        <ValidationProvider  vid="email" rules="email" name="email" v-slot="{ valid, errors  }">
                                                  <b-form-group id="mobile" label="Email Address" label-for="email">
                                                      <b-form-input
                                                      id="email"
                                                      v-model="editedItem.email"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="email"
                                                      placeholder="Enter Email"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>
                                      <div class="col-md-6">
                                            <ValidationProvider  vid="gender" rules="" name="gender" v-slot="{ valid, errors  }">
                                                <b-form-group id="gender" label="Gender" label-for="gender">
                                                    <b-form-select
                                                      id="gender"
                                                      :options="genders"
                                                      v-model="editedItem.gender"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      value-field="name"
                                                      text-field="name"
                                                      aria-describedby="inputLiveFeedback"
                                                    >
                                                    <template #first>
                                                      <b-form-select-option :value="null">-- Select Gender --</b-form-select-option>
                                                    </template>
                                                    </b-form-select>
                                                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                        </div>

                                        <div class="col-md-6">
                                            <ValidationProvider  vid="qualification" rules="" name="qualification" v-slot="{ valid, errors  }">
                                                <b-form-group id="qualification" label="Qualification" label-for="qualification">
                                                    <b-form-select
                                                      id="qualification"
                                                      :options="qualifications"
                                                      v-model="editedItem.qualification"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      value-field="name"
                                                      text-field="name"
                                                      aria-describedby="inputLiveFeedback"
                                                    >
                                                    <template #first>
                                                      <b-form-select-option :value="null">-- Select Qualification --</b-form-select-option>
                                                    </template>
                                                    </b-form-select>
                                                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                </b-form-group>
                                            </ValidationProvider>
                                        </div>

                                        <div class="col-md-6">
                                          <ValidationProvider  vid="date_of_birth" rules="" name="Date Of Birth" v-slot="{ valid, errors  }">
                                            <b-form-group label="Date of Birth" label-for="dateOfBirth">
                                                  <date-picker
                                                    id="dateOfBirth" 
                                                    v-model="editedItem.date_of_birth"
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

                                     

                                      <div class="col-md-6">
                                          <ValidationProvider  vid="country_id" rules="" name="country" v-slot="{ valid, errors  }">
                                              <b-form-group id="country" label="Country" label-for="country">
                                                  <b-form-select
                                                    id="country"
                                                    :options="countries"
                                                    v-model="editedItem.country_id"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    type="text"
                                                    value-field="id"
                                                    text-field="country_name"
                                                    @change="getStates"
                                                    aria-describedby="inputLiveFeedback"
                                                  >
                                                  <template #first>
                                                    <b-form-select-option :value="null" >-- Select Country --</b-form-select-option>
                                                  </template>
                                                  </b-form-select>
                                                  <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                              </b-form-group>
                                          </ValidationProvider>
                                        </div>

                                      <div class="col-md-6">
                                        <ValidationProvider  vid="state_id" rules="" name="State" v-slot="{ valid, errors  }">
                                            <b-form-group id="state" label="State" label-for="state">
                                                <b-form-select
                                                  id="state"
                                                  :options="states"
                                                  v-model="editedItem.state_id"
                                                  :state="errors[0] ? false : (valid ? true : null)"
                                                  type="text"
                                                  value-field="id"
                                                  text-field="state_name"
                                                  @change="getDistricts"
                                                  aria-describedby="inputLiveFeedback"
                                                >
                                                <template #first>
                                                  <b-form-select-option :value="null" >-- Select State --</b-form-select-option>
                                                </template>
                                                </b-form-select>
                                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>
                                      </div>

                                      <div class="col-md-6">
                                              <ValidationProvider  vid="city_id" rules="" name="City" v-slot="{ valid, errors  }">
                                                  <b-form-group id="city_id" label="City" label-for="city_id">
                                                      <b-form-select
                                                        id="city_id"
                                                        :options="districts"
                                                        v-model="editedItem.city_id"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        type="text"
                                                        value-field="id"
                                                        text-field="district_name"
                                                        aria-describedby="inputLiveFeedback"
                                                      >
                                                      <template #first>
                                                        <b-form-select-option :value="null" >-- Select District --</b-form-select-option>
                                                      </template>
                                                      </b-form-select>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                              </ValidationProvider>
                                          </div>

                                           <div class="col-md-12">
                                                <ValidationProvider  vid="residential_address" rules="" name="Address" v-slot="{ valid, errors  }">
                                                    <b-form-group id="residentialAddress" label="Residention Address" label-for="residentialAddress">
                                                      <textarea
                                                        id="residentialAddress"
                                                        v-model="editedItem.residential_address"
                                                        class="form-control"
                                                        :maxlength="225"
                                                        :state="errors[0] ? false : (valid ? true : null)"
                                                        rows="3"
                                                      ></textarea>
                                                      <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                    </b-form-group>
                                                </ValidationProvider>
                                          </div>

                                      <div class="col-md-6">
                                        <ValidationProvider  vid="parent_name" rules="min:3|max:50" name="parent name" v-slot="{ valid, errors  }">
                                                  <b-form-group id="parent_name" label="Parent Name" label-for="parent_name">
                                                      <b-form-input
                                                      id="parent_name"
                                                      v-model="editedItem.parent_name"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Enter Parent Name"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>

                                      <div class="col-md-6">
                                        <ValidationProvider  vid="parent_mobile" rules="digits:10|numeric" name="Parent Mobile" v-slot="{ valid, errors  }">
                                                  <b-form-group id="parent_mobile" label="Parent Phone No." label-for="parent_mobile">
                                                      <b-form-input
                                                      id="parent_mobile"
                                                      v-mask="'##########'"
                                                      v-model="editedItem.parent_mobile"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Mobile"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>

                                      <div class="col-md-6">
                                        <ValidationProvider  vid="parent_email" rules="email" name="parent email" v-slot="{ valid, errors  }">
                                                  <b-form-group id="parent_email" label="Parent Email" label-for="parent_email">
                                                      <b-form-input
                                                      id="parent_email"
                                                      v-model="editedItem.parent_email"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Enter Email"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>

                                    </div>
                                </b-card-body>  
                              </b-collapse>
                            </b-card>
                             <b-card no-body class="mb-1">
                              <b-card-header header-tag="header" class="p-1" role="tab">
                                <b-button block v-b-toggle.accordion-2 variant="info">Academic Detail</b-button>
                              </b-card-header>
                              <b-collapse id="accordion-2"  accordion="my-accordion" role="tabpane">
                                <b-card-body>
                              <div class="row">
                                </div>
                                    <div class="row">
                                      <div class="col-md-6">
                                          <ValidationProvider  vid="standard_id" rules="" name="standard" v-slot="{ valid, errors  }">
                                              <b-form-group id="standard" label="Standard" label-for="standard">
                                                  <b-form-select
                                                    id="standard"
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
                                                    <b-form-select-option :value="null" disabled>-- Select Source --</b-form-select-option>
                                                  </template>
                                                  </b-form-select>
                                                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                              </b-form-group>
                                          </ValidationProvider>
                                      </div>

                                      <div class="col-lg-12">
                                            <ValidationProvider  vid="courses" rules="" name="Role Name" v-slot="{ valid, errors  }">
                                              <label class="typo__label">Select Courses</label>
                                                  <multiselect 
                                                      :multiple="true"
                                                      v-model="selectedCourses"
                                                      :close-on-select="false" 
                                                      track-by="full_name"
                                                      label="full_name" 
                                                      :hide-selected="true"
                                                      :state="errors[0] ? false : (valid ? true : null)" 
                                                      :options="activeCourses"
                                                      @input="getCoursesfee"
                                                      placeholder="Select Sebjects"
                                                  >
                                                  <template slot="option" slot-scope="props">
                                                  <div class="option__desc">
                                                  <span class="option__course_code"> 
                                                  {{ props.option.full_name }} - {{ props.option.course_code }}
                                                  </span></div>
                                                  </template>
                                                  </multiselect>
                                                  <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                              </ValidationProvider>
                                      </div>
                                      <div class="col-md-6">
                                        <ValidationProvider  vid="course_fee" rules="" name="Course Fee" v-slot="{ valid, errors  }">
                                                  <b-form-group id="courseFee" label="Commited Fee" label-for="courseFee">
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
                                     <div class="col-md-6">
                                        <ValidationProvider  vid="discount" rules="" name="Discount" v-slot="{ valid, errors  }">
                                                  <b-form-group id="name" label="Discount" label-for="discount">
                                                      <b-form-input
                                                      id="discount"
                                                      v-model="editedItem.discount"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Discount"
                                                      @change="discountCalculate"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>

                                      <div class="col-md-6">
                                        <ValidationProvider  vid="commited_fee" rules="" name="Commited Fee" v-slot="{ valid, errors  }">
                                                  <b-form-group id="commitedFee" label="Commited Fee" label-for="commitedFee">
                                                      <b-form-input
                                                      id="commitedFee"
                                                      v-model="editedItem.commited_fee"
                                                      :state="errors[0] ? false : (valid ? true : null)"
                                                      type="text"
                                                      placeholder="Commited Fee"
                                                      :disabled="commitedFeeStatus"
                                                      ></b-form-input>
                                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                  </b-form-group>
                                        </ValidationProvider>
                                      </div>

                                    


                                    </div>
                                </b-card-body>  
                              </b-collapse>
                            </b-card>
                          </div>
                      </div>
                      <!-- column 8 end here -->
                      <!-- column 4 start here -->
                          <div class="col-lg-4">
                            <b-card no-body>
                              <div class="row">
                                  <div class="col-md-6">
                                        <ValidationProvider  vid="enquiry_date" rules="" name="Enquiry Date" v-slot="{ valid, errors  }">
                                          <b-form-group label="Enquiry Date" label-for="enquiry_date">
                                                <date-picker
                                                  id="enquiry_date" 
                                                  v-model="editedItem.enquiry_date"
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
                                  <div class="col-md-6">
                                  <ValidationProvider  vid="enquiry_status" rules="required" name="enquiry status" v-slot="{ valid, errors  }">
                                    <b-form-group id="enquiryStatus" label="Enquiry Status" label-for="enquiryStatus">
                                        <b-form-select
                                          id="enquiryStatus"
                                          :options="enquiryStatus"
                                          v-model="editedItem.enquiry_status"
                                          :state="errors[0] ? false : (valid ? true : null)"
                                          type="text"
                                          value-field="id"
                                          text-field="name"
                                          aria-describedby="inputLiveFeedback"
                                        >
                                        <template #first>
                                          <b-form-select-option :value="null" disabled>-- Select Status --</b-form-select-option>
                                        </template>
                                        </b-form-select>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  </div>

                                  <div class="col-md-6">
                                  <ValidationProvider  vid="enquiry_priority" rules="required" name="Enquiry Priority" v-slot="{ valid, errors  }">
                                    <b-form-group id="enquiryPriority" label="Enquiry Priority" label-for="enquiryPriority">
                                        <b-form-select
                                          id="enquiryPriority"
                                          :options="followPriority"
                                          v-model="editedItem.enquiry_priority"
                                          :state="errors[0] ? false : (valid ? true : null)"
                                          type="text"
                                          value-field="id"
                                          text-field="name"
                                          aria-describedby="inputLiveFeedback"
                                        >
                                        <template #first>
                                          <b-form-select-option :value="null" disabled>-- Select Priority --</b-form-select-option>
                                        </template>
                                        </b-form-select>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  </div>

                                  <div class="col-md-6">
                                  <ValidationProvider  vid="follow_type" rules="required" name="Follow type" v-slot="{ valid, errors  }">
                                    <b-form-group id="followType" label="Follow Type" label-for="followType">
                                        <b-form-select
                                          id="followType"
                                          :options="followTypes"
                                          v-model="editedItem.follow_type"
                                          :state="errors[0] ? false : (valid ? true : null)"
                                          type="text"
                                          value-field="id"
                                          text-field="name"
                                          aria-describedby="inputLiveFeedback"
                                        >
                                        <template #first>
                                          <b-form-select-option :value="null" disabled>-- Select Priority --</b-form-select-option>
                                        </template>
                                        </b-form-select>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  </div>

                                  <div class="col-md-12">
                                        <ValidationProvider  vid="follow_date" rules="required" name="Follow Date" v-slot="{ valid, errors  }">
                                          <b-form-group id="followDate" label="Follow Date" label-for="followDate">
                                                <date-picker
                                                  id="followDate" 
                                                  v-model="editedItem.follow_date"
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

                                  <div class="col-md-12">
                                        <ValidationProvider  vid="follow_time" rules="" name="Follow Date" v-slot="{  errors  }">
                                          <b-form-group label="Follow Date" label-for="followDate">
                                                <date-picker 
                                                v-model="editedItem.follow_time" 
                                                type="time"
                                                format="hh:mm a"
                                                value-type="format"
                                                  :time-picker-options="{ start: '07:00', step: '00:30',end: '20:00',}"
                                                placeholder="Select time"
                                                ></date-picker>
                                              <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                              </b-form-group>
                                        </ValidationProvider>
                                  </div>

                                  <div class="col-md-12">
                                  <ValidationProvider  vid="referred_by" rules="" name="Referred By" v-slot="{ valid, errors  }">
                                    <b-form-group id="referredBy" label="Referred By" label-for="referredBy">
                                        <b-form-select
                                          id="referredBy"
                                          :options="references"
                                          v-model="editedItem.referred_by"
                                          :state="errors[0] ? false : (valid ? true : null)"
                                          type="text"
                                          value-field="id"
                                          text-field="name"
                                          aria-describedby="inputLiveFeedback"
                                        >
                                        <template #first>
                                          <b-form-select-option :value="null" disabled>-- Select Ref. By --</b-form-select-option>
                                        </template>
                                        </b-form-select>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  </div>

                                  <div class="col-md-12">
                                  <ValidationProvider  vid="assign_to" rules="" name="Assign To" v-slot="{ valid, errors  }">
                                    <b-form-group id="counselor" label="Assign To" label-for="counselor">
                                        <b-form-select
                                          id="counselor"
                                          :options="counselors"
                                          v-model="editedItem.assign_to"
                                          :state="errors[0] ? false : (valid ? true : null)"
                                          type="text"
                                          value-field="id"
                                          text-field="name"
                                          aria-describedby="inputLiveFeedback"
                                        >
                                        <template #first>
                                          <b-form-select-option :value="null" disabled>-- Select Priority --</b-form-select-option>
                                        </template>
                                        </b-form-select>
                                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  </div>

                                  <div class="col-md-12">
                                  <ValidationProvider  vid="comment" rules="" name="comment" v-slot="{ valid, errors  }">
                                    <b-form-group id="comment" label="Comment" label-for="comment">
                                      <textarea
                                        id="comment"
                                        v-model="editedItem.comments"
                                        class="form-control"
                                        :maxlength="225"
                                        :state="errors[0] ? false : (valid ? true : null)"
                                        rows="3"
                                      ></textarea>
                                      <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                    </b-form-group>
                                  </ValidationProvider>
                                  </div>
                                  <div class="col-md-12">
                                    <b-button type="submit" class="mr-2 mb-2 " variant="info">{{buttonLevel}}</b-button>
                                    <b-button class="mr-2 mb-2 " variant="info">Reset</b-button>
                                    <b-button class="mr-2 mb-2 " variant="info">Cancel</b-button>
                                  </div>

                              </div>
                            </b-card>
                          </div>
                      <!-- column 4 end here -->

                    </div>
                  </div>
                  
                </b-form>
        </ValidationObserver>
    </b-card>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import DatePicker from "vue2-datepicker";
import Multiselect from 'vue-multiselect';
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { mapActions, mapGetters } from 'vuex';
import Api from "../../../apis/api";
import EnquiryNav from "./components/EnquiryNav.vue";

/**
 * Starter component
 */
export default {
  page: {
    title: "Add Enquiry",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , DatePicker , Multiselect ,EnquiryNav },
  data() {
    return {
      activeCourses:[],
      selectedCourses:[],
      editedIndex:false,
      buttonLevel:"Add Enquiry",
      commitedFeeStatus:false,
      title: "Starter Page",
      items: [
        {
          text: "Utility",
          href: "/"
        },
        {
          text: "Starter Page",
          active: true
        }
      ],

      editedItem:{
        source:"",
        name:"",
        email:"",
        mobile:"",
        gender:null,
        date_of_birth:"",
        qualification:null,
        alternate_mobile:"",
        parent_name:"",
        parent_mobile:"",
        parent_email:"",
        commited_fee:"",
        discount:"",
        state_id:null,
        country_id:null,
        city_id:null,
        residential_address:"",
        landmark:"",
        institute_name:"",
        standard_id:null,
        courses:[],
        batch:null,
        enquiry_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        enquiry_status:1,
        enquiry_priority:1,
        follow_type:1,
        follow_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        follow_time:"",
        referred_by:null,
        assign_to:null,
        comment:"",
      },
      defaultItem:{},
    };
  },

  computed:{
    ...mapGetters({
      countries:'master/getCountries',
      states:'master/getStates',
      districts:'master/getDistricts',
      genders:'master/getGenders',
      qualifications:'master/getQualifications',
      sources:'master/getSources',
      enquiryStatus:'master/getEnquiryStatus',
      followPriority:'master/getFollowPriority',
      followTypes:'master/getFollowType',
      counselors:'master/getCounselors',
      references:'master/getReferences',
      courses:'master/getCourses',
      standards:'course/getActiveStandards',
      batches:'master/getBatches',
    }),


  },

  mounted(){
    if(this.$route.query.id !== "" && this.$route.query.id !== undefined && this.$route.query.edit === true ){
      this.editedIndex = true ;
      this.buttonLevel = "Update Enquiry";
      return new Promise((resolve , reject ) => {
        Api().get(`/enquiry/${this.$route.query.id}`)
        .then((response) => {
          this.editedItem = Object.assign({} , response.data.data );
          this.getCourseByStandardId();
          this.editedItem.courses = [];
          this.selectedCourses = response.data.courses ;
          const address = response.data.residence ;
            if(address.length > 0 ){
              for (let i = 0; i < 1 ; i++) {
                this.editedItem.address_id = address[i].id;
                this.editedItem.residential_address = address[i].address;
                this.editedItem.country_id = address[i].country_id;
                this.getStates();
                this.editedItem.state_id = address[i].state_id;
                this.getDistricts();
                this.editedItem.city_id = address[i].district_id;       
              }
            }
          resolve(response);
        })
        .catch((error) => {
          reject(error)
        })
      })

    }
  },

  created(){
    this.getActiveCountry();
    this.getStandards();
    this.firstRefrredBy();
    this.firstAssignTo();
 
  },

  methods:{

    ...mapActions({
      getActiveCountry:'master/getActiveCountry',
      getActiveStatesById:'master/getActiveStatesById',
      getActiveDistrictById:'master/getActiveDistrictById',
      getStandards:'course/getActiveStandards',
    }),

  firstAssignTo(){
      const ref = this.counselors ;
      for (let i = 0; i < ref.length; i++) {
        var index = i;
        if(index == 0){
          this.editedItem.assign_to = ref[i].id
        }
      }
  },

  firstRefrredBy(){
      const ref = this.references ;
      for (let i = 0; i < ref.length; i++) {
        var index = i;
        if(index == 0){
          this.editedItem.referred_by = ref[i].id
        }
      }
  },

    getCoursesfee(){
      const courses = this.selectedCourses  ;
      var fee = 0 ;
      for (let index = 0; index < courses.length; index++) {
        fee += parseFloat(courses[index].course_fee);
        this.editedItem.course_fee = fee ;
        this.editedItem.commited_fee = fee ;
        this.commitedFeeStatus = true ;
      }
    },

    discountCalculate(){
      const discountedFee = parseFloat(this.editedItem.course_fee) - parseFloat(this.editedItem.discount);
      this.editedItem.commited_fee = discountedFee ;
    },

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

    getStates(){
      const data = {country_id : this.editedItem.country_id }
      this.getActiveStatesById(data);
    },

    getDistricts(){
      const data = {id : this.editedItem.state_id }
      this.getActiveDistrictById(data);
    },

  saveEnquiry(){
      if(this.editedIndex === true){
            this.$refs.enquiryForm.validate().then((success) => {
              if(!success){
                return ;
              }
              if(this.selectedCourses.length > 0){
                      const coursesArray = this.selectedCourses ;
                      for(let i = 0; i < coursesArray.length; i++) {
                          const element = coursesArray[i].id;
                          this.editedItem.courses.push(element);
                      }
                  }
              return new Promise((resolve , reject ) => {
                  Api().patch(`/enquiry/${this.editedItem.id}` , this.editedItem)
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
                      this.buttonLevel = 'Add Enquiry' ;
                      this.editedIndex = false ;
                      this.editedItem = Object.assign({} , this.defaultItem);
                      this.$refs.enquiryForm.reset();
                      this.$router.push({path:'/enquiry'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.enquiryForm.setErrors(error.response.data.errors);
                      }
                      reject(error)
                  });

              });
            });
      }
      else{
          this.$refs.enquiryForm.validate().then((success) => {
              if(!success){
                return ;
              }
                  if(this.selectedCourses.length > 0){
                      const coursesArray = this.selectedCourses ;
                      for (let i = 0; i < coursesArray.length; i++) {
                          const element = coursesArray[i].id;
                          this.editedItem.courses.push(element);
                      }
                  }
              return new Promise((resolve , reject ) => {
                  Api().post('/enquiry' , this.editedItem)
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
                      this.$refs.enquiryForm.reset();
                       this.$router.push({path:'/enquiry'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.enquiryForm.setErrors(error.response.data.errors);
                      }
                      reject(error);
                  });

              });
            })
      }
    },
    resetForm(){},
  }
};
</script>
