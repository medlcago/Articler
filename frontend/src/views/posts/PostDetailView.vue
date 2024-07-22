<script setup>

import Header from "@/components/layouts/Header.vue";
import PostCard from "@/components/blocks/PostCard.vue";
import LoadingSpinner from "@/components/layouts/LoadingSpinner.vue";
import {usePostStore} from "@/store/postStore.js";
import {useToast} from "@/hooks/toast.js";
import {useRoute} from "vue-router";

useToast()

const postStore = usePostStore()
const route = useRoute()

postStore.fetchPost(route.params.id)

</script>

<template>
  <Header/>
  <LoadingSpinner v-if="postStore.loading"/>
  <div class="container mt-3" v-else>
    <div class="post">
      <PostCard
          :post="postStore.post"
          @delete="postStore.deletePostFromDetail"
          detail
      >
        <template #footer>
          <div class="d-flex justify-content-end">
            <RouterLink to="/" class="btn btn-primary btn-sm rounded" role="button">На главную</RouterLink>
          </div>
        </template>
      </PostCard>
    </div>

  </div>
</template>

<style scoped>

</style>