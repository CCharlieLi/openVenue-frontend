<template>
  <div class="mdl-grid form-max-width">
    <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
      <div class="mdl-card__media">
          <img class="article-image" src="../assets/contact-image.jpg" border="0" alt="">
      </div>
      <div class="mdl-card__supporting-text">
          <p>
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
          </p>
          <p>
              Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet.
          </p>
          <form id="addVenueForm" @submit.prevent.stop="onSubmit">
            <h3>Basic Information</h3>
            <!-- InputBox for venue name -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[A-Z,a-z, ,0-9]*" type="text" id="Name" v-model="venueName">
              <label class="mdl-textfield__label" for="Name">Name of venue/place</label>
              <span class="mdl-textfield__error">Letters and spaces only</span>
            </div>
            <!-- SelectBox/InputBon box for address -->
            <div class="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
              <select id="gender" class="mdl-selectfield__select" v-model="venueDistrict">
                <option v-for="option in districtOptions" v-bind:value="option">
                  {{ option }}
                </option>
              </select>
              <label class="mdl-selectfield__label" for="gender">District</label>
              <span class="mdl-selectfield__error">Select a value</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" type="text" id="address" v-model="venueAddress">
              <label class="mdl-textfield__label" for="address">Detail address</label>
            </div>
            <!-- InputBox(number) for capacity -->
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[0-9]*" type="text" id="Capacity" v-model="venueCapacity">
              <label class="mdl-textfield__label" for="Capacity">Capacity of venue</label>
              <span class="mdl-textfield__error">Numbers only</span>
            </div>
            <h3>Extra Information</h3>
            <!-- checkbox for food -->
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-food">
              <input type="checkbox" id="checkbox-food" class="mdl-checkbox__input" v-model="checkFood">
              <span class="mdl-checkbox__label">Offer food for event</span>
            </label>
            <!-- checkbox for audio/video -->
            <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-system">
              <input type="checkbox" id="checkbox-system" class="mdl-checkbox__input" v-model="checkSystem">
              <span class="mdl-checkbox__label">Offer audio/video system for event</span>
            </label>
            <h3>Owner Information</h3>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[X-Z,x-z, ,0-9]*" type="text" id="Owner" v-model="ownerName">
              <label class="mdl-textfield__label" for="Owner">Owner of this venue</label>
              <span class="mdl-textfield__error">Letters and spaces only</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[X-Z,x-z,@,0-9]*" type="text" id="Email" v-model="ownerEmail">
              <label class="mdl-textfield__label" for="Email">Email of owner</label>
              <span class="mdl-textfield__error">Letters and spaces only</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" pattern="[0-9]*" type="text" id="Tel" v-model="ownerTel">
              <label class="mdl-textfield__label" for="Tel">Tel of owner</label>
              <span class="mdl-textfield__error">Numbers only</span>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <textarea class="mdl-textfield__input" type="text" rows="5" id="Other" v-model="other"></textarea>
              <label class="mdl-textfield__label" for="Other">Other information about this venue</label>
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
  import request from 'request';

  export default {
    name: 'AddVenueView',
    data () {
      return {
        venueName: 'Office of Wiredcraft',
        venueDistrict: 'Jing An',
        venueAddress: 'Wu Ding Xi Road',
        venueCapacity: 120,

        districtOptions: ['Jing An', 'Xu Hui', 'Pu Dong'],

        checkFood: true,
        checkSystem: true,

        ownerName: '123',
        ownerEmail: '123',
        ownerTel: '12345678901',

        other: 'xyz'
      };
    },
    route: { },
    created () {},
    destroyed () {},
    methods: {
      onSubmit () {
        let options = {
          method: 'POST',
          uri: 'http://0.0.0.0:3000/api/Venues',
          json: true, // Automatically stringifies the body to JSON 
          body: {
            "Name": this.venueName,
            "District": this.venueDistrict,
            "Address":  this.venueAddress,
            "Capacity": this.venueCapacity,
            "Food": this.checkFood,
            "AudioAndVideo": this.checkSystem,
            "Owner": this.ownerName,
            "Email": this.ownerEmail,
            "Tel": this.ownerTel,
            "Other": this.other
          }
        };
        request(options, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            document.getElementById("addVenueForm").reset()
            this.popUp('Venue added successfully!');
          } else {
            this.popUp('Venue added error!');
          }
        });
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