<script>
import appConfig from "@/app.config";

import { mapActions, mapGetters } from 'vuex';

export default {
  name: "app",
  data(){
    return{
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  },
  mounted() {},

  computed:{
    ...mapGetters({
      loading:'notification/getLoader',
    }),
  },

  methods: {
    ...mapActions({
      clearNotification: "notification/clear"
    }),

    clear () {
      // remove all notifications
      this.$notify({
        group: 'foo',
        clean: true
      })
    },
  }
};
</script>

<template>
  <div id="app">
    <b-overlay 
      :show="loading"
      no-wrap 
      variant="transparent"
      opacity="0.85"
      blur="2px"
    ></b-overlay>
    <notifications  group="foo" position="top right"/>
     

    <RouterView />
  </div>
</template>
