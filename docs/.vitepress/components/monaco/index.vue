<template>
  <ClientOnly>
    <component :is="comp" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const comp = defineAsyncComponent(() => import('./monaco.vue'))
</script>

<style scoped>

</style>
