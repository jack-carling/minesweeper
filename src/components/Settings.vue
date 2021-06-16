<template>
  <img src="../assets/logo.svg" alt="Logo" />
  <section class="difficulties">
    <button class="btn red" :class="{ 'darken-4': difficulty === 'beginner' }" @click="setDifficulty('beginner')">
      Beginner
    </button>
    <button
      class="btn red"
      :class="{ 'darken-4': difficulty === 'intermediate' }"
      @click="setDifficulty('intermediate')"
    >
      Intermediate
    </button>
    <button class="btn red" :class="{ 'darken-4': difficulty === 'expert' }" @click="setDifficulty('expert')">
      Expert
    </button>
    <button class="btn red" :class="{ 'darken-4': !difficulty }" @click="setDifficulty('')">Custom</button>
  </section>

  <section class="range">
    <span>Width: {{ width }}</span>
    <input type="range" min="5" max="20" v-model="width" @input="difficulty = ''" />
  </section>
  <section class="range">
    <span>Height: {{ height }}</span>
    <input type="range" min="5" max="15" v-model="height" @input="difficulty = ''" />
  </section>
  <section class="range">
    <span>Mines: {{ bombs }}</span>
    <input type="range" min="1" :max="maxBombs" v-model="bombs" @input="difficulty = ''" />
  </section>

  <button class="btn red play" @click="playGame">Play</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { initSettings } from '../services/settings';

export default defineComponent({
  data() {
    return {
      width: localStorage.width || 10,
      height: localStorage.height || 10,
      bombs: localStorage.bombs || 10,
      maxBombs: localStorage.maxBombs || 30,
      difficulty: localStorage.difficulty ?? 'beginner',
    };
  },
  emits: ['init'],
  methods: {
    setDifficulty(difficulty: string) {
      if (difficulty === 'beginner') {
        this.width = 10;
        this.height = 10;
        this.bombs = 10;
      } else if (difficulty === 'intermediate') {
        this.width = 15;
        this.height = 15;
        this.bombs = 35;
      } else if (difficulty === 'expert') {
        this.width = 20;
        this.height = 15;
        this.bombs = 60;
      }
      this.difficulty = difficulty;
      this.saveLocalStorage();
    },
    playGame() {
      const w = Number(this.width);
      const h = Number(this.height);
      const b = Number(this.bombs);
      initSettings(w, h, b);
      this.$emit('init');
    },
    saveLocalStorage() {
      localStorage.width = this.width;
      localStorage.height = this.height;
      localStorage.bombs = this.bombs;
      localStorage.maxBombs = this.maxBombs;
      localStorage.difficulty = this.difficulty;
    },
  },
  watch: {
    width() {
      this.maxBombs = Math.floor(this.width * this.height * 0.3);
      if (this.bombs > this.maxBombs) {
        this.bombs = this.maxBombs;
      }
      this.saveLocalStorage();
    },
    height() {
      this.maxBombs = Math.floor(this.width * this.height * 0.3);
      if (this.bombs > this.maxBombs) {
        this.bombs = this.maxBombs;
      }
      this.saveLocalStorage();
    },
    bombs() {
      this.saveLocalStorage();
    },
  },
});
</script>

<style scoped>
h1 {
  margin: 0;
}
section.difficulties {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}
section.range {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
}
input[type='range'] {
  width: 400px;
  max-width: calc(100vw - 2rem);
  border: none !important;
}
input[type='range']::-webkit-slider-runnable-track {
  background: #f2f2f2;
}
input[type='range']::-moz-range-track {
  background: #f2f2f2;
}
input[type='range']::-webkit-slider-thumb {
  background: #f44336;
}
input[type='range']::-moz-range-thumb {
  background: #f44336;
}
button.play {
  margin-top: 3rem;
}
img {
  max-width: 100%;
}
@media only screen and (max-width: 650px) {
  section.difficulties {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
