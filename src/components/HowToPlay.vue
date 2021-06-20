<template>
  <main ref="overlay">
    <section class="overlay" ref="content">
      <div class="close" @click="$emit('close-help')">
        <i class="material-icons">cancel</i>
      </div>
      <span class="header">How To Play</span>
      <p>
        Mines are scattered throughout the board, which is divided into cells. Each cell is either blank, has a mine or
        a number.
      </p>
      <article class="device">
        <span>
          <i class="material-icons">mouse</i>
          Left-click to reveal
        </span>
        <span>
          <i class="material-icons">phone_iphone</i>
          Tap to reveal
        </span>
      </article>
      <p>
        The number on a cell will indicate how many mines are adjacent to it. Using this information a cell can be
        determined safe and a cell with a potential mine can be marked with a flag.
      </p>
      <article class="device">
        <span>
          <i class="material-icons">mouse</i>
          Right-click to mark with a flag
        </span>
        <span>
          <i class="material-icons">phone_iphone</i>
          Tap and hold briefly to mark with a flag
        </span>
      </article>
      <p>
        If a number has the correct amount of flags adjacent to it the number can be clicked to open all the non-marked
        cells around it.
      </p>
      <article class="device">
        <span>
          <i class="material-icons">mouse</i>
          Left-click the number
        </span>
        <span>
          <i class="material-icons">phone_iphone</i>
          Tap the number
        </span>
      </article>
      <p>
        The game is won by either uncovering all the non-mined cells or placing all of the flags on all of the mined
        cells. By uncovering a mined cell the game is lost.
        <br /><br />
        Hint: If you're playing on a computer, press 'R' on your keyboard at any time to quickly restart the game.
      </p>
      <section class="button" v-show="showScrollButton">
        <button class="btn grey" @click="scroll">
          <i class="material-icons left">expand_less</i>
          Back to the top
        </button>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      showScrollButton: false,
    };
  },
  emits: ['close-help'],
  methods: {
    scroll() {
      const overlay = this.$refs.overlay as HTMLElement;
      overlay.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    const content = this.$refs.content as HTMLElement;

    if (window.innerHeight < content.clientHeight + 32) {
      this.showScrollButton = true;
    } else {
      content.style.alignSelf = 'center';
    }
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
  padding: 1rem;
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
section.button {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
div.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
span.header {
  font-family: 'Quicksand', sans-serif;
  font-size: 1.5rem;
}
article.device span {
  display: flex;
  align-items: center;
}
article.device i {
  font-size: 20px;
  margin-right: 0.5rem;
}
article.device span:not(:first-of-type) {
  margin-top: 0.5rem;
}
p {
  border-top: 1px solid #ebebeb;
  padding-top: 1rem;
}
p:last-of-type {
  margin-bottom: 0;
}
</style>
