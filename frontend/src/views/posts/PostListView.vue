<script setup>

import Header from "@/components/Header.vue";
import Post from "@/components/Post.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Modal from "@/components/Modal.vue";
import Pagination from "@/components/Pagination.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomTextarea from "@/components/CustomTextarea.vue";
import CustomButton from "@/components/CustomButton.vue";
import {useUserStore} from "@/store/userStore.js";
import {usePostStore} from "@/store/postStore.js";
import {useErrorStore} from "@/store/errorStore.js";

const {isLoggedIn} = useUserStore()
const postStore = usePostStore()
const errorStore = useErrorStore()


const postTitle = ref("")
const postDescription = ref("")
const isPublished = ref(true)

const hideModal = () => {
  errorStore.errors = {}
  postTitle.value = "";
  postDescription.value = "";
  isPublished.value = true;
  $('#createPostModal').modal('hide')
}

const publishPost = async () => {
  const status = await postStore.sharePost(postTitle.value, postDescription.value, isPublished.value)
  if (status === 201) {
    hideModal()
  }
}
const deletePost = async (postId) => {
  const status = await postStore.removePost(postId)
  if (status === 204) {
    await postStore.changePageAndFetchPosts(postStore.currentPage);
  }
}

onMounted(async () => {
  await postStore.fetchPosts()
})

onBeforeUnmount(() => {
  errorStore.$reset()
})

</script>

<template>
  <Header/>
  <LoadingSpinner v-if="postStore.loading"/>
  <div class="container mt-3" v-else>
    <!-- Opening a modal to create a post-->
    <div class="d-flex justify-content-end" v-if="isLoggedIn">
      <CustomButton
          text="Создать новый пост"
          data-toggle="modal"
          data-target="#createPostModal"
      />
    </div>

    <div class="mt-2 alert alert-info alert-dismissible fade show" role="alert" v-if="errorStore.error">
      <div class="text-center font-weight-bold">
        {{ errorStore.error }}
      </div>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" @click="errorStore.error=''">&times;</span>
      </button>
    </div>

    <!-- List of posts-->
    <div class="posts mt-2">
      <template v-if="postStore.totalRecords > 0">
        <Post
            v-for="post in postStore.posts.results"
            :key="post.id"
            :post="post"
            @delete="deletePost"
        />
        <Pagination
            @page="postStore.changePageAndFetchPosts"
            :current-page="postStore.currentPage"
            :total-items="postStore.totalRecords"
            :items-per-page="postStore.limit"
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
      @close="hideModal"
      @confirm="publishPost"
      confirm-text="Опубликовать"
  >
    <template #body>
      <div class="form-group">
        <label for="title">Заголовок</label>

        <CustomInput
            v-model="postTitle"
            type="text"
            id="title"
            placeholder="Введите заголовок"
            class="form-control"
            maxlength="255"
        />
        <div class="text-danger" v-if="errorStore.errors.hasOwnProperty('title')"
             v-for="error in errorStore.errors['title']">
          {{ error }}
        </div>
      </div>

      <div class="form-group">
        <label for="title">Описание</label>
        <CustomTextarea
            v-model="postDescription"
            id="description"
            placeholder="Введите описание"
            class="form-control"
            rows="3"
        />
        <div class="text-danger" v-if="errorStore.errors.hasOwnProperty('description')"
             v-for="error in errorStore.errors['description']">
          {{ error }}
        </div>
      </div>

      <select class="form-control" aria-label="select" v-model="isPublished">
        <option :value="true">Опубликовано</option>
        <option :value="false">Черновик</option>
      </select>
    </template>
  </Modal>

</template>

<style scoped>
select {
  border-radius: 10px;
}
</style>