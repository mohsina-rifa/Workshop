<script setup lang="ts">
import { ref } from "vue";

import { useEmployeeStore } from "../stores/employeeStore";

import type { EmployeeValidate } from "../types/auth.ts";

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

const validEmployee = ref<EmployeeValidate>({
  username: "",
  password: "",
});

const selectedEmployee = ref<any>(null);

const isAuthenticated = ref(false);

const openModal = (employee: any) => {
  selectedEmployee.value = employee;
  isModalVisible.value = true;
};

const validateModalInput = () => {
  return (
    validEmployee.value.username === selectedEmployee.value?.username &&
    validEmployee.value.password === selectedEmployee.value?.password
  );
}

const onSubmitModal = () => {
  if (validateModalInput()) {
    const employeeIndex = employeeStore.getEmployeeList.findIndex(
      (emp) => emp.id === selectedEmployee.value?.id
    );

    if (employeeIndex !== -1) {
      isAuthenticated.value = true;
    }

    isModalVisible.value = false;

    validEmployee.value.username = "";
    validEmployee.value.password = "";

  } else {
    alert("Incorrect username or password.");
    isModalVisible.value = false;
  }
};
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
              <p v-if="isAuthenticated">
                {{ employee.password }}
              </p>
              <p class="cursor-pointer text-info" v-else @click="openModal(employee)">
                See Password
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div
      class="modal fade show d-block"
      tabindex="-1"
      v-if="isModalVisible"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Authentication required!</h5>
            <button
              type="button"
              class="btn-close"
              @click="isModalVisible = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    class="form-control"
                    v-model="validEmployee.username"
                    placeholder="e.g. khi0ne"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    v-model="validEmployee.password"
                    placeholder="********"
                  />
                </div>
              </form>
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
            <button
              type="button"
              class="btn btn-primary"
              @click="onSubmitModal"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
