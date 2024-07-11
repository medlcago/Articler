<template>
  <OfflineNotification v-if="isOffline" @check="checkConnection"/>
  <RouterView v-else/>
</template>

<script setup>

import OfflineNotification from "@/components/OfflineNotification.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";

const isOffline = ref(false);

const checkConnection = () => {
  console.log("Checking the internet connection...")
  isOffline.value = !navigator.onLine;
}

const setOffline = () => {
  isOffline.value = true;
}

onMounted(() => {
  checkConnection()
  window.addEventListener('online', checkConnection);
  window.addEventListener('offline', setOffline);
})

onBeforeUnmount(() => {
  window.removeEventListener('online', checkConnection);
  window.removeEventListener('offline', setOffline);
})
</script>

<style>
body {
  min-width: 320px;
}
</style>