<script setup lang="ts">
import { useEmployeeStore } from "../stores/employeeStore";

const employeeStore = useEmployeeStore();

const SAARCCountryCodes = new Map<string, string>([
  ["Afghanistan", "+93"],
  ["Bangladesh", "+880"],
  ["Bhutan", "+975"],
  ["India", "+91"],
  ["Maldives", "+960"],
  ["Nepal", "+977"],
  ["Pakistan", "+92"],
  ["Sri Lanka", "+94"],
]);
</script>

<template>
  <div class="container mt-4">
    <h3>Employee List</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Country</th>
          <th>Contact</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employeeStore.getEmployeeList" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.country }}</td>
          <td>{{ `${SAARCCountryCodes.get(employee.country)} ${employee.contact}` }}</td>
          <td>{{ employee.password }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
