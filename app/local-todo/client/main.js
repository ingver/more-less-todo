import Vue from 'vue/dist/vue.js';
import vueResource from 'vue-resource';
import App from './App.vue';

/**
  * Initial setup
  * (leave until add-item feature is not implemented)
  */
localStorage.setItem('todo-list', JSON.stringify([
  { id: 1, text: 'First', complete: false },
  { id: 2, text: 'Second', complete: false },
  { id: 3, text: 'Third', complete: true }
]));

Vue.use(vueResource);
new Vue({
  el: "#todo-list",
  render: (h) => h(App)
});
