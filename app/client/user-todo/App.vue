<template lang="pug">

#app
  todo-list(':list'='list'
            @item-check  = 'check'
            @item-remove = 'remove'
            @item-edit   = 'edit'
            @item-add    = 'add')

</template>


<style>

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding-top: 20px;
  min-height: 100vh;
}


@media(max-width: 600px) {
  #app {
    display: block;
    padding: 0;
  }
}

</style>


<script>

import Vue from 'vue/dist/vue.js';
import TodoList from '../components/TodoList.vue';

export default {

  name: 'app',

  components: {
    TodoList
  },

  data() {
    return { list: [] };
  },

  methods: {
    add(text) {
      const self = this;
      Vue.http.post('/u/add', { text })
        .then(res => res.json())
        .then(data => {
          self.list = data.list;
        })
        .catch(err => console.error(err));

    },

    check(id) {
      const item = this.getItemById(id);
      if (!item) {
        console.error(`Item with id ${id} not found`);
      }

      const self = this;
      Vue.http.post('/u/check', { id, complete: !item.complete })
        .then(res => res.json())
        .then(data => {
          self.list = data.list;
        })
        .catch(err => console.error(err));
    },

    remove(id) {
      const self = this;
      Vue.http.post('/u/remove', { id })
        .then(res => res.json())
        .then(data => {
          self.list = data.list;
        })
        .catch(err => console.error(err));
    },

    edit(id, text) {
      const self = this;
      Vue.http.post('/u/remove', { id, text })
        .then(res => res.json())
        .then(data => {
          self.list = data.list;
        })
        .catch(err => console.error(err));

    },

    getItemById(id) {
      for (const el of this.list) {
        if (el.id === id) {
          return el;
        }
      }
      return null;
    },

    setMode(mode) {
      //this.mode = mode;
    }
  },

  created() {
    const self = this;
    Vue.http.get('/u/get')
      .then(response => response.json())
      .then(data => {
        self.list = data.list;
      })
      .catch(err => {
        console.error('Failed to fetch TODO list', err);
      });
  }
};

</script>
