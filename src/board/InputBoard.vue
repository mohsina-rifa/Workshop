<script setup lang="ts">
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <div v-if="props.isVisible" class="modal fade show" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Task</h5>
          <button
            type="button"
            class="btn-close"
            @click="emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            placeholder="Enter task title"
          />
          <textarea
            class="form-control mb-2"
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="emit('close')"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save Task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
