<template>
  <ClientOnly>
    <component :is="comp" :value="value" v-bind="attrs" />
  </ClientOnly>
</template>

<script lang="ts" setup>
import { defineAsyncComponent,useAttrs  } from 'vue'
const attrs = useAttrs();

defineProps<{
  value?: string
}>()
const comp = defineAsyncComponent(() => import('./monaco.vue'))
</script>

<style scoped>

</style>
