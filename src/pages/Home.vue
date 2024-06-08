<template>
  <div class="grid lg:grid-cols-2 gap-5 bg-gray-100">
    <Roulette @onResultRoulette="onRouletteResult($event)"
              @onInitSpin="onInitSpin($event)"
              @isWin="isWin($event)"
              :isStopWheel="isStopWheel"
              :isWheel="isWheel"></Roulette>
    <div class="flex flex-col items-center justify-center lg:h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div id="container">
          <Wheel @onStopWheel="onStopWheel($event)" @isWheel="onIsWheel($event)" ref="wheelRef"></Wheel>
        </div>
      </div>
    </div>
  </div>
  <modal @onAccept="closeModal" :show="showModal" title="Ganaste!">
    <BetResult :betResults="betResults"></BetResult>
  </modal>
</template>

<script setup lang="ts">
import Wheel    from '../components/Wheel.vue';
import Roulette from '../components/Roulette.vue';
import Modal from '../components/atomic/Modal.vue'

import { ref } from 'vue'
import BetResult from '../components/BetResult.vue'

const wheelRef = ref(null);
const isWheel = ref(false)
const isStopWheel = ref(false)
const betResults = ref({
  number: 0,
  color: '',
  isWin: false,
  winAmount: 0
})

const showModal = ref(false)

const onIsWheel = (isWheelState: boolean): void => {
  isWheel.value = isWheelState
}

const closeModal = (): void => {
  showModal.value = false
  betResults.value = {
    number: 0,
    color: '',
    isWin: false,
    winAmount: 0
  }
}

const isWin = (isWin): void => {
  betResults.value = isWin
}

const onStopWheel = (stopWheel: boolean): void => {
  isStopWheel.value = stopWheel
  if (betResults.value.isWin) {
    showModal.value = true
  }
}

const onInitSpin = (initSpin: boolean): void => {
  isStopWheel.value = !initSpin
}

const onRouletteResult = (rouletteNumber: number): void => {
  wheelRef.value.spinWheel(rouletteNumber)
}
</script>

<style scoped>

</style>
