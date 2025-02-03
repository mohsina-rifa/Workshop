<script setup lang="ts">
import { computed } from 'vue';

import { useEmployeeStore } from '../stores/employeeStore';

const employeeStoreInstance = useEmployeeStore();

const userID = computed( () =>  employeeStoreInstance.loggedInUserID);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">WORKSHOP</router-link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/join-the-community" class="nav-link"
            >Join The Community</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="`/see-your-board?userID=${userID}`" class="nav-link"
            >See Your Task-Board</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/see-all-members" class="nav-link"
            >See All Members</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <i class="bi bi-person-circle"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
</style>
