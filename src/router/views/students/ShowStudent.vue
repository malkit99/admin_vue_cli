<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
        <div class="col-lg-3">
            <div class="row">
                <div class="col-lg-12">
                 <b-card
                    no-body
                >
                <b-card-header class="bg-white">
                    <b-avatar :src="student.user.avatar" square size="6rem"></b-avatar>
                    <span class="ml-2 text-primary">Welcome {{student.name}}</span>
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
        <div class="col-lg-9">
            <div class="row">
                <div class="col-lg-12">
                   <b-card no-body>
                        <b-tabs 
                            pills 
                            active-nav-item-class="font-weight-bold text-uppercase text-white"
                            content-class="mt-3"
                            card
                            small
                        >
                            <b-tab title="Profile" active>
                                <b-card-text>
                                    <table class="table table-bordered table-info">
                                        <tbody>
                                            <tr>
                                                <th class="text-center">Parent Name</th>
                                                <td class="text-center" >{{ student.parent_name ? student.parent_name : "N/A" | capitalize({ onlyFirstLetter: true }) }}</td>
                                                <th class="text-center">Parent Email</th>
                                                <td class="text-center" >{{ student.parent_email ? student.parent_email : "N/A" }}</td>
                                            </tr>
                                             <tr>
                                                <th class="text-center">Parent Mobile</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                                <th class="text-center">Student Email</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                            </tr>
                                             <tr>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                            </tr>
                                             <tr>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                            </tr>
                                             <tr>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                            </tr>
                                             <tr>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                                <th class="text-center">Name</th>
                                                <td class="text-center" >{{ student.parent_mobile ? student.parent_mobile : "N/A" }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </b-card-text>
                            </b-tab>
                            <b-tab title="Courses">
                                <b-card-text>
                                     <h5 class="text-primary">Course Detail</h5>
                                    <course-component></course-component>
                                </b-card-text>
                            </b-tab>
                            <b-tab title="Attendance">
                                <b-card-text>Tab contents 2</b-card-text>
                            </b-tab>
                             <b-tab title="Exam">
                                <b-card-text>Tab contents 2</b-card-text>
                            </b-tab>
                             <b-tab title="Fee">
                                <b-card-text>
                                    <h5 class="text-primary">Fee Detail</h5>
                                    <fee-component></fee-component>
                                </b-card-text>
                            </b-tab>
                            <b-tab title="Document">
                                <b-card-text>Tab contents 2</b-card-text>
                            </b-tab>
                            <b-tab title="Placment">
                                <b-card-text>Tab contents 2</b-card-text>
                            </b-tab>
                            <b-tab title="Certificate">
                                <b-card-text>Tab contents 2</b-card-text>
                            </b-tab>

                             <b-tab title="Feedback">
                                <b-card-text>Tab contents 2</b-card-text>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Api from "../../../apis/api";
import { mapGetters } from 'vuex';
import CourseComponent from "./components/CourseComponent.vue"
import FeeComponent from './components/FeeComponent.vue';

/**
 * Starter component
 */
export default {
  page: {
    title: "Starter Page",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , CourseComponent, FeeComponent},
  data() {
    return {
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
    };
  },
  mounted(){
    if(this.$route.query.id !== "" && this.$route.query.id !== undefined && this.$route.query.show_detail === "detail" ){
      this.editedIndex = true ;
      this.buttonLevel = "Update Enquiry";
      return new Promise((resolve , reject ) => {
        Api().get(`/student/${this.$route.query.id}`)
        .then((response) => {
            const data  = response.data ;
            this.$store.commit('student/SHOW_STUDENT_BY_ID' , data)
            resolve(response); 
        })
        .catch((error) => {
          reject(error)
        })
      })

    }
  },

  computed:{
      ...mapGetters({
          student:'student/getSingleStudent',
      }),
  },
  
};
</script>
