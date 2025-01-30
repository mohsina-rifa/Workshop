<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import InputBoard from "../board/InputBoard.vue";
import OutputBoard from "../board/OutputBoard.vue";

const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = async () => {
  isModalVisible.value = false;
};

const route = useRoute();

const userID = route.params.userID as string;
</script>

<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-4"><strong>My To-Do List</strong></h1>
      <div class="d-flex justify-content-end"> 
        <button class="btn btn-outline-secondary me-2" @click="openModal">
          Add Task
        </button>
        <button class="btn btn-outline-secondary">
          Add Category
        </button>
      </div>
    </div>
    <div>
      <!-- <OutputBoard /> -->
      <OutputBoard :userID="userID"/>
    </div>
    <div>
      <!-- <InputBoard :isVisible="isModalVisible" @close="closeModal" /> -->
      <InputBoard :isVisible="isModalVisible" :userID="userID" @close="closeModal" />
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