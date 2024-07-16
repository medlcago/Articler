<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title text-center mb-4" :class="[titleColor? 'text-' + titleColor : '']">{{ title }}</h2>
      <div class="text-center">
        <slot name="content">

        </slot>
      </div>

    </div>
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
  font-size: 16px;
  color: #6c757d;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>