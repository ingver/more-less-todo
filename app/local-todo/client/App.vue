<template lang="pug">

#todo-list
  //h1.page-header TODO
    span#count-badge.badge(@click = 'mode = "all"') {{ list.length }}
    span#active-badge.badge(@click = 'mode = "active"') {{ active }}
    span#done-badge.badge(@click = 'mode = "done"') {{ done }}

  add-item(@add-item = 'add')

  progress-bar(':percentage'='done / count * 100')

  .items-wrapper
    todo-item(
      v-for        = 'item in curList'
      ':id'        = 'item.id'
      ':complete'  = 'item.complete'
      ':text'      = 'item.text'
      @item-check  = 'check'
      @item-remove = 'remove'
      @item-edit   = 'edit')

  //a(href='/') Back

</template>


<script>

import AddItem from './components/AddItem.vue';
import TodoItem from './components/TodoItem.vue';
import ProgressBar from './components/ProgressBar.vue';

export default {

  name: 'app',

  components: {
    AddItem,
    ProgressBar,
    TodoItem
  },

  data: function() {
    const list = JSON.parse(localStorage.getItem('todo-list')) || [];
    list.forEach((el, index) => el.id = index);

    return { list, mode: 'all' };
  },

  computed: {
    done() {
      return this.list.filter(el => el.complete).length;
    },

    active() {
      return this.list.filter(el => !el.complete).length;
    },

    count() {
      return this.list.length;
    },

    curList() {
      if (this.mode === 'active') {
        return this.list.filter(el => !el.complete);
      } else if (this.mode === 'done') {
        return this.list.filter(el => el.complete);
      } else {
        return this.list;
      }
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

    setMode(mode) {
      this.mode = mode;
    }
  }
};

</script>

<style>

body {
  margin: 0;
  padding-top: 20px;
}

#todo-list {
  max-width: 700px;
  min-width: 350px;

  margin: 0 auto;
  padding: 10px;

  border: 1px solid #dddddd;
  border-radius: 5px;

  font-size: 18px;
}

#todo-list .items-wrapper {
  border: 1px solid #dddddd;
  border-radius: 5px;
}

@media(max-width: 600px) {
  body {
    padding: 0;
  }

  #todo-list {
    width: 100%;
    border: none;
    max-width: auto;
    min-width: auto;
    margin: auto;
  }
}

</style>
