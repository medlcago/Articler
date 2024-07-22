<script setup>
import {computed, reactive, watch} from "vue";
import Header from "@/components/layouts/Header.vue";
import {checkEmail} from "@/services/user.js";
import {isValidEmail} from "@/utils/index.js";
import {useUserStore} from "@/store/userStore.js";
import LoadingSpinner from "@/components/layouts/LoadingSpinner.vue";
import {useErrorStore} from "@/store/errorStore.js";
import BaseButton from "@/components/ui/Buttons/BaseButton.vue";
import BaseInput from "@/components/ui/Inputs/BaseInput.vue";
import {useToast} from "@/hooks/toast.js";

useToast()

const userStore = useUserStore()
const errorStore = useErrorStore()

const user = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  passwordMatched: true,
})

const formValid = computed(() => {
  return user.email.length > 0 && isValidEmail(user.email) && user.password.length >= 8 && user.passwordMatched && !errorStore.hasErrors
})

watch(() => [user.password, user.confirmPassword], ([newPassword, newConfirmPassword]) => {
      errorStore.errors.password = []
      user.passwordMatched = newPassword === newConfirmPassword;
      if (newPassword.length <= 8) {
        errorStore.errors.password = ["Пароль должен быть не менее 8 символов"]
      }
    }
)

watch(() => user.email, async (email) => {
  errorStore.errors.email = []
  if (!email) {
    return
  }
  if (isValidEmail(email)) {
    const isAvailable = await checkEmail(email)
    if (!isAvailable) {
      errorStore.errors.email = ["Email уже используется"]
    }
  } else {
    errorStore.errors.email = ["Введено некорректное имя ящика"]
  }
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
              <h2 class="card-title text-center mb-4">Регистрация</h2>
              <form @submit.prevent="userStore.register(user.email, user.password)">
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
                  <div class="text-danger" v-if="errorStore.hasKey('email')"
                       v-for="error in errorStore.getError('email')">
                    {{ error }}
                  </div>
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
                  <div class="text-danger" v-if="!user.passwordMatched">
                    Пароли не совпадают
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="confirmPassword" class="form-label">Подтверждение пароля</label>
                  <BaseInput
                      v-model="user.confirmPassword"
                      type="password"
                      id="confirmPassword"
                      placeholder="Подтвердите пароль"
                      class="form-control"
                      required
                  />
                  <div class="text-danger" v-if="!user.passwordMatched">
                    Пароли не совпадают
                  </div>
                  <div class="text-danger" v-if="errorStore.hasKey('password')"
                       v-for="error in errorStore.getError('password')">
                    {{ error }}
                  </div>
                </div>
                <BaseButton
                    text="Зарегистрироваться"
                    type="submit"
                    class="btn-block"
                    :disabled="!formValid"
                />
              </form>
              <div class="text-center mt-3">
                <p>Уже есть аккаунт?
                  <RouterLink to="/login">Войти</RouterLink>
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