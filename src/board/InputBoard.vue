<script setup lang="ts">
import { ref } from "vue";
import { useToast, POSITION } from "vue-toastification";

import type { TaskDetail } from "../types/auth";

import { useTaskStore } from "../stores/taskStore";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  // userID: {
  //   type: String,
  //   required: true,
  // }
});

const newTask = ref<TaskDetail>({
  id: crypto.randomUUID(),
  taskTitle: "",
  taskDescription: "",
  taskStatus: "assigned",
  // userID: props.userID
});

const taskStore = useTaskStore();
const toast = useToast();

const createTask = async () => {
  if (newTask.value.taskTitle && newTask.value.taskDescription) {
    await taskStore.addTask(newTask.value);
    await taskStore.fetchTasks();
    emit("close");
  } else {
    toast.error("Fields cannot be empty!", {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
    });
  }
};

const emit = defineEmits(["close"]);
</script>

<template>
  <div v-if="props.isVisible" class="modal fade show" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Task</h5>
          <button type="button" class="btn-close" @click="emit('close')"></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            placeholder="Enter task title"
            v-model="newTask.taskTitle"
            required
          />
          <textarea
            class="form-control mb-2"
            placeholder="Enter task description"
            v-model="newTask.taskDescription"
            rows="3"
            required
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="emit('close')">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="createTask">
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
