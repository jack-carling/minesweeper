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
    <input type="range" :min="smoothRange(5)" :max="smoothRange(20)" v-model="smoothWidth" @input="difficulty = ''" />
  </section>
  <section class="range">
    <span>Height: {{ height }}</span>
    <input type="range" :min="smoothRange(5)" :max="smoothRange(15)" v-model="smoothHeight" @input="difficulty = ''" />
  </section>
  <section class="range">
    <span>Mines: {{ bombs }}</span>
    <input type="range" :min="smoothRange(1)" :max="smoothMax" v-model="smoothBombs" @input="difficulty = ''" />
  </section>

  <button class="btn red play" @click="playGame">Play</button>

  <section class="buttons">
    <button class="btn grey" @click="$emit('show-help')"><i class="material-icons left">help</i>How to play</button>
    <button class="btn grey highscore" @click="$emit('show-highscores')">
      <i class="material-icons left">emoji_events</i>Highscores
      <div class="btn-floating pulse red">NEW</div>
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { initSettings } from '../services/settings';

export default defineComponent({
  data() {
    return {
      smoothWidth: 0,
      smoothHeight: 0,
      smoothBombs: 0,
      smoothMax: 0,
      width: localStorage.width || 10,
      height: localStorage.height || 10,
      bombs: localStorage.bombs || 10,
      maxBombs: localStorage.maxBombs || 30,
      difficulty: localStorage.difficulty ?? 'beginner',
    };
  },
  emits: ['init', 'show-help', 'show-highscores'],
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
      this.smoothWidth = this.width * 1000;
      this.smoothHeight = this.height * 1000;
      this.smoothBombs = this.bombs * 1000;
      this.smoothMax = this.maxBombs * 1000;
      this.difficulty = difficulty;
      this.saveLocalStorage();
    },
    smoothRange(value: number) {
      return value * 1000;
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
  mounted() {
    this.smoothWidth = this.width * 1000;
    this.smoothHeight = this.height * 1000;
    this.smoothBombs = this.bombs * 1000;
    this.smoothMax = this.maxBombs * 1000;
  },
  watch: {
    smoothWidth() {
      this.width = Math.round(this.smoothWidth / 1000);
      this.maxBombs = Math.round(this.width * this.height * 0.3);
      this.smoothMax = (this.smoothWidth / 1000) * (this.smoothHeight / 1000) * 0.3;
      this.smoothMax = Number(this.smoothMax.toFixed(3)) * 1000;

      if (this.bombs > this.maxBombs) {
        this.bombs = this.maxBombs;
      }
      if (this.smoothBombs > this.smoothMax) {
        this.smoothBombs = this.smoothMax;
      }

      this.saveLocalStorage();
    },
    smoothHeight() {
      this.height = Math.round(this.smoothHeight / 1000);
      this.maxBombs = Math.round(this.width * this.height * 0.3);
      this.smoothMax = (this.smoothWidth / 1000) * (this.smoothHeight / 1000) * 0.3;
      this.smoothMax = Number(this.smoothMax.toFixed(3)) * 1000;

      if (this.bombs > this.maxBombs) {
        this.bombs = this.maxBombs;
      }
      if (this.smoothBombs > this.smoothMax) {
        this.smoothBombs = this.smoothMax;
      }

      this.saveLocalStorage();
    },
    smoothBombs() {
      this.bombs = Math.round(this.smoothBombs / 1000);
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
section.buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  -webkit-tap-highlight-color: transparent;
}
input[type='range']:focus {
  outline: none !important;
}
input[type='range']::-webkit-slider-runnable-track {
  background: #f2f2f2;
  height: 2px;
}
input[type='range']::-moz-range-track {
  background: #f2f2f2;
}
input[type='range']::-webkit-slider-thumb {
  background: #f44336;
  width: 24px;
  height: 24px;
  margin-top: -10px;
}
input[type='range']::-moz-range-thumb {
  background: #f44336;
  width: 24px;
  height: 24px;
}
button.play {
  margin-top: 3rem;
}
img {
  max-width: 100%;
}
button.highscore {
  position: relative;
}
button.highscore div {
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  bottom: -35px;
  font-size: 0.8rem;
}
@media only screen and (max-width: 650px) {
  section.difficulties {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 375px) {
  section.buttons {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
