<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Axios } from "../service/axios";

import type { Task } from "../interfaces/taskInterface";
import type { TaskDetail } from "../types/auth";

const tasks = ref<Task[]>([]);

const newTask = ref<TaskDetail>({
  taskID: "",
  taskTitle: "",
  taskStatus: "",
  taskPriority: "low",
});

onMounted(async () => {
  try {
    const response = await Axios.get("/tasks");
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});

const priorityValue = ref("");

const addTask = async () => {
  const newTaskData: Task = {
    id: crypto.randomUUID(),
    title: newTask.value.taskTitle,
    status: "assigned",
    priority: newTask.value.taskPriority as "low" | "medium" | "high"
  };

  if (priorityValue.value === "low") {
    newTaskData.priority = newTask.value.taskPriority as "low";
  } else if (priorityValue.value === "medium") {
    newTaskData.priority = newTask.value.taskPriority as "medium";
  } else if (priorityValue.value === "high") {
    newTaskData.priority = newTask.value.taskPriority as "high";
  } else {
    throw new Error("Invalid priority value.");
  }

  try {
    await Axios.post("/tasks", newTaskData);
    tasks.value.push(newTaskData);

    newTask.value.taskID = "";
    newTask.value.taskTitle = "";
    newTask.value.taskStatus = "";
    newTask.value.taskPriority = "low";
  } catch (error) {
    console.error("Error adding task:", error);
  }
};
</script>

<template>
  <div class="container-fluid py-4">
    <h1 class="text-center mb-4">My To-Do List</h1>
    <div class="kanban-board justify-content-center">
      <div class="kanban-column" id="assigned">
        <h4>Assigned</h4>
        <div class="tasks" data-status="assigned"></div>
        <div class="add-task-form">
          <input
            type="text"
            class="form-control mb-2"
            placeholder="New task title"
            v-model="newTask.taskTitle"
          />
          <select class="form-select mb-2" v-model="priorityValue">
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button class="btn btn-primary btn-sm w-100" @click="addTask">
            Add Task
          </button>
        </div>
      </div>
      <div class="kanban-column" id="in-progress">
        <h4>In Progress</h4>
        <div class="tasks" data-status="in-progress"></div>
      </div>
      <div class="kanban-column" id="completed">
        <h4>Completed</h4>
        <div class="tasks" data-status="completed"></div>
      </div>
      <div class="kanban-column" id="unsuccessful">
        <h4>Unsuccessful</h4>
        <div class="tasks" data-status="unsuccessful"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-fluid {
  background-color: #f8f9fa;
  min-height: 100vh;
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

.kanban-column h4 {
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
  background-color: #d3e4ff;
  border-radius: 5px;
}
</style>
