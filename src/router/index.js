import Vue from 'vue'
import Router from 'vue-router'

import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Good from '@/components/pages/Good'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Member from '@/components/pages/Member'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          name: 'ShoppingMall',
          component: ShoppingMall,
        },
        {
          path: '/categoryList',
          name: 'CategoryList',
          component: CategoryList,
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart,
        },
        {
          path: '/member',
          name: 'Member',
          component: Member,
        },
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/good',
      name: 'Good',
      component: Good,
    },
  ]
})
