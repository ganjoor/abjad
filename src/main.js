import './assets/fonts/Samim.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import './assets/css/main.css'

Vue.config.productionTip = false
Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  routes: []
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
