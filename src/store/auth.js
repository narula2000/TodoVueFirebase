import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    setAuthenticatedUser(context, user) {
      context.commit('setUser', user);
    },
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
        });
    }
  },
  getters: {
    authenticated(state) {
      return state.user != null;
    }
  }
};
