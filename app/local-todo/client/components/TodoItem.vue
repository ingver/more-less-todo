<template lang="pug">

.item-container
  .check-wrapper
    span.todo-check.glyphicon(
      ':class' = 'checked'
      @click   = 'check')

  .text-wrapper
    input.text-edit(
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

  .remove-sign-wrapper
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

.item-container {
  display: flex;

  border-bottom: 1px solid #dddddd;
  margin-top: -1px;
  padding: 10px 0px;
}

.item-container:last-child {
  border-bottom: none;
}

.item-container > div {
  margin: 0px 10px;
}

.item-container .text-wrapper {
  flex-grow: 1;

  word-break: break-all;
}

.text-wrapper .checked-item-text {
  text-decoration: line-through;
}

.text-wrapper .text-edit {
  outline: none;
  border: 1px solid #bbbbbb;
  border-radius: 2px;
}

.check-wrapper .glyphicon-check {
  color: #70d040;
}

.remove-sign-wrapper .glyphicon-remove-sign:hover {
  color: #df5020;
}

</style>
