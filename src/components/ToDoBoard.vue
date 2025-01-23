<script setup lang="ts">
import { ref } from "vue";

//import InputBoard from "../board/InputBoard.vue";
import OutputBoard from "../board/OutputBoard.vue";

const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};
</script>

<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-4"><strong>My To-Do List</strong></h1>
      <button class="btn btn-outline-secondary" @click="openModal">
        Add Task
      </button>
    </div>
    <div>
      <OutputBoard />
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
              class="form-control"
              placeholder="Enter task title"
            />
            <textarea
              class="form-control mb-2"
              placeholder="Enter task description"
              rows="3"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Close</button>
            <button type="button" class="btn btn-primary">Save Task</button>
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
</style>
