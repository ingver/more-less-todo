<template lang="pug">

.add-item.input-group
  input.form-control(
    v-model.lazy = 'input'
    @keyup.enter = 'add'
    placeholder  = 'What do you need to do?')

  .btn.btn-primary.input-group-addon(@click = 'add')
    | Add

</template>


<style>

.add-item {
  margin-bottom: 10px;
}

.add-item input {
  font-size: 18px;
}

</style>


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
      if (this.input === '') {
        return;
      }
      this.$emit('item-add', this.input)
      this.input = '';
    }
  }
};

</script>
