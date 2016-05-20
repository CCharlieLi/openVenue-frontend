<template>
  <div class="mdl-grid form-max-width">
    <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
      <div class="mdl-card__media">
          <img class="article-image" src="../assets/contact-image.jpg" border="0" alt="">
      </div>
      <div class="mdl-card__supporting-text">
          <form id="signIn" @submit.prevent.stop="onSubmit">
            <h3>房源信息</h3>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="venueName" v-model="VenueName">
              <label class="mdl-textfield__label" for="venueName">房源叫啥</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <textarea class="mdl-textfield__input" type="text" rows="5" id="Other" v-model="Other"></textarea>
              <label class="mdl-textfield__label" for="Other">还有啥！？(房子的信息，租房条件，基友要求等等)</label>
            </div>
            <h3>房主/寻合租者</h3>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="Name" v-model="UserName">
              <label class="mdl-textfield__label" for="Name">你叫啥</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="password" id="Pwd" v-model="Password">
              <label class="mdl-textfield__label" for="Pwd">密码</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="WeChat" v-model="Wechat">
              <label class="mdl-textfield__label" for="WeChat">微信</label>
            </div>
            <p>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">
                Submit
              </button>
            </p>
          </form>
      </div>
    </div>
    <div id="snackbar" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
  </div>
</template>

<script>
  'use strict';
  import auth from '../auth'

  export default {
    name: 'AddVenueView',
    data () {
      return {
        VenueName: '',
        UserName: '',
        Password: '',
        Wechat: '',
        Other: ''
      };
    },
    watch: {},
    route: {},
    created () {},
    destroyed () {},
    methods: {
      onSubmit () {
        if(!this.VenueName) {
          this.popUp('You must set the fuck venue name.')
        }
        else if(!this.Other) {
          this.popUp('You must set the information.')
        }
        else if(!this.UserName) {
          this.popUp('You must set the fuck username.')
        }
        else if(!this.Password) {
          this.popUp('You must set the fuck password.')
        }
        else if(!this.Wechat) {
          this.popUp('You must set the fuck wechat.')
        } 
        else {
          //sign up
          let credentials = {
            data: {
              username: this.UserName,
              password: this.Password,
              wechat: this.Wechat,
              venueName: this.VenueName,
              other: this.Other
            }
          };
          auth.addVenue(this, credentials, 'map').then((res) => {
            if(res) {
              this.popUp(res);
            }
          });
        }
      },
      popUp (msg) {
        let snackbarContainer = document.querySelector('#snackbar');
        let data = {message: msg};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      }
    },
    filters: {}
  }
</script>

<style>
  img.article-image {
    width: 100%;
    height: auto;
  }
  .form-max-width {
    max-width: 900px;
    margin: auto;
    width: 100%;
  }
  .form-max-width form {
    max-width: 550px;
    margin: auto;
  }
  .form-max-width h3 {
    margin-top: 36px;
    margin-bottom: 16px;
  }
  .form-max-width .mdl-textfield {
    width: 100%;
  }
  .form-max-width .mdl-checkbox {
    width: 100%;
    margin-bottom: 10px;
  }
  .form-max-width .mdl-selectfield {
    width: 100%;
  }
</style>