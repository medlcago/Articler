<script setup>

import Header from "@/components/Header.vue";
import Post from "@/components/Post.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {usePostStore} from "@/store/postStore.js";
import {useRouter} from "vue-router";
import {onBeforeUnmount} from "vue";
import {useErrorStore} from "@/store/errorStore.js";

const router = useRouter()
const postStore = usePostStore()
const errorStore = useErrorStore()

postStore.fetchPost()

const deletePost = async (postId) => {
  const status = await postStore.removePost(postId)
  if (status === 204) {
    await router.replace({name: "main"})
  }
}

onBeforeUnmount(() => {
  errorStore.$reset()
})

</script>

<template>
  <Header/>
  <LoadingSpinner v-if="postStore.loading"/>
  <div class="container mt-3" v-else>

    <div class="mt-2 alert alert-info alert-dismissible fade show" role="alert" v-if="errorStore.error">
      <div class="text-center font-weight-bold">
        {{ errorStore.error }}
      </div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" @click="errorStore.error=''">&times;</span>
      </button>
    </div>

    <div class="post">
      <Post
          :post="postStore.post"
          @delete="deletePost"
          detail
      >
        <template #footer>
          <div class="d-flex justify-content-end">
            <RouterLink to="/" class="btn btn-primary btn-sm rounded" role="button">На главную</RouterLink>
          </div>
        </template>
      </Post>
    </div>

  </div>
</template>

<style scoped>

</style>