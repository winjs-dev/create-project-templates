import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: '多端框架'
  },
  getters,
  modules: {}
});

export default store;
