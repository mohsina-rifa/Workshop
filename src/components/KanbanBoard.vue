<script setup lang="ts">
//logic here
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
          />
          <button class="btn btn-primary btn-sm w-100">Add Task</button>
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