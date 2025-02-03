<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { EmployeeRecord } from "../types/auth.ts";
import { useEmployeeStore } from "../stores/employeeStore";
import { Axios } from "../service/axios";
import { getUserFromLocalStorage } from "../helper/localStore";
import { USER_ROLE } from "../service/enum";

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

const employees = ref<EmployeeRecord[]>([]);

onMounted(async () => {
  try {
    const response = await Axios.get(`employees`);
    employees.value = response.data;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
  }
});

const allRoles = ref<string[]>([]);

const getRolesFromEnum = () => {
  allRoles.value = Object.values(USER_ROLE).map(
    (role) => role.charAt(0).toUpperCase() + role.slice(1)
  );

  return allRoles;
};

getRolesFromEnum();

const isAuthorized = (role: string) => {
  return (
    role !== USER_ROLE.OWNER &&
    getUserFromLocalStorage()?.role === USER_ROLE.OWNER
  );
};

const showRole = (role: string) => {
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const employeeStoreInstance = useEmployeeStore();

const changeRole = (id: string, newRole: string) => {
  newRole = newRole.charAt(0).toLowerCase() + newRole.slice(1);
  employeeStoreInstance.changeEmployeeRole(id, newRole);
}
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
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.username }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.country }}</td>
            <td>
              {{
                `${SAARCCountryCodes.get(employee.country)} ${employee.contact}`
              }}
            </td>
            <td>{{ employee.password }}</td>
            <td class="input-group">
              <div v-if="isAuthorized(employee.role)">
                <select class="form-select" id="roles" @change="changeRole(employee.id, $event.target.value)">
                  <option value="" disabled selected>
                    {{ showRole(employee.role) }}
                  </option>
                  <option v-for="role in allRoles" :value="role">
                    {{ role }}
                  </option>
                </select>
              </div>
              <div v-else>{{ showRole(employee.role) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
