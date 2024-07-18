<script setup>
import {computed} from "vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import {useUserStore} from "@/store/userStore.js";


const props = defineProps(["post"])

const emits = defineEmits(["delete"])

const paragraphs = computed(() => {
  return props.post.description.split("\n");
})

const {currentUser} = useUserStore();

</script>

<template>
  <div class="card mb-4 mt-3">
    <slot name="header">

    </slot>

    <slot name="body">
      <div class="card-body">

        <slot name="subtitle">
          <h6 class="card-subtitle mb-2">
            <div class="d-flex justify-content-between">
              <a :href="`mailto:${post.author.email}`">{{ post.author.email }}</a>
              <span class="text-danger delete-post" title="Удалить" v-if="post.author.id === currentUser.id">
                <i class="bi bi-trash" data-toggle="modal"
                   :data-target="`#deletePostModal-${post.id}`"></i>
              </span>
            </div>
          </h6>
        </slot>

        <slot name="title">
          <h5 class="card-title">
            <RouterLink :to="`/post/${post.id}/`" class="text-dark">{{ post.title }}</RouterLink>
          </h5>
        </slot>

        <slot name="text">
          <div class="card-text">
            <template v-for="paragraph in paragraphs">
              <div v-if="paragraph.length > 0" :key="paragraph">
                <p>{{ paragraph }}</p>
              </div>
            </template>
          </div>
        </slot>

        <slot name="footer">

        </slot>

      </div>
    </slot>
  </div>

  <ConfirmModal
      :id="`deletePostModal-${post.id}`"
      name="deletePostModal"
      :title="`${post.title}`"
      body="Вы уверены, что хотите удалить пост?"
      @onConfirm="emits('delete', props.post.id)"
  />
</template>

<style scoped>
a {
  text-decoration: none;
}

.delete-post {
  cursor: pointer;
}
</style>