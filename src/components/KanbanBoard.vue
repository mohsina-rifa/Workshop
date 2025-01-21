<script setup lang="ts">
//logic here
</script>

<template>
  <div class="container-fluid py-4">
    <h1 class="text-center mb-4">My To-Do List</h1>
    <div class="kanban-board justify-content-center">
      <div class="kanban-column" id="todo">
        <h4>Assigned</h4>
        <div class="tasks" data-status="todo"></div>
        <div class="add-task-form">
          <input
            type="text"
            class="form-control mb-2"
            placeholder="New task title"
          />
          <select class="form-select mb-2">
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button class="btn btn-primary btn-sm w-100">Add Task</button>
        </div>
      </div>
      <div class="kanban-column" id="in-progress">
        <h4>In Progress</h4>
        <div class="tasks" data-status="in-progress"></div>
      </div>
      <div class="kanban-column" id="done">
        <h4>Completed</h4>
        <div class="tasks" data-status="done"></div>
      </div>
      <div class="kanban-column" id="done">
        <h4>Unsuccessful</h4>
        <div class="tasks" data-status="done"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
