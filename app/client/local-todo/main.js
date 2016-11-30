import Vue from 'vue/dist/vue.js';
import vueResource from 'vue-resource';
import App from './App.vue';

Vue.use(vueResource);
new Vue({
  el: "#app",
  render: (h) => h(App)
});
