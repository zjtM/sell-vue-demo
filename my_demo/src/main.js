// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'

import './common/stylus/index.styl'

import { post, fetch, patch, put } from './ajax/ajax'


Vue.config.productionTip = false

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

/* eslint-disable no-new */


new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
})

