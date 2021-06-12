<template>
  <Game />
</template>

<script lang="ts">
import Game from './components/Game.vue';

export default {
  name: 'App',
  components: {
    Game,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

* {
  box-sizing: border-box;
}
body {
  background-color: #eee;
  margin: 5rem 1rem 1rem 1rem;
}
#app {
  display: flex;
  justify-content: center;
}
</style>
