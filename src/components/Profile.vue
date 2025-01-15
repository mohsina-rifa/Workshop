<script setup lang="ts">
import type { PropType } from "vue";
import type { Employee } from "../types/auth.ts";

const props = defineProps({
  employee: {
    type: Object as PropType<Employee>,
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <div class="row align-items-start">
      <div class="col-md-4 text-center">
        <img
          src="../assets/profile.svg"
          alt="Profile Image"
          class="img-fluid rounded-circle"
          style="width: 120px; height: 120px"
        />
        <p class="mt-3 fw-bold">{{ props.employee.username }}</p>
        <button class="btn btn-info">Change Info</button>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-12">
            <p><strong>First Name:</strong> {{ props.employee.firstname }}</p>
          </div>
          <div class="col-12">
            <p><strong>Last Name:</strong> {{ props.employee.lastname }}</p>
          </div>
          <div class="col-12">
            <p><strong>Country:</strong> {{ props.employee.country }}</p>
          </div>
          <div class="col-12">
            <p><strong>Contact:</strong> {{ props.employee.contact }}</p>
          </div>
          <div class="col-12">
            <p><strong>Password:</strong> ********</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
