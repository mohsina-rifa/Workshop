<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast, POSITION } from "vue-toastification";

import type { TaskStatus } from "../types/auth";

import { useTaskStore } from "../stores/taskStore";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  }
});

const taskStoreInstance = useTaskStore();

onMounted(async () => {
  await taskStoreInstance.fetchStatuses();
});

const statusIndex = taskStoreInstance.statusList.length + 1;

const newStatus = ref<TaskStatus>({
  id: statusIndex,
  title: "",
  key: "",
});

const emit = defineEmits(["close"]);
const toast = useToast();

const createStatus = async () => {
  if (newStatus.value.title) {
    await taskStoreInstance.addStatus(newStatus.value);
    await taskStoreInstance.fetchStatuses();
    emit("close");
  } else {
    toast.error("Title cannot be empty!", {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
    });
  }
};
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
