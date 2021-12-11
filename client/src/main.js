import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import GAuth from 'vue-google-oauth2';
const gauthOption = {
  clientId: '642478901309-p57frug587aelvjnbfq51qetpdfoqrva.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
};

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(GAuth, gauthOption);

