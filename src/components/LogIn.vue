 <script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";

import type { EmployeeValidate, EmployeeRecord } from "../types/auth.ts";

import axios from "axios";

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
const toast = useToast();

const submitForm = async () => {
  console.log(matchWithDatabase(), "matching");
  if (matchWithDatabase()) {
    const userID = matchWithDatabase()?.id;

    toast.success("Successfully logged in!", {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
    });

    router.push(`/profile/${userID}`);
  } else {
    toast.error("username/password doesn't match!", {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
    });

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
            <div>
              <label for="username" class="form-label"> Username: </label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="e.g. khi0ne"
                  v-model="employee.username"
                />
              </div>
            </div>
            <br/>
            <div>
              <label for="password" class="form-label">Password:</label>
              <div class="input-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="********"
                  v-model="employee.password"
                />
              </div>
            </div>
            <br/>
            <div>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
