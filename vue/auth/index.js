import router from '../main'
const API_URL = 'http://0.0.0.0:3000/'
const LOGIN_URL = API_URL + 'sessions/create/'
const ADD_VENUE = API_URL + 'venues/addvenue/'

export default {

  user: {
    authenticated: false
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

  addVenue(context, creds, redirect) {
    return context.$http.post(ADD_VENUE, creds).then((data) => {
      if(data.status !== 200) {
        return data.status;
      }
      this.user.authenticated = true;
      if(redirect) {
        router.go(redirect);    
      }
    }).catch((err) => {
      if(err.status === 409) {
        return 'Venue name already occupied.'
      }
      else {
        return 'Sign up error.'
      }
    });
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
