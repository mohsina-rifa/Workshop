<script setup lang="ts">
import { reactive, onMounted } from "vue";

import type { TaskDetail } from "../types/auth";

import { useTaskStore } from "../stores/taskStore";

const allTasks = reactive<TaskDetail[]>([]);
const taskStoreInstance = useTaskStore();

onMounted(async () => {
  await taskStoreInstance.fetchTasks();
  allTasks.push(...taskStoreInstance.getTaskList);
});

const tasksByStatus = (status: string) => {
  return allTasks.filter((task) => task.taskStatus === status);
};

let draggedTaskID = "";
let isDragging = '';
let dragOverColumn = '';

const onDragStart = (taskID: string, event: DragEvent) => {
  draggedTaskID = taskID;
  isDragging = taskID;

  const taskElement = event.target as HTMLElement;
  taskElement.classList.add('dragging');
};

const onDragOver = (column: string) => {
  dragOverColumn = column;
};

const onDragEnd = () => {
  isDragging = '';
}

const onDrop = async (newStatus: string, event: DragEvent) => {
  if (!draggedTaskID) return;

  const task = allTasks.find((t) => t.taskID === draggedTaskID);

  if (task && task.taskStatus !== newStatus) {
    task.taskStatus = newStatus;

    try {
      await taskStoreInstance.updateTaskStatus(draggedTaskID, newStatus);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  draggedTaskID = "";

  const draggedElement = event.target as HTMLElement;
  draggedElement.classList.remove('dragging');
};
</script>

<template>
  <div class="kanban-board justify-content-center">
    <div
      class="kanban-column"
      :class="{ 'kanban-column': true, 'dragover': dragOverColumn === 'assigned' }"
      id="assigned"
      @dragover.prevent="onDragOver('assigned')"
      @drop="onDrop('assigned', $event)"
    >
      <h4><strong>Assigned</strong></h4>
      <div class="tasks" data-status="assigned">
        <div
          v-for="task in tasksByStatus('assigned')"
          :key="task.taskID"
          class="task-card"
          draggable="true"
          @dragstart="onDragStart(task.taskID, $event)"
          @dragend="onDragEnd"
        >
          <h5>{{ task.taskTitle }}</h5>
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
    <div
      class="kanban-column"
      :class="{ 'kanban-column': true, 'dragover': dragOverColumn === 'inprogress' }"
      id="inprogress"
      @dragover.prevent="onDragOver('inprogress')"
      @drop="onDrop('inprogress', $event)"
    >
      <h4><strong>In Progress</strong></h4>
      <div class="tasks" data-status="inprogress">
        <div
          v-for="task in tasksByStatus('inprogress')"
          :key="task.taskID"
          class="task-card"
          draggable="true"
          @dragstart="onDragStart(task.taskID, $event)"
        >
          <h5>{{ task.taskTitle }}</h5>
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
    <div
      class="kanban-column"
      :class="{ 'kanban-column': true, 'dragover': dragOverColumn === 'completed' }"
      id="completed"
      @dragover.prevent="onDragOver('completed')"
      @drop="onDrop('completed', $event)"
    >
      <h4><strong>Completed</strong></h4>
      <div class="tasks" data-status="completed">
        <div
          v-for="task in tasksByStatus('completed')"
          :key="task.taskID"
          class="task-card"
          draggable="true"
          @dragstart="onDragStart(task.taskID, $event)"
        >
          <h5>{{ task.taskTitle }}</h5>
          <p>{{ task.taskDescription }}</p>
        </div>
      </div>
    </div>
    <div
      class="kanban-column"
      :class="{ 'kanban-column': true, 'dragover': dragOverColumn === 'unsuccessful' }"
      id="unsuccessful"
      @dragover.prevent="onDragOver('unsuccessful')"
      @drop="onDrop('unsuccessful', $event)"
    >
      <h4><strong>Unsuccessful</strong></h4>
      <div class="tasks" data-status="unsuccessful">
        <div
          v-for="task in tasksByStatus('unsuccessful')"
          :key="task.taskID"
          class="task-card"
          draggable="true"
          @dragstart="onDragStart(task.taskID, $event)"
        >
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
  border: 1px solid;
  border-color: #bbcfe2;
  border-radius: 5px;
}

.task-card {
  text-align: center;
  background-color: #edeffa;
  border: 2px solid;
  border-color: #bbcfe2;
  border-radius: 10px;
  padding-top: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.task-card.dragging {
  opacity: 0.75;
  transform: scale(1.05);
  background-color: #f0f8ff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

.task-card h5{
  padding-bottom: 5px;
}
</style>
