<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <student-nav></student-nav>
      </div>
    </div>
    <b-card no-body class="p-4">
      <avatar-editor></avatar-editor>
       <ValidationObserver ref="studentForm" v-slot="{ passes}">
                <b-form class="p-2" @submit.prevent="passes(saveStudent)" @reset="resetForm">
                  <div class="container">  
                    <div class="row">
                      <!-- column 8 start here -->
                          <div class="col-lg-8">
                              <b-card-body  id="nav-scroller" ref="content" style="position:relative; height:600px; overflow-y:scroll;">
                                    <!-- row start -->
                                    <h6 class="text-primary">Add Student Basic Details <span class="text-danger">(* Field is Required )</span></h6>
                                      <div class="row">
                                        <!-- col start -->
                                        <div class="col-md-6">
                                          <ValidationProvider  vid="name" rules="required|min:3|max:50" name="name" v-slot="{ valid, errors  }">
                                                    <b-form-group id="name">
                                                      <label  for="name" >Name <span class="text-danger">*</span></label>
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
                                        <!-- col start -->
                                        <div class="col-md-6">
                                          <ValidationProvider  vid="mobile" rules="required|digits:10|numeric" name="mobile" v-slot="{ valid, errors  }">
                                                    <b-form-group id="mobile" >
                                                    <label for="mobile">Contact No. <span class="text-danger">*</span></label>
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
                                        <!-- col start -->
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
                                        <!-- col start -->
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
                                        <!-- col start -->
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
                                        <!-- col start -->

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
                                        <!-- col start -->

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
                                        <!-- col start -->

                                      </div>
                                    <!-- row end -->
                                    <h6 class="text-primary">Address Detals</h6>
                                    <div class="row">
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
                                        <!-- col start -->

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
                                        <!-- col start -->

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

                                        <!-- col start -->

                                        <div class="col-md-6">
                                          <div class="row">
                                            <div class="col-md-10">
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
                                            <div class="col-md-2">
                                                <b-link>
                                                    <i id="addLandmark" class="mdi mdi-plus font-size-24"></i>
                                                </b-link>
                                            </div>
                                          </div>
                                        </div>
                                        <!-- col start -->

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
                                        <!-- col start -->
                                    </div>
                                    <!-- row start -->
                                    <h6 class="text-primary">Gurdian Detals</h6>
                                      <div class="row">
                                        <!-- col start -->
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
                                          <!-- col start -->
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
                                        <!-- col start -->
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
                                        <!-- col start -->
                                      </div>
                                    <!-- row end -->
                              </b-card-body>
                          </div>
                      <!-- column 8 end here -->
                      <!-- column 4 start here -->
                        <div class="col-lg-4">
                          <b-card no-body>
                             <h6 class="text-primary">Academic Detals</h6>
                              <div class="row">
                                <!-- col start -->
                                <div class="col-md-12">
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

                                
                                <!-- col start -->
                                <div class="col-md-12">
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
                                <!-- col-start -->
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
                                                placeholder="Select Courses"
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

                                <!-- col start -->
                                <div class="col-md-12">
                                    <ValidationProvider  vid="batch_id" rules="" name="Batch" v-slot="{ valid, errors  }">
                                      <label class="typo__label">Select Batches</label>
                                            <multiselect 
                                                :multiple="true"
                                                v-model="selectedBatch"
                                                :close-on-select="false" 
                                                track-by="display_name"
                                                label="display_name" 
                                                :hide-selected="true"
                                                :state="errors[0] ? false : (valid ? true : null)" 
                                                :options="batches"
                                                placeholder="Select Batches"
                                            >
                                            </multiselect>
                                            <p class="text-danger small mt-1">{{ errors[0] }}</p>
                                    </ValidationProvider>
                                </div>

                                <!-- col-start -->
                                <div class="col-md-12">
                                  <ValidationProvider  vid="course_fee" rules="" name="Course Fee" v-slot="{ valid, errors  }">
                                            <b-form-group id="courseFee" label="Course Fee" label-for="courseFee">
                                                <b-form-input
                                                id="courseFee"
                                                v-model="editedItem.course_fee"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                type="text"
                                                disabled
                                                placeholder="Course Fee"
                                                ></b-form-input>
                                                <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                            </b-form-group>
                                  </ValidationProvider>
                                </div>
                                <!-- col-start -->
                                <div class="col-md-12">
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
                                <!-- col-start -->
                                <div class="col-12">
                                  <div class="row">
                                    <div class="col-md-9">
                                      <ValidationProvider  vid="commited_fee" rules="" name="Commited Fee" v-slot="{ valid, errors  }">
                                                <b-form-group id="commitedFee">
                                                    <b-form-input
                                                    id="commitedFee"
                                                    v-model="editedItem.commited_fee"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    type="text"
                                                    class="mt-2"
                                                    placeholder="Commited Fee"
                                                    :disabled="commitedFeeStatus"
                                                    ></b-form-input>
                                                    <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                                                </b-form-group>
                                      </ValidationProvider>
                                    </div>
                                    <div class="col-md-3">
                                     <b-button @click="showFeeInstallmentModel" class="mt-2" size="sm">Installment</b-button>
                                    </div>    
                                  </div>      
                                </div>
                                <!-- col-start -->
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
                                  <!-- col start -->
                                <div class="col-md-12">
                                  <b-button type="submit" class="mr-2 mb-2 " variant="info">{{buttonLevel}}</b-button>
                                  <b-button class="mr-2 mb-2 " variant="info">Reset</b-button>
                                  <b-button class="mr-2 mb-2 " variant="info">Cancel</b-button>
                                </div>
                                  <!-- col end -->

                              </div>
                          </b-card>
                        </div>
                      <!-- column 4 end here -->

                    </div>
                  </div>   
                </b-form>
        </ValidationObserver>
    </b-card>

    <b-modal
      id="croper"
      v-model="installmentModel"
      size="lg"
      title="Add Installment"
      title-class="font-18"
      hide-footer
      :no-close-on-backdrop="true"
    >
    <ValidationObserver ref="installmentForm" v-slot="{ passes}">
      <b-form class="p-2" @submit.prevent="passes(saveInstallment)" @reset="resetForm">
        <div class="container">
          <!-- row start -->
          <div class="row">
            <!-- col-start -->
              <div class="col-md-3">
                    <ValidationProvider   rules="" name="Commited Fee" v-slot="{ valid, errors  }">
                        <b-form-group id="commited" label="Commited Fee" label-for="commited">
                            <b-form-input
                            id="commited"
                            v-model="editedItem.commited_fee"
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
                      <ValidationProvider  rules="required" name="Start Date" v-slot="{ valid, errors  }">
                        <b-form-group id="startFrom" label="Start From" label-for="startFrom">
                              <date-picker
                                id="startFrom" 
                                v-model="editedItem.start_from"
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
                    <ValidationProvider   rules="required|min:1" name="Repeat Month" v-slot="{ valid, errors  }">
                        <b-form-group id="MonthRepeat" label="Repeat Month" label-for="MonthRepeat">
                            <b-form-input
                            id="MonthRepeat"
                            v-model="editedItem.repeat_months"
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
                    <ValidationProvider   rules="required|min:1" name="Installment" v-slot="{ valid, errors  }">
                        <b-form-group id="installment" label="No. Of installment" label-for="installment">
                            <b-form-input
                            id="installment"
                            v-model="editedItem.no_of_installment"
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
import moment from 'moment';
import StudentNav from './components/StudentNav.vue';
import AvatarEditor from "../../../components/widgets/AvatarEditor.vue"


/**
 * Starter component
 */
export default {
  page: {
    title: "Add Enquiry",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , DatePicker , Multiselect, StudentNav , AvatarEditor },
  data() {
    return {
      activeCourses:[],
      selectedCourses:[],
      selectedBatch:[],
      feeInstallment:[],
      editedIndex:false,
      buttonLevel:"Save Student",
      commitedFeeStatus:false,
      installmentModel:false,
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
        batches:[],
        installments:[],
        start_from:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        repeat_months :"",
        no_of_installment:"",
        enquiry_date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        assign_to:null,
      },
      defaultItem:{},
    };
  },

  computed:{
    ...mapGetters({
      countries:'master/getCountries',
      imageUrl:'avatar/getAvatarImage',
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
      standards:'course/getActiveStandards',
      batches:'course/getActiveBatches',
      durations:'master/getDurations',
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
    this.getBatches();
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
      getBatches:'course/getAllActiveBatches',
      
    }),

  showFeeInstallmentModel(){
    if(this.editedItem.commited_fee != "" && this.editedItem.commited_fee != null && this.editedItem.commited_fee != undefined){
      this.installmentModel = true ;
    }
    else{
      this.$notify({
         group: 'foo',
         title: 'Invalid Data',
         type: 'error',
         text: "Select At Least One Course"
       });
    }

  },

  hideFeeInstallmentModel(){
    this.installmentModel = false ;
  },

  calculateInstallment(){
    if(this.editedItem.commited_fee != "" && this.editedItem.commited_fee != 0 && this.editedItem.start_from != "" && this.editedItem.no_of_installment != "" ){
      var commitedFee = this.editedItem.commited_fee ;
      var repeatDays = this.editedItem.repeat_months;
      var NumberOfInstallment = this.editedItem.no_of_installment ;
      var applyDate = moment(this.editedItem.start_from);
    this.feeInstallment = [];
    let installment = Math.round(commitedFee / NumberOfInstallment) ;
    this.feeInstallment.push({'payable_date': applyDate.format("yyyy-MM-DD") , 'amount' : installment});
      for (let index = 0; index < NumberOfInstallment - 1  ; index++) {
          var newdate = applyDate.add(repeatDays, 'M').format("yyyy-MM-DD");
          this.feeInstallment.push({'payable_date': newdate , 'amount' : installment });
      }
    }
  },

  resetInstallment(){
    this.feeInstallment = [];
    this.installment.no_of_installment = "";
    this.installment.repeat_days = "";
  },



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

    saveInstallment(){
      this.$refs.installmentForm.validate().then((success) => {
        if(!success){
          return ;
        }
        this.editedItem.installments = this.feeInstallment ;
        this.hideFeeInstallmentModel();
      })
    },

  saveStudent(){
      if(this.editedIndex === true){
            this.$refs.studentForm.validate().then((success) => {
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
                if(this.selectedBatch.length > 0){
                  const batchArray = this.selectedBatch ;
                  for(let j = 0; j < batchArray.length; j++) {
                      const element = batchArray[j].id;
                      this.editedItem.batches.push(element);
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
                      this.$refs.studentForm.reset();
                      this.$router.push({path:'/student'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.studentForm.setErrors(error.response.data.errors);
                      }
                      reject(error)
                  });

              });
            });
      }
      else{
          this.$refs.studentForm.validate().then((success) => {
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

                if(this.selectedBatch.length > 0){
                  const batchArray = this.selectedBatch ;
                  for(let j = 0; j < batchArray.length; j++) {
                      const element = batchArray[j].id;
                      this.editedItem.batches.push(element);
                  }
                }
              return new Promise((resolve , reject ) => {
                  const data = {...this.editedItem , image : this.imageUrl }
                  Api().post('/student-registration' , data)
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
                      this.$refs.studentForm.reset();
                       this.$router.push({path:'/student'});
                      resolve(response);
                  })
                  .catch((error) => {
                      if(error){
                        this.$refs.studentForm.setErrors(error.response.data.errors);
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
