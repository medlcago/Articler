<script setup>

import Header from "@/components/layouts/Header.vue";
import PostCard from "@/components/blocks/PostCard.vue";
import {onMounted, reactive} from "vue";
import LoadingSpinner from "@/components/layouts/LoadingSpinner.vue";
import BaseModal from "@/components/ui/Modals/BaseModal.vue";
import Pagination from "@/components/Pagination.vue";
import {useUserStore} from "@/store/userStore.js";
import {usePostStore} from "@/store/postStore.js";
import {useErrorStore} from "@/store/errorStore.js";
import BaseButton from "@/components/ui/Buttons/BaseButton.vue";
import BaseTextarea from "@/components/ui/Inputs/BaseTextarea.vue";
import BaseInput from "@/components/ui/Inputs/BaseInput.vue";
import {useToast} from "@/hooks/toast.js";
import BaseSelect from "@/components/ui/Inputs/BaseSelect.vue";

useToast()

const {isLoggedIn} = useUserStore()
const postStore = usePostStore()
const errorStore = useErrorStore()

const post = reactive({
  title: "",
  description: "",
  is_published: true,
})

const clearPost = () => {
  post.title = ""
  post.description = ""
  post.is_published = true
}

const hideModal = () => {
  errorStore.clearErrors()
  clearPost()
  $('#createPostModal').modal('hide')
}

const publishPost = async () => {
  await postStore.sharePost({
    title: post.title,
    description: post.description,
    is_published: post.is_published,
  })
  if (!errorStore.hasErrors) {
    hideModal()
  }
}

onMounted(async () => {
  await postStore.fetchPosts()
})

</script>

<template>
  <Header/>
  <LoadingSpinner v-if="postStore.loading"/>
  <div class="container mt-3" v-else>
    <!-- Opening a modal to create a post-->
    <div class="d-flex justify-content-end" v-if="isLoggedIn">
      <BaseButton
          text="Создать новый пост"
          data-toggle="modal"
          data-target="#createPostModal"
      />
    </div>

    <!-- List of posts-->
    <div class="posts mt-2">
      <template v-if="postStore.totalRecords > 0">
        <PostCard
            v-for="post in postStore.posts.results"
            :key="post.id"
            :post="post"
            @delete="postStore.deletePostFromList"
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
  <BaseModal
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

        <BaseInput
            v-model.trim="post.title"
            type="text"
            id="title"
            placeholder="Введите заголовок"
            class="form-control"
            maxlength="255"
        />
        <div class="text-danger" v-if="errorStore.hasKey('title')"
             v-for="error in errorStore.getError('title')">
          {{ error }}
        </div>
      </div>

      <div class="form-group">
        <label for="title">Описание</label>
        <BaseTextarea
            v-model.trim="post.description"
            id="description"
            placeholder="Введите описание"
            class="form-control"
            rows="3"
        />
        <div class="text-danger" v-if="errorStore.hasKey('description')"
             v-for="error in errorStore.getError('description')">
          {{ error }}
        </div>
      </div>

      <BaseSelect
          class="form-control"
          v-model="post.is_published">
        <template #options>
          <option :value="true">Опубликовано</option>
          <option :value="false">Черновик</option>
        </template>
      </BaseSelect>

    </template>
  </BaseModal>

</template>

<style scoped>
</style>