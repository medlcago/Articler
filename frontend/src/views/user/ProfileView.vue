<script setup>

import Header from "@/components/Header.vue";
import {computed, onMounted, ref} from "vue";
import {getPosts} from "@/services/post.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useTextareaAutosize} from "@vueuse/core";
import {getAvatarUrl} from "@/utils/index.js";
import {changeProfile} from "@/services/user.js";
import {POST_PROFILE_LIMIT} from "@/config.js";
import Modal from "@/components/Modal.vue";
import {useUser} from "@/hooks/user.js";

const {user} = useUser()

const {textarea, input} = useTextareaAutosize({styleProp: 'minHeight'})


const posts = ref({})
const editProfile = ref(false)
const loading = ref(true)
const previewImage = ref(null)


const currentStatus = computed(() => {
  return user.value.profile.status
})
input.value = currentStatus.value

const cancelEditProfile = () => {
  editProfile.value = false;
  input.value = currentStatus.value;
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log(file);
  previewImage.value = URL.createObjectURL(file);
}

const saveProfile = async () => {
  editProfile.value = false;
  if (input.value !== currentStatus.value) {
    const {status} = await changeProfile(user.value.id, {
      "profile": {
        "status": input.value
      }
    })
    if (status === 200) {
      user.value.profile.status = input.value
    }
  }
}

onMounted(async () => {
  posts.value = await getPosts({
    limit: POST_PROFILE_LIMIT,
    author__id: user.value.id,
  })
  loading.value = false;
})
</script>

<template>
  <Header/>
  <LoadingSpinner v-if="loading"/>
  <div class="container mt-5" v-else>
    <div class="row">
      <div class="col-md-4 profile-column">

        <div class="d-flex justify-content-center">
          <template v-if="user.profile.avatar">
            <img :src="getAvatarUrl(user.profile.avatar)"
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
          <h2 id="user-email">{{ user.email }}</h2>
        </div>
        <div class="border-bottom w-100 my-2"></div>
        <div class="profile-info" v-if="!editProfile">
          <div class="status">
            <p id="user-status" v-if="currentStatus">{{ currentStatus }}</p>
          </div>
          <div class="edit-profile">
            <button class="btn btn-primary btn-block" @click="editProfile=true">
              Edit profile
            </button>
          </div>
        </div>

        <!-- Editing a profile-->
        <div class="form-group" v-else>
            <textarea
                maxlength="128"
                @keydown.enter.prevent
                ref="textarea"
                v-model.trim="input"
                class="form-control resize-none rounded border-dark"
                placeholder="Enter status"
                id="status"
                rows="3"
            />
          <div class="d-flex justify-content-start mt-2">
            <button class="btn btn-primary btn-sm mr-1" @click="saveProfile">Сохранить</button>
            <button class="btn btn-secondary btn-sm" @click="cancelEditProfile">Отмена</button>
          </div>
        </div>


      </div>

      <div class="col-md-8 posts-column">
        <template v-if="posts.results.length">
          <h3>10 последних постов</h3>
          <div class="posts">
            <div class="list-group mb-1" v-for="post in posts.results" :key="post.id">
              <RouterLink :to="`/post/${post.id}`" class="list-group-item list-group-item-action">
                <div class="d-flex justify-content-between text-break">
                  <h5 class="mb-1">
                    {{ post.title }}
                  </h5>
                </div>
              </RouterLink>
            </div>
          </div>
        </template>
        <h3 v-else>На данный момент вы не написали ни один пост &#9785;&#65039;</h3>
      </div>

    </div>
  </div>

  <Modal
      id="uploadPhotoModal"
      name="uploadPhotoModal"
      title="Загрузка изображения"
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
    <template #footer>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
      <button type="button" class="btn btn-primary">Сохранить изменения</button>
    </template>
  </Modal>

</template>

<style scoped>
.profile-picture {
  width: 294px;
  height: 294px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
}

.edit-profile button {
  border-radius: 10px;
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

#user-status {
  word-wrap: break-word;
  white-space: pre-wrap;
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