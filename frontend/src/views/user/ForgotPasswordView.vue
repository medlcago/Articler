<script setup>

import Header from "@/components/layouts/Header.vue";
import {ref} from "vue";
import {isValidEmail} from "@/utils/index.js";
import {useUserStore} from "@/store/userStore.js";
import BaseButton from "@/components/ui/Buttons/BaseButton.vue";
import BaseInput from "@/components/ui/Inputs/BaseInput.vue";
import {useToast} from "@/hooks/toast.js";

useToast({
  duration: 5000
})

const userStore = useUserStore()

const email = ref("");

const sendResetPasswordMessage = async () => {
  await userStore.resetUserPassword(email.value)
  email.value = "";
}
</script>

<template>
  <Header/>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Восстановление пароля</h2>
            <form @submit.prevent="sendResetPasswordMessage">
              <div class="form-group">
                <label for="email">Email Address</label>
                <BaseInput
                    v-model="email"
                    id="email"
                    placeholder="Адрес электронной почты"
                    type="email"
                    class="form-control"
                    required
                />
              </div>
              <BaseButton
                  text="Сбросить пароль"
                  type="sumbit"
                  class="btn-block"
                  :disabled="!isValidEmail(email)"
              />
              <div class="text-center mt-3">
                <p>
                  <RouterLink :to="{name: 'main'}">На главную</RouterLink>
                </p>
              </div>
            </form>
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