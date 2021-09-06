<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <course-nav></course-nav>
   <add-fee-shecdule-component></add-fee-shecdule-component>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import CourseNav from "./components/CourseNav.vue";
import AddFeeShecduleComponent from './components/AddFeeShecduleComponent.vue';

/**
 * Starter component
 */
export default {
    name:"AddFeeShecdule",
  page: {
    title: "Add Fee Shecdule",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader ,  CourseNav, AddFeeShecduleComponent,  },
  data() {
    return {
      title: "Add Fee Shecdule",
      items: [
        {
          text: "Course Home",
          href: "/course"
        },
        {
          text: "Add Fee Shecdule",
          active: true
        }
      ]
    };
  }
};
</script>
