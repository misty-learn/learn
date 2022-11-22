<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>{{ date }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
  description: string
  date: string
}>()
</script>
