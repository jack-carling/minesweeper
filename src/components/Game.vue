<template>
  <transition name="fade">
    <Prompt :time="time" v-if="showPrompt" @close-prompt="showPrompt = false" />
  </transition>
  <section class="info" ref="info">
    <div>
      <img src="../assets/flag.png" alt="" />
      <span v-html="displayInfo()"></span>
    </div>
    <span>{{ displayTime() }}</span>
  </section>
  <div class="game-wrapper" ref="wrapper">
    <transition name="fade">
      <div class="phone-info" v-if="showPhoneModeInfo" @click="showPhoneModeInfo = false">
        <i class="material-icons">lightbulb</i>
        <p>In this mode the board is larger to facilitate playing on a device with a smaller screen.</p>
        <p>Use two fingers to scroll left and right on the board.</p>
        <p>Use one finger and scroll outside the board to go up and down.</p>
        <button class="btn grey lighten-5 btn-small grey-text text-darken-4">OK</button>
      </div>
    </transition>
    <div class="game" ref="game">
      <Square
        v-for="(square, i) in board"
        :key="i"
        :square="square"
        :size="squareSize"
        @touchstart.prevent="handleTouch(square, $event)"
        @touchmove.prevent="scrollWrapper"
        @touchend.prevent="handleSquare(square, i, $event)"
        @click="handleSquare(square, i, $event)"
        @contextmenu.prevent="handleFlag(square)"
      />
    </div>
  </div>
  <span class="game-over" v-if="gameOver">{{ gameOverText }}</span>
  <section class="buttons">
    <button class="btn" :class="[gameOver ? 'red' : 'grey']" @click="$emit('main-menu')">
      <i class="material-icons left">home</i>
      Menu
    </button>
    <button class="btn" :class="[gameOver ? 'red' : 'grey']" @click="resetGame">
      <i class="material-icons left">replay</i>
      {{ buttonText }}
    </button>
  </section>
  <button class="btn grey mode" @click="togglePhoneMode" v-if="phoneMode || squareSize < 40">
    <i class="material-icons left">phone_iphone</i>{{ phoneModeButton }}
  </button>
  <transition name="pop">
    <AutoSave v-if="autoSave" class="auto-save" />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Square from './Square.vue';
import Prompt from './Prompt.vue';
import AutoSave from './AutoSave.vue';

import {
  checkEmptySquares,
  revealBombs,
  revealAllValid,
  checkAdjacentFlags,
  checkAdjacentSquares,
} from '../services/squares';
import { initBoard, calcBoard } from '../services/board';
import { capitalizeFirstLetter } from '../services/text';
import { saveHighscoreDatabase } from '../services/highscore';
import { time } from '../services/time';
import settings from '../services/settings';

export default defineComponent({
  components: {
    Prompt,
    Square,
    AutoSave,
  },
  data() {
    return {
      board: [] as Array<Object>,
      gameOver: false,
      first: true,
      gameOverText: '',
      flags: 0,
      time: 0,
      timer: 0,
      touchTimer: 0,
      longTouch: false,
      stopTouch: false,
      buttonText: 'Reset',
      squareSize: 40,
      showPrompt: false,
      autoSave: false,
      autoSaveTimeout: 0,
      scrolling: false,
      scrollPosition: 0,
      phoneMode: false,
      showPhoneModeInfo: false,
    };
  },
  emits: ['main-menu'],
  computed: {
    phoneModeButton(): String {
      if (this.phoneMode) {
        return 'Mode On';
      } else {
        return 'Mode Off';
      }
    },
  },
  methods: {
    renderGameBoard() {
      this.board = initBoard();
      this.flags = settings.bombs;
    },
    scrollWrapper(e: any) {
      if (!this.scrolling) return;
      const gameBoardWrapper = this.$refs.wrapper as HTMLElement;
      const distanceX = this.scrollPosition - e.touches[0].screenX;
      gameBoardWrapper.scrollTo({ left: distanceX });
    },
    togglePhoneMode() {
      this.phoneMode = !this.phoneMode;
      localStorage.phoneMode = this.phoneMode;
      this.calcSize();
      if (this.phoneMode) {
        this.showPhoneModeInfo = true;
      } else {
        this.showPhoneModeInfo = false;
      }
    },
    handleTouch(square: any, e: any) {
      if (e.touches.length === 2) {
        this.scrolling = true;
        const gameBoardWrapper = this.$refs.wrapper as HTMLElement;
        this.scrollPosition = gameBoardWrapper.scrollLeft + e.touches[0].screenX;
      } else {
        this.scrolling = false;
      }
      if (this.scrolling) return;
      if (square.flag) {
        square.flag = false;
        this.flags++;
        this.stopTouch = true;
        return;
      }
      this.stopTouch = false;
      window.clearTimeout(this.touchTimer);
      this.longTouch = false;
      this.touchTimer = window.setTimeout(() => {
        this.longTouch = true;
      }, 100);
    },
    handleSquare(square: any, index: number, e: any) {
      if (!this.timer) this.handleTimer(true);
      if (this.gameOver) return;
      if (square.reveal) this.handleValue(square, index);
      if (e.type === 'touchend') {
        if (this.scrolling) return;
        if (this.stopTouch) return;
        if (this.longTouch) {
          this.handleFlag(square);
          return;
        }
      }
      if (square.flag) return;
      if (this.first) {
        this.board = calcBoard(index);
        if (square.value === 0) {
          this.board = checkEmptySquares(this.board, index);
        }

        this.first = false;
        square.reveal = true;
        return;
      }
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
    handleValue(square: any, index: number) {
      if (this.gameOver) return;
      if (square.flag) return;
      if (!square.value) return;
      const correctNumberFlags = checkAdjacentFlags(this.board, index, square.value);
      if (correctNumberFlags) {
        const result = checkAdjacentSquares(this.board, index);
        this.board = result.board;
        const bomb = result.bomb;
        if (bomb.hit) {
          const square: any = this.board[bomb.index];
          square.type = 'bomb-hit';
          this.board = revealBombs(this.board);
          this.handleLoseGame();
        }
      }
    },
    handleFlag(square: any) {
      if (this.gameOver) return;
      if (square.reveal) return;
      if (!this.timer) this.handleTimer(true);
      if (this.first) {
        this.first = false;
        this.board = calcBoard(-1);
      }

      if (!square.flag) {
        if (!this.flags) return;
        square.flag = true;
        this.flags--;
      } else if (square.flag) {
        square.flag = false;
        this.flags++;
      }
    },
    handleTimer(start: boolean) {
      if (start) {
        this.timer = window.setInterval(() => {
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
      this.buttonText = 'Play again';
      this.handleTimer(false);
    },
    handleWinGame() {
      if (this.gameOver) return;
      this.flags = 0;
      this.gameOver = true;
      this.gameOverText = 'Congratulations! You won!';
      this.buttonText = 'Play again';
      this.handleTimer(false);
      this.handlePrompt();
    },
    displayInfo() {
      const { difficulty, width, height, bombs } = localStorage;
      const custom = `${width}x${height}`;
      const difficultyText = capitalizeFirstLetter(difficulty) || `Custom ${custom}`;
      const flags = this.flags.toString().padStart(3, '0');
      if (this.squareSize < 30 || width < 8) {
        return `${flags}<br />${custom} (${bombs})`;
      } else {
        return `${flags} | ${difficultyText} (${bombs})`;
      }
    },
    displayTime() {
      return time(this.time);
    },
    handleKey(e: any) {
      if (this.showPrompt) return;
      if (e.code === 'KeyR') {
        this.resetGame();
      }
    },
    resetGame() {
      if (!this.timer && !this.gameOver) return;

      this.first = true;
      this.handleTimer(false);
      this.renderGameBoard();
      this.gameOver = false;
      this.gameOverText = '';
      this.buttonText = 'Reset';
      this.time = 0;
      this.timer = 0;
    },
    calcSize() {
      const currentWidth = window.innerWidth;

      let newSize = (currentWidth - 32) / settings.width;
      if (this.phoneMode || newSize >= 40) {
        newSize = 40;
      }

      this.squareSize = newSize;

      const gameBoard = this.$refs.game as HTMLElement;
      const gameBoardWrapper = this.$refs.wrapper as HTMLElement;
      const infoSection = this.$refs.info as HTMLElement;
      const width = settings.width * this.squareSize + 'px';
      const height = settings.height * this.squareSize + 'px';
      gameBoard.style.width = width;
      gameBoard.style.height = height;
      infoSection.style.width = gameBoardWrapper.offsetWidth + 'px';
    },
    handlePrompt() {
      window.clearTimeout(this.autoSaveTimeout);
      let skip = sessionStorage.skipPrompt || 'false';
      skip = JSON.parse(skip);

      let save = localStorage.saveScore || 'false';
      save = JSON.parse(save);

      if (!skip) {
        this.showPrompt = true;
      } else {
        if (save) {
          const time: number = this.time || 0;
          saveHighscoreDatabase(time);
          this.autoSave = true;
          this.autoSaveTimeout = window.setTimeout(() => {
            this.autoSave = false;
          }, 3000);
        }
      }
    },
  },
  mounted() {
    let phoneMode = localStorage.phoneMode || 'false';
    phoneMode = JSON.parse(phoneMode);
    if (this.squareSize === 40) {
      this.phoneMode = false;
    } else {
      this.phoneMode = phoneMode;
    }

    this.renderGameBoard();
    this.calcSize();
    window.addEventListener('keyup', this.handleKey);
    window.addEventListener('resize', this.calcSize);
  },
  beforeUnmount() {
    window.removeEventListener('keyup', this.handleKey);
    window.removeEventListener('resize', this.calcSize);
  },
  watch: {
    board: {
      handler() {
        this.checkWin();
      },
      deep: true,
    },
  },
});
</script>

<style scoped>
div.game {
  background-color: #eee;
  display: flex;
  flex-wrap: wrap;
}
section.info,
section.info div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section.info img {
  width: 30px;
  margin-right: 1rem;
}
span.game-over {
  margin-top: 1rem;
  text-align: center;
}
section.buttons {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
div.game-wrapper {
  max-width: 100%;
  height: 100%;
  margin-top: 1rem;
  overflow: hidden;
  position: relative;
}
div.phone-info {
  max-width: 100%;
  max-height: calc(100% - 2rem);
  height: min-content;
  overflow-y: auto;
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  margin: auto;
  color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
}
button.mode {
  margin-top: 1rem;
}
.auto-save {
  position: fixed;
  left: 1rem;
  bottom: 3rem;
}
@media only screen and (max-width: 350px) {
  section.buttons {
    grid-template-columns: repeat(1, 1fr);
  }
}
.pop-enter-active {
  animation: flipInY;
  animation-duration: 1s;
}
.pop-leave-to {
  animation: flipOutY;
  animation-duration: 1s;
}
</style>
