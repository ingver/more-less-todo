<template lang="pug">

.list-group
  todo-item(
    v-for        = 'item in list'
    ':id'        = 'item.id'
    ':complete'  = 'item.complete'
    ':text'      = 'item.text'
    @item-check  = 'check'
    @item-remove = 'remove'
    @item-edit   = 'edit')

</template>


<script>

import TodoItem from './TodoItem.vue';

export default {

  name: 'todo-list',

  components: {
    TodoItem
  },

  props: ['list'],

  methods: {

    /**
     * Delegate events to parent
     */
    check(id) { this.$emit('check', id); },
    remove(id) { this.$emit('remove', id); },
    edit(id, text) { this.$emit('edit', id, text); }
  }
}

</script>
