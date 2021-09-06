<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <course-nav></course-nav>
    <fee-structure-component></fee-structure-component>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import CourseNav from './components/CourseNav.vue';
import FeeStructureComponent from './components/FeeStructureComponent.vue';

/**
 * Projects-list component
 */
export default {
    name:"FeeStructure",
  page: {
    title: "Fee Structure",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader , CourseNav, FeeStructureComponent ,  },
  data() {
    return {
      title: "Fee Structure",
      items: [
        {
          text: "Courses Home",
          href: "/course"
        },
        {
          text: "Fee Structure",
          active: true
        }
      ]
    };
  },
};
</script>