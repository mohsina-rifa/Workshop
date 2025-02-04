<script setup lang="ts">
import { ref, watch } from "vue";
import { useToast, POSITION } from "vue-toastification";

import type { TaskDetail } from "../types/auth";

import { useTaskStore } from "../stores/taskStore";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  userID: {
    type: String,
    required: false,
  },
  editedTaskID: {
    type: String,
    required: false,
  },
});

const taskStoreInstance = useTaskStore();
const toast = useToast();
const emit = defineEmits(["close"]);

const newTask = ref<TaskDetail>({
  id: "",
  taskTitle: "",
  taskDescription: "",
  taskStatus: "assigned",
  userID: props.userID as string,
});

watch(
  () => props.editedTaskID,
  () => {
    if (props.editedTaskID) {
      const currentTask = taskStoreInstance.getCurrentTask(props.editedTaskID);

      if (currentTask) {
        newTask.value.id = currentTask.id;
        newTask.value.taskTitle = currentTask.taskTitle;
        newTask.value.taskDescription = currentTask.taskDescription;
      }
    }
  }
);

const resetForm = () => {
  newTask.value.id = "";
  newTask.value.taskTitle = "";
  newTask.value.taskDescription = "";
  emit("close");
};

const createTask = async () => {
  if (props.userID) {
    if (newTask.value.taskTitle && newTask.value.taskDescription) {
      newTask.value.id = crypto.randomUUID();

      await taskStoreInstance.addTask(newTask.value);
      await taskStoreInstance.fetchTasks(props.userID);

      resetForm();
    } else {
      toast.error("Fields cannot be empty!", {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
      });
    }
  }
};

const editTask = async () => {
  if (newTask.value.taskTitle && newTask.value.taskDescription) {
    if (props.editedTaskID) {
      const { id, taskTitle, taskDescription } = newTask.value;
      await taskStoreInstance.editTask(id, taskTitle, taskDescription);

      resetForm();
    } else {
      toast.error("Fields cannot be empty!", {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
      });
    }
  }
};
</script>

<template>
  <div v-if="isVisible" class="modal fade show" id="taskModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Task</h5>
          <button type="button" class="btn-close" @click="resetForm"></button>
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
          <button type="button" class="btn btn-secondary" @click="resetForm">
            Close
          </button>
          <button type="button" v-if="userID" class="btn btn-primary" @click="createTask">
            Save Task
          </button>
          <button type="button" v-else-if="editedTaskID" class="btn btn-primary" @click="editTask">
            Edit Task
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
