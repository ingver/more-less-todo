<template>

<!-- pug doesn't allow to v-bind style, so raw HTML -->
<div class="progress-wrapper">
  <div class="my-progress-bar"
       :style="{ width: width }">
  </div>
</div>

</template>


<style>

.progress-wrapper {
  height: 30px;
  overflow: hidden;
  margin-bottom: 15px;

  border: 1px solid #f5f5f5;
  box-shadow: inset -1px 2px 5px #cccccc;
}

.my-progress-bar {
  height: 100%;
  background-color: #70d040;
  width: 0%;

  transition: 0.5s;
}

</style>


<script>

export default {
  name: 'progress-bar',
  props: ['percentage'],
  computed: {
    width() {
      return `${this.percentage}%`;
    }
  }
};

</script>
