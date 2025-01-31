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

console.log(props);

const taskStoreInstance = useTaskStore();

onMounted(async () => {
  await taskStoreInstance.fetchStatuses();
});

const newStatus = ref<TaskStatus>({
  id: -1,
  title: "",
  key: "",
});

const emit = defineEmits(["close"]);
const toast = useToast();

const createStatus = async () => {
  if (newStatus.value.title) {
    newStatus.value.key = newStatus.value.title.toLowerCase().split(" ").join("");
    newStatus.value.id = taskStoreInstance.getStatusIndex;

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
  <div v-if="isVisible" class="modal fade show" id="statusModal" tabindex="-1">
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
            placeholder="Enter category title"
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

<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
