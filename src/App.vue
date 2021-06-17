<template>
  <transition name="fade">
    <HowToPlay v-if="showHelp" @close-help="showHelp = false" />
  </transition>
  <Settings v-if="init" @init="init = false" @show-help="showHelp = true" />
  <Game v-else @main-menu="init = true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HowToPlay from './components/HowToPlay.vue';
import Settings from './components/Settings.vue';
import Game from './components/Game.vue';

export default defineComponent({
  data() {
    return {
      init: true,
      showHelp: false,
    };
  },
  components: {
    HowToPlay,
    Settings,
    Game,
  },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Quicksand&display=swap');

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
  padding: 3rem 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
