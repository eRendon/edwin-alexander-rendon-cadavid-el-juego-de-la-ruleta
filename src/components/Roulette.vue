<template>
  <div class="flex flex-col items-center justify-center lg:h-screen bg-gray-100 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Juego de Ruleta
      </h1>
      <div class="space-y-4">
        <div class="space-y-2">
          <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="betAmount">Monto de Apuesta</label>
          <input
              v-model.number="betAmount"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="betAmount" placeholder="Ingresa el monto de la apuesta" type="number" value="0">
        </div>
        <div class="space-y-2">
          <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="betType">Tipo de Apuesta</label>
          <select id="bet-type"
                  v-model="betType"
                  class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#2980b9]">
            <option value="color">Color</option>
            <option value="even">Pares</option>
            <option value="odd">Impares</option>
            <option value="number">Número</option>
          </select>

          <input v-model="betValue"
                 type="text"
                 class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                 placeholder="Color"/>
          <input v-if="betType === 'number'"
                 class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                 v-model="betNumber"
                 type="number"
                 placeholder="Número"/>
        </div>
        <div class="grid grid-cols-2 gap-8">
          <Button :isDisabled="isWheel" label="Apostar" @click="placeBet"></Button>
          <Button @click="saveBalance" label="Guardar Balnce">

          </Button>
        </div>
      </div>

      <div>

      </div>

      <BetResult v-if="betResult && isStopWheel" :betResults="betResult"></BetResult>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api, { BetRequest } from '../services/api'
import { useBalanceStore } from '../store/balanceStore'
import BetResult from './BetResult.vue'
import { useBalance } from '../composables/useBalance'
import Button from './atomic/Button.vue'
import { IBetResult } from '../interfaces/IBetResult'

const betAmount = ref<number>(0)
const betType = ref<string>('color')
const betNumber = ref<number | null>(null)
const betValue = ref<string>('')
const betResult = ref<IBetResult>({
  color: '',
  isWin: false,
  number: 0,
  winAmount: 0
})
const emits = defineEmits(['onResultRoulette', 'onInitSpin', 'isWin'])

const balanceStore = useBalanceStore()
const { updateBalance } = useBalance()

defineProps<{
  isWheel: boolean
  isStopWheel: boolean
}>()

const placeBet = async () => {


  try {
    emits('onInitSpin', true)

    const betRequest: BetRequest = {
      amount: betAmount.value,
      type: betType.value,
      value: betType.value === 'number' ? `${betNumber.value} ${betValue.value}` : betValue.value
    }

    const { data } = await api.placeBet(betRequest)
    betResult.value = data as IBetResult

    emits('onResultRoulette', data.number)
    let newBalance = 0
    if (data.isWin) {
      newBalance = balanceStore.balance + data.winAmount
      emits('isWin', data)
    } else {
      newBalance = balanceStore.balance - betAmount.value
    }
    setTimeout(() => {
      balanceStore.setBalance(newBalance)
    }, 10000)
  } catch (error) {
    console.error(error)
  }
}

const saveBalance = async () => {
  try {
    await updateBalance(balanceStore.name!, balanceStore.balance)
  } catch (error) {
    console.error(error)
  }
}
</script>
