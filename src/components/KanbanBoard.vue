<template>
  <div class="container my-4">
    <div class="row">
      <div
        v-for="(tasks, column) in boardData"
        :key="column"
        class="col-md-4"
        @dragover="onDragOver"
        @drop="(event) => onDrop(event, column)"
      >
        <div class="card">
          <div class="card-header text-center fw-bold">
            {{ column }}
          </div>
          <div class="card-body bg-light" style="min-height: 200px;">
            <div
              v-for="(task, index) in tasks"
              :key="index"
              class="card mb-2 p-2"
              draggable="true"
              @dragstart="(event) => dragStart(event, column, index)"
            >
              {{ task }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define the board data with tasks
const boardData = ref({
  todo: [
    {
      id: 1,
      title: "Issue One",
    },
    {
      id: 2,
      title: "Issue Two",
    },
    {
      id: 5,
      title: "Issue Five",
    }
  ],
  inProgress: [
    {
      id: 3,
      title: "Issue Three",
    },
    {
      id: 6,
      title: "Issue Six",
    }
  ],
  done: [
    {
      id: 4,
      title: "Issue Four",
    },
    {
      id: 7,
      title: "Issue Seven",
    }
  ],
});


// Handle the start of a drag event
const dragStart = (event, sourceColumn, index) => {
  event.dataTransfer.setData(
    "draggedData",
    JSON.stringify({ sourceColumn, index })
  );
};

// Handle dropping a task into a new column
const onDrop = (event, targetColumn) => {
  event.preventDefault();
  console.log(event, targetColumn, "event, targetColumn");
  const { sourceColumn, index } = JSON.parse(
    event.dataTransfer.getData("draggedData")
  );

  // Remove the task from the source column
  const draggedTask = boardData.value[sourceColumn].splice(index, 1)[0];

  // Add the task to the target column
  boardData.value[targetColumn].push(draggedTask);
};

// Allow dropping by preventing the default dragover behavior
const onDragOver = (event) => {
  event.preventDefault();
};
</script>

<style scoped>
.card-body {
  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}
.card {
  border-radius: 0.375rem;
}
.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}
</style>
