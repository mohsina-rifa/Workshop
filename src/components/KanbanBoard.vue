<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usetaskStore } from "../stores/taskStore";

const taskStore = usetaskStore();

onMounted(async () => {
  await taskStore.fetchTasks();
});

const isModalVisible = ref(false);
const taskTitle = ref("");
const taskDescription = ref("");
const taskStatus = ref("assigned");

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  taskTitle.value = "";
};

const addTask = async () => {
  await taskStore.addTask({
    taskID: crypto.randomUUID(),
    taskTitle: taskTitle.value,
    taskDescription: taskDescription.value,
    taskStatus: taskStatus.value,
  });
  closeModal();
};
</script>

<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-4"><strong>My To-Do List</strong></h1>
      <button class="btn btn-primary" @click="openModal">Add Task</button>
    </div>
    <div class="kanban-board justify-content-center">
      <div class="kanban-column" id="assigned">
        <h3><strong>Assigned</strong></h3>
        <div class="tasks" data-status="assigned">
          <div
            v-for="task in taskStore.getTaskList.filter(
              (t) => t.taskStatus === 'assigned'
            )"
            :key="task.taskID"
          >
            <h4>{{ task.taskTitle }}</h4>
            <p>{{ task.taskDescription }}</p>
          </div>
        </div>
      </div>
      <div class="kanban-column" id="in-progress">
        <h3><strong>In Progress</strong></h3>
        <div class="tasks" data-status="in-progress">
          <div
            v-for="task in taskStore.getTaskList.filter(
              (t) => t.taskStatus === 'in-progress'
            )"
            :key="task.taskID"
          >
            <h4>{{ task.taskTitle }}</h4>
            <p>{{ task.taskDescription }}</p>
          </div>
        </div>
      </div>
      <div class="kanban-column" id="completed">
        <h3><strong>Completed</strong></h3>
        <div class="tasks" data-status="completed">
          <div
            v-for="task in taskStore.getTaskList.filter(
              (t) => t.taskStatus === 'completed'
            )"
            :key="task.taskID"
          >
            <h4>{{ task.taskTitle }}</h4>
            <p>{{ task.taskDescription }}</p>
          </div>
        </div>
      </div>
      <div class="kanban-column" id="unsuccessful">
        <h3><strong>Unsuccessful</strong></h3>
        <div class="tasks" data-status="unsuccessful">
          <div
            v-for="task in taskStore.getTaskList.filter(
              (t) => t.taskStatus === 'unsuccessful'
            )"
            :key="task.taskID"
          >
            <h4>{{ task.taskTitle }}</h4>
            <p>{{ task.taskDescription }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isModalVisible"
      class="modal fade show"
      tabindex="-1"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Task</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              v-model="taskTitle"
              class="form-control"
              placeholder="Enter task title"
            />
            <textarea
              v-model="taskDescription"
              class="form-control mb-2"
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addTask">
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.d-flex h1 {
  margin-left: 300px;
}

.d-flex button {
  margin-right: 300px;
}

.kanban-board {
  display: flex;
  overflow-x: auto;
  padding: 20px 0;
}

.kanban-column {
  min-width: 300px;
  max-width: 300px;
  margin: 0 15px;
  background-color: #ebecf0;
  border-radius: 10px;
  padding: 10px;
}

.kanban-column h3 {
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
  background-color: #d3e4ff;
  border-radius: 5px;
}
</style>
