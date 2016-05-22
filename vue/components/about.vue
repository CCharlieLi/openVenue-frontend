<template>
  <div class="index-first-section mdl-typography--text-center">
    <div class="logo-font index-slogan">{{Description}}</div>
    <div class="logo-font index-sub-slogan">使用方式：地图定位->填写信息->更新/删除</div>
    <div class="logo-font index-create-character">
      Developed by <a href="https://github.com/ccharlieli">Charlie</a>
    </div>
  </div>
</template>

<script>
  import mdl from 'material-design-lite/material.js';
  export default {
    name: 'IndexView',
    data () {
      return {
        Description: '魔都合租互助小分队'
      };
    },
    route: { },
    created () {},
    ready () {
      this.$nextTick(function(){
        componentHandler.upgradeAllRegistered();
      })
    },
    destroyed () {},
    methods: {},
    filters: {}
  }
</script>

<style type="text/css">
  
  .index-first-section {
    position: relative;
    height: 100%;
    bottom:0px;
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
    padding-top: 140px;
  }

  .index-sub-slogan {
    font-size: 21px;
    padding-top: 24px;
  }

  .index-create-character {
  font-size: 21px;
  padding-top: 300px;
}

  .index-create-character a {
    text-decoration: none;
    color: #767777;
    font-weight: 300;
  }
</style>