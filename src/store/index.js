import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPending: false,
  },
  getters: {
    getIsPending:(state) => state.isPending
  },
  mutations: {
    changeIsPending(state, payload){
      state.isPending = payload
    }
  },
  actions: {
  },
  modules: {
    auth: auth,
    users: users,
  }
})
