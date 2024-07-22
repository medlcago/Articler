<script setup>

import {createPostUrl, formatDate} from "@/utils/index.js";

defineProps({
  posts: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="list-group mb-1" v-for="post in posts" :key="post.id">
    <RouterLink :to="createPostUrl(post)" class="list-group-item list-group-item-action">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="text-truncate">{{ post.title }}</h5>
        <small class="text-muted">{{ formatDate(post.created_at) }}</small>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
</style>