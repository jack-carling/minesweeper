<template>
  <Settings v-if="init" @init="init = false" />
  <Game v-else @main-menu="init = true" />
</template>

<script lang="ts">
import Settings from './components/Settings.vue';
import Game from './components/Game.vue';

export default {
  data() {
    return { init: true };
  },
  components: {
    Settings,
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
  background-color: #c2c2c2;
  font-family: 'Roboto Mono', monospace;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 3rem;
}
</style>
