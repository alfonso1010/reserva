import Vue from 'vue'
import Vuex from 'vuex'
import  router  from "./../router.js";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    url_base: "http://localhost/reservameback/backend/web/index.php/api/v1/",
    //url_base: "url server",
    user: {
      name: '',
    },
    errorLogin: false
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUser(state, payload) {
      state.user.name = payload.name,
      state.user.email = payload.email

    },
    loginError(state, payload){
      state.errorLogin = payload;
    },
    logout() {
      localStorage.removeItem('token');
      router.push('login');
    }
  },
  actions: {
    async login({ commit, state }, user) {
      try {
        const res = await fetch(state.url_base + '/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        const data = await res.json();
        if(data.access_token !== undefined){
          commit('setToken', data.access_token);
          localStorage.setItem('token', data.access_token);
          router.push('perfil');
        }else{
          commit('loginError',true);
        }
      } catch (error) {
        console.log('Error: ', error)
      }
    },
    getToken({commit}) {
      if(localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    },
    logout ({ commit }) {
      commit('logout')
    },
    resetErrorLogin({commit}){
      commit('loginError',false);
    }
  },
  modules: {
  }
})