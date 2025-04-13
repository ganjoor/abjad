import './assets/fonts/Samim.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import TrackingPlugin from './plugins/tracker.js';
import './assets/css/main.css'


Vue.config.productionTip = false
Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  routes: []
});

Vue.use(TrackingPlugin, {
  id: "1",
  status: "",
  debug: true, // optional
  router // optional
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
