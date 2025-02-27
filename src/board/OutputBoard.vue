<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";

import TaskInputBoard from "../board/TaskInputBoard.vue";

const props = defineProps({
  userID: {
    type: String,
    required: true,
  },
});

const taskStoreInstance = useTaskStore();

onMounted(async () => {
  await taskStoreInstance.fetchTasks(props.userID);
  await taskStoreInstance.fetchStatuses();
});

const allTasks = computed(() => taskStoreInstance.getTaskList);
const allStatus = computed(() => taskStoreInstance.getStatusList);

const tasksByStatus = (status: string) => {
  return allTasks.value.filter((task) => task.taskStatus === status);
};

const draggedTaskID = ref("");
const isDragging = ref("");
const dragOverColumn = ref("");

const onDragStart = (taskID: string, event: DragEvent) => {
  draggedTaskID.value = taskID;
  isDragging.value = taskID;

  const taskElement = event.target as HTMLElement;
  taskElement.classList.add("dragging");
};

const onDragOver = (column: string) => {
  dragOverColumn.value = column;
};

const onDragEnd = () => {
  isDragging.value = "";
};

const onDrop = async (newStatus: string, event: DragEvent) => {
  if (!draggedTaskID) return;

  const task = allTasks.value.find((t) => t.id === draggedTaskID.value);

  if (task && task.taskStatus !== newStatus) {
    task.taskStatus = newStatus;

    try {
      await taskStoreInstance.updateTaskStatus(draggedTaskID.value, newStatus);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  draggedTaskID.value = "";

  const draggedElement = event.target as HTMLElement;
  draggedElement.classList.remove("dragging");
};

const taskBeingEdited = ref("");
const isEditorVisible = ref(false);

const openTaskEditor = (id: string) => {
  isEditorVisible.value = true;
  taskBeingEdited.value = id;
};

const closeTaskEditor = () => {
  isEditorVisible.value = false;
};
</script>

<template>
  <div class="kanban-board justify-content-center">
    <template v-for="status in allStatus">
      <div
        class="kanban-column"
        :class="{
          'kanban-column': true,
          dragover: dragOverColumn === status.key,
        }"
        :id="status.key"
        @dragover.prevent="onDragOver(status.key)"
        @drop="onDrop(status.key, $event)"
      >
        <h4>
          <strong>{{ status.title }}</strong>
        </h4>
        <div class="tasks" :data-status="status.key">
          <div
            v-for="task in tasksByStatus(status.key)"
            :key="task.id"
            class="task-card"
            draggable="true"
            @dragstart="onDragStart(task.id, $event)"
            @dragend="onDragEnd"
          >
            <div class="task-header">
              <h5>{{ task.taskTitle }}</h5>
              <i class="bi bi-pencil-square" @click="openTaskEditor(task.id)"></i>
            </div>
            <p>{{ task.taskDescription }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
  <TaskInputBoard :isVisible="isEditorVisible" :editedTaskID="taskBeingEdited" @close="closeTaskEditor"/>
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

.task-header {
  display: flex;
  justify-content: center;
  align-items: top;
}

.task-header h5 {
  padding-bottom: 5px;
}

.bi {
  cursor: pointer;
  padding-left: 10px;
}

.bi:hover {
  color: #007bff;
}
</style>
