<template>
  <div>
    <h1>Counter</h1>
    <p>Counter demo</p>
    <p>{{ counter }}</p>
    <button class="btn" @click="inc">
      inc
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const counter = ref(0)
const inc = () => counter.value++
</script>
