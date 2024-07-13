<script setup>
import Modal from "@/components/Modal.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  confirmButtonText: {
    type: String,
    default: "Подтвердить"
  },
  cancelButtonText: {
    type: String,
    default: "Отмена"
  }
})

const emits = defineEmits(["cancel", "onConfirm"])
</script>

<template>
  <Modal
      :id="id"
      :name="name"
      :title="title"
      :body="body">
    <template #footer>
      <button type="button" class="btn btn-secondary" @click="emits('cancel')" data-dismiss="modal">{{ cancelButtonText }}</button>
      <button type="button" class="btn btn-danger" @click="emits('onConfirm')" data-dismiss="modal">{{ confirmButtonText }}</button>
    </template>
  </Modal>
</template>

<style scoped>

</style>