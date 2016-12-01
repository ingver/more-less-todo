<template lang="pug">

.todo-list
  //h1.page-header TODO
    span#count-badge.badge(@click = 'mode = "all"') {{ list.length }}
    span#active-badge.badge(@click = 'mode = "active"') {{ active }}
    span#done-badge.badge(@click = 'mode = "done"') {{ done }}

  add-item(@item-add = 'add')

  progress-bar(':percentage' = 'progress')

  .items-wrapper(v-if = "list.length")
    todo-item(
      v-for        = 'item in curList'
      ':id'        = 'item.id'
      ':complete'  = 'item.complete'
      ':text'      = 'item.text'
      @item-check  = 'check'
      @item-remove = 'remove'
      @item-edit   = 'edit')

</template>


<style>

.todo-list {
  width: 700px;

  padding: 20px 25px;

  border: none;
  box-shadow: 0px 0px 30px #cccccc;

  font-size: 18px;
}

.todo-list .items-wrapper {
  border: 1px solid #f5f5f5;
  box-shadow: 0px 0px 10px #cccccc;
}

@media(max-width: 700px) {
  .todo-list {
    width: 100%;
    min-width: 350px;
    margin: auto;
    padding: 10px;

    border: none;
    box-shadow: none;
  }
}

</style>


<script>

import AddItem from '../components/AddItem.vue';
import ProgressBar from '../components/ProgressBar.vue';
import TodoItem from '../components/TodoItem.vue';

export default {
  name: 'todo-list',

  components: {
    AddItem,
    ProgressBar,
    TodoItem
  },

  props: ['list'],

  data() {
    return { mode: 'all' };
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
    },

    progress() {
      if (this.list.length === 0) {
        return 100;
      } else {
        return this.done / this.count * 100;
      }
    },
  },

  methods: {
    add(input) {
      this.$emit('item-add', input)
    },

    check(id) {
      this.$emit('item-check', id);
    },

    remove(id) {
      this.$emit('item-remove', id);
    },

    edit(id, editedText) {
      this.$emit('item-edit', id, editedText);
    }
  }
}

</script>
