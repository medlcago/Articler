<script setup>
import Header from "@/components/Header.vue";
import {useRoute, useRouter} from "vue-router";
import {resetPasswordConfirm, validateToken} from "@/services/user.js";
import {computed, onBeforeUnmount, ref, watch} from "vue";
import Message from "@/components/Message.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import {useUserStore} from "@/store/userStore.js";
import {useErrorStore} from "@/store/errorStore.js";

const route = useRoute();
const router = useRouter()

const userStore = useUserStore()
const errorStore = useErrorStore()

const showPage = ref(false);

const token = route.query.token;
const handleValidateToken = async () => {
  const {status} = await validateToken(token);
  if (status !== 200) {
    await router.push({
      name: "main"
    })
  } else {
    showPage.value = true;
    await router.replace({
      name: "resetPassword"
    })
  }
}

handleValidateToken()

const password = ref("");
const confirmPassword = ref("");
const passwordMatched = ref(true);

const formValid = computed(() => {
  return password.value.length >= 8 && passwordMatched.value;
})

const changePassword = async () => {
  await userStore.changeUserPassword(token, password.value)
}

watch(() => [password, confirmPassword], ([newPassword, newConfirmPassword]) => {
      passwordMatched.value = newPassword.value === newConfirmPassword.value;
    },
    {deep: true}
)

onBeforeUnmount(() => {
  errorStore.$reset()
})

</script>
<template>
  <template v-if="showPage">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <span class="navbar-brand">Сброс пароля</span>
        </div>
      </nav>
    </header>
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <Message
              v-if="errorStore.error"
              title="Failed to change the password"
              title-color="danger"
          >
            <template #content>
              There was an error when changing the password.
              <br>
              The link may have expired.
              <br>
              <RouterLink to="/forgot-password">Try again</RouterLink>
            </template>
          </Message>

          <Message
              v-else
              title="Password successfully changed"
              title-color="success"
          >
            <template #content>
              Your password has been successfully reset.
              <br>
              You can now
              <RouterLink to="/">return to the home page</RouterLink>
              .
            </template>
          </Message>

          <div class="card" v-else>
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Сброс пароля</h2>
              <form @submit.prevent="changePassword">
                <div class="form-group">
                  <label for="password">Пароль</label>
                  <CustomInput
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Введите новый пароль"
                      required
                  />
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Подтверждение пароля</label>
                  <CustomInput
                      v-model="confirmPassword"
                      type="password"
                      class="form-control"
                      id="confirmPassword"
                      placeholder="Подтвердите пароль"
                      required
                  />
                  <div class="text-danger" v-if="!passwordMatched">
                    Пароли не совпадают
                  </div>
                </div>
                <CustomButton
                  text="Установить новый пароль"
                  type="submit"
                  class="btn-block"
                  :disabled="!formValid"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
.card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>