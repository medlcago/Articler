<script setup>
import {computed, ref, watch} from "vue";
import Header from "@/components/Header.vue";
import {checkEmail, registerUser} from "@/services/user.js";
import {loginUser} from "@/services/auth.js";
import {useRouter} from "vue-router";
import {isValidEmail} from "@/utils/index.js";

const router = useRouter()

const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const passwordMatched = ref(true)
const errors = ref({})

const formValid = computed(() => {
  console.log(Object.keys(errors.value).length)
  return email.value.length > 0 && isValidEmail(email.value) && password.value.length > 0 && passwordMatched.value && !Object.values(errors.value).some(arr => arr.length > 0)
})

watch(() => [password, confirmPassword], ([newPassword, newConfirmPassword]) => {
      errors.value.password = []
      passwordMatched.value = newPassword.value === newConfirmPassword.value;
    },
    {deep: true}
)

watch(email, async (email) => {
  errors.value.email = []
  if (isValidEmail(email)) {
    const status = await checkEmail(email)
    if (status !== 200) {
      errors.value = {
        email: ["Email уже используется"]
      }
    }
  }
})

const register = async () => {
  const {data, status} = await registerUser(
      email.value,
      password.value
  )
  if (status === 201) {
    if (await loginUser(email.value, password.value)) {
      await router.replace("profile")
    }
  } else {
    errors.value = data
  }
}
</script>

<template>
  <div>
    <Header/>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Регистрация</h2>
              <form>
                <div class="form-group mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="email" required
                         placeholder="Введите email">
                  <div class="text-danger" v-if="errors.hasOwnProperty('email')" v-for="error in errors['email']">
                    {{ error }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="password" class="form-label">Пароль</label>
                  <input type="password" class="form-control" id="password" v-model="password" required
                         placeholder="Введите пароль">
                  <div class="text-danger" v-if="!passwordMatched">
                    Пароли не совпадают
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="confirmPassword" class="form-label">Подтверждение пароля</label>
                  <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" required
                         placeholder="Подтвердите пароль">
                  <div class="text-danger" v-if="!passwordMatched">
                    Пароли не совпадают
                  </div>
                  <div class="text-danger" v-if="errors.hasOwnProperty('password')" v-for="error in errors['password']">
                    {{ error }}
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-block" @click.prevent="register"
                        :disabled="!formValid">
                  Зарегистрироваться
                </button>
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