<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="card text-center">
    <div class="card-body">
      <slot name="title">
        <h2 class="card-title" :class="[titleColor? 'text-' + titleColor : '']">{{ title }}</h2>
      </slot>
      <slot name="text">
        <p class="card-text font-weight-bold text-break">{{ text }}</p>
      </slot>
    </div>

    <slot name="footer">
      <div class="card-footer text-muted">
        <RouterLink to="/">Return to the home page</RouterLink>
      </div>
    </slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 24px;
  font-weight: 600;
}

p {
  font-size: 18px;
  font-weight: 500;
}

.text-break {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>