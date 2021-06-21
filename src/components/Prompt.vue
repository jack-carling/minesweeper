<template>
  <main ref="overlay">
    <section class="overlay" ref="content">
      <span class="header">Congratulations! You won!</span>
      <span>Enter your name and click save to take part in the high-scores!</span>
      <div class="input-field">
        <input id="name" type="text" autocomplete="off" v-model="name" @keyup.enter="saveHighscore" />
        <label ref="name" for="name">Name</label>
      </div>
      <div class="error" v-if="error">
        <i class="material-icons">error</i>
        {{ error }}
      </div>
      <p>
        {{ displayInfo() }}<br />
        {{ displayTime() }}
      </p>
      <div class="checkbox">
        <label>
          <input type="checkbox" class="filled-in" v-model="skipPrompt" />
          <span>Don't ask again during this session</span>
        </label>
      </div>
      <article class="buttons">
        <button class="btn grey" @click="saveHighscore">Save</button>
        <button class="btn grey lighten-2 grey-text text-darken-2" @click="skipHighscore">Skip</button>
      </article>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { capitalizeFirstLetter } from '../services/text';
import { saveHighscoreDatabase } from '../services/highscore';
import { time } from '../services/time';

export default defineComponent({
  data() {
    return {
      showScrollButton: false,
      error: '',
      name: localStorage.name || '',
      skipPrompt: sessionStorage.skipPrompt || false,
      saveScore: localStorage.saveScore || false,
    };
  },
  props: {
    time: {
      type: Number,
    },
  },
  emits: ['close-prompt'],
  methods: {
    scroll() {
      const overlay = this.$refs.overlay as HTMLElement;
      overlay.scrollTo({ top: 0, behavior: 'smooth' });
    },
    saveHighscore() {
      this.name = this.name.trim();
      if (this.name.length < 2) {
        this.error = 'Please enter at least 2 characters';
        return;
      } else if (this.name.length > 20) {
        this.error = 'Please enter no more than 20 characters';
        return;
      } else {
        this.error = '';
      }
      this.saveScore = true;
      localStorage.saveScore = true;
      localStorage.name = this.name;
      const time: number = this.time || 0;
      saveHighscoreDatabase(time);
      this.$emit('close-prompt');
    },
    skipHighscore() {
      this.saveScore = false;
      localStorage.saveScore = false;
      delete localStorage.name;
      this.$emit('close-prompt');
    },
    displayInfo() {
      const { difficulty, width, height, bombs } = localStorage;
      const custom = `${width}x${height}`;
      const difficultyText = capitalizeFirstLetter(difficulty) || `Custom ${custom}`;
      return `Board: ${difficultyText} (${bombs})`;
    },
    displayTime() {
      const result: number = this.time || 0;
      return `Time: ${time(result)}`;
    },
  },
  mounted() {
    const name = this.$refs.name as HTMLElement;
    if (this.name.length) {
      name.classList.add('active');
    }
  },
  watch: {
    name() {
      if (this.name.length >= 2 && this.name.length <= 20) {
        this.error = '';
      }
    },
    skipPrompt() {
      sessionStorage.skipPrompt = this.skipPrompt;
    },
  },
});
</script>

<style scoped>
main {
  top: 0;
  left: 0;
  position: fixed;
  min-height: 100vh;
  width: 100%;
  /* Mobile viewport bug fix */
  min-height: -webkit-fill-available;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 100;
  overflow: auto;
}
section.overlay {
  width: 100%;
  max-width: 600px;
  height: min-content;
  background-color: #f2f2f2;
  box-shadow: 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
}
span.header {
  display: block;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
div.input-field {
  margin-top: 1.5rem;
  margin-bottom: 0;
}
div.error {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: #f44336;
}
div.error i {
  font-size: 18px;
  margin-right: 0.2rem;
}
article.buttons {
  /* display: block; */
  margin-top: 1rem;
}
button {
  margin-right: 1rem;
}
div.checkbox {
  margin-top: 1rem;
}
div.checkbox span {
  height: 20px;
  font-size: 0.8rem;
  line-height: 0;
  display: flex;
  align-items: center;
}
.input-field input {
  line-height: 0 !important;
}
label,
input {
  -webkit-tap-highlight-color: transparent;
}
[type='text']:focus {
  border-bottom: 1px solid #9e9e9e !important;
  box-shadow: 0 1px 0 0 #9e9e9e !important;
}
[type='text']:focus + label {
  color: #9e9e9e !important;
}
[type='checkbox'].filled-in:not(:checked) + span:not(.lever):after {
  border: 2px solid #9e9e9e !important;
}
[type='checkbox'].filled-in:checked + span:not(.lever):after {
  border: 2px solid #9e9e9e !important;
  background-color: #9e9e9e !important;
}
[type='checkbox'] + span:not(.lever) {
  padding-left: 25px !important;
}
</style>
