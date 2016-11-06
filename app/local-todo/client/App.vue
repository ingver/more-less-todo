<template lang="pug">

#todo-list-container
  todo-list(
    ':list'   = 'list'
    '@check'  = 'check'
    '@remove' = 'remove'
    '@edit'   = 'edit')

</template>


<script>

import TodoList from './components/TodoList.vue';

export default {

  name: 'app',

  components: {
    TodoList
  },

  data: function() {
    const list = JSON.parse(localStorage.getItem('todo-list')) || [];
    list.forEach((el, index) => el.id = index);

    return {
      list
    }
  },

  methods: {
    add(text) {
      this.list.push({ text, complete: false});
      this.updateList();
    },

    check(id) {
      this.list[id].complete = !this.list[id].complete;
      this.updateList();
    },

    remove(id) {
      this.list.splice(id, 1);
      this.updateList();
    },

    edit(id, text) {
      this.list[id].text = text;
      this.updateList();
    },

    updateList() {
      this.list.forEach((el, index) => el.id = index);
      localStorage.setItem('todo-list', JSON.stringify(this.list));
    },
  }
};

</script>
