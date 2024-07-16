<script setup>

import Header from "@/components/Header.vue";
import {ref} from "vue";
import {resetPassword} from "@/services/user.js";
import Alert from "@/components/Alert.vue";
import {isValidEmail} from "@/utils/index.js";
import CustomInput from "@/components/CustomInput.vue";

const messageSent = ref(null);
const email = ref("");

const sendResetPasswordMessage = async () => {
  const {status} = await resetPassword(email.value)
  messageSent.value = status === 200;
}
</script>

<template>
  <Header/>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">

        <Alert
            v-if="messageSent===true"
            class="text-center"
            dismissible
            content="Письмо для восстановления пароля отправлено на указанный вами адрес электронной почты"
            @close="messageSent = null"
        />

        <Alert
            v-if="messageSent===false"
            class="text-center"
            dismissible
            color="danger"
            content="Адрес не найден в системе"
            @close="messageSent = null"
        />

        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Восстановление пароля</h2>
            <form @submit.prevent="sendResetPasswordMessage">
              <div class="form-group">
                <label for="email">Email Address</label>
                <CustomInput
                    v-model="email"
                    id="email"
                    placeholder="Адрес электронной почты"
                    type="email"
                    class="form-control"
                    required
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block" :disabled="!isValidEmail(email)">
                Сбросить пароль
              </button>
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

.btn {
  border-radius: 10px;
}
</style>