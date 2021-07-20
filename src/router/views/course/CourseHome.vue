<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <course-nav></course-nav>
    <course-component></course-component>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import CourseComponent from './components/CourseComponent.vue';
import CourseNav from './components/CourseNav.vue';

/**
 * Projects-list component
 */
export default {
  page: {
    title: "Courses",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , CourseComponent, CourseNav },
  data() {
    return {
      title: "Courses",
      items: [
        {
          text: "Dashboard",
          href: "/"
        },
        {
          text: "Courses",
          active: true
        }
      ]
    };
  },
};
</script>