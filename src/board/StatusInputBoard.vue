<script setup lang="ts"></script>

<template>
  <div v-if="props.isVisible" class="modal fade show" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add New Category</h5>
          <button type="button" class="btn-close" @click="emit('close')"></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            placeholder="Enter task title"
            v-model="newTask.taskTitle"
            required
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="emit('close')">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="createTask">
            Save Task
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
