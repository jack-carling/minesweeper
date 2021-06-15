<template>
  <section ref="square">
    <div v-if="!square?.reveal" class="button" :class="{ flag: square?.flag }"></div>
    <div v-else :class="square?.type">
      <span v-if="square?.value" :class="'number' + square.value">{{ square?.value }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    square: {
      type: Object,
    },
  },
  mounted() {
    const square = this.$refs.square as HTMLElement;
    square.style.width = '40px';
    square.style.height = '40px';
  },
});
</script>

<style scoped>
section {
  cursor: pointer;
}
div {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  font-size: 1.5rem;
  display: grid;
  place-items: center;
}
div.flag {
  background-image: url('../assets/flag.png');
  background-size: contain;
}
div.button {
  border-top: 2px solid #f2f2f2;
  border-right: 2px solid #333;
  border-bottom: 2px solid #333;
  border-left: 2px solid #f2f2f2;
}
div.valid,
div.bomb {
  border: 0.5px solid #c2c2c2;
}
div.bomb {
  background-image: url('../assets/bomb.png');
  background-size: contain;
}
div.bomb-hit {
  background-image: url('../assets/bomb.png');
  background-size: contain;
  background-color: #990010;
}
div.no-bomb {
  background-image: url('../assets/no-bomb.png');
  background-size: contain;
}
span {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
span.number1 {
  color: #0200f2;
}
span.number2 {
  color: #377c21;
}
span.number3 {
  color: #e93322;
}
span.number4 {
  color: #01017b;
}
span.number5 {
  color: #75160b;
}
span.number6 {
  color: #377e7f;
}
span.number7 {
  color: #000000;
}
span.number8 {
  color: #808080;
}
</style>
