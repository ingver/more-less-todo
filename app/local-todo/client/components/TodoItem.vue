<template lang="pug">

.row.list-group-item.todo-item
  .col-xs-1
    span.todo-check.glyphicon(
      ':class' = 'checked'
      @click   = 'check')

  .col-xs-8.col-sm-9.col-md-9.col-lg-9.word-break-constraint
    input(
      v-autofocus  = ''
      v-if         = 'editable'
      v-model      = 'editedText'
      @keyup.esc   = 'cancelEdit'
      @keyup.enter = 'endEdit'
      @blur        = 'cancelEdit'
      multiline)
    span.todo-text(
      v-if     = '!editable'
      ':class' = '{ "checked-item-text": complete }'
      @click   = 'edit')
      | {{ text }}

  .col-xs-1

  .col-xs-1.remove-sign-wrapper
    span.remove.glyphicon.glyphicon-remove-sign('@click'='remove')

</template>


<script>

export default {

  name: 'todo-item',

  props: ['id', 'text', 'complete'],

  data() {
    return {
      editable: false,
      editedText: ''
    }
  },

  computed: {
    checked() {
      return {
        'glyphicon-check': this.complete,
        'checked-box': this.complete,
        'glyphicon-unchecked': !this.complete
      };
    },
  },

  methods: {

    check() {
      this.$emit('item-check', this.id);
    },

    remove() {
      this.$emit('item-remove', this.id);
    },

    edit() {
      this.editedText = this.text;
      this.editable = true;
    },

    cancelEdit() {
      this.editable = false;
      this.editedText = this.text;
    },

    endEdit() {
      this.editable = false;
      if (this.editedText === this.text) {
        return;
      } else if(this.editedText === "") {
        this.$emit('item-remove', this.id)
      } else {
        this.$emit('item-edit', this.id, this.editedText);
      }
    }
  },

  directives: {
    autofocus: {
      inserted(el) {
        el.focus();
      }
    }
  }
};

</script>


<style>

.checked-item-text {
  text-decoration: line-through;
};

</style>
