<script setup>
const emits = defineEmits(["update:modelValue"])
defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const handleInput = (event) => {
  emits("update:modelValue", event.target.value)
}
</script>

<template>
  <input
      :placeholder="placeholder"
      :type="type"
      :id="id"
      :value="modelValue"
      @input="handleInput"
  />
</template>

<style scoped>
input {
  border-radius: 10px;
}
</style>