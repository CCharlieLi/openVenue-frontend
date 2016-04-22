import Vue from 'vue';
import Router from 'vue-router';
import App from './app.vue';
import MapView from './components/map.vue';
import IndexView from './components/index.vue';

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/map': {
    component: MapView
  },
  '/index': {
    component: IndexView
  }
});

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/index'
})

router.start(App, '#app')
