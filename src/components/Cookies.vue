<template>
  <section v-if="!acceptCookies">
    <span>This site uses strictly necessary cookies to provide you with a great user experience!</span>
    <i class="material-icons" @click="close">close</i>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      acceptCookies: false,
    };
  },
  methods: {
    close() {
      this.acceptCookies = true;
      localStorage.acceptCookies = true;
    },
  },
  mounted() {
    let accept = localStorage.acceptCookies || 'false';
    accept = JSON.parse(accept);
    this.acceptCookies = accept;
  },
});
</script>

<style scoped>
section {
  background-color: #f2f2f2;
  display: flex;
  max-width: max-content;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin: auto;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 999;
  font-size: 0.8rem;
}
section i {
  cursor: pointer;
}
</style>
