<script setup>
import BaseModal from "@/components/ui/Modals/BaseModal.vue";
import BaseButton from "@/components/ui/Buttons/BaseButton.vue";

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
  <BaseModal
      :id="id"
      :name="name"
      :title="title"
      :body="body"
  >
    <template #footer>
      <BaseButton
          :text="cancelButtonText"
          color="secondary"
          data-dismiss="modal"
          @click="emits('cancel')"
      />
      <BaseButton
          :text="confirmButtonText"
          color="danger"
          data-dismiss="modal"
          @click="emits('onConfirm')"
      />
    </template>
  </BaseModal>
</template>

<style scoped>

</style>