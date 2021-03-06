import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource'
import App from './app.vue';
import Auth from './auth'
import MapView from './components/map.vue';
import AboutView from './components/about.vue';
import VenueView from './components/venue.vue';

// install plugin
Vue.use(Router);
Vue.use(Resource);

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

// routing
let router = new Router();

router.map({
  '/map': {
    component: MapView
  },
  '/about': {
    component: AboutView
  },
  '/venue/:geohash': {
  	component: VenueView
  }
});

router.beforeEach(function () {
  window.scrollTo(0, 0)
});

router.redirect({
  '*': '/map'
});

router.start(App, '#app');

export default router;
