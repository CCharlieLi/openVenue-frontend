<template>
  <div class="mdl-grid form-max-width">
    <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
      <div class="mdl-card__media">
          <img class="article-image" src="../assets/contact-image.jpg" border="0" alt="">
      </div>
      <div class="mdl-card__supporting-text">
          <form id="signIn" @submit.prevent.stop="onSubmit">
            <h3>Sign up</h3>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[A-Z,a-z,0-9]*" type="text" id="Name" v-model="UserName">
              <label class="mdl-textfield__label" for="Name">User Name</label>
              <span class="mdl-textfield__error">Letters and numbers only</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[A-Z,a-z,0-9]*" type="password" id="Pwd" v-model="Password">
              <label class="mdl-textfield__label" for="Pwd">Password</label>
              <span class="mdl-textfield__error">Letters and numbers only</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[A-Z,a-z,0-9]*" type="password" id="PwdCf" v-model="PasswordConfirm">
              <label class="mdl-textfield__label" for="PwdCf">Password Confirm</label>
              <span class="mdl-textfield__error">Letters and numbers only</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="WeChat" v-model="Wechat">
              <label class="mdl-textfield__label" for="WeChat">WeChat</label>
            </div>
            <p>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" type="submit">
                Submit
              </button>
            </p>
          </form>
          <div id="snackbar" class="mdl-js-snackbar mdl-snackbar">
            <div class="mdl-snackbar__text"></div>
            <button class="mdl-snackbar__action" type="button"></button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    name: 'AddVenueView',
    data () {
      return {
        UserName: '',
        Password: '',
        PasswordConfirm: '',
        Wechat: ''
      };
    },
    watch: {},
    route: {},
    created () {},
    destroyed () {},
    methods: {
      onSubmit () {
        if(!this.UserName) {
          this.popUp('You must set the username.')
        }
        else if(!this.Password) {
          this.popUp('You must set the password.')
        }
        else if(!this.Wechat) {
          this.popUp('You must set the Wechat.')
        }
        else if(this.Password !== this.PasswordConfirm) {
          this.popUp('The password confirm doesn\'t match the password.')
        }
        else {
          //sign up
          let credentials = {
            data: {
              username: this.UserName,
              password: this.Password,
              wechat: this.Wechat
            }
          };
          auth.signup(this, credentials, 'map').then().catch((err) => {
            // TODO: Output error msg 
            this.popUp('Sign up error');
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