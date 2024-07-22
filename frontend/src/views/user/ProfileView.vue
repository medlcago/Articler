<script setup>

import Header from "@/components/layouts/Header.vue";
import {computed, onMounted, ref} from "vue";
import LoadingSpinner from "@/components/layouts/LoadingSpinner.vue";
import BaseModal from "@/components/ui/Modals/BaseModal.vue";
import {useUserStore} from "@/store/userStore.js";
import {usePostStore} from "@/store/postStore.js";
import {useErrorStore} from "@/store/errorStore.js";
import PostList from "@/components/blocks/PostList.vue";
import BaseButton from "@/components/ui/Buttons/BaseButton.vue";
import BaseTextarea from "@/components/ui/Inputs/BaseTextarea.vue";
import {useToast} from "@/hooks/toast.js";


useToast()

const userStore = useUserStore()
const postStore = usePostStore()
const errorStore = useErrorStore()

const previewImage = ref(null)


const currentStatus = computed(() => {
  return userStore.currentUser.status
})

const userStatus = ref(currentStatus.value)

const cancelEditProfile = () => {
  userStore.editProfile = false
  userStatus.value = currentStatus.value;
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log(file);
  previewImage.value = URL.createObjectURL(file);
}

onMounted(async () => {
  await postStore.fetchUserPosts(userStore.currentUser.id)
})
</script>

<template>
  <Header/>
  <LoadingSpinner v-if="postStore.loading"/>
  <div class="container mt-5" v-else>
    <div class="row">
      <div class="col-md-4 profile-column">
        <div class="d-flex justify-content-center">
          <template v-if="userStore.currentUser.avatar">
            <img :src="userStore.currentUser.avatar"
                 class="img-fluid profile-picture mb-2 ml-3"
                 alt="Фото профиля" data-toggle="modal" data-target="#uploadPhotoModal">
          </template>

          <template v-else>
            <img src="../../../assets/default-avatar.png"
                 class="img-fluid profile-picture mb-2 ml-3"
                 alt="Фото профиля" data-toggle="modal" data-target="#uploadPhotoModal">
          </template>
        </div>

        <div class="email">
          <h2 id="user-email">{{ userStore.currentUser.email }}</h2>
        </div>
        <div class="border-bottom w-100 my-2"></div>
        <div class="profile-info" v-if="!userStore.editProfile">
          <div class="status" v-if="currentStatus">
            <div id="user-status">{{ currentStatus }}</div>
            <div class="text-danger"
                 v-if="errorStore.hasKey('status')"
                 v-for="error in errorStore.getError('status')">
              {{ error }}
            </div>
          </div>
          <div class="edit-profile mt-2">
            <BaseButton
                text="Редактировать профиль"
                class="btn-block"
                @click="userStore.editProfile=true"
            />
          </div>
        </div>

        <!-- Editing a profile-->
        <div class="form-group" v-else>
          <BaseTextarea
              maxlength="128"
              @keydown.enter.prevent
              v-model.trim="userStatus"
              class="form-control border-dark"
              placeholder="Enter status"
              id="status"
              rows="3"
          />
          <div class="d-flex justify-content-start mt-2">
            <BaseButton
                text="Сохранить"
                class="btn-sm mr-1"
                @click="userStore.updateUserData({status: userStatus})"
            />
            <BaseButton
                text="Отмена"
                color="secondary"
                class="btn-sm"
                @click="cancelEditProfile"
            />
          </div>
        </div>

      </div>

      <div class="col-md-8 posts-column">
        <template v-if="postStore.posts.results.length">
          <h3>10 последних постов</h3>
          <div class="posts">
            <PostList
                :posts="postStore.posts.results"
            />
          </div>
        </template>
        <h3 v-else>На данный момент вы не написали ни один пост &#9785;&#65039;</h3>
      </div>

    </div>
  </div>

  <BaseModal
      id="uploadPhotoModal"
      name="uploadPhotoModal"
      title="Загрузка изображения"
      confirm-text="Сохранить изменения"
  >
    <template #body>
      <form>
        <div class="form-group">
          <label for="avatar">Пожалуйста, выберите изображение</label>
          <div class="custom-file">
            <label class="custom-file-label" for="avatar">Выберите файл</label>
            <input @change="handleFileUpload" type="file" class="custom-file-input" id="avatar">
          </div>
        </div>
      </form>
      <div class="img-container" v-if="previewImage">
        <img :src="previewImage" alt="Загруженное фото"/>
      </div>
    </template>
  </BaseModal>

</template>

<style scoped>
#user-status {
  overflow-wrap: break-word;
  white-space: pre-line;
}

.profile-picture {
  width: 294px;
  height: 294px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.profile-column {
  margin-left: -100px;
  margin-right: 100px;
}

textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
  resize: none;
}

textarea::-webkit-scrollbar {
  display: none;
}

.img-container {
  max-height: 1080px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-container img {
  max-width: 100%;
  max-height: 100%;
}

@media (max-width: 992px) {
  .row {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .profile-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
    margin-left: 0 !important;
  }

  .posts-column h3 {
    text-align: center;
  }

  .profile-picture {
    width: 200px;
    height: 200px;
    margin-left: 0 !important;
  }
}
</style>