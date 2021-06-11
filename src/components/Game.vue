<template>
  <div class="game">
    <Square v-for="(square, i) in board" :key="i" :square="square" @click="handleSquare(square)" />
  </div>
</template>

<script lang="ts">
import Square from './Square.vue';

import board from '../services/board';

export default {
  components: {
    Square,
  },
  data() {
    return {
      board: [] as unknown,
    };
  },
  methods: {
    renderGameBoard() {
      this.board = [...board];
      console.log(this.board);
    },
    handleSquare(info: String) {
      console.log(info);
    },
  },
  mounted() {
    this.renderGameBoard();
  },
};
</script>

<style scoped>
div.game {
  width: 400px;
  height: 400px;
  background-color: #ccc;
  display: flex;
  flex-wrap: wrap;
}
</style>
