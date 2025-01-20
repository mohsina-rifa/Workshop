<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import type { EmployeeValidate, EmployeeRecord } from "../types/auth.ts";

import axios from "axios";

import Username from "../reusable/Username.vue";
import Password from "../reusable/Password.vue";

const placeHolders = ref({
  username: "e.g. khi0ne",
});

const employee = ref<EmployeeValidate>({
  username: "",
  password: "",
});

const isEligible = computed(() => {
  return !Object.values(employee.value).some((value) => value === "");
});

const employees = ref<EmployeeRecord[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:3000/employees");
    employees.value = response.data;
  } catch (error) {
    console.error("Failed to fetch employee data:", error);
  }
});

const matchWithDatabase = () => {
  return employees.value.find(
    (emp) =>
      emp.username === employee.value.username &&
      emp.password === employee.value.password
  );
};

const router = useRouter();

const submitForm = async () => {
  console.log(matchWithDatabase(), 'matching'); 
  if (matchWithDatabase()) {
    const userID = matchWithDatabase()?.id;

    router.push(`/profile/${userID}`);
  } else {
    alert('username or password does not match!')
    router.push("/resume-your-progress");

    employee.value.username = "";
    employee.value.password = "";
  }
};
</script>

<template>
  <section id="login">
    <div class="container-lg">
      <div class="text-center">
        <h2>Log In</h2>
        <p>Pick up where you left...</p>
      </div>

      <div class="row justify-content-center my-5">
        <div class="col-lg-6">
          <form>
            <Username
              id="username"
              v-model="employee.username"
              label="Userame:"
              :isRequired="true"
              :placeHolder="placeHolders.username"
            />
            <Password
              id="password"
              v-model="employee.password"
              label="Password:"
              :isRequired="true"
            />
            <button
              data-mdb-button-init
              data-mdb-ripple-init
              class="btn btn-lg btn-block"
              :class="isEligible ? 'btn-success' : 'btn-warning'"
              type="button"
              :disabled="!isEligible"
              @click="submitForm"
            >
              Log In!
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
