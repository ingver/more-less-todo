<template>

<!-- pug doesn't allow to v-bind style, so raw HTML -->
<div class="progress">
  <div class="progress-bar progress-bar-success"
       role="progressbar"
       :aria-valuenow="percentage"
       aria-valuemin="0"
       aria-valuemax="100"
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
