<template>
  <div v-if="alertStore.show" :class="alertStore.type === 'success' ? success : error"
       class="p-4 right-3 bottom-3 text-sm fixed z-10 rounded-lg " role="alert">
    <span class="font-medium">{{ alertStore.message }}</span>
    <button @click="closeAlert" class="ml-5 right-4 top-4 text-black">x</button>
  </div>
</template>

<script setup lang="ts">
import { useAlertStore } from '../../store/alertStore'

const alertStore = useAlertStore()

const success = 'bg-green-50 text-green-800'
const error = 'bg-red-50 text-red-800'

const closeAlert = (): void => {
  alertStore.dismissAlert()
}
</script>

<style scoped>

</style>
