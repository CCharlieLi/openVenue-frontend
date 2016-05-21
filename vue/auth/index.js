import router from '../main';
const API_URL = 'http://0.0.0.0:3000/';
const ADD_VENUE = API_URL + 'venues/addvenue/';
const FIND_ONE = API_URL + 'venues/findvenue/';
const FIND_ALL = API_URL + 'venues/findallvenues/';

export default {

  user: {
    authenticated: false
  },

  addVenue(context, creds, redirect) {
    return context.$http.post(ADD_VENUE, creds).then((data) => {
      if(data.status !== 200) {
        return data.status;
      }
      if(redirect) {
        router.go(redirect);    
      }
    }).catch((err) => {
      if(err.status === 409) {
        return 'Venue name already occupied.'
      }
      else {
        return 'Submit error.'
      }
    });
  },

  findVenue(context, creds, redirect) {
    return context.$http.post(FIND_ONE, creds).then((data) => {
      if(data.status !== 200) {
        return data.status;
      }
      return data.data.data;
    }).catch((err) => {
      window.console.log(err);
    });
  },

  findAllVenues(context) {
    return context.$http.get(FIND_ALL).then((data) => {
      if(data.status !== 200) {
        return data.status;
      }
      return data.data.data;
    }).catch((err) => {
      window.console.log(err);
    });
  },

  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if(redirect) {
        router.go(redirect)        
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
