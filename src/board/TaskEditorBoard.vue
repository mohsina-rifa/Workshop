<script setup lang="ts">
// import { ref } from "vue";
// import { useToast, POSITION } from "vue-toastification";

// import type { TaskDetail } from "../types/auth";

// import { useTaskStore } from "../stores/taskStore";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  taskID: {
    type: string,
    required: true,
  }
});

// const newTask = ref<TaskDetail>({
//   id: "",
//   taskTitle: "",
//   taskDescription: "",
//   taskStatus: "assigned",
//   userID: props.userID
// });

// const taskStoreInstance = useTaskStore();
// const toast = useToast();

const emit = defineEmits(["close"]);

const editTask = async () => {
  // if (newTask.value.taskTitle && newTask.value.taskDescription) {
  //   newTask.value.id = crypto.randomUUID();
  //   await taskStoreInstance.addTask(newTask.value);

  //   newTask.value.id = "";
  //   newTask.value.taskTitle = "";
  //   newTask.value.taskDescription = "";

  //   await taskStoreInstance.fetchTasks(props.userID);
  //   emit("close");
  // } else {
  //   toast.error("Fields cannot be empty!", {
  //     position: POSITION.TOP_RIGHT,
  //     timeout: 3000,
  //   });
  // }
};
</script>

<template>
  <div v-if="isVisible" class="modal fade show" id="taskModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Task</h5>
          <button type="button" class="btn-close" @click="emit('close')"></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            v-model="newTask.taskTitle"
            required
          />
          <textarea
            class="form-control mb-2"
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
            Update Task
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
