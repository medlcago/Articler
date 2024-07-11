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
    <div class="post">
      <Post :post="post">
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