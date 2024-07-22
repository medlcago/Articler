<script setup>
const emits = defineEmits(["check"])
</script>

<template>
  <div class="offline-container">
    <div class="offline-content">
      <h2>Вы офлайн</h2>
      <p>Кажется, у вас проблемы с подключением к интернету.</p>
      <button class="btn btn-primary rounded" @click="emits('check')">Проверить соединение</button>
    </div>
  </div>
</template>

<style scoped>
.offline-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.offline-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

</style>