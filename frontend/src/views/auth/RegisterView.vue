<script setup>
import {computed, onBeforeUnmount, ref, watch} from "vue";
import Header from "@/components/Header.vue";
import {checkEmail} from "@/services/user.js";
import {isValidEmail} from "@/utils/index.js";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import {useUserStore} from "@/store/userStore.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useErrorStore} from "@/store/errorStore.js";

const userStore = useUserStore()
const errorStore = useErrorStore()


const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const passwordMatched = ref(true)

const formValid = computed(() => {
  return email.value.length > 0 && isValidEmail(email.value) && password.value.length > 0 && passwordMatched.value && !Object.values(errorStore.errors).some(arr => arr.length > 0)
})

watch(() => [password, confirmPassword], ([newPassword, newConfirmPassword]) => {
      errorStore.errors.password = []
      passwordMatched.value = newPassword.value === newConfirmPassword.value;
    },
    {deep: true}
)

watch(email, async (email) => {
  errorStore.errors.email = []
  if (isValidEmail(email)) {
    const status = await checkEmail(email)
    if (status !== 200) {
      errorStore.errors.email = ["Email уже используется"]
    }
  }
})

onBeforeUnmount(() => {
  errorStore.$reset()
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
              <form @submit.prevent="userStore.register(email, password)">
                <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <CustomInput
                      v-model="email"
                      type="email"
                      id="email"
                      placeholder="Введите email"
                      class="form-control"
                      required
                  />
                  <div class="text-danger" v-if="errorStore.errors.hasOwnProperty('email')"
                       v-for="error in errorStore.errors['email']">
                    {{ error }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <CustomInput
                      v-model="password"
                      type="password"
                      id="password"
                      placeholder="Введите пароль"
                      class="form-control"
                      required
                  />
                  <div class="text-danger" v-if="!passwordMatched">
                    Пароли не совпадают
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="confirmPassword" class="form-label">Подтверждение пароля</label>
                  <CustomInput
                      v-model="confirmPassword"
                      type="password"
                      id="confirmPassword"
                      placeholder="Подтвердите пароль"
                      class="form-control"
                      required
                  />
                  <div class="text-danger" v-if="!passwordMatched">
                    Пароли не совпадают
                  </div>
                  <div class="text-danger" v-if="errorStore.errors.hasOwnProperty('password')"
                       v-for="error in errorStore.errors['password']">
                    {{ error }}
                  </div>
                </div>
                <CustomButton
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