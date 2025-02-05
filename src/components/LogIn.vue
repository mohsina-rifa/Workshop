<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";

import { setUserToLocalStorage } from "../helper/localStore.ts";

import type { UserValidate, EmployeeRecord } from "../types/auth.ts";

import { Axios } from "../service/axios";

const employee = ref<UserValidate>({
  username: "",
  password: "",
});

const isEligible = computed(() => {
  return !Object.values(employee.value).some((value) => value === "");
});

const employees = ref<EmployeeRecord[]>([]);

onMounted(async () => {
  try {
    const response = await Axios.get(`employees`);
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
  const user = matchWithDatabase();

  if (user) {
    setUserToLocalStorage(user);

    toast.success("Successfully logged in!", {
      position: POSITION.TOP_RIGHT,
      timeout: 3000,
    });

    router.push(`/profile`);
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
      <div class="row justify-content-center my-5">
        <div class="col-lg-3"><img src="../assets/login.svg"</div>
        <div class="col-lg-3"></div>
        <div class="col-lg-5">
          <div class="text-start">
            <h1>Log In</h1>
            <h5>Pick up where you left...</h5>
          </div>
          <form class="mt-5">
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
            <div class="mt-3">
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
            <div class="mt-5">
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
            <div class="mt-3">
              <router-link to="/join-the-community" class="p text-info"
                >Don't have an account yet? Sign up!</router-link
              >
            </div>
          </form>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
