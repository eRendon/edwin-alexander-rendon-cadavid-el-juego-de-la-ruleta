<template>
  <header
      class="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-10 px-4 md:px-6 h-16 flex items-center"
      data-id="2">
    <div class="flex items-center justify-between w-full" data-id="3"><h1
        class="lg:text-2xl font-bold text-gray-900 dark:text-gray-100" data-id="4">Página de Apuestas</h1>
      <div :class="balanceStore.id ? 'grid-cols-2' : 'grid-cols-3'" class="grid justify-between gap-5 items-center" data-id="5">
        <input
            v-model="username"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="userName"
            :disabled="balanceStore.id"
            :value="username"
            placeholder="Ingresa tu nombre">
        <Button v-if="!balanceStore.id" @click="getBalance" label="Cargar Balance"></Button>
        <div class="text-gray-900 dark:text-gray-100 font-bold text-end" data-id="7">Saldo: ${{ balanceStore.balance }}</div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useBalanceStore } from '../store/balanceStore'
import Button from '../components/atomic/Button.vue'
import { ref } from 'vue'
import { useBalance } from '../composables/useBalance'

const username = ref('')

const balanceStore = useBalanceStore()
const balanceComposable = useBalance()

const getBalance = (): void => {
  balanceComposable.loadBalance(username.value)
}

</script>
