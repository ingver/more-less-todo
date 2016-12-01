<template lang="pug">

.item-container
  .check-wrapper
    .todo-check.glyphicon(
      ':class' = 'checked'
      @click   = 'check')

  .text-wrapper
    input(
      type         = 'text'
      v-autofocus  = ''
      v-if         = 'editable'
      v-model      = 'editedText'
      @keyup.esc   = 'cancelEdit'
      @keyup.enter = 'endEdit'
      @blur        = 'cancelEdit'
      multiline)
    .item-text(
      v-if     = '!editable'
      ':class' = '{ "checked-item-text": complete }'
      @click   = 'edit')
      | {{ text }}

  .remove-sign-wrapper
    .remove.glyphicon.glyphicon-remove-sign('@click'='remove')

</template>


<style>

.item-container {
  display: flex;
  padding: 10px 0px;

  border-bottom: 1px solid #eeeeee;
  margin-top: -1px;
}

.item-container:last-child {
  border-bottom: none;
}

.item-container > div {
  margin: 0px 10px;
}

.item-container > div > div {
  vertical-align: middle;
}

.item-container .text-wrapper {
  flex-grow: 1;
  margin: 0;

  word-break: break-all;
}

.item-container .text-wrapper:hover {
  background: #f5f5f5;
}

.text-wrapper .checked-item-text {
  text-decoration: line-through;
}

.text-wrapper input[type="text"] {
  width: 100%;
  padding: 3px;

  border: 1px solid #bbbbbb;
  box-shadow: 0px 0px 2px #cccccc;
  outline: none;
}

.text-wrapper .item-text {
  padding: 4px;

  border-radius: 2px;
}

.check-wrapper .glyphicon-check {
  color: #70d040;
}

.check-wrapper .todo-check {
  transition: 0.3s;
}

.remove-sign-wrapper .glyphicon-remove-sign:hover {
  color: #df5020;
  transition: 0.2s;
}

</style>


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
