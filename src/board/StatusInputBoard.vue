<script setup lang="ts">
import { ref } from "vue";

import type { TaskStatus } from "../types/auth";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  }
});

const newStatus = ref<TaskStatus>({
  id: 0,
  title: "",
  key: "",
});
</script>

<template>
  <div v-if="props.isVisible" class="modal fade show" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Category</h5>
          <button type="button" class="btn-close" @click="emit('close')"></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            placeholder="Enter task title"
            v-model="newStatus.title"
            required
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="emit('close')">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="createStatus">
            Save Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
