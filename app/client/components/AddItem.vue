<template lang="pug">

.add-item
  input(
    type         = 'text'
    v-model.lazy = 'input'
    @keyup.enter = 'add'
    placeholder  = 'What do you need to do?')

  button(@click = 'add')
    | Add

</template>


<style scoped>

.add-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.add-item input[type="text"] {
  flex-grow: 1;
  height: 35px;

  margin: 0;
  margin-bottom: 5px;
  margin-right: 20px;
  padding: 0px 10px;

  outline: none;
  border: none;
  border-bottom: 2px solid #8093f1;
  border-bottom: 2px solid rgba(128, 147, 241, 0.7);

  font-size: 18px;

  transition: 0.1s;
}

.add-item input:focus {
  border-bottom: 2px solid rgb(128, 147, 241);
  box-shadow: 1px 1px 1px #abb9fc;

  transition: 0.1s;
}

.add-item button {
  position: relative;
  margin: 0;
  padding: 2px;
  width: 110px;
  height: 33px;

  border: none;
  background: #ffffff;
  border: 1px solid #f5f5f5;
  box-shadow: 1px 2px 2px #cccccc;
  outline: none;

  color: #333333;
  text-transform: uppercase;
}

.add-item button:active {
  top: 2px;
  left: 4px;
  box-shadow: 0px 0px 1px #f5f5f5;
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
