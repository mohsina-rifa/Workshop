<script setup lang="ts">
import Homepage from './components/Homepage.vue';
import Navbar from './components/Navbar.vue';

</script>

<template>
  <Navbar />
  <router-view /> 
  <Homepage />
</template>

<style scoped></style>
