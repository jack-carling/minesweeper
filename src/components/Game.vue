<template>
  <section class="info" ref="info">
    <div>
      <img src="../assets/flag.png" alt="" />
      <span>{{ displayFlags() }}</span>
    </div>
    <span>{{ displayTime() }}</span>
  </section>
  <div class="game" ref="game">
    <Square
      v-for="(square, i) in board"
      :key="i"
      :square="square"
      @click="handleSquare(square, i)"
      @contextmenu.prevent="handleFlag(square)"
    />
  </div>
  <p class="game-over" v-if="gameOver">{{ gameOverText }}</p>
</template>

<script lang="ts">
import Square from './Square.vue';

import board from '../services/board';
import settings from '../services/settings';

import { checkEmptySquares, revealBombs, revealAllValid } from '../services/squares';

export default {
  components: {
    Square,
  },
  data() {
    return {
      board: [] as Array<Object>,
      gameOver: false,
      gameOverText: '',
      flags: 0,
      time: 0,
      timer: 0,
    };
  },
  methods: {
    renderGameBoard() {
      this.board = [...board];
      this.flags = settings.bombs;
    },
    handleSquare(square: any, index: number) {
      if (this.gameOver) return;
      if (square.flag || square.reveal) return;
      if (!this.timer) this.handleTimer(true);
      if (square.value === 0) {
        if (square.type === 'bomb') {
          square.type = 'bomb-hit';
          this.board = revealBombs(this.board);
          this.handleLoseGame();
        } else {
          this.board = checkEmptySquares(this.board, index);
        }
      }
      square.reveal = true;
    },
    handleFlag(square: any) {
      if (this.gameOver) return;
      if (square.reveal) return;
      if (!this.timer) this.handleTimer(true);
      if (!square.flag) {
        if (!this.flags) return;
        square.flag = true;
        this.flags--;
        //if (this.flags === 0) this.checkWin();
      } else if (square.flag) {
        square.flag = false;
        this.flags++;
      }
    },
    handleTimer(start: boolean) {
      if (start) {
        this.timer = setInterval(() => {
          this.time++;
        }, 1000);
      } else {
        clearInterval(this.timer);
      }
    },
    checkWin() {
      if (this.flags === 0) {
        const totalBombs = settings.bombs;
        let correctFlags = 0;
        let square: any;
        for (square of this.board) {
          if (square.flag && square.type === 'bomb') {
            correctFlags++;
          }
        }
        if (correctFlags === totalBombs) {
          this.handleWinGame();
          this.board = revealAllValid(this.board);
        }
      } else {
        const totalSquares = this.board.length - settings.bombs;
        let revealedSquares = 0;
        let square: any;
        for (square of this.board) {
          if (square.reveal && square.type === 'valid') {
            revealedSquares++;
          }
        }
        if (revealedSquares === totalSquares) {
          this.handleWinGame();
          this.board = revealAllValid(this.board);
        }
      }
    },
    handleLoseGame() {
      this.gameOver = true;
      this.gameOverText = 'Oh no!';
      this.handleTimer(false);
    },
    handleWinGame() {
      this.gameOver = true;
      this.gameOverText = 'Congratulations! You won!';
      this.handleTimer(false);
    },
    displayFlags() {
      return this.flags.toString().padStart(3, '0');
    },
    displayTime() {
      const hours = Math.floor(this.time / 3600);
      const minutes = Math.floor((this.time - hours * 3600) / 60);
      const seconds = this.time - hours * 3600 - minutes * 60;

      let h, m, s;

      if (minutes < 10) {
        m = '0' + minutes.toString();
      } else {
        m = minutes.toString();
      }

      if (seconds < 10) {
        s = '0' + seconds.toString();
      } else {
        s = seconds.toString();
      }

      h = hours.toString();

      if (hours > 0) {
        return `${h}:${m}:${s}`;
      } else {
        return `${m}:${s}`;
      }
    },
  },
  mounted() {
    this.renderGameBoard();
    const gameBoard = this.$refs.game as HTMLElement;
    const infoSection = this.$refs.info as HTMLElement;
    const width = settings.width * 40 + 'px';
    const height = settings.height * 40 + 'px';
    gameBoard.style.width = width;
    gameBoard.style.height = height;
    infoSection.style.width = width;
  },
  watch: {
    board: {
      handler() {
        this.checkWin();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
div.game {
  background-color: #eee;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}
section.info,
section.info div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section.info span,
p.game-over {
  font-family: 'Roboto Mono', monospace;
}
section.info img {
  width: 30px;
  margin-right: 1rem;
}
</style>
