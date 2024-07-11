<script setup>
import {logoutUser} from "@/services/auth.js";
import {useRouter} from "vue-router";
import {useTitle} from "@vueuse/core";
import {onMounted} from "vue";
import {useUser} from "@/hooks/user.js";
import {useAuth} from "@/hooks/auth.js";

const router = useRouter()
const pageTitle = useTitle()

const {user, currentPage} = useUser()
const {isAuthenticated} = useAuth()

const logout = () => {
  logoutUser()
  router.replace({
    name: 'login'
  })
}

onMounted(() => {
  pageTitle.value = currentPage.value.shortName
})


</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand" href="#">{{ currentPage.longName }}</span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <RouterLink :to="{name: 'main'}" class="nav-link" :class="{active: currentPage.name  ===  'main'}">
                Главная
              </RouterLink>
            </li>
            <template v-if="!isAuthenticated">
              <li class="nav-item">
                <RouterLink :to="{name: 'login'}" class="nav-link" :class="{active: currentPage.name  ===  'login'}">
                  Вход
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="register" class="nav-link" :class="{active: currentPage.name   === 'register'}">
                  Регистрация
                </RouterLink>
              </li>
            </template>

            <template v-if="isAuthenticated">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-expanded="false" :class="{active: currentPage.name  ===  'profile'}">
                  {{ user.email }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li>
                    <RouterLink :to="{name: 'profile'}" class="dropdown-item text-primary">Профиль</RouterLink>
                  </li>
                  <li>
                    <RouterLink :to="{name: 'settings'}" class="dropdown-item text-success">Настройки</RouterLink>
                  </li>
                  <li>
                    <RouterLink to=" #" class="dropdown-item text-danger" @click="logout">Выйти</RouterLink>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.dropdown-item:active {
  background-color: transparent !important;
}
</style>