<script setup>
const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: {
    type: [Boolean, Number, String],
    required: true,
  },
  options: {
    type: Array,
    required: false,
  }
})

const handleChange = (event) => {
  let newValue = event.target.value;

  if (typeof props.modelValue === 'boolean') {
    newValue = newValue === 'true';
  } else if (typeof props.modelValue === 'number') {
    newValue = Number(newValue);
  }

  emits('update:modelValue', newValue);
}
</script>

<template>
  <select aria-label="select" :value="modelValue" @change="handleChange">
    <slot name="options">
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </slot>
  </select>
</template>

<style scoped>
select {
  border-radius: 10px;
}
</style>