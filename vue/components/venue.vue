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
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored" type="submit">
                提交/更新
              </button>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" @click.prevent.stop="onDelete">
                删除
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
  import auth from '../auth';
  import mdl from 'material-design-lite/material';
  import geo from 'gps-util';

  export default {
    name: 'VenueView',
    data () {
      return {
        VenueName: '',
        UserName: '',
        Password: '',
        Wechat: '',
        Other: '',
        Coordinate: {},
        geoHash: ''
      };
    },
    watch: {},
    route: {
      data ({ to }) {
        document.title = 'OpenVenue - Venue';
        this.geoHash = to.params.geohash;
        this.Coordinate.lng = geo.geohashDecode(this.geoHash).longitude;
        this.Coordinate.lat = geo.geohashDecode(this.geoHash).latitude;
        auth.findVenue(this, {
          data: {
            geoHash: this.geoHash,
          }
        }).then((res) => {
          this.VenueName = res.venueName;
          this.UserName = res.username;
          this.Wechat = res.wechat;
          this.Other = res.other;
        });
      }
    },
    created () {
      mdl;
    },
    ready () {
      this.$nextTick(function(){
        componentHandler.upgradeAllRegistered();
      })
    },
    destroyed () {},
    methods: {
      onSubmit () {
        if(!this.Coordinate.lng || !this.Coordinate.lat) {
          this.popUp('You must set the fuck coordinate in map first.')
        }
        else if(!this.VenueName) {
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
              geoHash: this.geoHash,
              username: this.UserName,
              password: this.Password,
              wechat: this.Wechat,
              venueName: this.VenueName,
              other: this.Other,
              coordinate: this.Coordinate
            }
          };
          auth.addVenue(this, credentials, '/map').then((res) => {
            if(res) {
              this.popUp(res);
            }
          });
        }
      },
      onDelete () {
        if(!this.geoHash) {
          this.popUp('You must set the fuck venue name.')
        }
        else if(!this.Password) {
          this.popUp('You must set the fuck password.')
        }
        else {
          //TODO
          this.popUp('delete.');
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