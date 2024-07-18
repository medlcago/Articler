<script setup>

import Header from "@/components/Header.vue";
import {onBeforeUnmount, ref} from "vue";
import Alert from "@/components/Alert.vue";
import {isValidEmail} from "@/utils/index.js";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import {useUserStore} from "@/store/userStore.js";
import {useErrorStore} from "@/store/errorStore.js";

const userStore = useUserStore()
const errorStore = useErrorStore()

const status = ref(400);
const email = ref("");

const sendResetPasswordMessage = async () => {
  status.value = await userStore.resetUserPassword(email.value)
}

onBeforeUnmount(() => {
  errorStore.$reset()
})

</script>

<template>
  <Header/>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">

        <Alert
            v-if="errorStore.error"
            class="text-center"
            dismissible
            :content="errorStore.error"
            :color="`${status===200?'primary' : 'danger'}`"
            @close="errorStore.error=''"
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
              <CustomButton
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