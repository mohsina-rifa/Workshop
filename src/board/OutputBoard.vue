<script setup lang="ts">
import { reactive, onMounted } from 'vue';

import type { TaskDetail } from '../types/auth'

import { useTaskStore } from '../stores/taskStore'

const allTasks = reactive<TaskDetail[]>([]);
const taskStoreInstance = useTaskStore();

onMounted(async () => {
  await taskStoreInstance.fetchTasks();
  allTasks.push(...taskStoreInstance.getTaskList);
});

const tasksByStatus = (status: string) => {
  return allTasks.filter((task) => task.taskStatus === status);
};

</script>

<template>
  <div class="kanban-board justify-content-center">
    <div class="kanban-column" id="assigned">
      <h4><strong>Assigned</strong></h4>
      <div class="tasks" data-status="assigned">
        <div v-for="task in tasksByStatus('assigned')" :key="task.taskID" class="task-card">
          <h5>{{ task.taskTitle }}</h5>
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
    <div class="kanban-column" id="inprogress">
      <h4><strong>In Progress</strong></h4>
      <div class="tasks" data-status="inprogress">
        <div v-for="task in tasksByStatus('inprogress')" :key="task.taskID" class="task-card">
          <h5>{{ task.taskTitle }}</h5>
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
    <div class="kanban-column" id="completed">
      <h4><strong>Completed</strong></h4>
      <div class="tasks" data-status="completed">
        <div v-for="task in tasksByStatus('completed')" :key="task.taskID" class="task-card">
          <h5>{{ task.taskTitle }}</h5>
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
    <div class="kanban-column" id="unsuccessful">
      <h4><strong>Unsuccessful</strong></h4>
      <div class="tasks" data-status="unsuccessful">
        <div v-for="task in tasksByStatus('unsuccessful')" :key="task.taskID" class="task-card">
          <h5>{{ task.taskTitle }}</h5>
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.task-card {
  border-color: #bbcfe2;
  border-radius: 10px;
}

.task-card h5 {
  text-align: center;
}
</style>
