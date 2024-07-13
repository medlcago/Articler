<script setup>

import Header from "@/components/Header.vue";
import Post from "@/components/Post.vue";
import {computed, onMounted, ref} from "vue";
import {createPost, getPosts} from "@/services/post.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Modal from "@/components/Modal.vue";
import {useTextareaAutosize} from "@vueuse/core";
import {POST_LIMIT} from "@/config.js";
import Pagination from "@/components/Pagination.vue";
import {useAuth} from "@/hooks/auth.js";

const {isAuthenticated} = useAuth()

const currentPage = ref(1)
const offset = ref(0)

const {textarea, input} = useTextareaAutosize({styleProp: 'minHeight'})

const loading = ref(true)
const postTitle = ref("")
const posts = ref({})
const isPublished = ref(true)

const errors = ref({})

const close = () => {
  errors.value = {}
  postTitle.value = "";
  input.value = "";
  isPublished.value = true;
}

const publishPost = async () => {
  const {data, status} = await createPost(postTitle.value, input.value, isPublished.value);
  if (status === 201) {
    postTitle.value = "";
    input.value = "";
    $('#createPostModal').modal('hide')
    errors.value = {};
    posts.value = await getPosts({
      limit: POST_LIMIT
    });
  } else if (status === 400) {
    errors.value = data;
  }
}

const totalRecords = computed(() => posts.value.count)

const changePageAndGetPosts = async (page) => {
  loading.value = true;
  offset.value = (page - 1) * POST_LIMIT;
  currentPage.value = page;
  posts.value = await getPosts({
    limit: POST_LIMIT,
    offset: offset.value,
  });
  if (posts.value.results.length === 0 && currentPage.value > 1) {
    currentPage.value--;
    offset.value = (currentPage.value - 1) * POST_LIMIT;
    posts.value = await getPosts({
      limit: POST_LIMIT,
      offset: offset.value,
    });
  }
  loading.value = false;
}

const alertMessage = ref("");
const closeAlert = () => {
  alertMessage.value = "";
}

const deletePost = async (event) => {
  const {status, message} = event;
  alertMessage.value = message;
  if (status === 204) {
    await changePageAndGetPosts(currentPage.value);
  }
}

onMounted(async () => {
  posts.value = await getPosts({
    limit: POST_LIMIT,
    offset: offset.value,
  });
  loading.value = false;
})


</script>

<template>
  <Header/>
  <LoadingSpinner v-if="loading"/>
  <div class="container mt-3" v-else>
    <!-- Opening a modal to create a post-->
    <div class="d-flex justify-content-end" v-if="isAuthenticated">
      <button class="btn btn-primary" data-toggle="modal" data-target="#createPostModal">
        Создать новый пост
      </button>
    </div>

    <div class="mt-2 alert alert-info alert-dismissible fade show" role="alert" v-if="alertMessage">
      <div class="text-center font-weight-bold">
        {{ alertMessage }}
      </div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" @click="closeAlert">&times;</span>
      </button>
    </div>

    <!-- List of posts-->
    <div class="posts">
      <template v-if="totalRecords > 0">
        <Post
            v-for="post in posts.results"
            :key="post.id"
            :post="post"
            @delete="deletePost"
        />
        <Pagination
            @page="changePageAndGetPosts"
            :current-page="currentPage"
            :total-items="totalRecords"
            :items-per-page="POST_LIMIT"
        />
      </template>
      <h1 v-else class="text-center">
        Нет постов
      </h1>
    </div>
  </div>

  <!-- Modal for creating a post-->
  <Modal
      id="createPostModal"
      name="createPostModal"
      title="Создать новый пост"
      size="modal-lg"
  >
    <template #body>
      <div class="form-group">
        <label for="title">Заголовок</label>
        <input type="text" class="form-control" id="title"
               placeholder="Enter title" v-model="postTitle">
        <div class="text-danger" v-if="errors.hasOwnProperty('title')" v-for="error in errors['title']">
          {{ error }}
        </div>
      </div>
      <div class="form-group">
        <label for="title">Описание</label>
        <textarea
            ref="textarea"
            v-model="input"
            class="form-control resize-none"
            id="description"
            placeholder="Enter description"
            rows="3"
        />
        <div class="text-danger" v-if="errors.hasOwnProperty('description')" v-for="error in errors['description']">
          {{ error }}
        </div>
      </div>
      <select class="form-control" aria-label="select" v-model="isPublished">
        <option :value="true">Опубликовано</option>
        <option :value="false">Черновик</option>
      </select>
    </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Закрыть</button>
      <button type="button" class="btn btn-primary" @click="publishPost">Опубликовать</button>
    </template>
  </Modal>

</template>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>