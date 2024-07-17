<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <button class="btn" :class="[color? 'btn-' + color: '']">{{ text }}</button>
</template>

<style scoped>
button {
  border-radius: 10px;
}
</style>