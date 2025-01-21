<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue';
import Navbar from './components/Navbar.vue';


</script>

<template>
  <Navbar />
  <router-view /> 
  <KanbanBoard />
</template>

<style scoped></style>
