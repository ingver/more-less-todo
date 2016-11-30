<template>

<!-- pug doesn't allow to v-bind style, so raw HTML -->
<div class="progress-wrapper">
  <div class="my-progress-bar"
       :style="{ width: width }">
  </div>
</div>

</template>


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


<style>

.progress-wrapper {
  height: 26px;
  overflow: hidden;
  margin-bottom: 10px;

  border: 1px solid #dddddd;
  border-radius: 5px;
}

.my-progress-bar {
  height: 100%;
  background-color: #70d040;
  width: 0%;
  transition: 0.5s;
}

</style>
