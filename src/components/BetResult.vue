<template>
  <div class="shadow border p-5 mt-5 rounded-lg">
    <p>
      Resultado: Número {{ betResults.number }}, Color {{ betResults.color }}
    </p>
    <p>
      Resultado de la apuesta: {{ betResults.isWin ? 'Ganaste' : 'Perdiste' }}, Monto
      Ganado: <span :class="betResults.isWin ? 'text-green-800' : ''">{{ betResults.winAmount }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { IBetResult } from '../interfaces/IBetResult'

defineProps<{
  betResults: IBetResult
}>()
</script>

<style scoped>

</style>
