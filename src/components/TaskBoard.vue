<script setup lang="ts">
import { ref } from "vue";

import TaskInputBoard from "../board/TaskInputBoard.vue";
import StatusInputBoard from "../board/StatusInputBoard.vue";
import OutputBoard from "../board/OutputBoard.vue";

import { getUserFromLocalStorage, isUserAdmin } from '../helper/localStore';

const isModalForTaskVisible = ref(false);
const isModalForStatusVisible = ref(false);

const openModalForTask = () => {
  isModalForTaskVisible.value = true;
};

const openModalForStatus = () => {
  isModalForStatusVisible.value = true;
};

const closeModalForTask = async () => {
  isModalForTaskVisible.value = false;
};

const closeModalForStatus = async () => {
  isModalForStatusVisible.value = false;
};

const userID = getUserFromLocalStorage().id;
</script>

<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-4"><strong>My To-Do List</strong></h1>
      <div class="d-flex justify-content-end"> 
        <button class="btn btn-outline-secondary me-2" @click="openModalForTask">
          Add Task
        </button>
        <button class="btn btn-outline-secondary" v-if="isUserAdmin()" @click="openModalForStatus">
          Add Category
        </button>
      </div>
    </div>
    <div>
      <OutputBoard :userID="userID"/>
    </div>
    <div>
      <TaskInputBoard :isVisible="isModalForTaskVisible" :userID="userID" @close="closeModalForTask" />
    </div>
    <div>
      <StatusInputBoard :isVisible="isModalForStatusVisible" @close="closeModalForStatus" />
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

.d-flex .justify-content-end {
  margin-right: 300px;
}
</style>