<script setup>

import Header from "@/components/layouts/Header.vue";
import {reactive} from "vue";
import LoadingSpinner from "@/components/layouts/LoadingSpinner.vue";
import {useUserStore} from "@/store/userStore.js";
import BaseButton from "@/components/ui/Buttons/BaseButton.vue";
import BaseInput from "@/components/ui/Inputs/BaseInput.vue";
import {useToast} from "@/hooks/toast.js";

useToast()

const userStore = useUserStore()

const user = reactive({
  email: "",
  password: "",
})

</script>

<template>
  <div>
    <Header/>
    <LoadingSpinner v-if="userStore.loading"/>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Авторизация</h2>
              <form @submit.prevent="userStore.login(user.email, user.password)">
                <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <BaseInput
                      v-model="user.email"
                      type="email"
                      id="email"
                      placeholder="Введите email"
                      class="form-control"
                      required
                  />
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <BaseInput
                      v-model="user.password"
                      type="password"
                      id="password"
                      placeholder="Введите пароль"
                      class="form-control"
                      required
                  />
                </div>
                <BaseButton
                    text="Войти"
                    type="submit"
                    class="btn-block"
                />
              </form>
              <div class="text-center mt-3">
                <p>Еще нет аккаунта?
                  <RouterLink to="/register">Регистрация</RouterLink>
                </p>
                <p>
                  <RouterLink to="/forgot-password">Восстановить пароль</RouterLink>
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