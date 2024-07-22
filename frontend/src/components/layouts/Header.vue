<script setup>
import {useTitle} from "@vueuse/core";
import {onMounted} from "vue";
import {useUserStore} from "@/store/userStore.js";
import {useCurrentPage} from "@/hooks/currentPage.js";


const {currentUser, isLoggedIn, logout} = useUserStore()
const {longName, shortName, name} = useCurrentPage()
const pageTitle = useTitle()

onMounted(() => {
  pageTitle.value = shortName
})


</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand" href="#">{{ longName }}</span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <RouterLink :to="{name: 'main'}" class="nav-link" :class="{active: name  ===  'main'}">
                Главная
              </RouterLink>
            </li>
            <template v-if="!isLoggedIn">
              <li class="nav-item">
                <RouterLink :to="{name: 'login'}" class="nav-link" :class="{active: name  ===  'login'}">
                  Вход
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="register" class="nav-link" :class="{active: name   === 'register'}">
                  Регистрация
                </RouterLink>
              </li>
            </template>

            <template v-if="isLoggedIn">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-expanded="false" :class="{active: name  ===  'profile'}">
                  {{ currentUser.email }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li>
                    <RouterLink :to="{name: 'profile'}" class="dropdown-item text-primary">
                      <i class="bi bi-person"></i>
                      Профиль
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink :to="{name: 'settings'}" class="dropdown-item text-success">
                      <i class="bi bi-gear"></i>
                      Настройки
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink to=" #" class="dropdown-item text-danger" @click="logout">
                      <i class="bi bi-forward-fill"></i>
                      Выйти
                    </RouterLink>
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