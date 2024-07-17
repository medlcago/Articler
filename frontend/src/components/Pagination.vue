<script setup>
import {computed} from "vue";

const emits = defineEmits(["page"]);

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true,
    default: 10
  },
  visiblePages: {
    type: Number,
    required: false,
    default: 5
  }
});

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const pages = computed(() => {
  let start = Math.max(1, props.currentPage - Math.floor(props.visiblePages / 2));
  let end = Math.min(totalPages.value, start + props.visiblePages - 1);
  return Array.from({length: end - start + 1}, (_, i) => start + i);
});


</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
        <button class="page-link" @click="emits('page', currentPage - 1)">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item" v-for="page in pages " :key="page"
          :class="{ 'active': page === currentPage }">
        <button class="page-link" :disabled="page === currentPage" @click="emits('page', page)">
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
        <button class="page-link" @click="emits('page', currentPage + 1)">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>