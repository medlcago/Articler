<script setup>
const emits = defineEmits(["close"])

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    default: '',
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'primary',
  }
})
</script>

<template>
  <div class="alert fade show" role="alert" :class="[dismissible? 'alert-dismissible' : '', 'alert-' + color]">
    <slot name="heading">
      <h4 v-if="heading" class="alert-heading">{{ heading }}</h4>
    </slot>
    <slot name="content">
      {{ content }}
    </slot>
    <slot name="dismissible">
      <button v-if="dismissible" type="button" class="close" data-dismiss="alert" aria-label="Close" @click="emits('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </slot>
  </div>
</template>

<style scoped>

</style>