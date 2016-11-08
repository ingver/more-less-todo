<template lang="pug">

#todo-list
  h1.page-header TODO
    span#count-badge.badge(@click = 'mode = "all"') {{ list.length }}
    span#active-badge.badge(@click = 'mode = "active"') {{ active }}
    span#done-badge.badge(@click = 'mode = "done"') {{ done }}

  .col-xs-12.col-sm-8.col-md-6.col-lg-4
    .panel.panel-default

      .panel-heading
        add-item(@add-item = 'add')

      .panel-body

        progress-bar(':percentage'='done / count * 100')

        todo-item(
          v-for        = 'item in curList'
          ':id'        = 'item.id'
          ':complete'  = 'item.complete'
          ':text'      = 'item.text'
          @item-check  = 'check'
          @item-remove = 'remove'
          @item-edit   = 'edit')

  a(href='/') Back

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

.badge {
  margin-left: 15px;
  background-color: #aaaaaa;
  color: white;
  text-shadow: 0px 0px 2px #001f3f;
}

.badge:hover {
  box-shadow: 1px 1px 1px #0074d9;
}

#active-badge {
  background-color: #ffdc00;
}

#done-badge {
  background-color: #2ecc40;
}

</style>
