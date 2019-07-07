import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from "./views/404.vue"
import Login from "./views/Login.vue"
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/register",
      component: () => import('./views/Register.vue')
    },
    {
      path: "*",
      component: NotFound
    },{
      path: "/login",
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === "/login" || to.path === "/register") {
    next();
  } else {
    !localStorage.getItem("token") ? next("/login") : next();
  }
})


export default router;
