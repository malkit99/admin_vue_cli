<script>
import Layout from "../../layouts/auth";
import appConfig from "@/app.config";
import { mapActions } from 'vuex';


/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout },
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false
    };
  },
  computed: {
    
  },
  methods: {

  ...mapActions({
    logIn: 'auth/logIn',
    notification:'notification/notification'
  }),

   tryToLogIn(){
     this.$refs.loginForm.validate().then((success) => {
       if(!success){
         return ;
       }
        const creadential = {email : this.email , password: this.password };
        this.logIn(creadential)
        .then((response) => {
          if(response.status == 200){
            this.$router.push({name : 'default'});
          }
        })
        .catch((error) => {
          if(error.response.data.errors){
            this.$refs.loginForm.setErrors(error.response.data.errors);
          }
          if(error.response.data.message){
            const message = error.response.data.message ;
            this.$notify({
                group: 'foo',
                title: 'Invalid Data',
                type: 'error',
                text: message
              });
          }
        })
     });   
   },

   
     resetForm() {
      this.email = "";
      this.password = "";
      requestAnimationFrame(() => {
        this.$refs.loginForm.reset();
      });
    }
  }
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p>Sign in to continue to Macroword.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt height="34" />
                  </span>
                </div>
              </router-link>
            </div>
             <ValidationObserver ref="loginForm" v-slot="{ passes}">
            <b-form class="p-2" @submit.prevent="passes(tryToLogIn)" @reset="resetForm">
                 <ValidationProvider  vid="email" rules="required" name="email" v-slot="{ valid, errors  }">
                  <b-form-group id="input-group-1" label="Email" label-for="input-1">
                      <b-form-input
                        id="input-1"
                        v-model="email"
                        :state="errors[0] ? false : (valid ? true : null)"
                        type="text"
                        placeholder="Enter email"
                      ></b-form-input>
                      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                 </ValidationProvider>
                <ValidationProvider  vid="password" rules="required" name="Password" v-slot="{ valid, errors  }">
                      <b-form-group id="input-group-2" label="Password" label-for="input-2">
                        <b-form-input
                          id="input-2"
                          v-model="password"
                          type="password"
                          :state="errors[0] ? false : (valid ? true : null)"
                          placeholder="Enter password"
                        ></b-form-input>
                        <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
                      </b-form-group>
                </ValidationProvider>
              <div class="custom-control custom-checkbox">
                <input id="customControlInline" type="checkbox" class="custom-control-input" />
                <label class="custom-control-label" for="customControlInline">Remember me</label>
              </div>
              <div class="mt-3">
                <b-button type="submit" variant="primary" class="btn-block">Log In</b-button>
              </div>
              <div class="mt-4 text-center">
                <h5 class="font-size-14 mb-3">Sign in with</h5>

                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-primary text-white border-primary"
                    >
                      <i class="mdi mdi-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-info text-white border-info"
                    >
                      <i class="mdi mdi-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-danger text-white border-danger"
                    >
                      <i class="mdi mdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-4 text-center">
                <router-link tag="a" to="/forgot-password" class="text-muted">
                  <i class="mdi mdi-lock mr-1"></i> Forgot your password?
                </router-link>
              </div>
            </b-form>
             </ValidationObserver>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Don't have an account ?
            <router-link tag="a" to="/register" class="font-weight-medium text-primary">Signup now</router-link>
          </p>
          <p>
            © {{new Date().getFullYear()}} Skote. Crafted with
            <i class="mdi mdi-heart text-danger"></i> by Themesbrand
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style lang="scss" module></style>
