<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <course-nav></course-nav>
    <add-course-component></add-course-component>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import CourseNav from './components/CourseNav.vue';
import AddCourseComponent from './components/AddCourseComponent.vue';

/**
 * Starter component
 */
export default {
  page: {
    title: "Starter Page",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , CourseNav, AddCourseComponent },
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
      ]
    };
  }
};
</script>
