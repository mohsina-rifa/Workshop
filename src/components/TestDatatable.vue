<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import DataTable from "../reusable/DataTable.vue";
import { Axios } from "../service/axios";
import { getUserFromLocalStorage } from "../helper/localStore";
import { USER_ROLE } from "../service/enum";
import type { Column } from "../types/common";
import type { EmployeeRecord } from "../types/auth";
import { useEmployeeStore } from "../stores/employeeStore";

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

const columns: Column[] = [
  "id",
  "username",
  "name",
  "country",
  "contact",
  "password",
  "role",
].map((key) => ({ key, label: key.toUpperCase() }));

const allRoles = computed(() => Object.values(USER_ROLE));

const isAuthorized = (role: string) => {
  return (
    role !== USER_ROLE.OWNER &&
    getUserFromLocalStorage()?.role === USER_ROLE.OWNER
  );
};

const employeeStoreInstance = useEmployeeStore();

const changeRole = (id: string, newRole: string) => {
  employeeStoreInstance.changeEmployeeRole(id, newRole);
};
</script>

<template>
  <div class="container">
    <div class="mt-4 d-flex justify-content-between">
      <h3>Employee List (with Reusable Table)</h3>
      <router-link to="/join-the-community" class="btn btn-info"
        >Add New Employee</router-link
      >
    </div>

    <DataTable :columns="columns" :dataset="employees">
      <template #contact="{ row }">
        {{ `${SAARCCountryCodes.get(row.country)} ${row.contact}` }}
      </template>

      <template #role="{ row }">
        <div v-if="isAuthorized(row.role)">
          <select
            class="form-select text-capitalize"
            v-model="row.role"
            @change="
              changeRole(row.id, ($event.target as HTMLInputElement)?.value)
            "
          >
            <option
              v-for="role in allRoles"
              :key="role"
              :value="role"
              :disabled="row.role.toLowerCase() === role.toLowerCase()"
            >
              {{ role }}
            </option>
          </select>
        </div>
        <div v-else class="text-capitalize">
          {{ row.role }}
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped></style>
