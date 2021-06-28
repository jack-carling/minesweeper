<template>
  <main ref="overlay">
    <section class="overlay" ref="content">
      <div class="close" @click="$emit('close-highscores')">
        <i class="material-icons">cancel</i>
      </div>
      <span class="header">High Scores</span>
      <label>Difficulty</label>
      <div class="select">
        <i class="material-icons">expand_more</i>
        <select class="browser-default" v-model="current" @change="setCategory">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <table>
        <tr>
          <th>&nbsp;</th>
          <th>Name</th>
          <th>Board</th>
          <th>%</th>
          <th>Time</th>
        </tr>
        <tr v-for="(player, i) in players" :key="i">
          <td>{{ displayNumber(player, i) }}</td>
          <td class="name">
            <div class="name" v-html="player.name"></div>
          </td>
          <td class="size">{{ displayBoard(player) }}</td>
          <td>{{ displayPercent(player.percent) }}</td>
          <td>{{ displayTime(player) }}</td>
        </tr>
      </table>
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

import { time } from '../services/time';

export default defineComponent({
  data() {
    return {
      showScrollButton: false,
      current: localStorage.highscoreCategory || 'beginner',
      players: [] as Array<any>,
    };
  },
  emits: ['close-highscores'],
  methods: {
    scroll() {
      const overlay = this.$refs.overlay as HTMLElement;
      overlay.scrollTo({ top: 0, behavior: 'smooth' });
    },
    setCategory() {
      localStorage.highscoreCategory = this.current;
      this.getHighscores();
    },
    displayNumber(player: any, i: number) {
      const index = i + 1;
      return `${index}.`;
    },
    displayBoard(player: any) {
      const { width, height, bombs } = player;
      if (player?.name) {
        return `${width}x${height} (${bombs})`;
      }
    },
    displayPercent(percent: number) {
      if (percent) {
        return Math.round(percent * 100) + '%';
      }
    },
    displayTime(player: any) {
      if (player?.time !== '') {
        return time(player.time);
      }
    },
    emptyPlayers() {
      const players = [];
      for (let i = 0; i < 25; i++) {
        players.push({ name: '', time: '', size: '', percent: '' });
      }
      this.players = [];
      this.players = [...players];
    },
    async getHighscores() {
      let res: any = await fetch(`/api/highscore/${this.current}`);
      res = await res.json();
      if (res.success) {
        this.emptyPlayers();
        let data = [...res.data, ...this.players];
        data = data.slice(0, 25);
        if (data[0].name) {
          data[0].name = `<i class="material-icons gold">emoji_events</i><span>${data[0].name}</span>`;
        }
        if (data[1].name) {
          data[1].name = `<i class="material-icons silver">emoji_events</i><span>${data[1].name}</span>`;
        }
        if (data[2].name) {
          data[2].name = `<i class="material-icons bronze">emoji_events</i><span>${data[2].name}</span>`;
        }
        for (let i = 3; i < 25; i++) {
          if (data[i].name) {
            data[i].name = `<span>${data[i].name}</span>`;
          }
        }
        this.players = data;
      }
    },
  },
  created() {
    this.emptyPlayers();
  },
  mounted() {
    const content = this.$refs.content as HTMLElement;

    if (window.innerHeight < content.clientHeight + 32) {
      this.showScrollButton = true;
    } else {
      content.style.alignSelf = 'center';
    }

    this.getHighscores();
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
  margin-top: 1.4rem;
  margin-bottom: 1rem;
}
div.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}
span.header {
  display: block;
  font-family: 'Quicksand', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
table {
  border-collapse: separate;
}
td,
th {
  padding: 0.2rem 0.5rem !important;
  border-radius: 0;
}
th {
  white-space: nowrap;
}
td.name {
  max-width: 0;
  width: 100%;
}
td.name div {
  display: flex;
  align-items: center;
  min-width: 0;
}
div.name ::v-deep(span) {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
div.name ::v-deep(i) {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}
div.name ::v-deep(i.gold) {
  color: #ffd700;
}
div.name ::v-deep(i.silver) {
  color: #c0c0c0;
}
div.name ::v-deep(i.bronze) {
  color: #cd7f32;
}
td.size {
  white-space: nowrap;
}
tr:nth-child(odd) {
  background-color: #ebebeb;
}
div.select {
  position: relative;
}
select {
  appearance: none;
  -webkit-appearance: none;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #f2f2f2;
  border-radius: 0;
  height: 3rem;
  font-size: 16px;
  outline: 0;
}
div.select i {
  height: 3rem;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  right: 0.5rem;
  pointer-events: none;
}
</style>
