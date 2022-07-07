<template>
  <ClientOnly>
    <component :is="comp" :value="value" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
defineProps<{
  value?: string
}>()
const comp = defineAsyncComponent(() => import('./monaco.vue'))
</script>

<style scoped>

</style>
