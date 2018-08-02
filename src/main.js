// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import serviceApi from './serviceAPI.config.js'

import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tab, Tabs, PullRefresh } from 'vant'

Vue.use(Tab).use(Tabs).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(PullRefresh)

Vue.config.productionTip = false

Vue.prototype.$url = serviceApi

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
