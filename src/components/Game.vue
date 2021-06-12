<template>
  <div class="game" ref="game">
    <Square
      v-for="(square, i) in board"
      :key="i"
      :square="square"
      @click="handleSquare(square, i)"
      @contextmenu.prevent="handleFlag(square)"
    />
  </div>
</template>

<script lang="ts">
import Square from './Square.vue';

import board from '../services/board';
import settings from '../services/settings';

import { checkEmptySquares, revealBombs } from '../services/squares';

export default {
  components: {
    Square,
  },
  data() {
    return {
      board: [] as Array<Object>,
      gameOver: false,
      flags: 0,
    };
  },
  methods: {
    renderGameBoard() {
      this.board = [...board];
      this.flags = settings.bombs;
    },
    handleSquare(square: any, index: number) {
      if (this.gameOver) return;
      if (square.flag) return;
      if (square.value === 0) {
        if (square.type === 'bomb') {
          square.type = 'bomb-hit';
          this.board = revealBombs(this.board);
          this.gameOver = true;
        } else {
          this.board = checkEmptySquares(this.board, index);
        }
      }
      square.reveal = true;
    },
    handleFlag(square: any) {
      if (this.gameOver) return;
      if (square.reveal) return;
      square.flag = !square.flag;
    },
  },
  mounted() {
    this.renderGameBoard();
    const gameBoard = this.$refs.game as HTMLElement;
    const width = settings.width * 40 + 'px';
    const height = settings.height * 40 + 'px';
    gameBoard.style.width = width;
    gameBoard.style.height = height;
  },
};
</script>

<style scoped>
div.game {
  background-color: #eee;
  display: flex;
  flex-wrap: wrap;
}
</style>
