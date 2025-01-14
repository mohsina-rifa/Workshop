<script setup lang="ts">
import { ref } from "vue";

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

const isModalVisible = ref(false);
</script>

<template>
  <div class="container">
    <div class="mt-4 d-flex justify-content-between">
      <h3>Employee List</h3>
      <router-link to="/join-the-community" class="btn btn-info"
        >Add New Employee</router-link
      >
    </div>
    <div class="mt-4">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Country</th>
            <th>Contact</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="employee in employeeStore.getEmployeeList"
            :key="employee.id"
          >
            <td>{{ employee.id }}</td>
            <td>{{ employee.username }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.country }}</td>
            <td>
              {{
                `${SAARCCountryCodes.get(employee.country)} ${employee.contact}`
              }}
            </td>
            <td>
              <p
                class="cursor-pointer text-info"
                @click="isModalVisible = true"
              >
                See Password
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isModalVisible" class="modal" tabindex="-1" role="dialog">
      <!-- Modal -->
      <div
        v-if="isModalVisible"
        class="modal fade show"
        tabindex="-1"
        style="display: block"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Password Information</h5>
              <button
                type="button"
                class="btn-close"
                @click="isModalVisible = false"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  class="form-control"
                  v-model="username"
                  readonly
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="text"
                  id="password"
                  class="form-control"
                  v-model="password"
                  readonly
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="isModalVisible = false"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
