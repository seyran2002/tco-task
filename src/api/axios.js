import axios from 'axios';
import store from '../store/index'
import router from "../router/index";

axios.defaults.baseURL = 'https://reqres.in/api/'

axios.interceptors.request.use(config => {
    store.commit('changeIsPending', true)
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })
  axios.interceptors.response.use(response => {
    store.commit('changeIsPending', false)
    return response
  }, function (error) {
    store.commit('changeIsPending', false)

    //sa petq e lini 401, bayc qani vor sa real back chi u aystegh 400 a status@, 400 em drel
    if(error.response.status === 400) { //401 (for real backend)
        store.dispatch('auth/logOut').then((res) => {
          if(router.currentRoute.name !== 'Login'){
            router.push('/login')
          }
        })
    }
    return Promise.reject(error)
  })
  export default axios