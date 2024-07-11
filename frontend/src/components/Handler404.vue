<script setup>

</script>

<template>
  <div class="error-page">
    <h1>Page Not Found</h1>
    <p>Извините, но страница, которую вы ищете, не существует.</p>
    <RouterLink to="/" class="back-home">Вернуться на главную</RouterLink>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
}

h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.back-home {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.back-home:hover {
  background-color: #0056b3;
}
</style>