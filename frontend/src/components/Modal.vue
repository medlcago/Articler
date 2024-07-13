<script setup>
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
  }
});

const emits = defineEmits(["save", "close"]);
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
            <button type="button" class="btn btn-secondary" @click="emits('close')" data-dismiss="modal">Закрыть
            </button>
            <button type="button" class="btn btn-primary" @click="emits('save')">Сохранить
              изменения
            </button>
          </slot>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>