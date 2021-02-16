import firebase from 'firebase/app';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import router from './router';
import App from './App.vue';
import firebaseConfig from './plugins/firebase';
import 'firebase/auth';
import 'firebase/database';
import store from './store';

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(user => {
  store.dispatch('auth/setAuthenticatedUser', user);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }
});
