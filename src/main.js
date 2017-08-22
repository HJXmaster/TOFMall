// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './publicAPI/routes'
import './assets/style/reset.css'
import ElementUI from 'element-ui'
import axios from 'axios'
axios.defaults.withCredentials=true;

import config from './publicAPI/config'
import './../node_modules/vue/dist/vue.js'
import 'element-ui/lib/theme-default/index.css'



Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI)


const router = new VueRouter({
	routes
})

new Vue({
  router
}).$mount('#app')
