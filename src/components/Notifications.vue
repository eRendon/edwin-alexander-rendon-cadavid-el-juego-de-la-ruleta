<template>
  <div class="notification">
    <p>Your bank value is zero. Reset the game to continue.</p>
    <button @click="resetGame">Reset Game</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'reset-game'): void }>();

function resetGame() {
  emit('reset-game');
}
</script>

<style scoped>
/* Incluye aquí los estilos correspondientes */
</style>
