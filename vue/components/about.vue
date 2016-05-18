<template>
  <div class="index-first-section mdl-typography--text-center">
    <div class="logo-font index-slogan">{{Description}}</div>
    <div class="logo-font index-sub-slogan">welcome to Open Venue! Find the best venue for your meetup.</div>
  </div>
</template>

<script>
  export default {
    name: 'IndexView',
    data () {
      return {
        Description: 'Introduction page'
      };
    },
    route: { },
    created () {},
    destroyed () {},
    methods: {},
    filters: {}
  }
</script>

<style type="text/css">
  
  .index-first-section {
    position: relative;
    height: 800px;
    width: auto;
    background-color: #f3f3f3;
    background: url('../assets/slide01.jpg') center 30% no-repeat;
    background-size: cover;
  }

  .logo-font {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    line-height: 1;
    color: #767777;
    font-weight: 500;
  }

  .index-slogan {
    font-size: 60px;
    padding-top: 160px;
  }

  .index-sub-slogan {
    font-size: 21px;
    padding-top: 24px;
  }
</style>