import Vue from 'vue'
import Vuex from 'vuex'
import state from './module-example/state'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    movieData: {}
  },
  getters: {
    getMovieData(state) {
      return state.movieData
    },

  },
  mutations: {
    setMovieData(state, payload) {
      state.movieData = payload
    },
  },
  actions: {
    setMovieData({ commit }, setMovieData) {
      commit('setMovieData', setMovieData);
    },
  },
  force: {

  },
  modules: {}
})
