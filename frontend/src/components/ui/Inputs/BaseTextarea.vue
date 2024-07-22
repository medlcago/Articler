<script setup>
import {useTextareaAutosize} from "@vueuse/core";
import {ref, watch} from "vue";

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  id: {
    type: String,
    required: true
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

const {input, textarea} = useTextareaAutosize({styleProp: 'minHeight'})

input.value = props.modelValue
const inputRef = ref(input);

watch(() => props.modelValue, (value) => {
  if (value === '') {
    inputRef.value = '';
  }
});

watch(input, () => {
  emits("update:modelValue", input.value)
})
</script>

<template>
<textarea
    ref="textarea"
    class="resize-none"
    :id="id"
    :placeholder="placeholder"
    v-model="input"
/>
</template>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-radius: 10px;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>