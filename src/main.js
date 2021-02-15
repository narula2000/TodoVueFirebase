import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import firebaseConfig from './plugins/firebase';

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
