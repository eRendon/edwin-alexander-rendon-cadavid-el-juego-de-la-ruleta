<script setup lang="ts">
import HelloWorld from './components/Roulette.vue'
import Wheel from './components/Wheel.vue'
import { ref } from 'vue';
import Notifications from './components/Notifications.vue'

const bankValue = ref(1000);
const currentBet = ref(0);
const wager = ref(5);

function updateBet(betAmount: number) {
  currentBet.value += betAmount;
  bankValue.value -= betAmount;
}

function resetGame() {
  bankValue.value = 1000;
  currentBet.value = 0;
  wager.value = 5;
}
</script>

<template>
<!--  <HelloWorld msg="Vite + Vue" />-->
<!--  <div id="container">-->
<!--    <Wheel />-->
<!--    <Notifications v-if="bankValue <= 0" @reset-game="resetGame" />-->
<!--  </div>-->
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
