<script setup lang="ts">
import { ref } from "vue";
// import { useRoute } from "vue-router";

import InputBoard from "../board/InputBoard.vue";
import OutputBoard from "../board/OutputBoard.vue";

const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = async () => {
  isModalVisible.value = false;
};

// const route = useRoute();
// const userID = route.params.id;
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
      <!-- <OutputBoard :userID="userID"/> -->
    </div>
    <div>
      <InputBoard :isVisible="isModalVisible" @close="closeModal" />
      <!-- <InputBoard :isVisible="isModalVisible" :userID="userID" @close="closeModal" /> -->
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