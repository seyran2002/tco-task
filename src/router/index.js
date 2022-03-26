import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('auth/isAuth',localStorage.getItem('token')).then(()=>{
        if(store.getters['auth/getIsLoggedIn']){
          return next()
        }
        return next({
          name: 'Login'
        })
      })
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('auth/isAuth',localStorage.getItem('token')).then(()=>{
        if(store.getters['auth/getIsLoggedIn']){
          return next(from.path)  
        }
        return next()
      })  
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('auth/isAuth',localStorage.getItem('token')).then(()=>{
        if(store.getters['auth/getIsLoggedIn']){
          return next()
        }
        return next({
          name: 'Login'
        })
      })   
    }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('auth/isAuth',localStorage.getItem('token')).then(()=>{
        if(store.getters['auth/getIsLoggedIn']){
          return next()
        }
        return next({
          name: 'Login'
        })
        
      })   
    },
    props: (route) => ({
      ...route.params
    })  
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(VueRouteMiddleware({ auth }));
export default router
