import firebase from 'firebase/app';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import router from './router';
import App from './App.vue';
import firebaseConfig from './plugins/firebase';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
