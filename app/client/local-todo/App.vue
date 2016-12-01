<template lang="pug">

#app
  todo-list(':list'='list'
            @item-check  = 'check'
            @item-remove = 'remove'
            @item-edit   = 'edit'
            @item-add    = 'add')

</template>


<style>

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  justify-content: center;
  margin: 0;
  padding-top: 20px;
}


@media(max-width: 700px) {
  #app {
    display: block;
    padding: 0;
    min-width: 350px;
  }
}

</style>


<script>

import TodoList from '../components/TodoList.vue';

export default {

  name: 'app',

  components: {
    TodoList
  },

  data() {
    const list = JSON.parse(localStorage.getItem('todo-list')) || [];
    list.forEach((el, index) => el.id = index);

    return { list };
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

    setMode(mode) {
      this.mode = mode;
    }
  }
};

</script>
