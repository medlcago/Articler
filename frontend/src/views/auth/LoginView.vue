<script setup>

import Header from "@/components/Header.vue";
import {ref} from "vue";
import {loginUser} from "@/services/auth.js";
import {useRouter} from "vue-router";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)


const login = async () => {
  loading.value = true;
  const user = await loginUser(email.value, password.value);
  loading.value = false;
  if (user) {
    await router.replace("/profile")
  } else {
    error.value = "Неверный email или пароль";
  }
}
</script>

<template>
  <div>
    <Header/>
    <LoadingSpinner v-if="loading"/>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Авторизация</h2>
              <form>
                <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="email" required
                         placeholder="Введите email">
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <input type="password" class="form-control" id="password" v-model="password" required
                         placeholder="Введите пароль">
                  <div class="text-danger" v-if="error">
                    {{ error }}
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block" @click.prevent="login">Войти</button>
              </form>
              <div class="text-center mt-3">
                <p>Еще нет аккаунта?
                  <RouterLink to="/register">Регистрация</RouterLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>