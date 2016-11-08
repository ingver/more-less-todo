<template lang="pug">

.input-group
  input.form-control(
    v-model.lazy      = 'input'
    @keyup.enter = 'add'
    placeholder  = 'What do you need to do?')

  .btn.btn-primary.input-group-addon(@click = 'add')
    | Add

</template>


<script>

export default {

  name: 'add-item',

  data() {
    return {
      input: ''
    }
  },

  methods: {
    add() {
      console.log('this.input', this.input);
      if (this.input === '') {
        return;
      }
      this.$emit('add-item', this.input)
      this.input = '';
    }
  }
};

</script>


<style>

#todo-input-add {
  border: 1px solid #ccc;
  padding: 3px;
  margin-right: 8px;
}

</style>
