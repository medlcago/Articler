<script setup>
import {computed} from "vue";

const props = defineProps(['post']
);

const paragraphs = computed(() => {
  return props.post.description.split("\n");
})
</script>

<template>
  <div class="card mb-4 mt-3">
    <slot name="header">

    </slot>

    <slot name="body">
      <div class="card-body">

        <slot name="subtitle">
          <h6 class="card-subtitle mb-2 text-muted">
            <div class="d-flex justify-content-between">
              <span>{{ post.author.email }}</span>
              <span class="user-select-none">
                <i class="fas fa-thumbs-up mr-1 reaction"></i>
                <span>500</span>
                <i class="fas fa-thumbs-down ml-3 mr-1 reaction"></i>
                <span>100</span>
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
</template>

<style scoped>
a {
  text-decoration: none;
}

.reaction {
  cursor: pointer;
}
</style>