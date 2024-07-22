<script setup>
import BaseButton from "@/components/ui/Buttons/BaseButton.vue";

defineProps({
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
    required: false,
    default: ""
  },
  align: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    required: false,
  },
  confirmText: {
    type: String,
    default: "Сохранить"
  },
  confirmColor: {
    type: String,
    default: "primary"
  },
  closeText: {
    type: String,
    default: "Закрыть"
  },
  closeColor: {
    type: String,
    default: "secondary"
  }
});

const emits = defineEmits(["confirm", "close"]);
</script>

<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="name"
       aria-hidden="true">
    <div class="modal-dialog" role="document" :class="[align, size]">

      <div class="modal-content">
        <div class="modal-header text-break">
          <slot name="header">
            <h5 class="modal-title" :id="name">{{ title }}</h5>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            {{ body }}
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <BaseButton
                :text="closeText"
                :class="[closeColor ? 'btn-' + closeColor: '']"
                @click="emits('close')"
                data-dismiss="modal"
            />
            <BaseButton
                :text="confirmText"
                :class="[confirmColor ? 'btn-' + confirmColor: '']"
                @click="emits('confirm')"
            />
          </slot>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>