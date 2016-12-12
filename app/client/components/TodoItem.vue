<template lang="pug">

.item-container
  label.check-wrapper
    input(
      type = 'checkbox'
      ':checked' = 'complete'
      @click = 'check')
    span

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

  button.remove(@click = 'remove') X

</template>


<style scoped>

.item-container {
  display: flex;
  padding: 10px 0px;

  border-bottom: 1px solid #eeeeee;
  margin-top: -1px;
}

.item-container:last-child {
  border-bottom: none;
}

.item-container .text-wrapper {
  flex-grow: 1;
  margin: 0 10px;

  word-break: break-all;
}

.item-container .text-wrapper:hover {
  background: #f5f5f5;
  background: rgba(240, 240, 240, 0.5);
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

.item-container .check-wrapper {
  margin: 0px 10px;
}

.check-wrapper input[type="checkbox"] {
  margin: 0;
  padding: 0;
  display: none;

  color: #70d040;
  outline: none;
  background: black;
}

.check-wrapper input[type="checkbox"] + span {
  display: block;
  position: relative;
  width: 30px;
  height: 30px;

  background: none;
  border: 1px solid lightgreen;
  border-radius: 33%;

  transition: 0.3s;
}

.check-wrapper input[type="checkbox"] + span:hover {
  border: 1px solid green;
}

.check-wrapper input[type="checkbox"]:checked + span {
  background: lightgreen;
  border: 1px solid green;
}

.check-wrapper input[type="checkbox"]:checked + span::before,
.check-wrapper input[type="checkbox"]:checked + span::after {
  content: "\2713";
  position: absolute;
  width: 30px;
  padding: 0;
  margin: 0;

  color: green;
  text-align: center;
  vertical-align: middle;
  font-size: 26px;
  line-height: 30px;

  transition: 0.3s;
}

.item-container .remove {
  display: block;
  position: relative;
  margin: 0;
  margin-right: 10px;
  padding: 0;
  width: 30px;
  height: 30px;

  background: none;
  border: none;
  outline: none;

  font-size: 0px;
}

.item-container:hover .remove::before,
.item-container:hover .remove::after {
  content: "";
  position: absolute;
  display: block;
  width: 26px;
  height: 2px;
  top: 14px;
  left: 2px;

  background: #f56960;
}

.item-container:hover .remove::before {
  transform: rotate(-45deg);
}

.item-container:hover .remove::after {
  transform: rotate(45deg);
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
