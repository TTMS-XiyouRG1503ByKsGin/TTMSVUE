import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../components/Admin.vue'
import Login from '../components/Login.vue'
import Cinema from '../components/Cinema.vue'
import CinemaName from '../components/CinemaName.vue'
import CinemaInfo from '../components/CinemaInfo.vue'
import Play from '../components/Play.vue'
import PlayInfo from '../components/PlayInfo.vue';
import Plan from '../components/Plan.vue'
import PlanName from '../components/PlanName.vue'
import Ticket from '../components/Ticket.vue'
import TicketName from '../components/TicketName.vue'
import TicketInfo from '../components/TicketInfo.vue'
import User from '../components/User.vue';
import UserName from '../components/UserName.vue'
import Order from '../components/Order.vue'
import Unfinished from '../components/Unfinished.vue'

import store from '../store/index.js';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { authPage: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/cinema',
      children: [
        {
          path: 'cinema',
          name: 'cinema',
          component: Cinema,
          redirect: 'cinema/name',
          children: [
            {
              path: 'name',
              name: 'cinemaName',
              component: CinemaName
            },
            {
              path: 'info',
              name: 'cinemaInfo',
              component: CinemaInfo
            }
          ]
        },
        {
          path: 'play',
          name: 'play',
          component: Play,
          redirect: 'play/info',
          children: [
            {
              path: 'info',
              name: 'playInfo',
              component: PlayInfo
            }
          ]
        },
        {
          path: 'plan',
          name: 'plan',
          component: Plan,
          redirect: 'plan/name',
          children: [
            {
              path: 'name',
              name: 'planName',
              component: PlanName
            },
            {
              path: 'ticket',
              name: 'ticket',
              component: TicketInfo
            }
          ]
        },
        {
          path: 'user',
          name: 'user',
          redirect: 'user/name',
          component: User,
          children: [
            {
              path: "name",
              name: 'userName',
              component: UserName,
            }
          ]
        },
        {
          path: 'order',
          name: 'order',
          redirect: 'order/unfinished',
          component: Order,
          children: [
            {
              path: 'unfinished',
              name: 'unfinished',
              component: Unfinished,
            }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/admin'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.authPage) { //login
    //判断状态中token是否为空，来判断是否登陆
    if(store.state.auth.token){
        next("/admin");
    }
    next();
  }else{
      //进入非Login组件，即进入Admin组件时
      if(store.state.auth.token){
        //对axios设置全局配置，对所有请求都有效
        next();
      }else{
          //进入Admin组件状态中token为空时
          next("/login");
      }
  }
})


export default router;