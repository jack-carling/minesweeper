<template>
  <section ref="square">
    <div :class="{ bomb: square === 'bomb' }"></div>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    square: {
      type: String,
    },
  },
  mounted() {
    const square = this.$refs.square as HTMLElement;
    square.style.width = '40px';
    square.style.height = '40px';
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-top: 2px solid #fff;
  border-right: 2px solid #333;
  border-bottom: 2px solid #333;
  border-left: 2px solid #fff;
}

div.bomb {
  background-color: #444;
}
</style>
