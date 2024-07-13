<script setup>

import Header from "@/components/Header.vue";
import Post from "@/components/Post.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getPost} from "@/services/post.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const router = useRouter()
const route = useRoute()

const post = ref({})
const loading = ref(true)

const alertMessage = ref("");
const closeAlert = () => {
  alertMessage.value = "";
}

const deletePost = (event) => {
  const {status, message} = event
  if (status === 204) {
    router.replace({name: "main"})
  } else {
    alertMessage.value = message
  }
}

onMounted(async () => {
  loading.value = true;
  const postId = route.params.id;
  const data = await getPost(postId)
  if (data) {
    post.value = data;
  } else {
    await router.replace({name: "notFound"})
  }
  loading.value = false;
})
</script>

<template>
  <Header/>
  <LoadingSpinner v-if="loading"/>
  <div class="container mt-3" v-else>

    <div class="mt-2 alert alert-info alert-dismissible fade show" role="alert" v-if="alertMessage">
      <div class="text-center font-weight-bold">
        {{ alertMessage }}
      </div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" @click="closeAlert">&times;</span>
      </button>
    </div>

    <div class="post">
      <Post
          :post="post"
          @delete="deletePost"
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