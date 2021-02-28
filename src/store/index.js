import { createStore, createLogger } from 'vuex'
import {authModule} from './modules/auth.module';
import {requestsModule} from './modules/request.module';

const plugins = []

if(process.env.NODE_ENV !== 'production') {
  plugins.push(createLogger())
}

export default createStore({
  plugins: plugins,
  modules: {
    auth: authModule,
    request: requestsModule,
  },
  state() {
    return {
      messages: null,
      sideBar: false,
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    clearMessage(state) {
      state.message = null;
    },  
    openSideBar(state) {
      state.sideBar = true;
    }, 
    closeSideBar(state) {
      state.sideBar = false;
    },
  },
  actions: {
    actionSetMessage({ commit }, message) {
      commit('setMessage', message);
      setTimeout(() => {
        commit('clearMessage');
      }, 5000)
    }
  },
})
