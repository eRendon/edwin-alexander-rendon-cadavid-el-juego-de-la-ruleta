<template>
  <button
      :disabled="isDisabled"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-primary/90 h-10 px-4 py-2"
      >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  isDisabled?: boolean
}>()
</script>

